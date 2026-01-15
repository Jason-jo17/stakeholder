import { useQuery } from "@tanstack/react-query"
import { StakeholderProfile } from "@/types"
import { STAKEHOLDER_DATA } from "@/lib/data/stakeholders-data"
import { MOCK_PROBLEMS } from "./use-problems"
import { SECTOR_METADATA } from "@/hooks/use-master-data"

// Helper to map sector name to metadata
const getSectorMetadata = (name: string) => {
    return SECTOR_METADATA[name] || { slug: name.toLowerCase().replace(/\s+/g, '-'), icon: "📌", color: "#94a3b8" }
}

const mapStakeholderCurrent = (raw: any): StakeholderProfile => {
    return {
        id: raw.id,
        userId: raw.id.toLowerCase(), // Generating pseudo-userId
        designation: raw.designation,
        organization: raw.organization,
        organizationType: raw.organizationType,
        bio: raw.bio || `${raw.designation} at ${raw.organization}`,
        expertise: raw.expertise || [],
        district: raw.district,
        taluk: raw.taluk,
        village: null, // Raw data doesn't provide village consistently
        latitude: 0, // Placeholder
        longitude: 0, // Placeholder
        officePhone: raw.phone || raw.alternatePhone || null,
        whatsapp: null,
        linkedIn: null,
        website: raw.website || null,
        tags: [...(raw.sectors || []), raw.organizationType],
        verificationStatus: raw.verificationStatus || "unverified",
        lastContacted: new Date(),
        yearsExperience: raw.yearsExperience || 10, // Default if missing
        teamSize: raw.teamSize || 0,
        user: {
            name: raw.name,
            email: raw.email || "contact@example.com",
            avatar: null,
            phone: raw.phone || null
        },
        sectors: (raw.sectors || []).map((sec: string, idx: number) => ({
            id: `sec-${idx}`,
            name: sec,
            ...getSectorMetadata(sec)
        })),
        problemStatements: (raw.problemStatements || []).map((psId: string) => {
            const prob = MOCK_PROBLEMS.find(p => p.code === psId)
            return {
                id: psId,
                title: prob ? prob.title : `Unmapped Problem (${psId})`,
                description: prob ? prob.description : "Problem statement details pending mapping.",
                severity: prob ? prob.severity : "Medium"
            }
        }),
        _count: {
            interactions: 0,
            linkedStakeholders: 0
        }
    }
}

const MOCK_STAKEHOLDERS: StakeholderProfile[] = STAKEHOLDER_DATA.stakeholders.map(mapStakeholderCurrent)

export function useStakeholders(filters?: any) {
    return useQuery({
        queryKey: ['stakeholders', filters],
        queryFn: async () => {
            let filtered = [...MOCK_STAKEHOLDERS]

            if (filters?.query) {
                const q = filters.query.toLowerCase()
                filtered = filtered.filter(s =>
                    s.user.name.toLowerCase().includes(q) ||
                    s.organization?.toLowerCase().includes(q) ||
                    s.designation.toLowerCase().includes(q) ||
                    s.expertise.some(e => e.toLowerCase().includes(q)) ||
                    s.problemStatements.some(ps => ps.id.toLowerCase().includes(q) || ps.title.toLowerCase().includes(q))
                )
            }

            if (filters?.sectors && filters.sectors.length > 0) {
                filtered = filtered.filter(s =>
                    // Check matches against name (since we store names in filters) or slug
                    s.sectors.some(sec => filters.sectors.includes(sec.name) || filters.sectors.includes(sec.id))
                )
            }

            if (filters?.problemStatements && filters.problemStatements.length > 0) {
                filtered = filtered.filter(s =>
                    s.problemStatements.some(ps => filters.problemStatements.includes(ps.id))
                )
            }

            if (filters?.districts && filters.districts.length > 0) {
                filtered = filtered.filter(s =>
                    filters.districts.includes(s.district)
                )
            }

            return {
                stakeholders: filtered,
                pagination: {
                    total: filtered.length,
                    page: 1,
                    limit: 10
                }
            }
        }
    })
}

export function useStakeholder(id: string) {
    return useQuery({
        queryKey: ['stakeholder', id],
        queryFn: async () => MOCK_STAKEHOLDERS.find(s => s.id === id) || MOCK_STAKEHOLDERS[0]
    })
}
