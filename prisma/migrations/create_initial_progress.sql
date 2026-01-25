-- Create initial progress for the demo team
-- This sets up the starting state for a new team

DO $$
DECLARE
    v_team_id TEXT;
    v_progress_id TEXT;
BEGIN
    -- Get the demo team ID
    SELECT id INTO v_team_id FROM "Team" WHERE name = 'Demo Innovation Team' LIMIT 1;
    
    IF v_team_id IS NULL THEN
        RAISE EXCEPTION 'Demo team not found';
    END IF;
    
    -- Create or update TeamProgress
    INSERT INTO "TeamProgress" ("id", "teamId", "currentStageId", "currentWeek", "overallScore", "createdAt", "updatedAt")
    VALUES ('progress_demo_team', v_team_id, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("teamId") DO UPDATE SET
        "currentStageId" = 1,
        "currentWeek" = 0,
        "updatedAt" = CURRENT_TIMESTAMP
    RETURNING id INTO v_progress_id;
    
    -- If ON CONFLICT happened, get the existing ID
    IF v_progress_id IS NULL THEN
        SELECT id INTO v_progress_id FROM "TeamProgress" WHERE "teamId" = v_team_id;
    END IF;
    
    -- Create StageProgress for Stage 1 (unlocked)
    INSERT INTO "StageProgress" ("id", "teamProgressId", "stageNumber", "status", "score", "createdAt", "updatedAt")
    VALUES ('stage_progress_1', v_progress_id, 1, 'unlocked', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("teamProgressId", "stageNumber") DO UPDATE SET
        "status" = 'unlocked',
        "updatedAt" = CURRENT_TIMESTAMP;
    
    -- Create ToolProgress for the first tool (MTP/Ikigai) - unlocked
    INSERT INTO "ToolProgress" ("id", "teamProgressId", "toolId", "status", "createdAt", "updatedAt")
    VALUES ('tool_progress_mtp', v_progress_id, 'mtp_ikigai', 'unlocked', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("teamProgressId", "toolId") DO UPDATE SET
        "status" = 'unlocked',
        "updatedAt" = CURRENT_TIMESTAMP;
    
    RAISE NOTICE 'Progress created successfully for team: %', v_team_id;
END $$;

-- Verify the progress was created
SELECT 
    tp.id as team_progress_id,
    tp."currentStageId",
    tp."currentWeek",
    COUNT(DISTINCT sp.id) as stage_progress_count,
    COUNT(DISTINCT toolp.id) as tool_progress_count
FROM "TeamProgress" tp
LEFT JOIN "StageProgress" sp ON sp."teamProgressId" = tp.id
LEFT JOIN "ToolProgress" toolp ON toolp."teamProgressId" = tp.id
WHERE tp."teamId" = (SELECT id FROM "Team" WHERE name = 'Demo Innovation Team' LIMIT 1)
GROUP BY tp.id, tp."currentStageId", tp."currentWeek";
