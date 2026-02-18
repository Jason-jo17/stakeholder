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

    const journey = await (prisma as any).studentJourney.findUnique({
      where: { userId: session.user.id },
    })

    if (!journey) {
      return NextResponse.json({ error: 'Journey not found' }, { status: 404 })
    }

    const body = await req.json()
    const { trlLevel, requirements, evidenceText, evidenceLinks } = body

    // Create or update evidence for this TRL level
    // We store requirements status and evidence in the 'structure' JSON field
    // structure: { requirements: { [reqName]: true/false }, evidence: { text, links } }

    const evidenceData = {
        requirements,
        evidence: {
            text: evidenceText,
            links: evidenceLinks
        },
        submittedAt: new Date().toISOString()
    }

    // Check if an evidence record already exists for this level
    // If so, update it. If not, create it.
    // Note: Schema might allow multiple evidences per level or one. Assume detailed tracking.
    
    // Actually, TRLEvidence in schema:
    // model TRLEvidence { ... structure Json ... }
    
    const evidence = await (prisma as any).tRLEvidence.create({
      data: {
        journeyId: journey.id,
        trlLevel: parseInt(trlLevel),
        structure: evidenceData,
        status: 'submitted', // pending review
      },
    })
    
    // Update local journey TRL level if auto-progression is desired? 
    // For now, let's just save the evidence.
    // Ideally, if all requirements are met, we might bump the level, but that usually requires manual/admin approval.

    return NextResponse.json(evidence)
  } catch (error) {
    console.error('Error submitting evidence:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
