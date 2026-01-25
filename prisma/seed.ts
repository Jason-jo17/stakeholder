import "dotenv/config"
import { prisma } from '../lib/prisma'
import { STAKEHOLDER_DATA } from '../lib/data/stakeholders-data'
import { hash } from 'bcryptjs'



// --- Problem Statement Definitions ---
// Derived from the codes found in stakeholders-data.ts
const PS_DEFINITIONS: Record<string, any> = {
    "PS_1.1": {
        title: "Declining Coffee Yields Due to Climate Change",
        description: "Coffee plantations in the Western Ghats are experiencing significant yield declines (15-20%) due to erratic rainfall and rising temperatures.",
        severity: "High",
        domain: "Agriculture & Irrigation",
        slug: "agriculture-irrigation"
    },
    "PS_1.2": {
        title: "Water Management in Paddy Cultivation",
        description: "Inefficient irrigation systems and lack of modernized water distribution leading to high wastage in paddy fields.",
        severity: "Medium",
        domain: "Agriculture & Irrigation",
        slug: "agriculture-irrigation"
    },
    "PS_1.3": {
        title: "Farmer Market Access & Price Volatility",
        description: "Small-scale farmers struggle with unpredictable market prices and lack of direct access to institutional buyers.",
        severity: "High",
        domain: "Agriculture & Irrigation",
        slug: "agriculture-irrigation"
    },
    "PS_1.4": {
        title: "Arecanut Disease Management",
        description: "Widespread 'yellow leaf disease' and 'fruit rot' in arecanut plantations causing massive economic loss in coastal regions.",
        severity: "Critical",
        domain: "Agriculture & Irrigation",
        slug: "agriculture-irrigation"
    },
    "PS_2.1": {
        title: "Tribal Healthcare Accessibility",
        description: "Remote tribal hamlets in Kodagu and Mysuru lack basic primary healthcare facilities and emergency transport.",
        severity: "Critical",
        domain: "Healthcare Access",
        slug: "healthcare-access"
    },
    "PS_2.2": {
        title: "Maternal & Child Nutrition Gaps",
        description: "High prevalence of anemia and malnutrition among women and children in specific rural blocks.",
        severity: "High",
        domain: "Healthcare Access",
        slug: "healthcare-access"
    },
    "PS_3.1": {
        title: "Digital Divide in Rural Secondary Schools",
        description: "Lack of computer labs and stable internet connectivity in government schools hindering digital literacy.",
        severity: "Medium-High",
        domain: "Education Infrastructure",
        slug: "education-infrastructure"
    },
    "PS_4.1": {
        title: "Rural Sanitation & Solid Waste Systems",
        description: "Ineffective waste collection and processing in Gram Panchayats leading to environmental pollution.",
        severity: "Medium",
        domain: "Rural Development",
        slug: "rural-development"
    },
    "PS_5.1": {
        title: "Drinking Water Quality in Coastal Belt",
        description: "Saltwater intrusion and high fluoride levels in groundwater across coastal villages.",
        severity: "High",
        domain: "Water Resources",
        slug: "water-resources"
    },
    "PS_7.1": {
        title: "MSME Skill Gap in Manufacturing",
        description: "Local industries face a shortage of skilled labor trained in modern CNC and automation technologies.",
        severity: "Medium-High",
        domain: "Industrial Growth & MSMEs",
        slug: "industrial-growth-msmes"
    },
    "PS_10.1": {
        title: "Rural Livelihood Diversification",
        description: "Over-dependence on seasonal agriculture leading to economic instability during off-seasons.",
        severity: "Medium-High",
        domain: "Rural Development",
        slug: "rural-development"
    },
    "PS_12.1": {
        title: "Forest Conservation & Human-Wildlife Conflict",
        description: "Rising instances of elephant-human conflict leading to crop loss and fatalities in buffer zones.",
        severity: "High",
        domain: "Environmental Issues",
        slug: "environmental-issues"
    }
};

