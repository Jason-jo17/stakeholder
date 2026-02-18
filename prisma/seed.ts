import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Read the seed data JSON file
    const seedDataPath = path.join(process.cwd(), 'prisma', 'seed-data.json')

    if (!fs.existsSync(seedDataPath)) {
        console.warn("⚠️ seed-data.json not found. Skipping data seeding.")
        return
    }

    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

    // Seed Testing Labs
    console.log('📍 Seeding Testing Labs...')
    if (seedData.testingLabs) {
        for (const lab of seedData.testingLabs) {
            await prisma.testingLab.upsert({
                where: { id: lab.name.replace(/\s+/g, '-').toLowerCase() },
                update: lab,
                create: { ...lab, id: lab.name.replace(/\s+/g, '-').toLowerCase() },
        })
      }
      console.log(`✅ Seeded ${seedData.testingLabs.length} testing labs`)
  }

    // Seed Makerspaces
    console.log('🔧 Seeding Makerspaces...')
    if (seedData.makerspaces) {
        for (const space of seedData.makerspaces) {
            await prisma.makerspace.upsert({
                where: { id: space.name.replace(/\s+/g, '-').toLowerCase() },
                update: space,
                create: { ...space, id: space.name.replace(/\s+/g, '-').toLowerCase() },
            })
        }
      console.log(`✅ Seeded ${seedData.makerspaces.length} makerspaces`)
  }

    // Seed Funding Opportunities
    console.log('💰 Seeding Funding Opportunities...')
    if (seedData.fundingOpportunities) {
        for (const funding of seedData.fundingOpportunities) {
            await prisma.fundingOpportunity.upsert({
                where: { id: funding.title.replace(/\s+/g, '-').toLowerCase() },
                update: {
                ...funding,
                applicationDeadline: funding.applicationDeadline ? new Date(funding.applicationDeadline) : null,
            },
            create: {
                ...funding,
                id: funding.title.replace(/\s+/g, '-').toLowerCase(),
                applicationDeadline: funding.applicationDeadline ? new Date(funding.applicationDeadline) : null,
            },
        })
      }
      console.log(`✅ Seeded ${seedData.fundingOpportunities.length} funding opportunities`)
  }

    // Seed Pitching Events
    console.log('🎤 Seeding Pitching Events...')
    if (seedData.pitchingEvents) {
        for (const event of seedData.pitchingEvents) {
            await prisma.pitchingEvent.upsert({
                where: { id: event.title.replace(/\s+/g, '-').toLowerCase() },
                update: {
                ...event,
                eventDate: new Date(event.eventDate),
            },
            create: {
                ...event,
                id: event.title.replace(/\s+/g, '-').toLowerCase(),
                eventDate: new Date(event.eventDate),
            },
        })
      }
        console.log(`✅ Seeded ${seedData.pitchingEvents.length} pitching events`)
    }

    // Seed Incubators
    console.log('🏢 Seeding Incubators...')
    if (seedData.incubators) {
        for (const incubator of seedData.incubators) {
            await prisma.incubator.upsert({
                where: { id: incubator.name.replace(/\s+/g, '-').toLowerCase() },
                update: incubator,
                create: { ...incubator, id: incubator.name.replace(/\s+/g, '-').toLowerCase() },
            })
      }
      console.log(`✅ Seeded ${seedData.incubators.length} incubators`)
  }

    // Seed Experts
    console.log('👨🏫 Seeding Experts...')
    if (seedData.experts) {
        for (const expert of seedData.experts) {
            await prisma.expert.upsert({
                where: { id: expert.name.replace(/\s+/g, '-').toLowerCase() },
                update: expert,
                create: { ...expert, id: expert.name.replace(/\s+/g, '-').toLowerCase() },
        })
      }
      console.log(`✅ Seeded ${seedData.experts.length} experts`)
  }

    // Seed Government Schemes
    console.log('🏛️ Seeding Government Schemes...')
    if (seedData.governmentSchemes) {
        for (const scheme of seedData.governmentSchemes) {
            await prisma.governmentScheme.upsert({
                where: { id: scheme.title.replace(/\s+/g, '-').toLowerCase() },
                update: {
                ...scheme,
                deadline: scheme.deadline ? new Date(scheme.deadline) : null,
            },
            create: {
                ...scheme,
                id: scheme.title.replace(/\s+/g, '-').toLowerCase(),
                deadline: scheme.deadline ? new Date(scheme.deadline) : null,
            },
        })
      }
      console.log(`✅ Seeded ${seedData.governmentSchemes.length} government schemes`)
  }

    // Seed Sector APIs
    console.log('🔌 Seeding Sector APIs...')
    if (seedData.sectorAPIs) {
        for (const api of seedData.sectorAPIs) {
            await prisma.sectorAPI.upsert({
                where: { id: api.name.replace(/\s+/g, '-').toLowerCase() },
                update: api,
                create: { ...api, id: api.name.replace(/\s+/g, '-').toLowerCase() },
        })
      }
      console.log(`✅ Seeded ${seedData.sectorAPIs.length} sector APIs`)
  }

    console.log('🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error(e)
      process.exit(1)
  })
    .finally(async () => {
      await prisma.$disconnect()
  })
