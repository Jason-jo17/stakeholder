import { useQuery } from "@tanstack/react-query"

import { PLATFORM_PROBLEMS } from "@/lib/data/platform-problems"

export const MOCK_PROBLEMS = PLATFORM_PROBLEMS.map(p => ({
    id: p.id,
    code: `PS_${p.id.substring(0, 4).toUpperCase()}`,
    title: p.title,
    severity: 'High',
    domain: p.sectors[0] || 'General',
    description: p.description,
    districts: p.regions.map(r => r.district),
    affectedPopulation: 0,
    status: 'active'
}));

export function useProblems(filters?: any) {
    return useQuery({
        queryKey: ['problems', filters],
        queryFn: async () => MOCK_PROBLEMS
    })
}

export function useProblem(id: string) {
    return useQuery({
        queryKey: ['problem', id],
        queryFn: async () => ({
            id: '1',
            code: 'PS_1.1',
            title: 'Declining Coffee Yields Due to Climate Change',
            severity: 'High',
            domain: 'Agriculture & Irrigation',
            description: 'Coffee plantations experiencing 15-20% yield decline due to erratic rainfall, increasing temperature, and pest attacks.',
            districts: ['Kodagu', 'Chikkamagaluru', 'Hassan'],
            affectedPopulation: 40447,
            status: 'active',
            rootCauses: [
                "Climate change causing temperature increase",
                "Erratic rainfall patterns",
                "Increased pest pressure"
            ],
            stakeholders: [
                { id: '1', name: 'Dr. V. Shankaranarayana', organization: 'KVK Gonikoppal' },
                { id: '2', name: 'Coffee Board Extension', organization: 'Coffee Board' }
            ],
            solutions: [
                { id: '1', title: 'Climate-Resilient Coffee Varieties', status: 'In-Progress' }
            ]
        })
    })
}
