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
      return NextResponse.json({ tasks: [] })
    }

    const tasks = await prisma.complianceTask.findMany({
      where: { journeyId: journey.id },
      orderBy: { dueDate: 'asc' },
    })

    // Calculate risk distribution
    const riskCounts = {
      low: tasks.filter((t) => t.riskLevel === 'low').length,
      medium: tasks.filter((t) => t.riskLevel === 'medium').length,
      high: tasks.filter((t) => t.riskLevel === 'high').length,
      critical: tasks.filter((t) => t.riskLevel === 'critical').length,
    }

    return NextResponse.json({ tasks, riskCounts })
  } catch (error) {
    console.error('Compliance fetch error:', error)
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
    const { title, category, riskLevel, description, regulatoryBody, dueDate } = body

    const task = await prisma.complianceTask.create({
      data: {
        journeyId: journey.id,
        title,
        category,
        riskLevel,
        description,
        regulatoryBody,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Compliance task creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
