import { prisma } from './lib/prisma'

async function check() {
    console.log('Checking for slug...')
    const s = await prisma.solution.findUnique({
        where: { slug: 'climate-resilient-coffee' }
    })
    if (s) {
        console.log('✅ Found solution by slug:', s.title)
    } else {
        console.log('❌ Slug not found')
        // Check by ID
        const id = 'cmkem55kb000ahovgqlwbo2av'
        const s2 = await prisma.solution.findUnique({ where: { id } })
        console.log('Solution by ID has slug:', s2?.slug)
    }
}
check()
