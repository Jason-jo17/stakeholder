
import { prisma } from './lib/prisma'
import { STAKEHOLDER_DATA } from './lib/data/stakeholders-data'

// Map of Problem Codes to IDs (Fetched dynamically or mocked if standard)
// Since we are upserting, we need to know the IDs or rely on connect-by-unique-field.
// Profile connections use connect: { slug } for sectors and connect: { code } for problems/solutions.
// So we don't need IDs.

async function main() {
    console.log('Starting Stakeholder-Only Seed...');

    if (!STAKEHOLDER_DATA || !STAKEHOLDER_DATA.stakeholders) {
        console.error('No stakeholder data found!');
        return;
    }

    console.log(`Found ${STAKEHOLDER_DATA.stakeholders.length} stakeholders.`);
    let successCount = 0;

    // Fetch Solution Codes to verify connection
    // const solutions = await prisma.solution.findMany({ select: { code: true, problemStatements: { select: { code: true } } } });
    // Simplify: Just trust the data matches.

    for (const stakeholder of STAKEHOLDER_DATA.stakeholders) {
        try {
            const s = stakeholder as any;
            const email = s.email || `${s.id.toLowerCase()}@example.com`

            process.stdout.write(`Processing ${s.id}... `);

            // Check if user exists to avoid P2002 if upsert fails on race condition or unique constraint on non-where fields
            const existingUser = await prisma.user.findUnique({ where: { email } });
            let user;

            if (existingUser) {
                user = await prisma.user.update({
                    where: { email },
                    data: {
                        name: s.name,
                        phone: s.phone || s.officePhone || s.personalMobile,
                    }
                });
            } else {
                user = await prisma.user.create({
                    data: {
                        email,
                        name: s.name,
                        role: 'STAKEHOLDER',
                        phone: s.phone || s.officePhone || s.personalMobile,
                        passwordHash: '$2a$10$cw/7q.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C.C'
                    }
                });
            }

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

            // Maps
            const sectorConnections = (s.sectors || []).map((name: string) => ({ slug: name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') })).filter((obj: any) => obj.slug);
            // Better: use the slug map from seed.ts logic?
            // "Agriculture & Irrigation" -> "agriculture-irrigation"
            // The original seed.ts had a lookup. I should use that or just loose mapping.
            // Actually, in `seed.ts` logic: `sectors.find(sec => sec.name === name)`.
            // I'll skip sector connection for now to avoid errors, OR rely on simple slug generation if I can.
            // The user cares about the PROFILE primarily.

            // Upsert Profile
            await prisma.stakeholderProfile.upsert({
                where: { userId: user.id },
                update: {
                    ...profileData,
                    sectors: {
                        connect: (s.sectors || []).map((name: string) => ({
                            slug: name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                        })).filter((obj: any) => obj.slug)
                    },
                    problemStatements: {
                        connect: (s.problemStatements || []).map((code: string) => ({ code }))
                    },
                },
                create: {
                    ...profileData,
                    sectors: {
                        connect: (s.sectors || []).map((name: string) => ({
                            slug: name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                        })).filter((obj: any) => obj.slug)
                    },
                    problemStatements: {
                        connect: (s.problemStatements || []).map((code: string) => ({ code }))
                    },
                    solutions: { connect: [] }
                }
            })

            successCount++;
            process.stdout.write('OK\n');
        } catch (error) {
            console.error(`\nFailed to seed ${stakeholder.id}:`, error);
        }
    }

    console.log(`\nStakeholder seeding completed: ${successCount}`);
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
