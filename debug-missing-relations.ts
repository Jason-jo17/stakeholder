
import { prisma } from './lib/prisma'
import { STAKEHOLDER_DATA } from './lib/data/stakeholders-data'

async function main() {
    // 1. Find stakeholders with 0 problems
    const empty = await prisma.stakeholderProfile.findMany({
        where: { problemStatements: { none: {} } },
        select: { id: true, problemStatements: true }
    })

    console.log(`Stakeholders with NO mapped problems: ${empty.length}`)
    if (empty.length > 0) {
        console.log(`Examples: ${empty.slice(0, 5).map(s => s.id).join(', ')}`)

        // Check what they SHOULD have
        const firstMissing = empty[0].id;
        const originalData = STAKEHOLDER_DATA.stakeholders.find(s => s.id === firstMissing);
        console.log(`Original data for ${firstMissing}:`, originalData?.problemStatements);

        // Check if those codes exist in DB
        if (originalData?.problemStatements) {
            for (const code of originalData.problemStatements) {
                const p = await prisma.problemStatement.findUnique({ where: { code } });
                console.log(`Problem Code ${code} exists in DB? ${!!p}`);
            }
        }
    }

    // 2. Count total Problem Statements
    const psCount = await prisma.problemStatement.count();
    console.log(`Total Problem Statements in DB: ${psCount}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
