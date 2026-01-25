-- Add teamId column to StudentProfile table
-- Run this in Supabase SQL Editor

-- Add the teamId column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'StudentProfile' 
        AND column_name = 'teamId'
    ) THEN
        ALTER TABLE "StudentProfile" ADD COLUMN "teamId" TEXT;
        
        -- Add index for performance
        CREATE INDEX "StudentProfile_teamId_idx" ON "StudentProfile"("teamId");
        
        -- Add foreign key constraint
        ALTER TABLE "StudentProfile" 
        ADD CONSTRAINT "StudentProfile_teamId_fkey" 
        FOREIGN KEY ("teamId") REFERENCES "Team"("id") 
        ON DELETE SET NULL ON UPDATE CASCADE;
        
        RAISE NOTICE 'teamId column added to StudentProfile';
    ELSE
        RAISE NOTICE 'teamId column already exists';
    END IF;
END $$;

-- Link all existing students to the demo team
UPDATE "StudentProfile" 
SET "teamId" = (SELECT id FROM "Team" WHERE name = 'Demo Innovation Team' LIMIT 1)
WHERE "teamId" IS NULL;

-- Verify the update
SELECT COUNT(*) as students_linked_to_team 
FROM "StudentProfile" 
WHERE "teamId" IS NOT NULL;
