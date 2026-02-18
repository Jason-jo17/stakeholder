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

        const problems = await prisma.problemStatement.findMany({
            where: { status: 'active' },
            select: {
                id: true,
                title: true,
                code: true
            },
            orderBy: { code: 'asc' }
        })

        return NextResponse.json(problems)
    } catch (error) {
        console.error('Problem statements fetch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
