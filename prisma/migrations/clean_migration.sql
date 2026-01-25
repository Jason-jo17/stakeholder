-- Simplified Migration: Create tables with inline foreign keys
-- Run this if the previous migration had issues

-- Drop existing tables if they exist (careful - this deletes data!)
DROP TABLE IF EXISTS "TaskProgress" CASCADE;
DROP TABLE IF EXISTS "ToolProgress" CASCADE;
DROP TABLE IF EXISTS "StageProgress" CASCADE;
DROP TABLE IF EXISTS "TeamProgress" CASCADE;
DROP TABLE IF EXISTS "RoadmapTask" CASCADE;
DROP TABLE IF EXISTS "RoadmapTool" CASCADE;
DROP TABLE IF EXISTS "RoadmapStage" CASCADE;
DROP TABLE IF EXISTS "Team" CASCADE;

-- Create Team table
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cohort" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mentorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Team_mentorId_idx" ON "Team"("mentorId");

-- Create RoadmapStage table
CREATE TABLE "RoadmapStage" (
    "id" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "weeks" INTEGER[],
    "minimumScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RoadmapStage_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "RoadmapStage_stageNumber_key" UNIQUE ("stageNumber")
);

-- Create RoadmapTool table
CREATE TABLE "RoadmapTool" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    "description" TEXT,
    "timeEstimateHours" INTEGER,
    "isLocked" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RoadmapTool_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "RoadmapTool_toolId_key" UNIQUE ("toolId"),
    CONSTRAINT "RoadmapTool_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "RoadmapStage"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "RoadmapTool_stageId_idx" ON "RoadmapTool"("stageId");

-- Create RoadmapTask table
CREATE TABLE "RoadmapTask" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deliverableType" TEXT NOT NULL,
    "validationCriteria" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RoadmapTask_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "RoadmapTask_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "RoadmapTool"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "RoadmapTask_toolId_idx" ON "RoadmapTask"("toolId");

-- Create TeamProgress table
CREATE TABLE "TeamProgress" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "currentStageId" INTEGER NOT NULL DEFAULT 1,
    "currentWeek" INTEGER NOT NULL DEFAULT 0,
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeamProgress_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "TeamProgress_teamId_key" UNIQUE ("teamId"),
    CONSTRAINT "TeamProgress_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "TeamProgress_teamId_idx" ON "TeamProgress"("teamId");

