
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
    const count = await prisma.stakeholderProfile.count()
    console.log(`Total Stakeholders in DB: ${count}`)

    const stk250 = await prisma.stakeholderProfile.findUnique({
        where: { id: 'STK_250' },
        include: { user: true }
    })

    if (stk250) {
        console.log('STK_250 found:', stk250.user.name)
    } else {
        console.log('STK_250 NOT found')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
