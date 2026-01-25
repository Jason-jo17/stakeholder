
import { Pattern, EventLog } from "./types"
import { AlertCircle } from "lucide-react"

export function PatternList({ patterns, events }: { patterns: Pattern[], events: EventLog[] }) {
    if (patterns.length === 0) return <div className="text-sm text-muted-foreground py-4 text-center">No distinct patterns detected yet. Log more events!</div>

    return (
        <div className="space-y-3">
            {patterns.map(p => (
                <div key={p.id} className="bg-yellow-50 border border-yellow-100 rounded p-3 text-sm">
                    <div className="flex gap-2 items-start font-medium text-yellow-900">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                        {p.type === 'severity_spike' ? "Severity Cluster" : "Time Trend"}
                    </div>
                    <p className="text-slate-700 mt-1">{p.description}</p>
                    <div className="mt-2 text-xs text-yellow-700/70">
                        Confidence: {(p.confidence * 100).toFixed(0)}%
                    </div>
                </div>
            ))}
        </div>
    )
}
