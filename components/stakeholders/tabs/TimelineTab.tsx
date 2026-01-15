"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { interactions } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export function TimelineTab({ stakeholder }: { stakeholder: any }) {
    // Combine interactions and other events if available
    const mockEvents = [
        {
            id: 'm1',
            type: 'interaction',
            subject: 'Initial Outreach Call',
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
            notes: 'discussed coffee yield issues and potential tech interventions.',
            outcome: 'Interest expressed',
            eventType: 'interaction',
            author: 'Program Manager'
        },
        {
            id: 'm2',
            type: 'system',
            subject: 'Profile Verified',
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
            notes: 'Verification completed by Admin via phone check.',
            outcome: 'Verified Status Granted',
            eventType: 'system',
            author: 'System Admin'
        },
        {
            id: 'm4',
            type: 'student-interaction',
            subject: 'Student Field Visit',
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
            notes: 'Met with Mr. Darshan to collect data on local irrigation practices. He suggested visiting the KVK in Gonikoppal.',
            outcome: 'Data Collected',
            eventType: 'interaction',
            author: 'Student: Rahul K.',
            isStudent: true
        },
        {
            id: 'm5',
            type: 'student-update',
            subject: 'Additional Contact Info Added',
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
            notes: 'Added alternate phone number and updated email address based on field visit interaction.',
            eventType: 'update',
            author: 'Student: Rahul K.',
            isStudent: true
        },
        {
            id: 'm3',
            type: 'interaction',
            subject: 'Workshop Invitation Sent',
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
            notes: 'Invited to the "Climate Resilience in Agriculture" workshop in Madikeri.',
            outcome: 'Pending Response',
            eventType: 'interaction',
            author: 'Program Coordinator'
        }
    ]

    const events = (stakeholder.interactions && stakeholder.interactions.length > 0)
        ? [...(stakeholder.interactions || []).map((i: any) => ({ ...i, eventType: 'interaction' })).sort((a: any, b: any) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())]
        : mockEvents

    if (!events || events.length === 0) return <div className="p-8 text-center text-muted-foreground">No timeline activity found.</div>

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border">
                    {events.map((event: any) => (
                        <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                            <div className="absolute left-0 mt-1.5">
                                <div className={`h-10 w-10 rounded-full border-4 border-background flex items-center justify-center text-xs ${event.isStudent ? 'bg-blue-100 text-blue-700' : 'bg-muted'}`}>
                                    {event.isStudent ? "ST" : (event.type?.[0] || "E").toUpperCase()}
                                </div>
                            </div>
                            <div className="ml-14 flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold">{event.subject || "Event"}</h4>
                                        {event.isStudent && (
                                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-blue-50 text-blue-700 border-blue-200">
                                                Student Activity
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{format(new Date(event.occurredAt), 'PPP p')}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                                <div className="flex gap-2 mt-2">
                                    {event.outcome && <div className="text-xs bg-muted p-2 rounded w-fit">Outcome: {event.outcome}</div>}
                                    {event.author && <div className="text-xs border p-2 rounded w-fit text-muted-foreground">By: {event.author}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
