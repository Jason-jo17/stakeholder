
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { STAKEHOLDER_DATA } from '@/lib/data/stakeholders-data';

export async function GET() {
    console.log('Start seeding via API...');
    try {
        // 1. Seed Sectors
        const sectors = [
            {
                name: "Agriculture & Irrigation",
                slug: "agriculture-irrigation",
                description: "Crop production, water management, farmer welfare",
                icon: "🌾",
                color: "#10b981"
            },
            {
                name: "Healthcare Access",
                slug: "healthcare-access",
                description: "Medical services, tribal health, mental health",
                icon: "🏥",
                color: "#ef4444"
            },
            {
                name: "Education Infrastructure",
                slug: "education-infrastructure",
                description: "Schools, digital divide, skill development",
                icon: "📚",
                color: "#3b82f6"
            },
            {
                name: "Waste Management",
                slug: "waste-management",
                description: "Solid waste, sanitation, recycling",
                icon: "♻️",
                color: "#22c55e"
            },
            {
                name: "Water Resources",
                slug: "water-resources",
                description: "Drinking water, groundwater, conservation",
                icon: "💧",
                color: "#06b6d4"
            },
            {
                name: "Tourism Development",
                slug: "tourism-development",
                description: "Heritage, ecotourism, hospitality",
                icon: "🏖️",
                color: "#f59e0b"
            },
            {
                name: "Industrial Growth & MSMEs",
                slug: "industrial-growth-msmes",
                description: "Manufacturing, startups, industrial infrastructure",
                icon: "🏭",
                color: "#8b5cf6"
            },
            {
                name: "Coastal & Marine Issues",
                slug: "coastal-marine",
                description: "Fisheries, coastal erosion, marine conservation",
                icon: "🌊",
                color: "#0ea5e9"
            },
            {
                name: "Environmental Issues",
                slug: "environmental-issues",
                description: "Forest conservation, wildlife, climate change",
                icon: "🌳",
                color: "#14b8a6"
            },
            {
                name: "Rural Development",
                slug: "rural-development",
                description: "Infrastructure, livelihood, empowerment",
                icon: "🏘️",
                color: "#f97316"
            },
            {
                name: "Digital Infrastructure & Cybersecurity",
                slug: "digital-infrastructure",
                description: "Internet connectivity, digital literacy, cyber safety",
                icon: "💻",
                color: "#6366f1"
            },
            {
                name: "Social Welfare",
                slug: "social-welfare",
                description: "Women safety, elderly care, child nutrition",
                icon: "🤝",
                color: "#ec4899"
            }
        ];

        for (const sector of sectors) {
            await prisma.sector.upsert({
                where: { slug: sector.slug },
                update: {},
                create: sector,
            });
        }

        // 2. Seed Problems
        const problems = [
            {
                code: "PS_1.1",
                title: "Declining Coffee Yields Due to Climate Change",
                severity: "High",
                districts: ["Kodagu", "Chikkamagaluru", "Hassan"],
                domain: "Agriculture & Irrigation",
                description: "Coffee plantations experiencing 15-20% yield decline...",
                affectedPopulation: 40447,
                rootCauses: ["Climate change", "Erratic rainfall", "Pests"],
                sectors: { connect: { slug: "agriculture-irrigation" } }
            },
            {
                code: "PS_1.2",
                title: "Groundwater Depletion in Hard Rock Areas",
                severity: "Critical",
                districts: ["Mandya", "Chamarajanagar", "Mysuru"],
                domain: "Agriculture & Irrigation",
                description: "Over-extraction for sugarcane irrigation leading to 2-3 meter annual water table decline.",
                affectedPopulation: 500000,
                rootCauses: ["Excessive groundwater extraction", "Water-intensive crops"],
                sectors: { connect: { slug: "agriculture-irrigation" } }
            },
        ];

        for (const problem of problems) {
            await prisma.problemStatement.upsert({
                where: { code: problem.code },
                update: {},
                create: problem,
            });
        }

        // 3. Seed Stakeholders
        if (STAKEHOLDER_DATA && STAKEHOLDER_DATA.stakeholders) {
            let successCount = 0;
            let failCount = 0;
            for (const stakeholder of STAKEHOLDER_DATA.stakeholders) {
                try {
                    const s = stakeholder as any;
                    const email = s.email || `${s.id.toLowerCase()}@example.com`;

                    const user = await prisma.user.upsert({
                        where: { email },
                        update: {},
                        create: {
                            email,
                            name: s.name,
                            role: 'STAKEHOLDER', // Check if enum needs UserRole.STAKEHOLDER
                            phone: s.phone || s.officePhone || s.personalMobile,
                        }
                    });

                    const profileData: any = {
                        id: s.id,
                        userId: user.id,
                        designation: s.designation,
                        organization: s.organization,
                        organizationType: s.organizationType,
                        district: s.district,
                        address: s.address,
                        officePhone: s.phone,
                        officeEmail: s.email,
                        website: s.website,
                        verificationStatus: s.verificationStatus || 'pending',
                        expertise: s.expertise || [],
                        keyAchievements: s.keyAchievements || [],
                        keyResponsibilities: s.keyResponsibilities || [],
                        jurisdiction: s.jurisdiction || [],
                        farmingType: s.farmingType,
                        ngoRegistration: s.ngoRegistration,
                    };

                    await prisma.stakeholderProfile.upsert({
                        where: { userId: user.id },
                        update: profileData,
                        create: profileData,
                    });
                    successCount++;
                } catch (e) {
                    console.error('Failed for ' + stakeholder.id, e);
                    failCount++;
                }
            }
            return NextResponse.json({ success: true, seeded: successCount, failed: failCount });
        }

        return NextResponse.json({ success: true, message: 'Seeding finished (no stakeholders found?)' });

    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
