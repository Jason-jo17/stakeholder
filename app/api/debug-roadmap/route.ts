import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) {
            return NextResponse.json({ 
                error: "No session found",
                message: "You are not logged in"
            })
        }

        const student = await prisma.studentProfile.findFirst({
            where: { user: { email: session.user?.email || undefined } },
            include: { 
                user: true,
                team: { include: { progress: true } } 
            }
        })

        return NextResponse.json({
            session: {
                email: session.user?.email,
                name: session.user?.name,
                role: (session.user as any)?.role
            },
            student: student ? {
                id: student.id,
                userId: student.userId,
                teamId: student.teamId,
                hasTeam: !!student.team,
                teamName: student.team?.name
            } : null,
            debug: {
                message: student ? "Student profile found" : "No student profile found for this email"
            }
        })
    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message,
            stack: error.stack 
        }, { status: 500 })
    }
}
