'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar as CalendarIcon, List, Map } from 'lucide-react'
import { EventDialog } from '@/components/calendar/EventDialog'
import { InterviewSidebar } from '@/components/calendar/InterviewSidebar'
import { InterviewList } from '@/components/calendar/InterviewList'
import { InterviewMap } from '@/components/calendar/InterviewMap'
import { getCalendarEvents } from '@/lib/hooks/use-calendar'
import { useQuery } from '@tanstack/react-query'

export default function CalendarPage() {
    const [view, setView] = useState<'calendar' | 'list' | 'map'>('calendar')
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)

    const { data: events } = useQuery({
        queryKey: ['calendar-events'],
        queryFn: getCalendarEvents
    })

    const handleDateClick = (info: any) => {
        setSelectedDate(info.date)
        setIsEventDialogOpen(true)
    }

    const handleEventClick = (info: any) => {
        setSelectedEvent(info.event)
        setIsEventDialogOpen(true)
    }

    const getEventColor = (type: string) => {
        switch (type) {
            case 'Interview': return '#3b82f6';
            case 'Meeting': return '#10b981';
            default: return '#6366f1';
        }
    }

    return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-4xl font-bold">Interview Calendar</h1>
                    <p className="text-muted-foreground mt-2">
                        Schedule and track stakeholder interviews and meetings
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={view === 'calendar' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setView('calendar')}
                    >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Calendar
                    </Button>
                    <Button
                        variant={view === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setView('list')}
                    >
                        <List className="h-4 w-4 mr-2" />
                        List
                    </Button>
                    <Button
                        variant={view === 'map' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setView('map')}
                    >
                        <Map className="h-4 w-4 mr-2" />
                        Map
                    </Button>

                    <Button onClick={() => setIsEventDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Interview
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Calendar */}
                <div className="col-span-9">
                    <Card>
                        <CardContent className="p-6">
                            {view === 'calendar' && (
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                    }}
                                    events={events?.map((e: any) => ({
                                        id: e.id,
                                        title: e.title,
                                        start: e.start,
                                        end: e.end,
                                        backgroundColor: getEventColor(e.type),
                                        extendedProps: e
                                    }))}
                                    dateClick={handleDateClick}
                                    eventClick={handleEventClick}
                                    editable={true}
                                    selectable={true}
                                    height="auto"
                                    eventContent={renderEventContent}
                                />
                            )}

                            {view === 'list' && (
                                <InterviewList events={events || []} />
                            )}

                            {view === 'map' && (
                                <InterviewMap events={events || []} />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="col-span-3">
                    <InterviewSidebar
                        selectedDate={selectedDate}
                        onScheduleClick={() => setIsEventDialogOpen(true)}
                    />
                </div>
            </div>

            {/* Event Creation/Edit Dialog */}
            <EventDialog
                open={isEventDialogOpen}
                onOpenChange={setIsEventDialogOpen}
                event={selectedEvent}
                initialDate={selectedDate}
            />
        </div>
    )
}

function renderEventContent(eventInfo: any) {
    return (
        <div className="p-1 text-xs">
            <div className="font-medium truncate">{eventInfo.event.title}</div>
            <div className="text-xs opacity-75">
                {eventInfo.event.extendedProps.stakeholder?.user?.name}
            </div>
        </div>
    )
}
