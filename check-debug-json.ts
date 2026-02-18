import { prisma } from './lib/prisma'
import fs from 'fs'

async function checkSpecificSolution() {
    const id = 'cmkem55kb000ahovgqlwbo2av'
    const result: any = {}
    
    try {
        const solution = await prisma.solution.findUnique({
            where: { id },
            include: { stakeholders: true }
        })

        if (!solution) {
            result.error = 'Solution not found'
        } else {
            result.solution = { id: solution.id, title: solution.title, proposedBy: solution.proposedBy }
            
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
                
                result.proposer = {
                    id: proposer?.id,
                    name: proposer?.name,
                    hasProfile: !!proposer?.studentProfile,
                    hasTeam: !!proposer?.studentProfile?.team,
                    teamName: proposer?.studentProfile?.team?.name,
                    progress: proposer?.studentProfile?.team?.progress
                }
            }
        }
    } catch (e: any) {
        result.error = e.message
    }
    
    fs.writeFileSync('debug-output.json', JSON.stringify(result, null, 2))
    console.log('Done writing debug-output.json')
    await prisma.$disconnect()
}

checkSpecificSolution()
