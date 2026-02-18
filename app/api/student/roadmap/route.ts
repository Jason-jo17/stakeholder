import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id },
        })

        if (!journey) {
            return NextResponse.json({ milestones: [] })
        }

        const milestones = await prisma.roadmapMilestone.findMany({
            where: { journeyId: journey.id },
            orderBy: { startDate: 'asc' },
        })

        return NextResponse.json({ milestones })
    } catch (error) {
        console.error('Roadmap fetch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id },
        })

        if (!journey) {
            return NextResponse.json({ error: 'Journey not found' }, { status: 404 })
        }

        const body = await req.json()
        const { title, description, category, startDate, endDate } = body

        const duration = Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
        )

        const milestone = await prisma.roadmapMilestone.create({
            data: {
                journeyId: journey.id,
                title,
                description,
                category,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                duration,
            },
        })

        return NextResponse.json(milestone)
    } catch (error) {
        console.error('Milestone creation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
