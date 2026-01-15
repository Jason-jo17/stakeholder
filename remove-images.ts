import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';

dotenv.config();

async function main() {
    console.log('Removing seeded avatars...');

    await prisma.user.updateMany({
        where: {
            avatar: {
                contains: 'pravatar' // Only remove the ones we likely added or unrelated ones if user wants CLEAN
            }
        },
        data: {
            avatar: null
        }
    });

    // Also check dicebear
    await prisma.user.updateMany({
        where: {
            avatar: {
                contains: 'dicebear'
            }
        },
        data: {
            avatar: null
        }
    });

    console.log('Avatars removed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
