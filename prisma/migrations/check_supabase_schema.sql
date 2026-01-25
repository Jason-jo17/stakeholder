-- Check what tables actually exist in Supabase
-- Run this to see what we have

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'Team', 
    'RoadmapStage', 
    'RoadmapTool', 
    'RoadmapTask', 
    'TeamProgress', 
    'StageProgress', 
    'ToolProgress', 
    'TaskProgress',
    'StudentProfile'
)
ORDER BY table_name;

-- Check if StudentProfile has teamId column
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'StudentProfile' 
AND column_name = 'teamId';

-- Check Team table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Team';
