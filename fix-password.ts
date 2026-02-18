
console.log('Starting password reset...')
import * as dotenv from 'dotenv';
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Fallback to hardcoded string if env is missing
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/stakeholders_db?schema=public";

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: connectionString,
        },
    },
})

async function main() {
    const email = 'dc.mnglr@gmail.com'
    const newPassword = 'password'

    console.log(`Resetting password for ${email}...`)

    const hashedPassword = await hash(newPassword, 12)

    const user = await prisma.user.update({
        where: { email },
        data: {
            passwordHash: hashedPassword
        }
    })

    console.log(`Password updated for user: ${user.name} (${user.id})`)
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
