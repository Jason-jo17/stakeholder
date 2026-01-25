-- Detailed check of StudentProfile table columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'StudentProfile'
ORDER BY column_name;

-- Check Team table columns as well
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'Team'
ORDER BY column_name;
