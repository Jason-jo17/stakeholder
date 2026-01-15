import { useQuery } from "@tanstack/react-query"
import { StakeholderProfile } from "@/types"

export function useManagerProfile() {
    return useQuery({
        queryKey: ['manager-profile'],
        queryFn: async () => {
            return {
                id: "manager-1",
                user: { name: "Dr. Sharma", email: "sharma@example.com", avatar: null },
                organization: "Innovation Incubation Center",
                role: "Senior Program Manager"
            }
        }
    })
}

export function useMyMentees() {
    return useQuery({
        queryKey: ['my-mentees'],
        queryFn: async () => {
            // Mock data
            return [
                {
                    id: "student-1",
                    user: { name: "Aditya Rao", avatar: null },
                    institution: "NITK Surathkal",
                    program: "B.Tech Review",
                    projectName: "AgriSense",
                    _count: {
                        stakeholders: 5,
                        interactions: 12,
                        valuePropositions: 2
                    },
                    stakeholders: [],
                    interactions: [],
                    valuePropositions: []
                },
                {
                    id: "student-2",
                    user: { name: "Priya Shetty", avatar: null },
                    institution: "Sahyadri College",
                    program: "MBA",
                    projectName: "EduConnect",
                    _count: {
                        stakeholders: 3,
                        interactions: 8,
                        valuePropositions: 1
                    },
                    stakeholders: [],
                    interactions: [],
                    valuePropositions: []
                }
            ]
        }
    })
}

export function useMentee(id: string) {
    return useQuery({
        queryKey: ['mentee', id],
        queryFn: async () => {
            return {
                id,
                user: { name: "Aditya Rao", avatar: null, email: "aditya@example.com" },
                institution: "NITK Surathkal",
                program: "B.Tech Review",
                projectName: "AgriSense",
                _count: {
                    stakeholders: 5,
                    interactions: 12,
                    valuePropositions: 2
                },
                stakeholders: [
                    { id: "sh-1", user: { name: "Rajesh Kumar" }, organization: "Tech Solutions" }
                ],
                interactions: [
                    { id: "i-1", type: "Meeting", subject: "Intro", occurredAt: new Date().toISOString() }
                ],
                valuePropositions: [
                    { id: "vp-1", productsServices: ["AgriSense App"], validationStatus: "validated", createdAt: new Date().toISOString(), customerJobs: [], pains: [], gains: [], painRelievers: [], gainCreators: [] }
                ]
            }
        }
    })
}
