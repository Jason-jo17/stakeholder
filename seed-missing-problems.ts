
import { prisma } from './lib/prisma'
import { STAKEHOLDER_DATA } from './lib/data/stakeholders-data'

async function main() {
    console.log('Checking for missing Problem Statements...');

    // 1. Collect all unique codes from data
    const usedCodes = new Set<string>();
    STAKEHOLDER_DATA.stakeholders.forEach((s: any) => {
        if (s.problemStatements) {
            s.problemStatements.forEach((code: string) => usedCodes.add(code));
        }
    });

    console.log(`Found ${usedCodes.size} unique problem codes in data.`);

    // 2. Upsert them all (if not exists, create placeholder)
    for (const code of Array.from(usedCodes)) {
        const exists = await prisma.problemStatement.findUnique({ where: { code } });
        if (!exists) {
            console.log(`Creating missing problem: ${code}`);
            await prisma.problemStatement.create({
                data: {
                    code,
                    title: `Problem ${code}`,
                    description: `Placeholder description for ${code}. This problem was referenced by a stakeholder but not defined in the seed data.`,
                    severity: "Medium",
                    domain: "General",
                    status: "active"
                }
            })
        }
    }
    console.log('All missing problems seeded.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
