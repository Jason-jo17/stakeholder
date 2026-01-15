import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    // Check auth - allowing public access for demo, or require session
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    try {
        const {
            query,
            sectors,
            districts,
            verificationStatus,
            experienceRange,
            page = 1,
            limit = 20
        } = await req.json()

        // Build Prisma where clause
        const where: any = {
            AND: [
                // Text search across multiple fields
                query ? {
                    OR: [
                        { user: { name: { contains: query, mode: 'insensitive' } } },
                        { organization: { contains: query, mode: 'insensitive' } },
                        { designation: { contains: query, mode: 'insensitive' } },
                        { bio: { contains: query, mode: 'insensitive' } },
                        { expertise: { hasSome: [query] } },
                        { tags: { hasSome: [query] } }
                    ]
                } : {},

                // Sector filter
                sectors?.length > 0 ? {
                    sectors: { some: { id: { in: sectors } } }
                } : {},

                // District filter
                districts?.length > 0 ? {
                    district: { in: districts }
                } : {},

                // Verification status
                verificationStatus && verificationStatus !== 'all' ? {
                    verificationStatus: verificationStatus
                } : {},

                // Years of experience range
                experienceRange ? {
                    yearsExperience: {
                        gte: experienceRange[0],
                        lte: experienceRange[1] === 50 ? undefined : experienceRange[1]
                    }
                } : {}
            ]
        }

        // Execute query with pagination
        // Note: If prisma client is not generated, this might fail at build time unless we mock or fix it.
        // For now we assume prisma client will be generated successfully.

        const [stakeholders, total] = await Promise.all([
            prisma.stakeholderProfile.findMany({
                where,
                include: {
                    user: true,
                    sectors: true,
                    problemStatements: true,
                    _count: {
                        select: {
                            interactions: true,
                            linkedStakeholders: true
                        }
                    }
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    // lastContacted: 'desc' // Handle nulls if necessary or default
                    createdAt: 'desc'
                }
            }),
            prisma.stakeholderProfile.count({ where })
        ])

        return NextResponse.json({
            stakeholders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error("Search error:", error)
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
