import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sector = searchParams.get('sector')
    const category = searchParams.get('category')
    const sandboxReady = searchParams.get('sandboxReady')

    const where: any = {}
    if (sector) where.sector = sector
    if (category) where.category = category
    if (sandboxReady) where.sandboxReady = sandboxReady === 'true'

    const apis = await prisma.sectorAPI.findMany({
      where,
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ apis })
  } catch (error) {
    console.error('API fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