async function main() {
    console.log('Start seeding...')

    // 0. Seed Demo Users
    const passwordHash = await hash('password', 10)

    const demoUsers = [
        { email: 'student@demo.com', name: 'Demo Student', role: 'STUDENT', phone: '1234567890' },
        { email: 'manager@demo.com', name: 'Demo Manager', role: 'MANAGER', phone: '0987654321' },
        { email: 'admin@demo.com', name: 'Demo Admin', role: 'ADMIN', phone: '1122334455' }
    ]

    for (const u of demoUsers) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {
                role: u.role as any,
                passwordHash
            },
            create: {
                email: u.email,
                name: u.name,
                role: u.role as any,
                phone: u.phone,
                passwordHash
            }
        })
    }
    console.log('Demo users seeded (password: password)')

    // 1. Seed Sectors
    const sectors = [
        { name: "Agriculture & Irrigation", slug: "agriculture-irrigation", icon: "🌾", color: "#10b981", description: "Crop production, water management" },
        { name: "Healthcare Access", slug: "healthcare-access", icon: "🏥", color: "#ef4444", description: "Medical services, tribal health" },
        { name: "Education Infrastructure", slug: "education-infrastructure", icon: "📚", color: "#3b82f6", description: "Schools, digital divide" },
        { name: "Waste Management", slug: "waste-management", icon: "♻️", color: "#22c55e", description: "Solid waste, recycling" },
        { name: "Water Resources", slug: "water-resources", icon: "💧", color: "#06b6d4", description: "Drinking water, conservation" },
        { name: "Tourism Development", slug: "tourism-development", icon: "🏖️", color: "#f59e0b", description: "Heritage, ecotourism" },
        { name: "Industrial Growth & MSMEs", slug: "industrial-growth-msmes", icon: "🏭", color: "#8b5cf6", description: "Manufacturing, startups" },
        { name: "Coastal & Marine Issues", slug: "coastal-marine", icon: "🌊", color: "#0ea5e9", description: "Fisheries, erosion" },
        { name: "Environmental Issues", slug: "environmental-issues", icon: "🌳", color: "#14b8a6", description: "Forest, climate change" },
        { name: "Rural Development", slug: "rural-development", icon: "🏘️", color: "#f97316", description: "Infrastructure, livelihood" },
        { name: "Digital Infrastructure & Cybersecurity", slug: "digital-infrastructure", icon: "💻", color: "#6366f1", description: "Connectivity, literacy" },
        { name: "Social Welfare", slug: "social-welfare", icon: "🤝", color: "#ec4899", description: "Women, elderly, child" }
    ]

    for (const sector of sectors) {
        await prisma.sector.upsert({
            where: { slug: sector.slug },
            update: {},
            create: sector,
        })
    }
    console.log('Sectors seeded.');

    // 2. Seed Problem Statements
    const psMap: Record<string, string> = {};
    for (const [code, data] of Object.entries(PS_DEFINITIONS)) {
        const ps = await prisma.problemStatement.upsert({
            where: { code },
            update: {
                title: data.title,
                description: data.description,
                severity: data.severity,
                domain: data.domain,
                sectors: {
                    connect: { slug: data.slug }
                }
            },
            create: {
                code,
                title: data.title,
                description: data.description,
                severity: data.severity,
                domain: data.domain,
                status: "active",
                sectors: {
                    connect: { slug: data.slug }
                }
            }
        });
        psMap[code] = ps.id;
    }
    console.log('Problem Statements seeded.');

    // 2.5 Seed Solutions for each Problem Statement
    const solutions = [
        {
            code: "SOL_1.1.A",
            title: "Climate-Resilient Coffee Cultivation",
            description: "Implementing shade-grown coffee practices and drought-resistant varieties to combat rising temperatures.",
            type: "Agricultural Innovation",
            status: "active",
            problemCode: "PS_1.1"
        },
        {
            code: "SOL_1.4.A",
            title: "Integrated Arecanut Pest Management",
            description: "Community-led spray programs and resistant seedling distribution to manage yellow leaf disease.",
            type: "Process Improvement",
            status: "active",
            problemCode: "PS_1.4"
        },
        {
            code: "SOL_2.1.A",
            title: "Mobile Tribal Health Clinics",
            description: "Equipping 4x4 vehicles with basic diagnostics and telemedicine to reach remote hamlets.",
            type: "Infrastructure",
            status: "proposed",
            problemCode: "PS_2.1"
        },
        {
            code: "SOL_3.1.A",
            title: "Solar-Powered Digital Classrooms",
            description: "Installing off-grid solar kits and pre-loaded educational servers in rural schools.",
            type: "Technology",
            status: "pipeline",
            problemCode: "PS_3.1"
        }
    ];

    for (const sol of solutions) {
        await prisma.solution.upsert({
            where: { code: sol.code },
            update: {},
            create: {
                code: sol.code,
                title: sol.title,
                description: sol.description,
                type: sol.type,
                status: sol.status,
                problemStatements: {
                    connect: { code: sol.problemCode }
                }
            }
        });
    }
    console.log('Solutions seeded.');

    // 3. Seed Real Stakeholders from data file
    console.log('DEBUG: STAKEHOLDER_DATA exists?', !!STAKEHOLDER_DATA);
    console.log('DEBUG: stakeholders length?', STAKEHOLDER_DATA?.stakeholders?.length);

    if (STAKEHOLDER_DATA && STAKEHOLDER_DATA.stakeholders) {
        console.log(`Seeding ${STAKEHOLDER_DATA.stakeholders.length} real stakeholders...`)
        let successCount = 0;
        for (const stakeholder of STAKEHOLDER_DATA.stakeholders) {
            try {
                const s = stakeholder as any;
                const email = s.email || `${s.id.toLowerCase()}@example.com`

                // Upsert User
                const user = await prisma.user.upsert({
                    where: { email },
                    update: {
                        name: s.name,
                        phone: s.phone || s.officePhone || s.personalMobile,
                    },
                    create: {
                        email,
                        name: s.name,
                        role: 'STAKEHOLDER',
                        phone: s.phone || s.officePhone || s.personalMobile,
                    }
                })

                // Prepare Profile Data
                const profileData: any = {
                    id: s.id,
                    userId: user.id,
                    designation: s.designation,
                    organization: s.organization,
                    organizationType: s.organizationType,
                    district: s.district,
                    taluk: s.taluk,
                    village: s.village,
                    address: s.address,
                    officePhone: s.phone,
                    officeEmail: s.email,
                    website: s.website,
                    bio: s.bio,
                    verificationStatus: s.verificationStatus || 'pending',
                    expertise: s.expertise || [],
                    keyAchievements: s.keyAchievements || [],
                    keyResponsibilities: s.keyResponsibilities || [],
                    jurisdiction: s.jurisdiction || [],
                    farmingType: s.farmingType,
                    ngoRegistration: s.ngoRegistration,
                    populationServed: s.populationServed,
                    teamSize: s.teamSize,
                    cadre: s.cadre,
                }

                // Link to Sectors, Problem Statements, and Solutions
                const sectorConnections = (s.sectors || []).map((name: string) => {
                    const found = sectors.find(sec => sec.name === name);
                    return found ? { slug: found.slug } : null;
                }).filter(Boolean);

                const psConnections = (s.problemStatements || []).map((code: string) => {
                    return PS_DEFINITIONS[code] ? { code } : null;
                }).filter(Boolean);

                const solConnections = (s.problemStatements || []).map((pCode: string) => {
                    const sol = solutions.find(sol => sol.problemCode === pCode);
                    return sol ? { code: sol.code } : null;
                }).filter(Boolean);

                // Upsert Profile
                await prisma.stakeholderProfile.upsert({
                    where: { userId: user.id },
                    update: {
                        ...profileData,
                        sectors: {
                            set: [], // Clear existing
                            connect: sectorConnections
                        },
                        problemStatements: {
                            set: [], // Clear existing
                            connect: psConnections
                        },
                        solutions: {
                            set: [],
                            connect: solConnections
                        }
                    },
                    create: {
                        ...profileData,
                        sectors: {
                            connect: sectorConnections
                        },
                        problemStatements: {
                            connect: psConnections
                        },
                        solutions: {
                            connect: solConnections
                        }
                    },
                })
                successCount++;
            } catch (error) {
                console.error(`Failed to seed real stakeholder ${stakeholder.id}:`, error)
            }
        }
        console.log(`Real stakeholder seeding completed: ${successCount}`)
    }

    // --- Full Roadmap Seeding ---
    console.log('Seeding Full 22-Tool Roadmap...')

    // 1. STAGES
    const roadmapStages = [
        { id: 'stage_1', stageNumber: 1, name: 'Founder-Problem Fit', weeks: [0, 1, 2], minimumScore: 50 },
        { id: 'stage_2', stageNumber: 2, name: 'Problem-Solution Fit', weeks: [3, 4], minimumScore: 60 },
        { id: 'stage_3', stageNumber: 3, name: 'Prototype & Validation', weeks: [5, 6, 7], minimumScore: 70 },
        { id: 'stage_4', stageNumber: 4, name: 'Fundraising for MVP', weeks: [8, 9], minimumScore: 80 },
    ]

    for (const stage of roadmapStages) {
        await prisma.roadmapStage.upsert({
            where: { stageNumber: stage.stageNumber },
            update: { name: stage.name, weeks: stage.weeks, minimumScore: stage.minimumScore },
            create: stage
        })
    }

    // 2. TOOLS
    const roadmapTools = [
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
        { id: 't2_2', toolId: 'vpc_tool', name: 'Value Proposition Canvas (VPC) Tool', week: 3, stageId: 'stage_2', description: 'Fit solution to customer pains/gains' },
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

    for (const tool of roadmapTools) {
        await prisma.roadmapTool.upsert({
            where: { toolId: tool.toolId },
            update: {
                name: tool.name,
                week: tool.week,
                stageId: tool.stageId,
                description: tool.description,
                id: tool.id
            },
            create: tool
        })
    }

    // 3. DEFAULT TASKS for 5W1H
    const roadmapTasks = [
        { id: 'task_mindmap_1', toolId: 't1_2', description: 'Identify the "Who" and "What" of the problem', deliverableType: 'mind_map', validationCriteria: ['At least 3 Who nodes', 'Clear What statement'] },
        { id: 'task_mindmap_2', toolId: 't1_2', description: 'Complete the 5W1H analysis', deliverableType: 'mind_map', validationCriteria: ['All 6 branches contain data', 'Connections show relationships'] },
    ]

    for (const task of roadmapTasks) {
        await prisma.roadmapTask.upsert({
            where: { id: task.id },
            update: { description: task.description, deliverableType: task.deliverableType, validationCriteria: task.validationCriteria },
            create: task
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
