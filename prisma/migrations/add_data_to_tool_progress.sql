-- Add data column to ToolProgress table to store tool-specific JSON (e.g. Canvas data)
-- Run this in Supabase SQL Editor

ALTER TABLE "ToolProgress" ADD COLUMN IF NOT EXISTS "data" JSONB;

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ToolProgress' 
AND column_name = 'data';
