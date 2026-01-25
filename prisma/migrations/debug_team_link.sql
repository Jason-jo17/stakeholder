-- Debug: Check current user and student profile data
-- Run this in Supabase SQL Editor

-- 1. Check all users
SELECT id, email, name FROM "User" LIMIT 10;

-- 2. Check all student profiles
SELECT sp.id, sp."userId", u.email, u.name, sp."teamId"
FROM "StudentProfile" sp
LEFT JOIN "User" u ON sp."userId" = u.id
LIMIT 10;

-- 3. Check the demo team
SELECT * FROM "Team" WHERE name = 'Demo Innovation Team';

-- 4. Update ALL student profiles to link to demo team
UPDATE "StudentProfile" 
SET "teamId" = (SELECT id FROM "Team" WHERE name = 'Demo Innovation Team' LIMIT 1)
WHERE "teamId" IS NULL OR "teamId" != (SELECT id FROM "Team" WHERE name = 'Demo Innovation Team' LIMIT 1);

-- 5. Verify the update
SELECT sp.id, u.email, sp."teamId", t.name as team_name
FROM "StudentProfile" sp
LEFT JOIN "User" u ON sp."userId" = u.id
LEFT JOIN "Team" t ON sp."teamId" = t.id
LIMIT 10;
