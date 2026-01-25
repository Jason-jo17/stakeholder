
"use client"

import { EventLog } from "./types"
import { format } from "date-fns"

export function EventTimeline({ events }: { events: EventLog[] }) {
    if (events.length === 0) return <div className="text-center py-8 text-muted-foreground">Log events to see the timeline.</div>

    // Simple vertical timeline for now (easier than horizontal scroll for MVP)
    // Or let's do a horizontal one using flex
    
    return (
        <div className="overflow-x-auto pb-4">
            <div className="min-w-[600px] flex gap-4 p-4 items-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 z-0" />
                
                {events.map((event, idx) => (
                    <div key={event.id} className="relative z-10 flex flex-col items-center min-w-[120px] group">
                        <div className={`
                            w-4 h-4 rounded-full border-4 border-white shadow-sm mb-2
                            ${event.type === 'problem' ? 'bg-red-500' : event.type === 'insight' ? 'bg-blue-500' : 'bg-slate-500'}
                        `} />
                        <div className="bg-white border rounded p-2 text-xs w-32 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="font-bold truncate" title={event.title}>{event.title}</div>
                            <div className="text-[10px] text-muted-foreground">{format(new Date(event.timestamp), "MMM d, h:mm a")}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
