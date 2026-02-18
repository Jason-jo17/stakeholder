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
      return NextResponse.json({ pilots: [] })
    }

    const pilots = await (prisma as any).pilotApplication.findMany({
      where: { journeyId: journey.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ pilots })
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
    const { partnerName, partnerType, title, description, duration } = body

    const pilot = await (prisma as any).pilotApplication.create({
      data: {
        journeyId: journey.id,
        partnerName,
        partnerType,
        title,
        description,
        duration: parseInt(duration),
        kpis: [], // Initialize empty KPIs
        status: 'applied'
      },
    })

    return NextResponse.json(pilot)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
