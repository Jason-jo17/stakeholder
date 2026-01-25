import "dotenv/config"
import { prisma } from './lib/prisma'

async function checkData() {
    try {
        const stages = await prisma.roadmapStage.findMany()
        const toolsCount = await prisma.roadmapTool.count()
        const tools = await prisma.roadmapTool.findMany({
            take: 5,
            select: { id: true, toolId: true, name: true }
        })

        console.log("--- DB CHECK ---")
        console.log(`Stages found: ${stages.length}`)
        console.log(`Total tools found: ${toolsCount}`)
        console.log("Sample tools:", JSON.stringify(tools, null, 2))
    } catch (e) {
        console.error("DB Check Failed:", e)
    } finally {
        process.exit()
    }
}

checkData()