-- Create StageProgress table
CREATE TABLE "StageProgress" (
    "id" TEXT NOT NULL,
    "teamProgressId" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "score" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StageProgress_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "StageProgress_teamProgressId_stageNumber_key" UNIQUE ("teamProgressId", "stageNumber"),
    CONSTRAINT "StageProgress_teamProgressId_fkey" FOREIGN KEY ("teamProgressId") REFERENCES "TeamProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "StageProgress_teamProgressId_idx" ON "StageProgress"("teamProgressId");

-- Create ToolProgress table
CREATE TABLE "ToolProgress" (
    "id" TEXT NOT NULL,
    "teamProgressId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "mentorFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ToolProgress_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ToolProgress_teamProgressId_toolId_key" UNIQUE ("teamProgressId", "toolId"),
    CONSTRAINT "ToolProgress_teamProgressId_fkey" FOREIGN KEY ("teamProgressId") REFERENCES "TeamProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "ToolProgress_teamProgressId_idx" ON "ToolProgress"("teamProgressId");

-- Create TaskProgress table
CREATE TABLE "TaskProgress" (
    "id" TEXT NOT NULL,
    "toolProgressId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "submissionText" TEXT,
    "submissionUrl" TEXT,
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "mentorNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TaskProgress_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "TaskProgress_toolProgressId_taskId_key" UNIQUE ("toolProgressId", "taskId"),
    CONSTRAINT "TaskProgress_toolProgressId_fkey" FOREIGN KEY ("toolProgressId") REFERENCES "ToolProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "TaskProgress_toolProgressId_idx" ON "TaskProgress"("toolProgressId");

-- Now insert demo data
-- Stage 1: Founder-Problem Fit
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_1', 1, 'Founder-Problem Fit', ARRAY[0, 1, 2], 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Stage 2: Problem-Solution Fit
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_2', 2, 'Problem-Solution Fit', ARRAY[3, 4, 5], 60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Stage 3: Prototype
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_3', 3, 'Prototype', ARRAY[6, 7], 70, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Stage 4: Fundraising
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_4', 4, 'Fundraising', ARRAY[8, 9], 80, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tools for Stage 1
INSERT INTO "RoadmapTool" ("id", "toolId", "name", "week", "stageId", "description", "timeEstimateHours", "isLocked", "createdAt", "updatedAt")
VALUES 
('tool_1_1', 'mtp_ikigai', 'MTP/Ikigai Canvas', 0, 'stage_1', 'Build your personal/org MTP and discover your purpose using the Ikigai framework', 2, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_1_2', 'problem_discovery', 'Problem Discovery Workshop', 1, 'stage_1', 'Identify and validate core problems through stakeholder interviews', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_1_3', 'stakeholder_mapping', 'Stakeholder Mapping', 2, 'stage_1', 'Map all relevant stakeholders and their relationships', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tools for Stage 2
INSERT INTO "RoadmapTool" ("id", "toolId", "name", "week", "stageId", "description", "timeEstimateHours", "isLocked", "createdAt", "updatedAt")
VALUES 
('tool_2_1', 'value_proposition', 'Value Proposition Canvas', 3, 'stage_2', 'Define your value proposition and product-market fit', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_2_2', 'solution_design', 'Solution Design Sprint', 4, 'stage_2', 'Design your solution through rapid prototyping', 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_2_3', 'validation_testing', 'Validation Testing', 5, 'stage_2', 'Test your solution with real users and gather feedback', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tasks for MTP/Ikigai Canvas
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_1_1_1', 'tool_1_1', 'Build your personal/org MTP', 'mtp_statement', 
 ARRAY['MTP statement is clear and compelling', 'All 4 Ikigai circles are completed', 'Intersections show meaningful insights'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tasks for Problem Discovery
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_1_2_1', 'tool_1_2', 'Conduct 10 problem discovery interviews', 'interview_notes', 
 ARRAY['At least 10 interviews completed', 'Common pain points identified', 'Problem statements documented'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('task_1_2_2', 'tool_1_2', 'Create problem statement canvas', 'problem_canvas', 
 ARRAY['Problem is clearly defined', 'Target audience identified', 'Current solutions analyzed'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tasks for Stakeholder Mapping
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_1_3_1', 'tool_1_3', 'Map all stakeholders', 'stakeholder_map', 
 ARRAY['All stakeholder types identified', 'Influence/interest matrix completed', 'Engagement strategy defined'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tasks for Value Proposition
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_2_1_1', 'tool_2_1', 'Complete Value Proposition Canvas', 'vpc_canvas', 
 ARRAY['Customer jobs clearly defined', 'Pains and gains identified', 'Products and services mapped'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create demo team
INSERT INTO "Team" ("id", "name", "cohort", "startDate", "createdAt", "updatedAt")
VALUES ('demo_team_1', 'Demo Innovation Team', 'Batch 2026', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create team progress
INSERT INTO "TeamProgress" ("id", "teamId", "currentStageId", "currentWeek", "overallScore", "createdAt", "updatedAt")
VALUES ('demo_progress_1', 'demo_team_1', 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Link all student profiles to demo team
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'StudentProfile' AND column_name = 'teamId') THEN
        UPDATE "StudentProfile" SET "teamId" = 'demo_team_1' WHERE "teamId" IS NULL;
    ELSE
        ALTER TABLE "StudentProfile" ADD COLUMN "teamId" TEXT;
        CREATE INDEX "StudentProfile_teamId_idx" ON "StudentProfile"("teamId");
        UPDATE "StudentProfile" SET "teamId" = 'demo_team_1';
    END IF;
END $$;

-- Verify data was inserted
SELECT 'Stages created:' as info, COUNT(*) as count FROM "RoadmapStage"
UNION ALL
SELECT 'Tools created:', COUNT(*) FROM "RoadmapTool"
UNION ALL
SELECT 'Tasks created:', COUNT(*) FROM "RoadmapTask"
UNION ALL
SELECT 'Teams created:', COUNT(*) FROM "Team"
UNION ALL
SELECT 'Team Progress created:', COUNT(*) FROM "TeamProgress";
