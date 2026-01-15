import { useQuery } from "@tanstack/react-query"

const MOCK_SOLUTIONS = [
    {
        id: "1",
        code: "SOL_1.1.A",
        title: "Climate-Resilient Coffee Varieties",
        description: "Introduction of Arabica Selection 795, Sln-274 varieties resistant to coffee rust and stem borer. Training growers in IPM practices including pheromone traps, bio-pesticides, and shade management.",
        implementationStatus: "In-Progress",
        solutionType: "Technology",
        estimatedBudget: 5000000,
        beneficiariesTargeted: 1200,
        districts: ["Kodagu", "Chikkamagaluru"],
        primarySector: "Agriculture",
        approach: "Use of hybrid varieties + Bio control agents",
        supportingOrgs: [
            { id: "1", name: "Coffee Board CRI", type: "Research" },
            { id: "2", name: "Tata Coffee", type: "Corporate" }
        ],
        timeline: "18-24 months",
        impactMetrics: { expectedYieldIncrease: "15%" }
    },
    {
        id: "2",
        code: "SOL_2.1.A",
        title: "Mobile Health Units for Tribal Areas",
        description: "Deployment of mobile health units staffed with doctors, nurses, and ASHA workers reaching tribal hamlets on fixed schedules.",
        implementationStatus: "Implemented",
        solutionType: "Infrastructure",
        estimatedBudget: 15000000,
        beneficiariesTargeted: 50000,
        districts: ["Mysuru", "Chamarajanagar"],
        primarySector: "Healthcare",
        approach: "Scheduled visits to Haadis (tribal hamlets)",
        supportingOrgs: [
            { id: "3", name: "SVYM", type: "NGO" }
        ],
        timeline: "Ongoing",
        impactMetrics: { maternalMortalityReduction: "40%" }
    }
]

export function useSolutions(filters?: any) {
    return useQuery({
        queryKey: ['solutions', filters],
        queryFn: async () => MOCK_SOLUTIONS
    })
}

export function useSolution(id: string) {
    return useQuery({
        queryKey: ['solution', id],
        queryFn: async () => MOCK_SOLUTIONS.find(s => s.id === id) || MOCK_SOLUTIONS[0]
    })
}
