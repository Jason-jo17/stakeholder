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
            return <MTPCanvas tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'mind_map_5w1h':
            return <MindMap5W1H tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'empathy_map':
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
