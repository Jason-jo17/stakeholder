import { useQuery } from "@tanstack/react-query"

// Mock Data
const MOCK_REPORTS = [
    {
        id: "1",
        title: "Impact of Climate Change on Coffee Yields in Kodagu",
        scope: "Regional Analysis",
        generatedBy: "System AI",
        generatedAt: "2024-01-15T10:00:00Z",
        status: "Completed",
        questions: ["What are the primary climate drivers affecting yield?", "Which coffee varieties are most resilient?"],
        keyFindings: [
            "Yields have dropped 15% on average over 5 years.",
            "Robusta is showing higher resilience than Arabica.",
            "Irrigation costs have risen by 25%."
        ],
        sectors: [{ name: "Agriculture", id: "s1" }],
        sources: [
            { title: "KVK Annual Report 2023", type: "PDF", url: "#" },
            { title: "Interview with Dr. Shankaranarayana", type: "Transcript", url: "#" }
        ],
        content: "Full report content goes here..."
    },
    {
        id: "2",
        title: "Rural Healthcare Accessibility Gap Analysis",
        scope: "Demographic Study",
        generatedBy: "User Request",
        generatedAt: "2024-01-14T14:30:00Z",
        status: "Processing",
        questions: ["Which taluks have the lowest doctor-to-patient ratio?", "What is the average travel time to PHCs?"],
        keyFindings: [],
        sectors: [{ name: "Healthcare", id: "s2" }],
        sources: [],
        content: ""
    }
]

export function useResearchReports() {
    return useQuery({
        queryKey: ['research-reports'],
        queryFn: async () => MOCK_REPORTS
    })
}

export function useResearchReport(id: string) {
    return useQuery({
        queryKey: ['research-report', id],
        queryFn: async () => MOCK_REPORTS.find(r => r.id === id) || MOCK_REPORTS[0]
    })
}

export function useSectors() {
    return useQuery({
        queryKey: ['sectors'],
        queryFn: async () => [
            { id: 's1', name: 'Agriculture' },
            { id: 's2', name: 'Healthcare' },
            { id: 's3', name: 'Education' }
        ]
    })
}

export function useDataSourceStats(params: any) {
    return useQuery({
        queryKey: ['data-source-stats', params],
        queryFn: async () => ({
            stakeholders: 124,
            transcripts: 45,
            interactions: 312,
            problemStatements: 24,
            stakeholderCompleteness: 85,
            transcriptQuality: 72
        })
    })
}

export function useProblemStatements() {
    return useQuery({
        queryKey: ['problems-list'],
        queryFn: async () => [
            { id: 'p1', title: 'Declining Coffee Yields' },
            { id: 'p2', title: 'Rural Healthcare Gaps' }
        ]
    })
}

export async function generateResearchReport(data: any) {
    console.log("Generating report with:", data)
    return { success: true, id: '3' } // Simulate success
}
