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
            include: {
                trlEvidences: {
                    take: 5,
                    orderBy: { submittedAt: 'desc' },
                },
                experiments: {
                    where: { status: 'completed' },
                    take: 5,
                },
                complianceTasks: {
                    where: { certificationStatus: { not: 'completed' } },
                    take: 5,
                },
                pilotApplications: {
                    where: { status: { in: ['applied', 'accepted', 'in_progress'] } },
                },
            },
        })

        if (!journey) {
            // Create default journey
            const newJourney = await prisma.studentJourney.create({
                data: {
                    userId: session.user.id,
                    sector: 'deeptech',
                    stage: 'idea',
                    trlLevel: 1,
                    metrics: {
                        experiments_completed: 0,
                        partners_engaged: 0,
                        funding_raised: 0,
                    },
                    milestones: [],
                },
            })
            return NextResponse.json(newJourney)
        }

        return NextResponse.json(journey)
    } catch (error) {
        console.error('Journey fetch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { sector, stage, trlLevel, metrics, blockers } = body

        const journey = await prisma.studentJourney.update({
            where: { userId: session.user.id },
            data: {
                ...(sector && { sector }),
                ...(stage && { stage }),
                ...(trlLevel && { trlLevel }),
                ...(metrics && { metrics }),
                ...(blockers && { blockers }),
            },
        })

        return NextResponse.json(journey)
    } catch (error) {
        console.error('Journey update error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
