import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// Manually load .env
const envPath = path.resolve(process.cwd(), '.env')
let databaseUrl = ''

try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const match = envContent.match(/DATABASE_URL="?([^"\n\r]+)"?/)
    if (match) {
        databaseUrl = match[1]
        console.log('✅ Loaded DATABASE_URL from .env')
    } else {
        console.error('❌ DATABASE_URL not found in .env')
        process.exit(1)
    }
} catch (e) {
    console.error('❌ Could not read .env file', e)
    process.exit(1)
}

// Simplify: Do not use adapter for this fix script
console.log('Initializing standard PrismaClient...')
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl
        }
    }
})

async function fix() {
    console.log('--- STARTING FIX ---')
    const id = 'cmkem55kb000ahovgqlwbo2av' // Target Solution ID

    // 1. Find or Create Student
    let student = await prisma.user.findFirst({
        where: { email: 'student@example.com' }
    })

    if (!student) {
        console.log('Creating new student user...')
        student = await prisma.user.create({
            data: {
                email: 'student@example.com',
                name: 'Priya Sharma',
                role: 'STUDENT',
                studentProfile: {
                    create: {
                        institution: 'University of Agricultural Sciences',
                        team: {
                            create: {
                                name: 'AgriTech Innovators',
                                progress: {
                                    create: {
                                        currentTRL: 4,
                                        currentStage: 'validation',
                                        overallProgress: 65
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    } else {
        console.log('Found existing student:', student.id)
        // Ensure profile exists
        const profile = await prisma.studentProfile.findUnique({ where: { userId: student.id } })
        if (!profile) {
            console.log('Creating profile for existing student...')
            await prisma.studentProfile.create({
                data: {
                    userId: student.id,
                    institution: 'University of Agricultural Sciences',
                    team: {
                        create: {
                            name: 'AgriTech Innovators',
                            progress: {
                                create: {
                                    currentTRL: 4,
                                    currentStage: 'validation',
                                    overallProgress: 65
                                }
                            }
                        }
                    }
                }
            })
        }
    }

    // 2. Update Solution
    console.log(`Updating solution ${id} with proposer ${student.id} and slug...`)
    const updated = await prisma.solution.update({
        where: { id },
        data: {
            proposedBy: student.id,
            slug: 'climate-resilient-coffee'
        }
    })

    console.log(`✅ SUCCESS! Solution linked to ${student.email} (ID: ${student.id})`)
}

fix()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
