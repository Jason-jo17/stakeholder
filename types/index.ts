export interface StakeholderProfile {
    id: string
    userId: string
    designation: string
    organization: string | null
    organizationType: string | null
    bio: string | null
    expertise: string[]
    district: string
    taluk: string | null
    village: string | null
    latitude: number | null
    longitude: number | null
    officePhone: string | null
    whatsapp: string | null
    linkedIn: string | null
    website: string | null
    tags: string[]
    verificationStatus: "pending" | "verified" | "rejected"
    lastContacted: Date | null
    yearsExperience: number | null
    teamSize: number | null
    cadre?: string | null
    keyResponsibilities?: string[]
    jurisdiction?: string[]
    coverageDistricts?: string[]
    keyAchievements?: string[]
    resourcesOffered?: string[]
    populationServed?: number
    cropsCultivated?: string[]
    landHolding?: number
    farmingType?: string
    tribe?: string
    ngoRegistration?: string
    ngoDarpanId?: string
    languagesSpoken?: string[]
    topChallenges?: string[]
    boatType?: string
    catchType?: string[]
    serviceType?: string



    user: {
        name: string
        email: string
        avatar: string | null
        phone: string | null
    }

    sectors: Sector[]
    problemStatements: ProblemStatement[]

    _count: {
        interactions: number
        linkedStakeholders: number
    }
}

export interface Sector {
    id: string
    name: string
    slug: string
    icon: string | null
    color: string | null
}

export interface ProblemStatement {
    id: string
    title: string
    description: string
    severity: string
}
