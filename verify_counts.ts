
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

const path = require('path')
const envPath = path.join(__dirname, '.env')
dotenv.config({ path: envPath, override: true });

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const stakeholderCount = await prisma.stakeholderProfile.count();
    const problemCount = await prisma.problemStatement.count();
    const sectorCount = await prisma.sector.count();

    console.log('--- Verification Report ---');
    console.log(`Stakeholders: ${stakeholderCount}`);
    console.log(`Problem Statements: ${problemCount}`);
    console.log(`Sectors: ${sectorCount}`);
    console.log('---------------------------');
}

main().finally(() => prisma.$disconnect());
