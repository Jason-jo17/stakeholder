import { useQuery } from "@tanstack/react-query"

export function useTranscripts() {
    return useQuery({
        queryKey: ['transcripts'],
        queryFn: async () => {
            // Mock data
            return [
                {
                    id: '1',
                    title: 'Stakeholder Interview - Phase 1',
                    recordedDate: new Date().toISOString(),
                    transcriptType: 'Interview',
                    processingStatus: 'completed',
                    summary: 'Discussed key challenges in the fishing sector...',
                    themes: ['Sustainability', 'Funding', 'Regulatory Issues'],
                    keyQuotes: ["We need better equipment.", "The policy is unclear."],
                    qualityScore: 85,
                    stakeholder: { user: { name: 'Ramesh Kumar' } },
                    stakeholderId: '1',
                    interviewer: ['John Doe'],
                    problemsIdentified: ['Lack of funding'],
                    solutionsDiscussed: ['Micro-loans'],
                    sentimentAnalysis: 'Negative'
                }
            ]
        }
    })
}

export async function getTranscript(id: string) {
    // Mock data
    return {
        id,
        title: 'Stakeholder Interview - Phase 1',
        recordedDate: new Date().toISOString(),
        transcriptType: 'Interview',
        processingStatus: 'completed',
        summary: 'Discussed key challenges in the fishing sector...',
        visualSummary: 'Detailed breakdown of the interview...',
        themes: ['Sustainability', 'Funding', 'Regulatory Issues'],
        keyQuotes: ["We need better equipment.", "The policy is unclear."],
        rawText: "Interviewer: How is the fishing season? \n\nInterviewee: It is tough...",
        qualityScore: 85,
        stakeholder: { user: { name: 'Ramesh Kumar' } },
        stakeholderId: '1',
        interviewer: ['John Doe'],
        problemsIdentified: ['Lack of funding'],
        solutionsDiscussed: ['Micro-loans'],
        sentimentAnalysis: 'Negative',
        annotations: [],
        calendarEvent: { duration: 45, eventId: '123' },
        eventId: '123',
        documentFile: '/path/to/doc.pdf',
        language: 'Kannada'
    }
}
