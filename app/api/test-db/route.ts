import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Test 1: Can we query Team table?
        const teams = await prisma.team.findMany({
            take: 5
        })
        
        // Test 2: Can we query RoadmapStage?
        const stages = await prisma.roadmapStage.findMany({
            take: 5
        })
        
        // Test 3: Can we query StudentProfile with teamId?
        const students = await prisma.studentProfile.findMany({
            take: 5,
            select: {
                id: true,
                userId: true,
                teamId: true
            }
        })
        
        return NextResponse.json({
            success: true,
            teams: teams.length,
            stages: stages.length,
            students: students.length,
            studentData: students,
            teamData: teams,
            stageData: stages
        })
    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message,
            code: error.code,
            meta: error.meta
        }, { status: 500 })
    }
}
