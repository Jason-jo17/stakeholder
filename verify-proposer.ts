import { prisma } from './lib/prisma'

async function verifyProposer() {
    console.log('Checking solution proposer data...\n')
    
    // Find the Climate solution
    const solution = await prisma.solution.findFirst({
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

    if (!solution) {
        console.log('❌ Solution not found')
        return
    }

    console.log('✅ Solution found:')
    console.log('  ID:', solution.id)
    console.log('  Title:', solution.title)
    console.log('  Code:', solution.code)
    console.log('  ProposedBy:', solution.proposedBy || '❌ NOT SET')

    if (solution.proposedBy) {
        console.log('\nFetching proposer details...')
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

        if (proposer) {
            console.log('✅ Proposer found:')
            console.log('  Name:', proposer.name)
            console.log('  Email:', proposer.email)
            console.log('  Has Student Profile:', !!proposer.studentProfile)
            console.log('  Has Team:', !!proposer.studentProfile?.team)
            console.log('  Has Progress:', !!proposer.studentProfile?.team?.progress)
            
            if (proposer.studentProfile?.team?.progress) {
                const progress = proposer.studentProfile.team.progress
                console.log('\n  Progress Details:')
                console.log('    TRL Level:', progress.currentTRL)
                console.log('    Current Stage:', progress.currentStage)
                console.log('    Overall Progress:', progress.overallProgress + '%')
            }
        } else {
            console.log('❌ Proposer user not found in database')
        }
    }

    await prisma.$disconnect()
}

verifyProposer().catch(console.error)
