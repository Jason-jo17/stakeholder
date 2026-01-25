import { prisma } from '../lib/prisma'

async function main() {
    console.log('Starting seed: Full 22-Tool Roadmap...')

    // 1. STAGES
    const stages = [
        { id: 'stage_1', stageNumber: 1, name: 'Founder-Problem Fit', weeks: [0, 1, 2], minimumScore: 50 },
        { id: 'stage_2', stageNumber: 2, name: 'Problem-Solution Fit', weeks: [3, 4], minimumScore: 60 },
        { id: 'stage_3', stageNumber: 3, name: 'Prototype & Validation', weeks: [5, 6, 7], minimumScore: 70 },
        { id: 'stage_4', stageNumber: 4, name: 'Fundraising for MVP', weeks: [8, 9], minimumScore: 80 },
    ]

    for (const stage of stages) {
        await prisma.roadmapStage.upsert({
            where: { stageNumber: stage.stageNumber },
            update: { name: stage.name, weeks: stage.weeks, minimumScore: stage.minimumScore },
            create: stage
        })
    }

    // 2. TOOLS
    const tools = [
        // STAGE 1
        { id: 't1_1', toolId: 'mtp_ikigai', name: 'MTP/Ikigai Canvas Builder', week: 0, stageId: 'stage_1', description: 'Build your personal/org MTP' },
        { id: 't1_2', toolId: 'mind_map_5w1h', name: 'Mind Mapping Tool (5W1H Framework)', week: 1, stageId: 'stage_1', description: 'Who, What, When, Where, Why, How problem analysis' },
        { id: 't1_3', toolId: 'empathy_map', name: 'Empathy Mapping Canvas', week: 1, stageId: 'stage_1', description: 'Understand customer experience' },
        { id: 't1_4', toolId: 'seven_whys', name: '7 Whys Root Cause Analysis', week: 1, stageId: 'stage_1', description: 'Deep dive into problem causes' },
        { id: 't1_5', toolId: 'fishbone_diagram', name: 'Fishbone Diagram Builder', week: 1, stageId: 'stage_1', description: 'Ishikawa cause-and-effect visualization' },
        { id: 't1_6', toolId: 'event_pattern', name: 'Event Pattern Template Tool', week: 1, stageId: 'stage_1', description: 'Identify recurring problem patterns' },
        { id: 't1_7', toolId: 'stakeholder_value', name: 'Stakeholder Pursued Value Matrix', week: 2, stageId: 'stage_1', description: 'Map value for each stakeholder' },
        { id: 't1_8', toolId: 'interview_framework', name: 'Interview Question Framework Builder', week: 2, stageId: 'stage_1', description: 'Design discovery interviews' },

        // STAGE 2
        { id: 't2_1', toolId: 'affinity_mapping', name: 'Affinity Mapping & Clustering', week: 3, stageId: 'stage_2', description: 'Group and prioritize findings' },
        { id: 't2_2', toolId: 'vpc', name: 'Value Proposition Canvas (VPC) Tool', week: 3, stageId: 'stage_2', description: 'Fit solution to customer pains/gains' },
        { id: 't2_3', toolId: 'errc_grid', name: 'ERRC Grid', week: 3, stageId: 'stage_2', description: 'Eliminate, Reduce, Raise, Create' },
        { id: 't2_4', toolId: 'user_persona', name: 'User Persona & Journey Map', week: 3, stageId: 'stage_2', description: 'Visualize the user experience' },
        { id: 't2_5', toolId: 'crazy_8s', name: 'Crazy 8s Rapid Ideation', week: 3, stageId: 'stage_2', description: 'Generate 8 ideas in 8 minutes' },
        { id: 't2_6', toolId: 'triz_scamper', name: 'TRIZ & SCAMPER Ideation', week: 3, stageId: 'stage_2', description: 'Creative problem solving frameworks' },
        { id: 't2_7', toolId: 'six_paths', name: 'Six Paths Framework', week: 4, stageId: 'stage_2', description: 'Blue Ocean Strategy analysis' },

        // STAGE 3
        { id: 't3_1', toolId: 'prototyping_hub', name: 'Multi-Tool Prototyping Hub', week: 5, stageId: 'stage_3', description: 'External tool integration (Figma, GitHub, etc)' },
        { id: 't3_2', toolId: 'feedback_recorder', name: 'Structured Feedback System', week: 7, stageId: 'stage_3', description: 'Capture user testing feedback' },

        // STAGE 4
        { id: 't4_1', toolId: 'tam_sam_som', name: 'TAM/SAM/SOM Calculator', week: 8, stageId: 'stage_4', description: 'Calculate your market size' },
        { id: 't4_2', toolId: 'bmc_builder', name: 'Business Model Canvas Builder', week: 8, stageId: 'stage_4', description: 'Map your entire business model' },
        { id: 't4_3', toolId: 'budget_planner', name: 'Fund Utilization & Budget Planner', week: 8, stageId: 'stage_4', description: 'Plan your startup financials' },
        { id: 't4_4', toolId: 'pitchdeck_builder', name: 'Pitchdeck Builder', week: 8, stageId: 'stage_4', description: 'Storytelling-based pitch creation' },
        { id: 't4_5', toolId: 'pitch_demo', name: 'Pitch Demo & Practice Tool', week: 9, stageId: 'stage_4', description: 'Rehearse your presentation' },
    ]

    for (const tool of tools) {
        await prisma.roadmapTool.upsert({
            where: { toolId: tool.toolId },
            update: {
                name: tool.name,
                week: tool.week,
                stageId: tool.stageId,
                description: tool.description,
                id: tool.id // Force use our internal ID
            },
            create: tool
        })
    }


    // 3. DEFAULT TASKS for 5W1H (To ensure nodes are ready)
    const tasks = [
        { id: 'task_mindmap_1', toolId: 't1_2', description: 'Identify the "Who" and "What" of the problem', deliverableType: 'mind_map', validationCriteria: ['At least 3 Who nodes', 'Clear What statement'] },
        { id: 'task_mindmap_2', toolId: 't1_2', description: 'Complete the 5W1H analysis', deliverableType: 'mind_map', validationCriteria: ['All 6 branches contain data', 'Connections show relationships'] },
    ]

    for (const task of tasks) {
        await prisma.roadmapTask.upsert({
            where: { id: task.id },
            update: { description: task.description, deliverableType: task.deliverableType, validationCriteria: task.validationCriteria },
            create: task
        })
    }

    console.log('Seed completed: 22 Tools initialized.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
