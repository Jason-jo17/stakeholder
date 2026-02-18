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

        const body = await req.json()
        const { evidenceId, trlLevel, evidenceText, evidenceType } = body

        // AI assessment
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert in Technology Readiness Levels (TRL 1-9). Assess if the provided evidence supports the claimed TRL level. Return JSON only: { "score": 0-100, "recommendations": ["rec1", "rec2", "rec3"] }`,
                },
                {
                    role: 'user',
                    content: `TRL Level: ${trlLevel}, Evidence Type: ${evidenceType}, Evidence: ${evidenceText}`,
                },
            ],
            response_format: { type: 'json_object' },
        })

        const assessment = JSON.parse(completion.choices[0].message.content || '{}')

        // Update evidence with AI score
        const updated = await prisma.tRLEvidence.update({
            where: { id: evidenceId },
            data: {
                aiScore: assessment.score,
                aiRecommendations: assessment.recommendations,
                status: assessment.score >= 70 ? 'approved' : 'under_review',
            },
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Assessment error:', error)
        // Fallback logic
        return NextResponse.json({ error: 'AI Service Unavailable', status: 500 })
    }
}
