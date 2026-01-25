"use client"

import { MTPCanvas } from "./tools/MTPCanvas"
import { MindMap5W1H } from "./tools/MindMap5W1H"
import { EmpathyMap } from "./tools/EmpathyMap"
import { SevenWhys } from "./tools/SevenWhys"
import { FishboneDiagram } from "./tools/FishboneDiagram"
import { EventPattern } from "./tools/event-pattern/EventPattern"
import { StakeholderMapping } from "./tools/stakeholder-mapping/StakeholderMapping"
import { InterviewGuide } from "./tools/interview-guide/InterviewGuide"
import { AffinityMapping } from "./tools/affinity-mapping/AffinityMapping"
import { VPCBuilder } from "./tools/vpc/VPCBuilder"
import { ERRCCanvas } from "./tools/errc/ERRCCanvas"
import { PersonaJourneyTool } from './tools/persona-journey/PersonaJourneyTool'
import { Crazy8Tool } from './tools/crazy8/Crazy8Tool'
import { InnovationTool } from './tools/innovation/InnovationTool'
import { SixPathsTool } from './tools/six-paths/SixPathsTool'
import { PrototypingHub } from './tools/prototyping-hub'
import { UserTestingHub } from './tools/user-testing'
import PitchDeckBuilder from './tools/pitch-deck/PitchDeckBuilder'

interface ToolRunnerProps {
    tool: any
    progress: any
    onDataSaved?: () => void
}

export function ToolRunner({ tool, progress, onDataSaved }: ToolRunnerProps) {
    if (!tool) return null

    // Map toolId to component
    switch (tool.toolId) {
        case 'mtp_ikigai':
        case 'mtp_canvas':
            return <MTPCanvas tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'mind_map_5w1h':
        case 'mind_mapping_5w1h':
            return <MindMap5W1H tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'empathy_map':
        case 'empathy_mapping':
            return <EmpathyMap tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'seven_whys':
            return <SevenWhys tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'fishbone_diagram':
            return <FishboneDiagram tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'event_pattern':
            return <EventPattern tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'stakeholder_mapping':
        case 'stakeholder_value': // Unify both tools
            return <StakeholderMapping tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'interview_guide':
        case 'interview_framework': // Handle DB mismatch
            return <InterviewGuide tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'affinity_mapping':
            return <AffinityMapping tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'vpc':
        case 'vpc_tool':
        case 'vpu':
        case 'value_proposition':
            return <VPCBuilder tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'errc_grid':
        case 'errc_analysis':
        case 'errc':
            return <ERRCCanvas tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'user_persona':
        case 'persona_mapping':
        case 'journey_map':
        case 'user_persona_journey':
            return <PersonaJourneyTool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'crazy8':
        case 'crazy_8s':
        case 'crazy_8':
        case 'rapid_ideation':
        case 'solution_design':
            return <Crazy8Tool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'innovation':
        case 'systematic_innovation':
        case 'triz':
        case 'scamper':
        case 'triz_scamper':
        case 'innovation_builder':
            return <InnovationTool tool={tool} progress={progress} />

        case 'six_paths':
        case 'blue_ocean':
        case 'market_boundaries':
            return <SixPathsTool tool={tool} progress={progress} />

        case 'prototyping_hub':
        case 'prototype_builder':
        case 'trl_tracker':
            return <PrototypingHub tool={tool} progress={progress} />
        case 'user_testing':
        case 'feedback_hub':
        case 'usability_testing':
        case 'feedback_recorder':
            return <UserTestingHub tool={tool} progress={progress} />
        case 'pitch_deck':
        case 'pitch_deck_builder':
        case 'pitchdeck_builder':
        case 'investor_deck':
            return <PitchDeckBuilder tool={tool} progress={progress} />
        default:
            return (
                <div className="p-8 border-2 border-dashed rounded-xl text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🛠️</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">Tool Not Found</h3>
                    <p className="text-sm text-slate-500">The tool "{tool.toolId}" has not been implemented yet.</p>
                </div>
            )
    }
}
