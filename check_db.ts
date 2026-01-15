import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

async function main() {
    // console.log('Connecting to DB...');


    let prisma;
    try {
        console.log("Instantiating PrismaClient with PG Adapter...");
        const connectionString = `${process.env.DATABASE_URL}`
        const pool = new Pool({ connectionString })
        const adapter = new PrismaPg(pool)

        prisma = new PrismaClient({ adapter });
        await prisma.$disconnect();
    } catch (e: any) {
        const fs = require('fs');
        const errorLog = `
Time: ${new Date().toISOString()}
Name: ${e.name}
Message: ${e.message}
Code: ${e.code}
Full: ${JSON.stringify(e, null, 2)}
`;
        fs.writeFileSync('db_conn_error.txt', errorLog);
        console.log('Error written to db_conn_error.txt');
        if (prisma) await prisma.$disconnect();
        process.exit(1);
    }
}

main();
