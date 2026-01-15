import { Card, CardContent } from "@/components/ui/card"

export function InterviewList({ events }: { events: any[] }) {
    if (!events?.length) {
        return (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
                No events found.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <Card key={event.id}>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(event.startTime).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                                {event.type}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
