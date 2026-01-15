
import { prisma } from './lib/prisma'

async function main() {
    const problems = await prisma.problemStatement.findMany({
        select: { code: true }
    })
    console.log('Existing Problem Codes:', problems.map(p => p.code).sort().join(', '))
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
