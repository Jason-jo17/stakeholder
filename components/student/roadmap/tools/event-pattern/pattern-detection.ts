
import { EventLog, Pattern } from "./types"
import { differenceInHours, parseISO, getDay, getHours } from "date-fns"

export function detectPatterns(events: EventLog[]): Pattern[] {
    const patterns: Pattern[] = []
    
    if (events.length < 3) return patterns

    // 1. High Severity Cluster
    // Detect if there are multiple high severity events (4 or 5) in a short period (48 hours)
    const highSevEvents = events.filter(e => e.severity >= 4).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    
    for (let i = 0; i < highSevEvents.length - 1; i++) {
        const current = highSevEvents[i]
        const next = highSevEvents[i+1]
        
        if (differenceInHours(parseISO(next.timestamp), parseISO(current.timestamp)) < 48) {
            patterns.push({
                id: `sev-cluster-${current.id}`,
                type: "severity_spike",
                description: "Multiple high-severity issues occurring within 48 hours.",
                confidence: 0.8,
                relatedEventIds: [current.id, next.id]
            })
            // Skip next to avoid overlap spam
            i++ 
        }
    }

    // 2. Time of Day Clustering
    const morningEvents = events.filter(e => {
        const h = getHours(parseISO(e.timestamp))
        return h >= 6 && h < 12
    })
    
    if (morningEvents.length >= 3 && (morningEvents.length / events.length) > 0.6) {
        patterns.push({
            id: "morning-cluster",
            type: "time_cluster",
            description: "Problems consistently occur in the morning hours.",
            confidence: 0.7,
            relatedEventIds: morningEvents.map(e => e.id)
        })
    }

    // 3. Frequency Spike
    // More than 5 events in the last 7 days?
    // (Simplified for this heuristic: just check total density)
    
    return patterns
}
