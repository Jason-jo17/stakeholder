import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL;

let prismaInstance: PrismaClient;

if (!connectionString) {
    // If we are running in a build step or dev without DB, handle gracefully or throw clear error
    console.warn("WARN: DATABASE_URL is missing. Prisma Client will fail to connect.");
    prismaInstance = new PrismaClient(); // Fallback to avoid immediate crash on import, though queries will fail
} else {
    // Use the pool strategy
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    prismaInstance = new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export * from "./prisma-mock"
