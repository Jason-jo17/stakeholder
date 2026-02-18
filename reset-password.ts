import * as dotenv from 'dotenv';
import { hash } from 'bcryptjs'

dotenv.config();

// Hack to ensure DATABASE_URL is set for the imported prisma client
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "postgresql://postgres:password@localhost:5432/stakeholders_db?schema=public";
}

async function main() {
    // Dynamic import to avoid hoisting issues
    const { prisma } = await import('./lib/prisma');

    const password = 'password'
    const passwordHash = await hash(password, 10)

    // STK_001 email and a fallback
    const emails = ['dc.mnglr@gmail.com', 'st_1@example.com']

    for (const email of emails) {
        try {
            await prisma.user.upsert({
                where: { email },
                update: {
                    passwordHash,
                    role: 'STAKEHOLDER' // Ensure they are stakeholders
                },
                create: {
                    email,
                    name: 'Test Stakeholder',
                    role: 'STAKEHOLDER',
                    passwordHash
                }
            })
            console.log(`Updated ${email} with password: ${password}`)
        } catch (e) {
            console.error(`Error updating ${email}:`, e)
        }
    }
}

console.log('Password reset complete.')
await prisma.$disconnect()
}

main()
    .catch(async (e) => {
        console.error(e)
        const { prisma } = await import('./lib/prisma');
        await prisma.$disconnect()
        process.exit(1)
    })
