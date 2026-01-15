import { useQuery } from "@tanstack/react-query"

export function useSolutions() {
    return useQuery({
        queryKey: ['solutions'],
        queryFn: async () => [
            {
                id: '1',
                title: 'Solar-Powered Cold Storage',
                description: 'Small-scale solar cold storage units for fishermen to preserve catch.',
                status: 'piloting',
                sectors: [{ name: 'Fisheries' }, { name: 'Energy' }],
                problemStatements: [{ title: 'Lack of cold storage' }],
                implementedIn: ['Mangaluru', 'Ullal'],
                beneficiaries: 'Small-scale fishermen',
                budget: 500000,
                impactStory: 'Reduced spoilage by 40% in pilot group.'
            }
        ]
    })
}

export function useInstitutions() {
    return useQuery({
        queryKey: ['institutions'],
        queryFn: async () => [
            {
                id: '1',
                name: 'Fisheries College Mangaluru',
                type: 'Academic',
                districts: ['Mangaluru'],
                website: 'https://cofm.edu.in',
                email: 'contact@cofm.edu.in',
                focusAreas: ['Fisheries Science', 'Aquaculture'],
                servicesOffered: ['Research', 'Training', 'Consultancy'],
                description: 'Leading institute for fisheries education and research.'
            }
        ]
    })
}
