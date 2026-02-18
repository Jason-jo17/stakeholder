import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
        const { trlLevel, evidenceType, evidenceUrl, evidenceText } = body

        const evidence = await prisma.tRLEvidence.create({
            data: {
                journeyId: journey.id,
                trlLevel,
                evidenceType,
                evidenceUrl,
                evidenceText,
                status: 'submitted',
            },
        })

        return NextResponse.json(evidence)
    } catch (error) {
        console.error('Evidence creation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

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
            return NextResponse.json({ evidences: [] })
        }

        const evidences = await prisma.tRLEvidence.findMany({
            where: { journeyId: journey.id },
            orderBy: { submittedAt: 'desc' },
        })

        return NextResponse.json({ evidences })
    } catch (error) {
        console.error('Evidence fetch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
