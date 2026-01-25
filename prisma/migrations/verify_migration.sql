-- Verification Script: Check if tables and data exist
-- Run this in Supabase SQL Editor to verify the migration worked

-- 1. Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('Team', 'RoadmapStage', 'RoadmapTool', 'RoadmapTask', 'TeamProgress', 'StageProgress', 'ToolProgress', 'TaskProgress')
ORDER BY table_name;

-- 2. Check RoadmapStage data
SELECT * FROM "RoadmapStage" ORDER BY "stageNumber";

-- 3. Check RoadmapTool data
SELECT * FROM "RoadmapTool" ORDER BY "week";

-- 4. Check RoadmapTask data
SELECT * FROM "RoadmapTask" LIMIT 10;

-- 5. Check if any teams exist
SELECT * FROM "Team";

-- 6. Check StudentProfile teamId links
SELECT id, "userId", "teamId" FROM "StudentProfile" LIMIT 5;
