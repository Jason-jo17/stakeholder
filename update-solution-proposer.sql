-- Update solution to add a proposer
-- First, let's find a student user ID
SELECT id, name, email FROM "User" WHERE role = 'STUDENT' LIMIT 5;

-- Then update the Climate-Resilient Coffee solution
-- Replace 'STUDENT_USER_ID_HERE' with an actual student ID from above
UPDATE "Solution" 
SET "proposedBy" = 'STUDENT_USER_ID_HERE'
WHERE title LIKE '%Climate%Coffee%';

-- Verify the update
SELECT id, title, code, "proposedBy" FROM "Solution" WHERE title LIKE '%Climate%';
