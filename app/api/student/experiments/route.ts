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

    const journey = await (prisma as any).studentJourney.findUnique({
      where: { userId: session.user.id },
    })

    if (!journey) {
      return NextResponse.json({ experiments: [] })
    }

    const experiments = await (prisma as any).experiment.findMany({
      where: { journeyId: journey.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ experiments })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const journey = await (prisma as any).studentJourney.findUnique({
      where: { userId: session.user.id },
    })

    if (!journey) {
      return NextResponse.json({ error: 'Journey not found' }, { status: 404 })
    }

    const body = await req.json()
    const { title, type, hypothesis, methodology } = body

    const experiment = await (prisma as any).experiment.create({
      data: {
        journeyId: journey.id,
        title,
        type,
        hypothesis,
        methodology,
        successCriteria: [],
        metrics: {},
        status: 'planned'
      },
    })

    return NextResponse.json(experiment)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
