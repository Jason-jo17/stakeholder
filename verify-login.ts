import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('DB URL (env):', process.env.DATABASE_URL)
    console.log('Connecting to database...')
    const email = 'dc.mnglr@gmail.com'
    const password = 'password'

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        console.log(`User ${email} NOT FOUND.`)
        // List all users to see if any exist
        const ct = await prisma.user.count()
        console.log(`Total users in DB: ${ct}`)
        return
    }

    console.log(`User found: ${user.name}, Role: ${user.role}, ID: ${user.id}`)

    if (!user.passwordHash) {
        console.log('User has NO password hash.')
    } else {
        const isValid = await compare(password, user.passwordHash)
        console.log(`Password '${password}' valid? ${isValid}`)
        console.log(`Stored Hash: ${user.passwordHash.substring(0, 20)}...`)
    }

    const stakeholderProfile = await prisma.stakeholderProfile.findUnique({
        where: { userId: user.id }
    })

    console.log(`Stakeholder Profile found? ${!!stakeholderProfile}`)
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
