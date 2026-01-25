-- Migration: Add Roadmap Models
-- Run this in Supabase SQL Editor

-- Create Team table
CREATE TABLE IF NOT EXISTS "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cohort" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mentorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- Create RoadmapStage table
CREATE TABLE IF NOT EXISTS "RoadmapStage" (
    "id" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "weeks" INTEGER[],
    "minimumScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapStage_pkey" PRIMARY KEY ("id")
);

-- Create RoadmapTool table
CREATE TABLE IF NOT EXISTS "RoadmapTool" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    "description" TEXT,
    "timeEstimateHours" INTEGER,
    "isLocked" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapTool_pkey" PRIMARY KEY ("id")
);

-- Create RoadmapTask table
CREATE TABLE IF NOT EXISTS "RoadmapTask" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deliverableType" TEXT NOT NULL,
    "validationCriteria" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapTask_pkey" PRIMARY KEY ("id")
);

-- Create TeamProgress table
CREATE TABLE IF NOT EXISTS "TeamProgress" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "currentStageId" INTEGER NOT NULL DEFAULT 1,
    "currentWeek" INTEGER NOT NULL DEFAULT 0,
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamProgress_pkey" PRIMARY KEY ("id")
);

-- Create StageProgress table
CREATE TABLE IF NOT EXISTS "StageProgress" (
    "id" TEXT NOT NULL,
    "teamProgressId" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "score" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StageProgress_pkey" PRIMARY KEY ("id")
);

-- Create ToolProgress table
CREATE TABLE IF NOT EXISTS "ToolProgress" (
    "id" TEXT NOT NULL,
    "teamProgressId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "mentorFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolProgress_pkey" PRIMARY KEY ("id")
);

-- Create TaskProgress table
CREATE TABLE IF NOT EXISTS "TaskProgress" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskProgress_pkey" PRIMARY KEY ("id")
);

-- Add unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "RoadmapStage_stageNumber_key" ON "RoadmapStage"("stageNumber");
CREATE UNIQUE INDEX IF NOT EXISTS "RoadmapTool_toolId_key" ON "RoadmapTool"("toolId");
CREATE UNIQUE INDEX IF NOT EXISTS "TeamProgress_teamId_key" ON "TeamProgress"("teamId");

-- Add composite unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "StageProgress_teamProgressId_stageNumber_key" ON "StageProgress"("teamProgressId", "stageNumber");
CREATE UNIQUE INDEX IF NOT EXISTS "ToolProgress_teamProgressId_toolId_key" ON "ToolProgress"("teamProgressId", "toolId");
CREATE UNIQUE INDEX IF NOT EXISTS "TaskProgress_toolProgressId_taskId_key" ON "TaskProgress"("toolProgressId", "taskId");

-- Add indexes
CREATE INDEX IF NOT EXISTS "Team_mentorId_idx" ON "Team"("mentorId");
CREATE INDEX IF NOT EXISTS "RoadmapTool_stageId_idx" ON "RoadmapTool"("stageId");
CREATE INDEX IF NOT EXISTS "RoadmapTask_toolId_idx" ON "RoadmapTask"("toolId");
CREATE INDEX IF NOT EXISTS "TeamProgress_teamId_idx" ON "TeamProgress"("teamId");
CREATE INDEX IF NOT EXISTS "StageProgress_teamProgressId_idx" ON "StageProgress"("teamProgressId");
CREATE INDEX IF NOT EXISTS "ToolProgress_teamProgressId_idx" ON "ToolProgress"("teamProgressId");
CREATE INDEX IF NOT EXISTS "TaskProgress_toolProgressId_idx" ON "TaskProgress"("toolProgressId");

