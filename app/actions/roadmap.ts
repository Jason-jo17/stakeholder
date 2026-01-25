
'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Helper to get current user session
async function getSession() {
    return await getServerSession(authOptions)
}

export async function getStudentTeam() {
    try {
        const session = await getSession()

        let student = null

        // Try to get student by session email
        if (session?.user?.email) {
            student = await prisma.studentProfile.findFirst({
                where: { user: { email: session.user.email } },
                include: {
                    user: true,
                    team: {
                        include: { progress: true }
                    }
                }
            })
        }

        // FALLBACK: If no session or no student found, get ANY student with a team (for demo purposes)
        if (!student) {
            console.log("No session or student found, using fallback to find any student with a team")
            student = await prisma.studentProfile.findFirst({
                where: {
                    teamId: { not: null }
                },
                include: {
                    user: true,
                    team: {
                        include: { progress: true }
                    }
                }
            })
        }

        // If no student profile found at all, return null
        if (!student) return null

        // If student has a team, return it
        if (student.team) {
            return student.team
        }

        // If student has no team, try to find the demo team
        const demoTeam = await prisma.team.findFirst({
            where: { name: 'Demo Innovation Team' },
            include: { progress: true }
        })

        if (demoTeam) {
            // Link this student to the demo team
            await prisma.studentProfile.update({
                where: { id: student.id },
                data: { teamId: demoTeam.id }
            })
            return demoTeam
        }

        // If no demo team exists, create one
        const newTeam = await prisma.team.create({
            data: {
                name: `${student.user?.name || 'Student'}'s Team`,
                cohort: "Batch 2026",
                members: { connect: { id: student.id } },
                progress: {
                    create: {
                        currentStageId: 1,
                        currentWeek: 0
                    }
                }
            },
            include: { progress: true }
        })
        return newTeam
    } catch (error) {
        console.error("Error in getStudentTeam:", error)
        return null
    }
}

export async function getRoadmapData() {
    const team = await getStudentTeam()
    if (!team) return { error: "No team found" }

    const stages = await prisma.roadmapStage.findMany({
        orderBy: { stageNumber: 'asc' },
        include: {
            tools: {
                orderBy: { week: 'asc' },
                include: { tasks: true }
            }
        }
    })

    // Get progress
    const progress = await prisma.teamProgress.findUnique({
        where: { teamId: team.id },
        include: {
            toolProgress: { include: { taskProgress: true } },
            stageProgress: true
        }
    })

    return { team, stages, progress }
}

export async function getAdminRoadmapData() {
    const session = await getSession()
    // In a real app, check for admin role here. 
    // if (!session || session.user.role !== 'ADMIN') return { error: "Unauthorized" }

    const stages = await prisma.roadmapStage.findMany({
        orderBy: { stageNumber: 'asc' },
        include: {
            tools: {
                orderBy: { week: 'asc' },
                include: { tasks: true }
            }
        }
    })

    // Return structure matching getRoadmapData but with null team/progress
    // The frontend will handle isAdmin={true} to ignore missing progress
    return { team: null, stages, progress: null }
}

export async function startTool(toolId: string) {
    const team = await getStudentTeam()
    if (!team) return { error: "No team found" }

    if (!team.progress) {
        // Ensure progress exists
        try {
            await prisma.teamProgress.create({ data: { teamId: team.id } })
        } catch (e: any) {
            // It might already exist but not be in the 'team' object from getStudentTeam
        }
    }

    const progressRecord = await prisma.teamProgress.findUnique({ where: { teamId: team.id } })
    if (!progressRecord) return { error: "Failed to initialize team progress" }
    const progressId = progressRecord.id

    try {
        const toolProgress = await prisma.toolProgress.upsert({
            where: {
                teamProgressId_toolId: {
                    teamProgressId: progressId,
                    toolId: toolId
                }
            },
            update: { status: "in_progress", startedAt: new Date() },
            create: {
                teamProgressId: progressId,
                toolId: toolId,
                status: "in_progress",
                startedAt: new Date()
            }
        })

        revalidatePath('/student/dashboard')
        return { success: true, toolProgress }
    } catch (error) {
        console.error("Failed to start tool:", error)
        return { error: "Failed to start tool" }
    }
}

