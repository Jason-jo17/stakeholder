// Fallback types when Prisma generation fails

export enum UserRole {
    ADMIN = 'ADMIN',
    STAKEHOLDER = 'STAKEHOLDER',
    STUDENT = 'STUDENT',
    MANAGER = 'MANAGER'
}

export const Prisma = {
    SortOrder: {
        asc: 'asc',
        desc: 'desc'
    }
}

export class PrismaClient {
    user = {
        findUnique: async (...args: any[]) => null as any,
        findFirst: async (...args: any[]) => null as any,
        create: async (...args: any[]) => ({} as any),
        update: async (...args: any[]) => ({} as any),
    }
    stakeholderProfile = {
        findUnique: async (...args: any[]) => null as any,
        findMany: async (...args: any[]) => [] as any[],
        count: async (...args: any[]) => 0,
        update: async (...args: any[]) => ({} as any),
    }
    interaction = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    calendarEvent = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
        delete: async (...args: any[]) => ({} as any),
    }
    transcript = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    researchReport = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    solution = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    institution = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    problemStatement = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    sector = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
        findUnique: async (...args: any[]) => null as any,
        update: async (...args: any[]) => ({} as any),
    }
    vectorEmbedding = {
        create: async (...args: any[]) => ({} as any),
        findMany: async (...args: any[]) => [] as any[],
    }
    // Add other models as needed
}
