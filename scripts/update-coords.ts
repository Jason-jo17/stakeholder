import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const stakeholders = [
        { id: "st_1", lat: 12.9141, lng: 74.8560 }, // Mangalore
        { id: "st_2", lat: 13.9299, lng: 75.5681 }, // Shimoga
        { id: "st_3", lat: 12.8700, lng: 74.8800 }, // Mangalore
        { id: "st_4", lat: 12.9716, lng: 77.5946 }, // Bangalore
        { id: "st_5", lat: 12.9800, lng: 77.6000 }, // Bangalore
        { id: "st_6", lat: 12.8900, lng: 74.8400 }, // Mangalore
        { id: "st_7", lat: 13.0033, lng: 76.1004 }, // Hassan
        { id: "st_8", lat: 13.0100, lng: 76.0900 }, // Hassan
        { id: "st_9", lat: 12.3051, lng: 76.6551 }, // Mysore
        { id: "st_10", lat: 12.3115, lng: 76.6651 }, // Mysore
        { id: "st_11", lat: 12.3000, lng: 76.6400 }, // Mysore
        { id: "st_12", lat: 12.3080, lng: 76.6480 }, // Mysore
    ]

    console.log("Starting coordinate updates...")

    for (const s of stakeholders) {
        try {
            await prisma.stakeholderProfile.update({
                where: { id: s.id },
                data: {
                    latitude: s.lat,
                    longitude: s.lng
                }
            })
            console.log(`✅ Updated ${s.id}`)
        } catch (e) {
            // If the record doesn't exist, we can't update it. 
            // In a real scenario we might upsert, but here we just want to patch existing ones if matches found.
            console.log(`⚠️ Skipped ${s.id}: ${(e as Error).message.split('\n')[0]}`)
        }
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
