import { prisma } from './lib/prisma'

async function checkSpecificSolution() {
    const id = 'cmkem55kb000ahovgqlwbo2av'
    console.log(`Checking solution ${id}...\n`)

    const solution = await prisma.solution.findUnique({
        where: { id },
        include: {
            stakeholders: {
                include: {
                    user: true
                }
            }
        }
    })

    if (!solution) {
        console.log('❌ Solution not found in DB')
        return
    }

    console.log('✅ Solution details:')
    console.log('  Title:', solution.title)
    console.log('  ProposedBy:', solution.proposedBy)

    if (solution.proposedBy) {
        const proposer = await prisma.user.findUnique({
            where: { id: solution.proposedBy },
            include: {
                studentProfile: {
                    include: {
                        team: {
                            include: {
                                progress: true
                            }
                        }
                    }
                }
            }
        })
        console.log('  Proposer found:', !!proposer)
        if (proposer) {
            console.log('  Proposer Name:', proposer.name)
            console.log('  Has Student Profile:', !!proposer.studentProfile)
            console.log('  Has Team:', !!proposer.studentProfile?.team)
            if (proposer.studentProfile?.team) {
                console.log('  Team Name:', proposer.studentProfile.team.name)
                console.log('  TRL:', proposer.studentProfile.team.progress?.currentTRL)
            } else {
                console.log('❌ Student has no team assigned')
            }
        }
    } else {
        console.log('❌ No proposer assigned (proposedBy is null)')
    }

    await prisma.$disconnect()
}

checkSpecificSolution().catch(console.error)
