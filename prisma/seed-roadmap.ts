
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding roadmap definitions...')

  // Clear existing roadmap definitions to avoid duplicates
  // Note: This might cascade delete progress, so use with caution in prod. 
  // For dev, it's fine.
  try {
    await prisma.roadmapTask.deleteMany({})
    await prisma.roadmapTool.deleteMany({})
    await prisma.roadmapStage.deleteMany({})
  } catch (e) {
    console.log("Tables might not exist yet or error clearing:", e.message)
  }

  const roadmapData = [
    {
      stageNumber: 1,
      name: "Founder-Problem Fit",
      weeks: [0, 1, 2],
      minimumScore: 50,
      tools: [
        {
          toolId: "mtp_ikigai",
          name: "MTP/Ikigai Canvas",
          week: 0,
          description: "Build your personal/org MTP",
          timeEstimateHours: 2,
          isLocked: false, // First tool is unlocked
          tasks: [
            {
              description: "Build your personal/org MTP",
              deliverableType: "mtp_statement",
              validationCriteria: [
                "MTP statement is clear and compelling",
                "All 4 Ikigai circles are completed",
                "Intersections show meaningful insights"
              ]
            }
          ]
        },
        {
          toolId: "mind_mapping_5w1h",
          name: "Mind Mapping (5W1H)",
          week: 1,
          tasks: [
            {
              description: "Analyze desirability of PS & qualify as mass problem",
              deliverableType: "mind_map",
              validationCriteria: [
                "All 6 branches (5W1H) have minimum 3 nodes each",
                "Evidence from secondary research attached",
                "Root problem clearly identified"
              ]
            }
          ]
        },
        {
          toolId: "empathy_mapping",
          name: "Empathy Mapping",
          week: 1,
          tasks: [
            {
              description: "Create empathy maps for at least 3 stakeholder types",
              deliverableType: "empathy_maps",
              validationCriteria: [
                "Minimum 3 empathy maps created",
                "Each quadrant has at least 5 insights",
                "Evidence linked from interviews",
                "Patterns identified across maps"
              ]
            }
          ]
        },
        {
          toolId: "seven_whys",
          name: "7 Whys Root Cause Analysis",
          week: 1,
          tasks: [
            {
              description: "Conduct root cause analysis using 7 Whys",
              deliverableType: "root_cause_tree",
              validationCriteria: [
                "At least one path reaches 5+ levels deep",
                "Root causes identified and tagged",
                "Evidence supports each why answer"
              ]
            }
          ]
        },
        {
          toolId: "fishbone_diagram",
          name: "Fishbone Diagram",
          week: 1,
          tasks: [
            {
              description: "Map causes across 6 categories",
              deliverable_type: "fishbone_diagram",
              validation_criteria: [
                "All 6 categories populated",
                "Minimum 15 total causes identified",
                "Root causes prioritized by severity"
              ]
            }
          ]
        },
        {
          toolId: "event_pattern",
          name: "Event Pattern Template",
          week: 1,
          tasks: [
            {
              description: "Log and analyze problem occurrence patterns",
              deliverableType: "event_analysis",
              validationCriteria: [
                "Minimum 10 events logged",
                "At least 2 patterns identified",
                "Trigger conditions documented"
              ]
            }
          ]
        },
        {
          toolId: "stakeholder_mapping",
          name: "Stakeholder Pursued Value Matrix",
          week: 2,
          tasks: [
            {
              description: "Identify and map at least 10 stakeholders",
              deliverableType: "stakeholder_map",
              validationCriteria: [
                "Minimum 10 stakeholders mapped",
                "Power/Interest matrix completed",
                "Value dimensions defined for each",
                "Engagement strategy documented"
              ]
            }
          ]
        }
      ]
    },
    {
      stageNumber: 2,
      name: "Problem-Solution Fit",
      weeks: [3, 4],
      minimumScore: 50,
      tools: [
        {
            toolId: "interview_framework",
            name: "Interview Question Framework Builder",
            week: 2,
            tasks: [{
              description: "Create interview guide and conduct 10+ stakeholder interviews",
              deliverableType: "interview_guide_and_transcripts",
              validationCriteria: [
                "Interview guide with 15+ questions",
                "Ethics compliance checklist completed",
                "Minimum 10 interviews conducted",
                "Insights extracted and documented"
              ]
            }]
          },
          {
            toolId: "affinity_mapping",
            name: "Affinity Mapping & Clustering",
            week: 3,
            tasks: [{
              description: "Cluster interview insights into themes",
              deliverableType: "affinity_map",
              validationCriteria: [
                "Minimum 50 insight notes",
                "Notes organized into 5-8 clusters",
                "3-5 major themes identified",
                "Evidence linked to sources"
              ]
            }]
          },
          {
            toolId: "vpc",
            name: "Value Proposition Canvas",
            week: 3,
            tasks: [{
              description: "Create VPC for primary customer segment",
              deliverableType: "value_proposition_canvas",
              validationCriteria: [
                "Customer profile fully completed (jobs/pains/gains)",
                "Value map addresses top 3 pains",
                "Fit score > 6/10",
                "Evidence from interviews linked"
              ]
            }]
          },
          {
            toolId: "errc_grid",
            name: "ERRC Grid (Blue Ocean)",
            week: 3,
            tasks: [{
              description: "Complete ERRC analysis for strategic positioning",
              deliverableType: "errc_grid",
              validationCriteria: [
                "All 4 quadrants populated",
                "Value curve shows differentiation",
                "Cost implications analyzed",
                "Competitor comparison included"
              ]
            }]
          },
          {
            toolId: "user_persona_journey",
            name: "User Persona & Journey Map",
            week: 3,
            tasks: [{
              description: "Create detailed persona and journey map",
              deliverableType: "persona_and_journey",
              validationCriteria: [
                "Rich persona profile with demographics/psychographics",
                "Journey map with 5+ stages",
                "Pain points and opportunities identified",
                "Moments of truth highlighted"
              ]
            }]
          },
          {
            toolId: "crazy_8s",
            name: "Crazy 8s Rapid Ideation",
            week: 3,
            tasks: [{
              description: "Generate 8 solution concepts in 8 minutes",
              deliverableType: "ideation_sketches",
              validationCriteria: [
                "All 8 panels completed",
                "Diversity of concepts demonstrated",
                "Top 3 concepts selected by team vote"
              ]
            }]
          },
          {
            toolId: "triz_scamper",
            name: "TRIZ & SCAMPER Ideation",
            week: 3,
            tasks: [{
              description: "Systematic ideation using frameworks",
              deliverableType: "framework_ideation",
              validationCriteria: [
                "Minimum 5 TRIZ principles explored",
                "All 7 SCAMPER techniques applied",
                "At least 20 ideas generated",
                "Top 5 ideas evaluated"
              ]
            }]
          },
          {
            toolId: "six_paths",
            name: "Six Paths Framework",
            week: 4,
            tasks: [{
              description: "Explore all 6 paths for Blue Ocean opportunities",
              deliverableType: "six_paths_analysis",
              validationCriteria: [
                "All 6 paths explored",
                "Minimum 2 opportunities per path",
                "Top 3 Blue Ocean opportunities synthesized",
                "Value innovation clearly articulated"
              ]
            }]
          }
      ]
    },
    {
      stageNumber: 3,
      name: "Prototype & Customer Validation",
      weeks: [5, 6, 7],
      minimumScore: 70,
      tools: [
        {
          toolId: "prototyping_hub",
          name: "Multi-Tool Prototyping Hub",
          week: 5,
          tasks: [{
            description: "Build functional prototype v1",
            deliverableType: "prototype_v1",
            validationCriteria: [
              "Core value proposition demonstrated",
              "Functional enough for user testing",
              "Documentation of build process",
              "TRL-2 minimum achieved"
            ]
          }]
        },
        {
          toolId: "feedback_recording",
          name: "Structured Feedback Recording System",
          week: 6,
          tasks: [
            {
              description: "Conduct minimum 5 user tests with structured feedback",
              deliverableType: "user_test_results",
              validationCriteria: [
                "Minimum 5 users tested",
                "Structured rubrics completed for each",
                "Video recordings or transcripts available",
                "Key insights documented"
              ]
            },
            {
              description: "Iterate to prototype v2 based on feedback",
              deliverableType: "prototype_v2",
              validationCriteria: [
                "Changes documented with rationale",
                "User feedback directly addressed",
                "Iteration log maintained",
                "TRL-3 achieved"
              ]
            },
            {
              description: "Second round testing (5+ users)",
              deliverableType: "user_test_results_v2",
              validationCriteria: [
                "Improvement in usability scores",
                "NPS > 6/10",
                "Problem-solution fit validated",
                "Ready for TRL-4"
              ]
            }
          ]
        },
        {
            toolId: "prototyping_trl4", // Renamed ID to avoid collision with prev usage
            name: "Prototype Iteration to TRL-4",
            week: 7,
            tasks: [{
              description: "Refine to working TRL-4 prototype",
              deliverableType: "prototype_trl4",
              validationCriteria: [
                "All core features functional",
                "User testing shows positive validation",
                "Technical feasibility demonstrated",
                "Ready for demo"
              ]
            }]
          }
      ]
    },
    {
      stageNumber: 4,
      name: "Fundraising for MVP",
      weeks: [8, 9],
      minimumScore: 75,
      tools: [
        {
          toolId: "tam_sam_som",
          name: "TAM/SAM/SOM Market Size Calculator",
          week: 8,
          tasks: [{
            description: "Calculate market opportunity with evidence",
            deliverableType: "market_sizing",
            validationCriteria: [
              "TAM/SAM/SOM clearly calculated",
              "Multiple methodologies used",
              "Sources cited for all assumptions",
              "Sanity checks passed"
            ]
          }]
        },
        {
          toolId: "bmc",
          name: "Business Model Canvas",
          week: 8,
          tasks: [{
            description: "Complete evidence-based BMC",
            deliverableType: "business_model_canvas",
            validationCriteria: [
              "All 9 blocks completed",
              "Evidence linked from research",
              "Revenue model clearly defined",
              "Cost structure realistic"
            ]
          }]
        },
        {
          toolId: "budget_planner",
          name: "Fund Utilization Breakdown",
          week: 8,
          tasks: [{
            description: "Create 12-month budget plan",
            deliverableType: "budget_plan",
            validationCriteria: [
              "All categories budgeted",
              "Milestones linked to spending",
              "Runway calculation included",
              "Assumptions documented"
            ]
          }]
        },
        {
          toolId: "pitchdeck",
          name: "Pitchdeck Builder",
          week: 8,
          tasks: [{
            description: "Build investor-ready pitchdeck",
            deliverableType: "pitchdeck",
            validationCriteria: [
              "All 12 core slides completed",
              "Evidence-backed claims",
              "Professional design",
              "Story arc flows naturally",
              "Ask clearly stated"
            ]
          }]
        },
        {
          toolId: "pitch_practice",
          name: "Pitch Demo Preparation",
          week: 9,
          tasks: [
            {
              description: "Record practice pitch",
              deliverableType: "practice_pitch_video",
              validationCriteria: [
                "3-minute pitch delivered",
                "All key points covered",
                "Confident delivery"
              ]
            },
            {
              description: "Final pitch demo to cohort/mentors",
              deliverableType: "final_pitch",
              validationCriteria: [
                "Presented to evaluation panel",
                "Q&A handled effectively",
                "Scoring > 70/100"
              ]
            }
          ]
        }
      ]
    }
  ]

  for (const stage of roadmapData) {
    const createdStage = await prisma.roadmapStage.create({
      data: {
        stageNumber: stage.stageNumber,
        name: stage.name,
        weeks: stage.weeks,
        minimumScore: stage.minimumScore,
      }
    })

    console.log(`Created Stage: ${stage.name}`)

    for (const tool of stage.tools) {
      const createdTool = await prisma.roadmapTool.create({
        data: {
          toolId: tool.toolId,
          name: tool.name,
          week: tool.week,
          description: tool.description,
          timeEstimateHours: tool.timeEstimateHours,
          isLocked: tool.isLocked ?? true,
          stageId: createdStage.id
        }
      })
      
      console.log(`  Created Tool: ${tool.name}`)

      for (const task of tool.tasks) {
        await prisma.roadmapTask.create({
          data: {
            description: task.description,
            deliverableType: task.deliverableType ?? "generic",
            validationCriteria: task.validationCriteria ?? [],
            toolId: createdTool.id
          }
        })
      }
    }
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
