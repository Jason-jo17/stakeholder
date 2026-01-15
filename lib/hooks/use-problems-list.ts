import { useQuery } from "@tanstack/react-query"

export function useProblemStatements() {
    return useQuery({
        queryKey: ['problem-statements'],
        queryFn: async () => [
            { id: '1', title: 'Declining Coffee Yields Due to Climate Change' },
            { id: '2', title: 'Digital Divide in Government Schools' },
            { id: '3', title: 'Lack of Cold Storage for Small Fishermen' },
            { id: '4', title: 'Tribal Healthcare Accessibility' }
        ]
    })
}
