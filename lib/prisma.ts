import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL;

let prismaInstance: PrismaClient;

if (!connectionString) {
    // During build or when DATABASE_URL is missing, use a dummy connection
    // This prevents build failures but queries will fail at runtime if DB is not configured
    console.warn("WARN: DATABASE_URL is missing. Using fallback Prisma Client (queries will fail).");
    const dummyPool = new Pool({ connectionString: 'postgresql://user:pass@localhost:5432/db' })
    const dummyAdapter = new PrismaPg(dummyPool)
    prismaInstance = new PrismaClient({ adapter: dummyAdapter })
} else {
    // Use the pool strategy for production
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    prismaInstance = new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export * from "./prisma-mock"
