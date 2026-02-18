import 'dotenv/config'
import { prisma } from './lib/prisma'

console.log('--- ENV CHECK ---')
console.log('DATABASE_URL defined?', !!process.env.DATABASE_URL)
if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL length:', process.env.DATABASE_URL.length)
} else {
    console.error('CRITICAL: DATABASE_URL is missing!')
}
console.log('-----------------')

async function fixSolution() {
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

    console.log(`✅ Fixed! Solution linked to ${student.email} (ID: ${student.id})`)
}

fixSolution().catch(console.error)