-- Add foreign key constraints
ALTER TABLE "Team" ADD CONSTRAINT "Team_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "ManagerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "RoadmapTool" ADD CONSTRAINT "RoadmapTool_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "RoadmapStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RoadmapTask" ADD CONSTRAINT "RoadmapTask_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "RoadmapTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeamProgress" ADD CONSTRAINT "TeamProgress_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StageProgress" ADD CONSTRAINT "StageProgress_teamProgressId_fkey" FOREIGN KEY ("teamProgressId") REFERENCES "TeamProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ToolProgress" ADD CONSTRAINT "ToolProgress_teamProgressId_fkey" FOREIGN KEY ("teamProgressId") REFERENCES "TeamProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_toolProgressId_fkey" FOREIGN KEY ("toolProgressId") REFERENCES "ToolProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Update StudentProfile table to add teamId
ALTER TABLE "StudentProfile" ADD COLUMN IF NOT EXISTS "teamId" TEXT;
CREATE INDEX IF NOT EXISTS "StudentProfile_teamId_idx" ON "StudentProfile"("teamId");
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Update ManagerProfile table to add teams relation (already handled by Team.mentorId)

-- Insert demo roadmap data
-- Stage 1: Founder-Problem Fit
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_1', 1, 'Founder-Problem Fit', ARRAY[0, 1, 2], 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("stageNumber") DO NOTHING;

-- Stage 2: Problem-Solution Fit
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_2', 2, 'Problem-Solution Fit', ARRAY[3, 4, 5], 60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("stageNumber") DO NOTHING;

-- Stage 3: Prototype
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_3', 3, 'Prototype', ARRAY[6, 7], 70, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("stageNumber") DO NOTHING;

-- Stage 4: Fundraising
INSERT INTO "RoadmapStage" ("id", "stageNumber", "name", "weeks", "minimumScore", "createdAt", "updatedAt")
VALUES ('stage_4', 4, 'Fundraising', ARRAY[8, 9], 80, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("stageNumber") DO NOTHING;

-- Tools for Stage 1
INSERT INTO "RoadmapTool" ("id", "toolId", "name", "week", "stageId", "description", "timeEstimateHours", "isLocked", "createdAt", "updatedAt")
VALUES 
('tool_1_1', 'mtp_ikigai', 'MTP/Ikigai Canvas', 0, 'stage_1', 'Build your personal/org MTP', 2, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_1_2', 'problem_discovery', 'Problem Discovery Workshop', 1, 'stage_1', 'Identify and validate core problems', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_1_3', 'stakeholder_mapping', 'Stakeholder Mapping', 2, 'stage_1', 'Map all relevant stakeholders', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("toolId") DO NOTHING;

-- Tools for Stage 2
INSERT INTO "RoadmapTool" ("id", "toolId", "name", "week", "stageId", "description", "timeEstimateHours", "isLocked", "createdAt", "updatedAt")
VALUES 
('tool_2_1', 'value_proposition', 'Value Proposition Canvas', 3, 'stage_2', 'Define your value proposition', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_2_2', 'solution_design', 'Solution Design Sprint', 4, 'stage_2', 'Design your solution', 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tool_2_3', 'validation_testing', 'Validation Testing', 5, 'stage_2', 'Test with real users', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("toolId") DO NOTHING;

-- Tasks for MTP/Ikigai Canvas
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_1_1_1', 'tool_1_1', 'Build your personal/org MTP', 'mtp_statement', 
 ARRAY['MTP statement is clear and compelling', 'All 4 Ikigai circles are completed', 'Intersections show meaningful insights'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Tasks for Problem Discovery
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_1_2_1', 'tool_1_2', 'Conduct 10 problem discovery interviews', 'interview_notes', 
 ARRAY['At least 10 interviews completed', 'Common pain points identified', 'Problem statements documented'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('task_1_2_2', 'tool_1_2', 'Create problem statement canvas', 'problem_canvas', 
 ARRAY['Problem is clearly defined', 'Target audience identified', 'Current solutions analyzed'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Tasks for Stakeholder Mapping
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_1_3_1', 'tool_1_3', 'Map all stakeholders', 'stakeholder_map', 
 ARRAY['All stakeholder types identified', 'Influence/interest matrix completed', 'Engagement strategy defined'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Tasks for Value Proposition
INSERT INTO "RoadmapTask" ("id", "toolId", "description", "deliverableType", "validationCriteria", "createdAt", "updatedAt")
VALUES 
('task_2_1_1', 'tool_2_1', 'Complete Value Proposition Canvas', 'vpc_canvas', 
 ARRAY['Customer jobs clearly defined', 'Pains and gains identified', 'Products and services mapped'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

COMMIT;
