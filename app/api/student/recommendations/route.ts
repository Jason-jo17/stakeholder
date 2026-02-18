import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const selectedSector = searchParams.get('sector') || 'General'
        const selectedSolution = searchParams.get('solution') || 'Technology'
        const problemId = searchParams.get('problemId')

        // Fetch journey with problem details
        const journey = await (prisma as any).studentJourney.findUnique({
            where: { userId: session.user.id },
            include: {
                problemStatement: true
            }
        })

        if (!journey) {
            return NextResponse.json({ recommendations: [] })
        }

        // Fetch Team & Progress for Mentor Feedback & Last Tool
        const studentProfile = await (prisma as any).studentProfile.findUnique({
            where: { userId: session.user.id },
            include: {
                team: {
                    include: {
                        progress: {
                            include: {
                                toolProgress: {
                                    orderBy: { updatedAt: 'desc' },
                                    take: 3,
                                    include: {
                                        taskProgress: {
                                            where: { feedback: { not: null } },
                                            take: 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const lastTools = studentProfile?.team?.progress?.toolProgress || []
        const lastTool = lastTools[0]
        const mentorFeedback = lastTools.flatMap((tp: any) => tp.taskProgress.map((task: any) => task.feedback)).filter(Boolean).join('. ') || "No recent mentor feedback."

        // AI-powered recommendations
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert startup advisor for the Inunity Innovator program. 
                    Your goal is to provide exactly ONE HIGHLY SPECIFIC, ACTIONABLE next step for EACH of these 7 categories:
                    1. trl (TRL Tracker)
                    2. roadmap (Strategic Roadmap)
                    3. compliance (Regulatory/Legal)
                    4. experiments (Validation/Sandbox)
                    5. resources (Labs/Experts/Network)
                    6. industry (Pilots/Partners)
                    7. api (Integration/API Directory)

                    CRITICAL: Avoid vague advice like "Verify assumption" or "Check roadmap".
                    Use the provided Problem, Mentor Feedback, and Last Tool Worked On to give surgical advice.

                    Return JSON only with this structure: {
                        "recommendations": [{ "title": "", "description": "", "priority": "high|medium|low", "category": "trl|roadmap|compliance|experiments|resources|industry|api" }],
                        "strategicPath": { "nextStage": "", "reasoning": "" }
                    }`,
                },
                {
                    role: 'user',
                    content: `Project Context:
                    - Sector: ${selectedSector}
                    - Solution Approach: ${selectedSolution}
                    - Focus Problem: ${journey.problemStatement?.title || 'General'}
                    - Problem Details: ${journey.problemStatement?.description || 'No specific problem selected yet.'}
                    
                    Current Progress:
                    - TRL Level: ${journey.trlLevel}
                    - Stage: ${journey.stage}
                    - Compliance Score: ${journey.complianceScore}%

                    Team Activity:
                    - Last Tool Worked On: ${lastTool?.toolId || 'Initialization'}
                    - Last Tool Feedback: ${lastTool?.taskProgress?.[0]?.feedback || 'Pending review'}
                    - General Mentor Comments: ${mentorFeedback}
                    
                    Based on the fact that they just finished/worked on "${lastTool?.toolId || 'the start'}", what specifically should they do next in each of the 7 module tabs?`,
                },
            ],
            response_format: { type: 'json_object' },
        })

        const result = JSON.parse(completion.choices[0].message.content || '{}')
        return NextResponse.json({
            ...result,
            mentorFeedback,
            lastTool: lastTool?.toolId || 'None'
        })
    } catch (error) {
        console.error('Recommendations error:', error)
        // Comprehensive Fallback
        return NextResponse.json({
            recommendations: [
                { category: "trl", title: "Verify Assumption", description: "Conduct one lab test to verify your core technical assumption.", priority: "high" },
                { category: "roadmap", title: "Milestone Sync", description: "Align your Q3 goals with current TRL progress.", priority: "medium" },
                { category: "compliance", title: "Regulatory Check", description: "Review sector-specific compliance requirements.", priority: "high" },
                { category: "experiments", title: "Sandbox Test", description: "Run a digital simulation for your current prototype.", priority: "low" },
                { category: "resources", title: "Resource Hunt", description: "Identify a Testing Lab with expertise in your sector.", priority: "medium" },
                { category: "industry", title: "Partner Outreach", description: "Identify 3 potential pilot partners in your region.", priority: "high" },
                { category: "api", title: "API Exploration", description: "Check the API Directory for relevant sector integrations.", priority: "low" }
            ]
        })
    }
}
