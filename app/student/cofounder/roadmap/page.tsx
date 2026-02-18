"use client"

import { useEffect, useState } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RoadmapPage() {
    const [events, setEvents] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [newEvent, setNewEvent] = useState({
        title: "",
        startDate: "",
        endDate: "",
        category: "experiment"
    })

    useEffect(() => {
        const fetchMilestones = async () => {
             const res = await fetch('/api/student/roadmap')
             const data = await res.json()
             const calendarEvents = (data.milestones || []).map((m: any) => ({
                 title: m.title,
                 start: m.startDate,
                 end: m.endDate,
                 backgroundColor: getCategoryColor(m.category),
                 borderColor: getCategoryColor(m.category),
                 extendedProps: { description: m.description, category: m.category }
             }))
             setEvents(calendarEvents)
        }
        fetchMilestones()
    }, [])

    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'trl': return '#3b82f6'
            case 'experiment': return '#10b981'
            case 'compliance': return '#f59e0b'
            case 'funding': return '#8b5cf6'
            default: return '#6b7280'
        }
    }

    const handleDateSelect = (selectInfo: any) => {
        setNewEvent({ ...newEvent, startDate: selectInfo.startStr, endDate: selectInfo.endStr })
        setOpen(true)
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/student/roadmap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
            })
            if (res.ok) {
                const created = await res.json()
                setEvents([...events, {
                    title: created.title,
                    start: created.startDate,
                    end: created.endDate,
                    backgroundColor: getCategoryColor(created.category)
                }])
                setOpen(false)
            }
        } catch (error) {
            console.error("Failed to create milestone", error)
        }
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/student/cofounder"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Journey Roadmap</h1>
                        <p className="text-muted-foreground">Plan your milestones and experiments.</p>
                    </div>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Milestone</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Milestone</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input 
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select 
                                    value={newEvent.category} 
                                    onValueChange={(v) => setNewEvent({...newEvent, category: v})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="trl">TRL Achievement</SelectItem>
                                        <SelectItem value="experiment">Experiment</SelectItem>
                                        <SelectItem value="compliance">Compliance Task</SelectItem>
                                        <SelectItem value="funding">Funding Round</SelectItem>
                                        <SelectItem value="product">Product Launch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input type="date" value={newEvent.startDate} onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Input type="date" value={newEvent.endDate} onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})} />
                                </div>
                            </div>
                            <Button onClick={handleSubmit} className="w-full">Create Milestone</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="h-[700px]">
                <CardContent className="p-0 h-full">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek'
                        }}
                        selectable={true}
                        select={handleDateSelect}
                        events={events}
                        height="100%"
                        eventClick={(info) => alert(`Event: ${info.event.title}`)}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
