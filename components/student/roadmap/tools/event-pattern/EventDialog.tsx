
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { EventLog } from "./types"

interface EventDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (event: EventLog) => void
}

export function EventDialog({ open, onOpenChange, onSave }: EventDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<EventLog['type']>("problem")
    const [severity, setSeverity] = useState([3])
    const [timeOfDay, setTimeOfDay] = useState<string>("morning")
    const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16)) // Default to now

    const handleSubmit = () => {
        const newEvent: EventLog = {
            id: crypto.randomUUID(),
            title,
            description,
            type,
            severity: severity[0],
            timestamp: new Date(datetime).toISOString(),
            context: {
                timeOfDay: timeOfDay as any
            }
        }
        onSave(newEvent)
        
        // Reset form slightly but keep context if user is bulk entering
        setTitle("")
        setDescription("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Log New Event</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label>Event Title</Label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Server Timeout during Demo" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date & Time</Label>
                            <Input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label>Type</Label>
                             <Select value={type} onValueChange={(v: any) => setType(v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="problem">Problem / Incident</SelectItem>
                                    <SelectItem value="insight">Insight / Observation</SelectItem>
                                    <SelectItem value="feedback">User Feedback</SelectItem>
                                    <SelectItem value="milestone">Milestone</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                     <div className="space-y-2">
                        <Label>Severity (1-5)</Label>
                        <div className="flex items-center gap-4">
                            <Slider 
                                value={severity} 
                                onValueChange={setSeverity} 
                                max={5} 
                                min={1} 
                                step={1} 
                                className="flex-1"
                            />
                            <span className="font-bold border px-3 py-1 rounded">{severity[0]}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description & Context</Label>
                        <Textarea 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            placeholder="What happened? Who was involved?" 
                            className="h-24"
                        />
                    </div>
                </div>

                <DialogFooter>
                     <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                     <Button onClick={handleSubmit} disabled={!title}>Log Event</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
