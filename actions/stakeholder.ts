
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function acceptConnectionRequest(interactionId: string) {
    try {
        const interaction = await prisma.interaction.findUnique({
            where: { id: interactionId },
            include: { initiator: true, stakeholder: true }
        })

        if (!interaction) throw new Error("Interaction not found")

        // 1. Create a StakeholderLink (or Team member, depending on logic)
        // For now, let's assume we link them in StakeholderLink if they are both stakeholders, 
        // OR we just mark interaction as 'accepted' if that status existed.
        // Since Interaction doesn't have a status field for 'accepted' explicitly in the schema shown earlier (it had `outcome`),
        // we might use `outcome` or just rely on creating a `StudentProfile` -> `Stakeholder` link if it existed.

        // Let's look at the schema again. `Interaction` has `outcome`.
        // `StakeholderLink` is between two stakeholders. 
        // A student connecting to a stakeholder might be stored in `StudentProfile`? 
        // No, `StudentProfile` doesn't have a direct list of stakeholders.
        // But `Interaction` is the record.

        // We can update the interaction outcome to "Accepted"
        await prisma.interaction.update({
            where: { id: interactionId },
            data: {
                outcome: "Connection Accepted",
                // specific logic to add to a 'network' could go here
            }
        })

        revalidatePath("/stakeholder/dashboard")
        return { success: true }
    } catch (error) {
        console.error("Failed to accept connection:", error)
        return { success: false, error: "Failed to accept connection" }
    }
}

export async function rejectConnectionRequest(interactionId: string) {
    try {
        await prisma.interaction.update({
            where: { id: interactionId },
            data: {
                outcome: "Connection Rejected"
            }
        })
        revalidatePath("/stakeholder/dashboard")
        return { success: true }
    } catch (error) {
        console.error("Failed to reject connection:", error)
        return { success: false, error: "Failed to reject connection" }
    }
}

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function requestConnection(stakeholderId: string) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" }
    }

    // Check if the current user is a student (or authorised role)
    // For now assuming any authenticated user can request connection
    const initiatorId = (session.user as any).id

    try {
        // Check if request already exists
        const existing = await prisma.interaction.findFirst({
            where: {
                initiatorId: initiatorId,
                stakeholder: { userId: { not: undefined } }, // We need to link to stakeholder profile, but interaction links to stakeholder via... wait.
                // Interaction model: initiatorId (User), targetId (User check schema), stakeholderId (StakeholderProfile?)
                // Let's check schema again for Interaction model.
            }
        })

        // Wait, I need to check the schema for Interaction. 
        // Based on previous view_file of schema.prisma (which I can't browse right now but I recall), 
        // Interaction usually links `initiator` (User) and `target` (User? or Stakeholder?).
        // Actually, viewing the schema is safer.
        throw new Error("Schema check required before implementation")

    } catch (error) {
        // ...
        return { success: false, error: "Failed" }
    }
}
