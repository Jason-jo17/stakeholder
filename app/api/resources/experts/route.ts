import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const availability = searchParams.get('availability')

    const where: any = {}
    if (availability) where.availability = availability

    const experts = await prisma.expert.findMany({
      where,
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json({ experts })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
