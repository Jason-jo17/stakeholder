import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const state = searchParams.get('state')
    const availability = searchParams.get('availability')

    const where: any = {}
    if (state) where.state = state
    if (availability) where.availability = availability

    const labs = await prisma.testingLab.findMany({
      where,
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ labs })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
