-- Create Tables for Cofounder Module Resource Network
-- Run this script in Supabase SQL Editor if Prisma migrations fail or get stuck.

-- 1. TestingLab
CREATE TABLE IF NOT EXISTS "TestingLab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "description" TEXT,
    "sectorSpecialization" JSONB NOT NULL,
    "trlLevelSupported" JSONB NOT NULL,
    "equipment" JSONB NOT NULL,
    "certifications" JSONB NOT NULL,
    "availability" TEXT NOT NULL DEFAULT 'available',
    "estimatedCost" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestingLab_pkey" PRIMARY KEY ("id")
);

-- Index for Searching
CREATE INDEX IF NOT EXISTS "TestingLab_state_idx" ON "TestingLab"("state");
CREATE INDEX IF NOT EXISTS "TestingLab_availability_idx" ON "TestingLab"("availability");


-- 2. Makerspace
CREATE TABLE IF NOT EXISTS "Makerspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "description" TEXT,
    "equipment" JSONB NOT NULL,
    "sectorFocus" JSONB NOT NULL,
    "hourlyRate" DECIMAL(10, 2),
    "membershipOptions" JSONB,
    "availability" TEXT NOT NULL DEFAULT 'available',
    "contactEmail" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Makerspace_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Makerspace_state_idx" ON "Makerspace"("state");
CREATE INDEX IF NOT EXISTS "Makerspace_availability_idx" ON "Makerspace"("availability");


-- 3. FundingOpportunity
CREATE TABLE IF NOT EXISTS "FundingOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fundingSize" TEXT NOT NULL,
    "sectorFocus" JSONB NOT NULL,
    "trlEligibility" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "applicationDeadline" TIMESTAMP(3),
    "applicationUrl" TEXT,
    "organizationName" TEXT NOT NULL,
    "organizationType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingOpportunity_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "FundingOpportunity_status_idx" ON "FundingOpportunity"("status");
CREATE INDEX IF NOT EXISTS "FundingOpportunity_type_idx" ON "FundingOpportunity"("type");


-- 4. PitchingEvent
CREATE TABLE IF NOT EXISTS "PitchingEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "sectorFocus" JSONB NOT NULL,
    "prizePool" TEXT,
    "attendees" TEXT,
    "status" TEXT NOT NULL DEFAULT 'upcoming',
    "registrationUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PitchingEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "PitchingEvent_status_idx" ON "PitchingEvent"("status");
CREATE INDEX IF NOT EXISTS "PitchingEvent_eventDate_idx" ON "PitchingEvent"("eventDate");


-- 5. Incubator
CREATE TABLE IF NOT EXISTS "Incubator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sectorFocus" JSONB NOT NULL,
    "fundingSupport" BOOLEAN NOT NULL DEFAULT false,
    "fundingAmount" TEXT,
    "status" TEXT NOT NULL DEFAULT 'accepting',
    "applicationUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incubator_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Incubator_status_idx" ON "Incubator"("status");
CREATE INDEX IF NOT EXISTS "Incubator_type_idx" ON "Incubator"("type");


-- 6. Expert
CREATE TABLE IF NOT EXISTS "Expert" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "domain" JSONB NOT NULL,
    "rating" DECIMAL(3, 2) NOT NULL DEFAULT 0,
    "sessionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "availability" TEXT NOT NULL DEFAULT 'available',
    "hourlyRate" DECIMAL(10, 2) NOT NULL,
    "subsidized" BOOLEAN NOT NULL DEFAULT false,
    "contactEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expert_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Expert_availability_idx" ON "Expert"("availability");
CREATE INDEX IF NOT EXISTS "Expert_subsidized_idx" ON "Expert"("subsidized");


-- 7. GovernmentScheme
CREATE TABLE IF NOT EXISTS "GovernmentScheme" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "benefitAmount" TEXT NOT NULL,
    "sectorFocus" JSONB NOT NULL,
    "eligibilityCriteria" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "deadline" TIMESTAMP(3),
    "applicationUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GovernmentScheme_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "GovernmentScheme_status_idx" ON "GovernmentScheme"("status");
CREATE INDEX IF NOT EXISTS "GovernmentScheme_type_idx" ON "GovernmentScheme"("type");


-- 8. SectorAPI
CREATE TABLE IF NOT EXISTS "SectorAPI" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "apiType" TEXT NOT NULL,
    "sandboxUrl" TEXT,
    "documentationUrl" TEXT NOT NULL,
    "sandboxReady" BOOLEAN NOT NULL DEFAULT false,
    "authRequired" BOOLEAN NOT NULL DEFAULT true,
    "rateLimits" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectorAPI_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "SectorAPI_sector_idx" ON "SectorAPI"("sector");
CREATE INDEX IF NOT EXISTS "SectorAPI_sandboxReady_idx" ON "SectorAPI"("sandboxReady");
