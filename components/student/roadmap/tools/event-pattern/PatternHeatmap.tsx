
"use client"

import { EventLog } from "./types"
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, Scatter, Tooltip } from "recharts"
import { getHours, getDay } from "date-fns"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function PatternHeatmap({ events }: { events: EventLog[] }) {
    if (events.length < 2) return <div className="text-center py-8 text-muted-foreground">Need more data for heatmap.</div>

    // Transform data: [day, hour, count/severity]
    const data = events.map(e => ({
        day: getDay(new Date(e.timestamp)),
        hour: getHours(new Date(e.timestamp)),
        severity: e.severity,
        name: e.title
    }))

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis type="number" dataKey="hour" name="Hour" unit="h" domain={[0, 23]} tickCount={12} />
                    <YAxis type="number" dataKey="day" name="Day" tickFormatter={(val) => DAYS[val]} domain={[0, 6]} tickCount={7} />
                    <ZAxis type="number" dataKey="severity" range={[50, 400]} name="Severity" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Events" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    )
}
