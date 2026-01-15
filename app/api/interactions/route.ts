import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        // For demo purposes, we might allow unauthenticated or mock user
        // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const {
            targetId, // Can be optional if just logging against stakeholder
            stakeholderId,
            type,
            channel,
            subject,
            notes,
            duration,
            outcome,
            occurredAt
        } = await req.json()

        // If no session, pick a random user or fail
        const user = session?.user as any
        const initiatorId = user?.id

        if (!initiatorId) {
            // Fallback for demo: find any admin or user
            /* 
            const demoUser = await prisma.user.findFirst()
            if (!demoUser) throw new Error("No users found to attribute interaction to")
            initiatorId = demoUser.id
            */
            // We'll proceed assuming there's a user or handle error
            // For this implementation plan, we assume auth is working
            return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 })
        }

        // Since we might not have a targetId (user) if we selected a StakeholderProfile, 
        // we need to resolve the User ID of the stakeholder if targetId is missing
        let finalTargetId = targetId
        if (!finalTargetId && stakeholderId) {
            const stakeholder = await prisma.stakeholderProfile.findUnique({
                where: { id: stakeholderId },
                select: { userId: true }
            })
            if (stakeholder) finalTargetId = stakeholder.userId
        }

        if (!finalTargetId) {
            return NextResponse.json({ error: 'Target user not found' }, { status: 400 })
        }

        // Create interaction
        const interaction = await prisma.interaction.create({
            data: {
                initiatorId,
                targetId: finalTargetId,
                stakeholderId,
                type,
                channel,
                subject,
                notes,
                duration,
                outcome,
                occurredAt: occurredAt ? new Date(occurredAt) : new Date()
            }
        })

        // Update stakeholder's lastContacted
        if (stakeholderId) {
            await prisma.stakeholderProfile.update({
                where: { id: stakeholderId },
                data: { lastInteraction: new Date() }
            })
        }

        // Trigger AI summarization (async) - Placeholder for Phase 5
        // generateInteractionSummary(interaction.id)

        return NextResponse.json({ interaction })
    } catch (error) {
        console.error("Interaction log error:", error)
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Unknown'
        }, { status: 500 })
    }
}
