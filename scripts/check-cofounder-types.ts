
import { prisma } from '../lib/prisma';

async function main() {
    console.log("Checking Prisma Client models...");
    
    // Check if studentJourney model is available on the client instance
    if ('studentJourney' in prisma) {
        console.log("SUCCESS: studentJourney model found on prisma client.");
    } else {
        console.error("ERROR: studentJourney model NOT found on prisma client.");
        console.log("Available keys:", Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
    }

    // Check if other new models are available
    if ('testingLab' in prisma) {
        console.log("SUCCESS: testingLab model found.");
    } else {
        console.error("ERROR: testingLab model NOT found.");
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
