import 'dotenv/config'
import { prisma } from './lib/prisma'

async function verify() {
    console.log('--- START DIAGNOSTIC ---')
    const id = 'cmkem55kb000ahovgqlwbo2av'
    
    // 1. Check Solution
    const s = await prisma.solution.findFirst({
        where: {
            OR: [
                { id },
                { slug: 'climate-resilient-coffee' }
            ]
        }
    })
    
    if (!s) {
        console.log('❌ Solution NOT FOUND by ID or Slug')
        return
    }
    
    console.log(`✅ Found Solution: ${s.title}`)
    console.log(`   ID: ${s.id}`)
    console.log(`   Slug: ${s.slug}`)
    console.log(`   ProposedBy (ID): ${s.proposedBy}`)
    
    if (!s.proposedBy) {
        console.log('❌ Solution has NO proposedBy set!')
    } else {
        // 2. Check Proposer
        const u = await prisma.user.findUnique({
            where: { id: s.proposedBy },
            include: { studentProfile: { include: { team: { include: { progress: true } } } } }
        })
        
        if (!u) {
            console.log('❌ Proposer User ID exists in Solution but User record NOT FOUND')
        } else {
            console.log(`✅ Found Proposer: ${u.name} (${u.email})`)
            console.log(`   Role: ${u.role}`)
            
            if (!u.studentProfile) {
                console.log('❌ Proposer has NO StudentProfile')
            } else {
                console.log('✅ Has StudentProfile')
                if (!u.studentProfile.team) {
                     console.log('❌ StudentProfile has NO Team')
                } else {
                     console.log(`✅ Team: ${u.studentProfile.team.name}`)
                     console.log(`   Progress: ${JSON.stringify(u.studentProfile.team.progress)}`)
                }
            }
        }
    }
    console.log('--- END DIAGNOSTIC ---')
}

verify().catch(console.error)
