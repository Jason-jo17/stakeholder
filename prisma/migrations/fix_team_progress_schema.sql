-- Fix TeamProgress table to match schema.prisma
-- Run this in Supabase SQL Editor

ALTER TABLE "TeamProgress" 
ADD COLUMN IF NOT EXISTS "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Remove overallScore if it's not in schema.prisma (optional, but keep for now if it doesn't hurt)
-- ALTER TABLE "TeamProgress" DROP COLUMN IF EXISTS "overallScore";

-- Verify columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'TeamProgress';
