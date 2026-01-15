import { useQuery } from "@tanstack/react-query"

export const DAKSHINA_KARNATAKA_DISTRICTS = [
    "Mangaluru",
    "Bantwal",
    "Belthangady",
    "Puttur",
    "Sullia",
    "Moodbidri",
    "Kadaba",
    "Ullal",
    "Mulki"
]

export const SECTOR_METADATA: Record<string, { slug: string, icon: string, color: string }> = {
    "Agriculture & Irrigation": { slug: "agriculture-irrigation", icon: "🌾", color: "#10b981" },
    "Rural Development": { slug: "rural-development", icon: "🏡", color: "#f59e0b" },
    "Healthcare Access": { slug: "healthcare-access", icon: "🏥", color: "#ef4444" },
    "Education Infrastructure": { slug: "education-infrastructure", icon: "🎓", color: "#3b82f6" },
    "Social Welfare": { slug: "social-welfare", icon: "🤝", color: "#ec4899" },
    "Industrial Growth & MSMEs": { slug: "industrial-growth", icon: "🏭", color: "#6366f1" },
    "Water Resources": { slug: "water-resources", icon: "💧", color: "#0ea5e9" },
    "Environmental Issues": { slug: "environmental-issues", icon: "🌳", color: "#22c55e" },
    "Tribal Development": { slug: "tribal-development", icon: "🏹", color: "#d97706" },
    "Coastal & Marine Issues": { slug: "coastal-marine", icon: "🌊", color: "#06b6d4" },
    "Tourism Development": { slug: "tourism-development", icon: "🏔️", color: "#8b5cf6" },
    "Digital Infrastructure": { slug: "digital-infrastructure", icon: "💻", color: "#64748b" },
    "Waste Management": { slug: "waste-management", icon: "♻️", color: "#84cc16" },
    "Urban Development": { slug: "urban-development", icon: "🏙️", color: "#71717a" },
    "Women Empowerment": { slug: "women-empowerment", icon: "👩", color: "#be185d" }
}

export function useSectors() {
    return Object.entries(SECTOR_METADATA).map(([name, meta]) => ({
        id: meta.slug,
        name,
        ...meta
    }))
}
