import { useQuery } from "@tanstack/react-query"

const MOCK_INSTITUTIONS = [
    {
        id: "1",
        name: "Shri Kshetra Dharmasthala Rural Development Project",
        shortName: "SKDRDP",
        type: "NGO",
        description: "India's largest rural development NGO with 4.25 lakh SHGs and 38.7 lakh members.",
        website: "www.skdrdpindia.org",
        phone: "08256-266666",
        email: "ho@skdrdpindia.org",
        district: "Dakshina Kannada",
        headquarters: "Dharmasthala, Dakshina Kannada - 574216",
        districts: ["Dakshina Kannada", "Udupi", "Shivamogga", "Chikkamagaluru", "Hassan", "Kodagu", "Mysuru", "Mandya", "Chamarajanagar"],
        sectors: ["Agriculture", "Rural Development", "Women Empowerment"],
        resourcesOffered: ["Microfinance", "SHG Formation", "Agricultural Extension"],
        verificationStatus: "Verified",
        missionStatement: "To empower rural women and farmers through self-help groups and sustainable development practices."
    },
    {
        id: "2",
        name: "NITK Innovation & Incubation Centre",
        shortName: "NITK-IIC",
        type: "Incubator",
        description: "Technology incubator at National Institute of Technology Karnataka supporting startups in engineering and technology domains.",
        website: "www.nitk.ac.in",
        phone: "0824-2474000",
        district: "Dakshina Kannada",
        focusSectors: ["Industrial Growth", "Digital Infrastructure"],
        resourcesOffered: ["Mentorship", "Lab Space", "Technical Guidance"],
        fundingRange: "₹2L - ₹10L",
        supportsStages: ["Idea", "Prototype", "Pilot"],
        verified: true
    },
    {
        id: "3",
        name: "NABARD Karnataka Regional Office",
        shortName: "NABARD",
        type: "Financial",
        description: "National Bank for Agriculture and Rural Development providing refinance and development support.",
        website: "nabard.org",
        district: "All districts",
        focusSectors: ["Agriculture", "Rural Development"],
        resourcesOffered: ["Refinance", "Watershed Development Funds"],
        fundingType: ["Loan", "Grant"],
        verified: true
    }
]

export function useInstitutions(filters?: any) {
    return useQuery({
        queryKey: ['institutions', filters],
        queryFn: async () => MOCK_INSTITUTIONS
    })
}

export function useInstitution(id: string) {
    return useQuery({
        queryKey: ['institution', id],
        queryFn: async () => MOCK_INSTITUTIONS.find(i => i.id === id) || MOCK_INSTITUTIONS[0]
    })
}
