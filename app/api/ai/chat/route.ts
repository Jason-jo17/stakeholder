import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { openai } from '@/lib/ai/openai'
import { pinecone } from '@/lib/ai/pinecone'

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    try {
        const { stakeholderId, messages } = await req.json()

        // Get stakeholder context
        const stakeholder = await prisma.stakeholderProfile.findUnique({
            where: { id: stakeholderId },
            include: {
                user: true,
                sectors: true,
                problemStatements: true,
                interactions: {
                    take: 50,
                    orderBy: { occurredAt: 'desc' },
                    include: { initiator: true }
                }
            }
        })

        if (!stakeholder) {
            return NextResponse.json({ error: 'Stakeholder not found' }, { status: 404 })
        }

        // Generate embedding for user's question
        const lastUserMessage = messages[messages.length - 1].content

        // MOCK RAG Context for demo without API keys
        const context = [
            { type: "Interaction", date: "2024-01-10", text: "Discussed agri-tech solutions for local farmers." },
            { type: "Bio", date: "N/A", text: stakeholder.bio || "No bio available." }
        ]

        // Build system prompt
        const systemPrompt = `You are an AI assistant helping to analyze stakeholder information for ${stakeholder.user.name}, who is a ${stakeholder.designation} at ${stakeholder.organization}.
    
    STAKEHOLDER PROFILE:
    - Sectors: ${stakeholder.sectors.map((s: any) => s.name).join(', ')}
    - Problem Statements: ${stakeholder.problemStatements.map((ps: any) => ps.title).join('; ')}
    
    RELEVANT CONTEXT:
    ${context.map((c, i) => `[${i + 1}] ${c.type}: ${c.text}`).join('\n')}
    
    Answer the user's question based on this context.`

        // MOCK Response
        const response = `Based on my analysis of ${stakeholder.user.name}'s profile, they are heavily involved in ${stakeholder.sectors.map((s: any) => s.name).join(' and ')}. 
    
    Regarding your question "${lastUserMessage}", the recent interactions suggest they are open to new solutions.`

        return NextResponse.json({
            response,
            sources: context.map((c, i) => ({
                id: i + 1,
                title: `${c.type} - ${c.date}`,
                excerpt: (c.text as string).substring(0, 50) + '...',
                sourceId: 'mock-source'
            }))
        })
    } catch (error) {
        console.error('AI chat error:', error)
        return NextResponse.json({ error: 'AI Error', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
    }
}
