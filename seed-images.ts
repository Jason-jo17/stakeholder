import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';

dotenv.config();

async function main() {
    console.log('Seeding images...');

    // 1. Update Stakeholders/Users with Avatars
    console.log('Updating user avatars...');
    const stakeholders = await prisma.stakeholderProfile.findMany({
        include: { user: true }
    });

    console.log(`Found ${stakeholders.length} stakeholders.`);

    for (const s of stakeholders) {
        // Use a deterministic avatar service based on user ID or email to keep it consistent
        // ui-avatars is text based, pravatar is real images. Let's use pravatar for "real" feel.
        // We use the email or ID as the seed.
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.user.email}`;
        // Or for real photos: `https://i.pravatar.cc/150?u=${s.userId}`
        // Let's mix it up or use a professional set? 
        // User asked for "images", usually implying photos. Pravatar is good.
        const photoUrl = `https://i.pravatar.cc/300?u=${s.userId}`;

        await prisma.user.update({
            where: { id: s.userId },
            data: { avatar: photoUrl }
        });
        process.stdout.write('.');
    }
    console.log('\nUser avatars updated.');

    // 2. Connect Problems/Solutions to random placeholder images if we had a field.
    // Since we don't, we can't seed them. We will handle this in the UI components.

    console.log('Image seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
