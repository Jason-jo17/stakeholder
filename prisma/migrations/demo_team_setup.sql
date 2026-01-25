-- Create a demo team and link your student profile
-- Run this AFTER the main migration

-- First, let's create a demo team
INSERT INTO "Team" ("id", "name", "cohort", "startDate", "createdAt", "updatedAt")
VALUES ('demo_team_1', 'Demo Innovation Team', 'Batch 2026', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Create team progress for the demo team
INSERT INTO "TeamProgress" ("id", "teamId", "currentStageId", "currentWeek", "overallScore", "createdAt", "updatedAt")
VALUES ('demo_progress_1', 'demo_team_1', 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("teamId") DO NOTHING;

-- Link your student profile to this team (replace 'YOUR_STUDENT_PROFILE_ID' with actual ID)
-- To find your student profile ID, run: SELECT id, "userId" FROM "StudentProfile" LIMIT 5;
-- Then update this query with your actual student profile ID

-- UPDATE "StudentProfile" 
-- SET "teamId" = 'demo_team_1'
-- WHERE "id" = 'YOUR_STUDENT_PROFILE_ID';

-- Or link ALL student profiles to the demo team for testing:
UPDATE "StudentProfile" 
SET "teamId" = 'demo_team_1'
WHERE "teamId" IS NULL;

-- Create initial tool progress for the first unlocked tool (MTP/Ikigai)
INSERT INTO "ToolProgress" ("id", "teamProgressId", "toolId", "status", "createdAt", "updatedAt")
VALUES ('demo_tool_progress_1', 'demo_progress_1', 'tool_1_1', 'unlocked', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("teamProgressId", "toolId") DO NOTHING;

COMMIT;
