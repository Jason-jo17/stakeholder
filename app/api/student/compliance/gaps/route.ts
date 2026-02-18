import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      include: { complianceTasks: true },
    })

    if (!journey) {
      return NextResponse.json({ error: 'Journey not found' }, { status: 404 })
    }

    // AI gap analysis
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a regulatory compliance expert. Identify missing compliance requirements for a startup. Return JSON only: { "gaps": [{ "title": "", "category": "", "riskLevel": "", "description": "", "regulatoryBody": "" }] }`,
        },
        {
          role: 'user',
          content: `Sector: ${journey.sector}, TRL Level: ${journey.trlLevel}, Existing compliance: ${JSON.stringify(journey.complianceTasks.map((t: any) => ({ category: t.category, title: t.title })))}`,
        },
      ],
      response_format: { type: 'json_object' },
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(result)
  } catch (error) {
    console.error('Compliance gap analysis error:', error)
    // Fallback logic
    return NextResponse.json({
      gaps: [
        { title: "Generic Safety Check", category: "safety", riskLevel: "medium", description: "Standard safety assessment required.", regulatoryBody: "General" }
      ]
    })
  }
}
