import { useQuery } from "@tanstack/react-query"
import { StakeholderProfile } from "@/types"

export function useStudentProfile() {
    return useQuery({
        queryKey: ['student-profile'],
        queryFn: async () => {
            // Mock data
            return {
                id: "student-1",
                user: { name: "Aditya Rao", email: "aditya@example.com" },
                _count: {
                    interactions: 12
                },
                manager: {
                    organization: "Incubation Center",
                    role: "Program Manager",
                    user: { name: "Dr. Sharma", avatar: null }
                },
                interactions: [
                    { id: "1", type: "Meeting", subject: "Initial Connection", occurredAt: new Date().toISOString() }
                ]
            }
        }
    })
}

export function useMyStakeholders() {
    return useQuery({
        queryKey: ['my-stakeholders'],
        queryFn: async () => {
            // Mock data
            return [
                {
                    id: "sh-1",
                    user: { name: "Rajesh Kumar", avatar: null },
                    district: "Mangaluru",
                    designation: "Director",
                    organization: "Tech Solutions",
                    sectors: [{ id: "1", name: "Technology", color: "#8B5CF6" }],
                    problemStatements: [],
                    _count: { interactions: 3, linkedStakeholders: 2 },
                    verificationStatus: 'verified'
                } as any as StakeholderProfile[]
            ]
        }
    })
}

export function useMyValuePropositions() {
    return useQuery({
        queryKey: ['my-value-props'],
        queryFn: async () => {
            return [
                {
                    id: "vp-1",
                    customerJobs: ["Improve crop yield"],
                    pains: ["Pest attacks", "Water shortage"],
                    gains: ["Higher income", "Sustainability"],
                    painRelievers: ["Smart monitoring"],
                    gainCreators: ["Data driven insights"],
                    productsServices: ["AgriSense IoT"],
                    validationStatus: "validated",
                    createdAt: new Date().toISOString()
                }
            ]
        }
    })
}
