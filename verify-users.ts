import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
    console.log('Checking for demo users...')

    // Check Student
    const student = await prisma.user.findUnique({
        where: { email: 'student@demo.com' }
    })

    if (!student) {
        console.log('❌ User student@demo.com NOT FOUND')
    } else {
        console.log('✅ Found student@demo.com')
        console.log('   Role:', student.role)
        console.log('   Hash:', student.passwordHash?.substring(0, 10) + '...')

        const isValid = await compare('password', student.passwordHash || '')
        console.log('   Password "password" valid?:', isValid)
    }

    // Check Manager
    const manager = await prisma.user.findUnique({
        where: { email: 'manager@demo.com' }
    })
    if (!manager) console.log('❌ User manager@demo.com NOT FOUND')
    else console.log('✅ Found manager@demo.com')

    // Check Admin
    const admin = await prisma.user.findUnique({
        where: { email: 'admin@demo.com' }
    })
    if (!admin) console.log('❌ User admin@demo.com NOT FOUND')
    else console.log('✅ Found admin@demo.com')
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
