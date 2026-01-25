
export interface ValueDimension {
    id: string
    name: string // e.g., "Financial ROI", "Social Impact", "Political Capital"
}

export interface Interaction {
    id: string
    date: string
    type: "meeting" | "email" | "call" | "workshop" | "other"
    notes: string
    outcome?: string
}

export interface Stakeholder {
    id: string
    name: string
    role: string
    organization: string
    category: "customer" | "investor" | "partner" | "regulator" | "team" | "competitor" | "other"

    // Positioning
    power: number // 1-10 (Y-axis)
    interest: number // 1-10 (X-axis)
    attitude: "supporter" | "neutral" | "blocker" | "unknown"

    // Detailed Profile
    photoUrl?: string
    background?: string
    motivations?: string[]
    contactInfo?: {
        email?: string
        phone?: string
        linkedin?: string
    }

    // Value Analysis
    painPoints: string[]
    gainOpportunities: string[]
    valuedDimensions: {
        dimensionId: string // maps to ValueDimension.id
        importance: number // 1-5
        satisfaction: number // 1-5
        gap: number // Calculated: Importance - Satisfaction
    }[]

    // Engagement
    interactions: Interaction[]
    engagementStrategy?: string
    notes?: string
}

export interface Relationship {
    id: string
    sourceId: string
    targetId: string
    type: "conflict" | "collaboration" | "communication" | "influence"
    strength: number // 1-5 line thickness
}

export interface StakeholderMapData {
    stakeholders: Stakeholder[]
    relationships: Relationship[]
    valueDimensions: ValueDimension[]
}
