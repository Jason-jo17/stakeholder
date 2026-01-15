import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface InterviewSidebarProps {
    selectedDate: Date | null
    onScheduleClick: () => void
}

export function InterviewSidebar({ selectedDate, onScheduleClick }: InterviewSidebarProps) {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Calendar</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate || new Date()}
                        className="rounded-md border shadow"
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground text-center py-4">
                        No upcoming interviews scheduled.
                    </div>
                    <Button className="w-full" onClick={onScheduleClick}>
                        Schedule New
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Filters</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">All</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">Interviews</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">Meetings</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">Follow-ups</Badge>
                </CardContent>
            </Card>
        </div>
    )
}