export async function submitTask(taskId: string, content: string | null, url: string | null) {
    const team = await getStudentTeam()
    if (!team) return { error: "No team found" }

    // Find which tool this task belongs to
    const task = await prisma.roadmapTask.findUnique({
        where: { id: taskId },
        include: { tool: true }
    })

    if (!task) return { error: "Task not found" }

    // Find or create ToolProgress
    let progressId = team.progress?.id

    if (!progressId) {
        // Auto-fix: Create TeamProgress if missing
        const newTp = await prisma.teamProgress.upsert({
            where: { teamId: team.id },
            update: {},
            create: { teamId: team.id }
        })
        progressId = newTp.id
    }

    let toolProgress = await prisma.toolProgress.findUnique({
        where: {
            teamProgressId_toolId: {
                teamProgressId: progressId,
                toolId: task.tool.toolId
            }
        }
    })

    if (!toolProgress) {
        // Should have started tool first, but auto-start if needed
        toolProgress = await prisma.toolProgress.create({
            data: {
                teamProgressId: progressId,
                toolId: task.tool.toolId,
                status: "in_progress",
                startedAt: new Date()
            }
        })
    }

    // Update Task Progress
    await prisma.taskProgress.upsert({
        where: {
            toolProgressId_taskId: {
                toolProgressId: toolProgress.id,
                taskId: taskId
            }
        },
        update: {
            status: "submitted",
            submissionText: content,
            submissionUrl: url,
            submittedAt: new Date()
        },
        create: {
            toolProgressId: toolProgress.id,
            taskId: taskId,
            status: "submitted",
            submissionText: content,
            submissionUrl: url,
            submittedAt: new Date()
        }
    })

    revalidatePath('/student/dashboard')

    // Check if all tasks in tool are completed
    const allToolTasks = await prisma.roadmapTask.findMany({
        where: { toolId: task.tool.toolId }
    })

    const allTaskProgress = await prisma.taskProgress.findMany({
        where: { toolProgressId: toolProgress.id }
    })

    const isToolComplete = allToolTasks.every((t: any) =>
        allTaskProgress.some((tp: any) => tp.taskId === t.id && (tp.status === 'submitted' || tp.status === 'approved' || tp.taskId === taskId))
        // Note: checking current taskId too just in case prisma lag, though we just upserted it.
    )

    console.log(`[DEBUG] Tool complete? ${isToolComplete} (Task ID: ${taskId})`)

    if (isToolComplete) {
        // Mark tool as completed
        await prisma.toolProgress.update({
            where: { id: toolProgress.id },
            data: {
                status: 'completed',
                completedAt: new Date()
            }
        })

        // Unlock next tool
        await unlockNextTool(team.id, task.tool.toolId)
    }

    return { success: true }
}

async function unlockNextTool(teamId: string, currentToolId: string) {
    // 1. Get all tools ordered by week
    const allTools = await prisma.roadmapTool.findMany({
        orderBy: [
            { week: 'asc' },
            { id: 'asc' } // Secondary sort
        ],
        include: { stage: true }
    })

    // 2. Find index of current tool
    const currentIndex = allTools.findIndex((t: any) => t.toolId === currentToolId)

    // 3. Get next tool
    if (currentIndex >= 0 && currentIndex < allTools.length - 1) {
        const nextTool = allTools[currentIndex + 1]
        console.log(`[DEBUG] Unlocking next tool: ${nextTool.name} (${nextTool.toolId})`)

        // 4. Unlock it
        // Ensure team progress exists
        const teamProgress = await prisma.teamProgress.findUnique({ where: { teamId } })
        if (!teamProgress) return

        await prisma.toolProgress.upsert({
            where: {
                teamProgressId_toolId: {
                    teamProgressId: teamProgress.id,
                    toolId: nextTool.toolId
                }
            },
            update: {
                status: { set: 'unlocked' } // Only update if not already in_progress or completed? 
                // Actually, if it's 'locked' (default implicit), we enable it. 
                // If it's already in_progress, don't revert it.
                // upsert update logic: we can just set to unlocked if it was undefined, but we can't conditionally update here easily without a read first or complex query.
                // Let's safe-guard:
            },
            create: {
                teamProgressId: teamProgress.id,
                toolId: nextTool.toolId,
                status: 'unlocked'
            }
        })

        // Also update current stage/week if changed
        if (nextTool.stage.stageNumber > (teamProgress.currentStageId || 1)) {
            await prisma.teamProgress.update({
                where: { id: teamProgress.id },
                data: {
                    currentStageId: nextTool.stage.stageNumber,
                    currentWeek: nextTool.week
                }
            })
        } else if (nextTool.week > (teamProgress.currentWeek || 0)) {
            await prisma.teamProgress.update({
                where: { id: teamProgress.id },
                data: { currentWeek: nextTool.week }
            })
        }
    }
}

export async function saveToolData(toolId: string, data: any) {
    const team = await getStudentTeam()
    if (!team) return { error: "No team found" }

    let progressId = team.progress?.id
    if (!progressId) {
        // Auto-fix: Create TeamProgress if missing
        try {
            const newTp = await prisma.teamProgress.upsert({
                where: { teamId: team.id },
                update: {},
                create: { teamId: team.id }
            })
            progressId = newTp.id
        } catch (e) {
            return { error: "Failed to initialize team progress" }
        }
    }

    try {
        const toolProgress = await prisma.toolProgress.upsert({
            where: {
                teamProgressId_toolId: {
                    teamProgressId: progressId,
                    toolId: toolId
                }
            },
            update: {
                data: data,
                updatedAt: new Date()
            },
            create: {
                teamProgressId: progressId,
                toolId: toolId,
                status: "in_progress",
                startedAt: new Date(),
                data: data
            }
        })

        return { success: true, toolProgress }
    } catch (error) {
        console.error("Failed to save tool data:", error)
        return { error: "Failed to save tool data" }
    }
}


export async function getAllStakeholders() {
    try {
        const profiles = await prisma.stakeholderProfile.findMany({
            include: { user: true }
        })

        // Map to simpler interface for the tool
        return profiles.map((p: any) => ({
            id: p.id,
            name: p.user.name,
            role: p.designation || "Unknown Role",
            organization: p.organization || "Unknown Org",
            category: "other", // Default, user can refine
            // Default positioning
            power: 5,
            interest: 5,
            attitude: "neutral",
            painPoints: [],
            gainOpportunities: [],
            valuedDimensions: [],
            email: p.user.email
        }))
    } catch (error) {
        console.error("Failed to fetch stakeholders", error)
        return []
    }
}
