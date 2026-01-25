-- Comprehensive Fix to sync Supabase tables with schema.prisma
-- Run this in Supabase SQL Editor

-- 1. Fix TeamProgress
ALTER TABLE "TeamProgress" 
ADD COLUMN IF NOT EXISTS "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 2. Fix RoadmapTool
ALTER TABLE "RoadmapTool" 
ADD COLUMN IF NOT EXISTS "dependencies" TEXT[] DEFAULT '{}';

-- 3. Fix StageProgress
ALTER TABLE "StageProgress" 
ADD COLUMN IF NOT EXISTS "feedback" TEXT;

-- 4. Fix TaskProgress
ALTER TABLE "TaskProgress" 
ADD COLUMN IF NOT EXISTS "feedback" TEXT;

-- Verify columns for TeamProgress
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('TeamProgress', 'RoadmapTool', 'StageProgress', 'TaskProgress')
ORDER BY table_name, column_name;
