
import { prisma } from './lib/prisma'

async function main() {
    const count = await prisma.stakeholderProfile.count({
        where: {
            problemStatements: {
                some: {}
            }
        }
    })
    console.log(`Stakeholders with mapped problems: ${count}`)

    const total = await prisma.stakeholderProfile.count();
    console.log(`Total stakeholders: ${total}`)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
