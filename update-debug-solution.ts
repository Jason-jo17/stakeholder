import 'dotenv/config'
import { prisma } from './lib/prisma'

async function updateSpecificSolution() {
    const id = 'cmkem55kb000ahovgqlwbo2av' // Climate-Resilient Coffee Cultivation

    // Find a student
    const student = await prisma.user.findFirst({
        where: { role: 'STUDENT' },
        include: { studentProfile: { include: { team: { include: { progress: true } } } } }
    })

    if (!student) {
        console.log('❌ No student found')
        return
    }

    console.log(`Using student: ${student.name} (${student.id})`)

    // Update solution
    const updated = await prisma.solution.update({
        where: { id },
        data: {
            proposedBy: student.id,
            slug: 'climate-resilient-coffee'
        }
    })

    console.log(`✅ Updated solution ${updated.title} with proposer ${student.id} and slug ${updated.slug}`)
}

updateSpecificSolution().catch(console.error)
