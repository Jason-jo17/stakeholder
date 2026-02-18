-- Run this in Supabase SQL Editor to fix the missing proposer data
-- This creates a student user and links it to the solution.

-- 1. Create User (if not exists)
INSERT INTO "User" ("id", "email", "name", "role", "updatedAt")
VALUES ('user_student_fix', 'student@example.com', 'Priya Sharma', 'STUDENT', NOW())
ON CONFLICT ("email") DO NOTHING;

-- 2. Create Team
INSERT INTO "Team" ("id", "name", "updatedAt")
VALUES ('team_fix', 'AgriTech Innovators', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 3. Create Student Profile (linking User and Team)
INSERT INTO "StudentProfile" ("id", "userId", "teamId", "institution", "updatedAt")
VALUES ('prof_student_fix', 'user_student_fix', 'team_fix', 'University of Agricultural Sciences', NOW())
ON CONFLICT ("userId") DO UPDATE SET "teamId" = 'team_fix';

-- 4. Create Team Progress
INSERT INTO "TeamProgress" ("id", "teamId", "currentStageId", "currentWeek", "updatedAt")
VALUES ('prog_fix', 'team_fix', 4, 12, NOW())
ON CONFLICT ("teamId") DO NOTHING;

-- 5. Update Solution (Link to User and set Slug)
UPDATE "Solution"
SET "proposedBy" = 'user_student_fix', 
    "slug" = 'climate-resilient-coffee'
WHERE "id" = 'cmkem55kb000ahovgqlwbo2av';
