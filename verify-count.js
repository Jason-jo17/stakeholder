
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        const count = await prisma.stakeholderProfile.count()
        console.log(`Total Stakeholders: ${count}`)

        // Check for STK_250 specifically
        const user = await prisma.stakeholderProfile.findUnique({
            where: { id: 'STK_250' }
        })
        console.log('STK_250 Found:', !!user)
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
