import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const selectedSector = searchParams.get('sector') || 'General'
        const selectedSolution = searchParams.get('solution') || 'Technology'

        const journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id },
        })

        if (!journey) {
            return NextResponse.json({ recommendations: [] })
        }

        // AI-powered recommendations
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert startup advisor for the Inunity Innovator program. 
                    Your goal is to provide exactly ONE actionable next step for EACH of these 7 categories:
                    1. trl (TRL Tracker)
                    2. roadmap (Strategic Roadmap)
                    3. compliance (Regulatory/Legal)
                    4. experiments (Validation/Sandbox)
                    5. resources (Labs/Experts/Network)
                    6. industry (Pilots/Partners)
                    7. api (Integration/API Directory)

                    Return JSON only with this structure: { "recommendations": [{ "title": "", "description": "", "priority": "high|medium|low", "category": "trl|roadmap|compliance|experiments|resources|industry|api" }] }`,
                },
                {
                    role: 'user',
                    content: `Context:
                    - Sector: ${selectedSector}
                    - Solution Approach: ${selectedSolution}
                    - Current TRL: ${journey.trlLevel}
                    - Stage: ${journey.stage}
                    - Compliance Score: ${journey.complianceScore}%
                    - Pilot Readiness: ${journey.pilotReadiness}%
                    
                    Provide specific, tailored advice for this ${selectedSector} project using a ${selectedSolution} approach.`,
                },
            ],
            response_format: { type: 'json_object' },
        })

        const result = JSON.parse(completion.choices[0].message.content || '{}')
        return NextResponse.json(result)
    } catch (error) {
        console.error('Recommendations error:', error)
        // Comprehensive Fallback
        return NextResponse.json({
            recommendations: [
                { category: "trl", title: "Verify Assumption", description: "Conduct one lab test to verify your core technical assumption.", priority: "high" },
                { category: "roadmap", title: "Milestone Sync", description: "Align your Q3 goals with current TRL progress.", priority: "medium" },
                { category: "compliance", title: "Regulatory Check", description: "Review sector-specific compliance requirements.", priority: "high" },
                { category: "experiments", title: "Sandbox Test", description: "Run a digital simulation for your current prototype.", priority: "low" },
                { category: "resources", title: "Resource Hunt", description: "Identify a Testing Lab with expertise in your sector.", priority: "medium" },
                { category: "industry", title: "Partner Outreach", description: "Identify 3 potential pilot partners in your region.", priority: "high" },
                { category: "api", title: "API Exploration", description: "Check the API Directory for relevant sector integrations.", priority: "low" }
            ]
        })
    }
}
