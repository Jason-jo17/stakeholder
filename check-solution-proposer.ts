import { prisma } from './lib/prisma'

async function checkSolution() {
    // Get the solution from the screenshot - looks like it's "Climate-Resilient Coffee Cultivation"
    const solutions = await prisma.solution.findMany({
        where: {
            title: {
                contains: 'Climate'
            }
        },
        include: {
            stakeholders: {
                include: {
                    user: true
                }
            }
        }
    })

    console.log('Found solutions:', solutions.length)
    solutions.forEach(sol => {
        console.log('\n---')
        console.log('ID:', sol.id)
        console.log('Title:', sol.title)
        console.log('Code:', sol.code)
        console.log('ProposedBy:', sol.proposedBy)
        console.log('Stakeholders:', sol.stakeholders.length)
    })

    // Get a student user to set as proposer
    const students = await prisma.user.findMany({
        where: {
            role: 'STUDENT'
        },
        include: {
            studentProfile: {
                include: {
                    team: true
                }
            }
        },
        take: 5
    })

    console.log('\n\nFound students:', students.length)
    students.forEach(student => {
        console.log('\n---')
        console.log('ID:', student.id)
        console.log('Name:', student.name)
        console.log('Email:', student.email)
        console.log('Has Team:', !!student.studentProfile?.team)
    })

    await prisma.$disconnect()
}

checkSolution().catch(console.error)
