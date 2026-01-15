import { useQuery } from "@tanstack/react-query"

export function useStakeholders() {
    return useQuery({
        queryKey: ['stakeholders'],
        queryFn: async () => {
            // Mock data
            return [
                { id: '1', user: { name: 'Alice Smith' } },
                { id: '2', user: { name: 'Bob Jones' } },
            ]
        }
    })
}

export async function getCalendarEvents() {
    // Mock data
    return [
        {
            id: '1',
            title: 'Interview with Alice',
            start: new Date().toISOString(),
            end: new Date(new Date().getTime() + 3600000).toISOString(),
            type: 'Interview',
            stakeholder: { user: { name: 'Alice Smith' } }
        }
    ]
}

export function useCalendarEvents() {
    return useQuery({
        queryKey: ['calendar-events'],
        queryFn: getCalendarEvents
    })
}
