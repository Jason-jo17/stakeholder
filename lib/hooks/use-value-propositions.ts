import { useQuery } from "@tanstack/react-query"

const MOCK_VPS = [
    {
        id: "1",
        title: "Agri-Waste to Biofuel",
        customerJobs: ["Dispose of crop residue", "Reduce fuel costs", "Sustainable farming"],
        pains: ["High disposal cost", "Pollution fines", "Labor shortage"],
        gains: ["Additional income", "Clean energy", "Government subsidy"],
        painRelievers: ["Automated collection", "Zero-cost disposal"],
        gainCreators: ["Revenue sharing model", "Carbon credits"],
        productsServices: ["Bio-pellet machine", "Collection service"],
        status: "Draft",
        updatedAt: new Date().toISOString()
    },
    {
        id: "2",
        title: "Smart Irrigation Alert System",
        customerJobs: ["Water crops efficiently", "Prevent over-watering", "Reduce electricity bill"],
        pains: ["Motor burnout", "Uneven watering", "Night shifts"],
        gains: ["Remote control", "Water saving", "Crop health data"],
        painRelievers: ["Mobile app control", "Auto-shutoff"],
        gainCreators: ["Yield prediction", "Soil health monitoring"],
        productsServices: ["IoT Sensor Node", "Mobile App"],
        status: "Validated",
        updatedAt: new Date().toISOString()
    }
]

export function useValuePropositions() {
    return useQuery({
        queryKey: ['value-propositions'],
        queryFn: async () => MOCK_VPS
    })
}

export function useValueProposition(id: string) {
    return useQuery({
        queryKey: ['value-proposition', id],
        queryFn: async () => MOCK_VPS.find(vp => vp.id === id) || MOCK_VPS[0]
    })
}
