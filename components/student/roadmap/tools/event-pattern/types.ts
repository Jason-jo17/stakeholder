
export interface EventLog {
    id: string
    title: string
    description: string
    timestamp: string // ISO date string
    type: "problem" | "insight" | "feedback" | "milestone" | "other"
    severity: number // 1 (Low) to 5 (Critical)
    context: {
        timeOfDay: "morning" | "afternoon" | "evening" | "night"
        environment?: string
        stakeholders?: string[]
    }
}

export interface Pattern {
    id: string
    type: "frequency" | "time_cluster" | "severity_spike"
    description: string
    confidence: number // 0-1
    relatedEventIds: string[]
}

export interface EventPatternData {
    events: EventLog[]
    ignoredPatternIds?: string[]
}
