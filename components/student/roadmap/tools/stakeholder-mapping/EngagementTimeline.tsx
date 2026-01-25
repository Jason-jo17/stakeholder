
"use client"

import { useState } from "react"
import { Stakeholder, Interaction } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MessageSquare, Phone, Mail, Users, Plus, Trash2 } from "lucide-react"

interface Props {
    stakeholder: Stakeholder
    onUpdate: (s: Stakeholder) => void
    readOnly?: boolean
}

const INTERACTION_TYPES = [
    { id: "meeting", label: "Meeting", icon: Users },
    { id: "call", label: "Call", icon: Phone },
    { id: "email", label: "Email", icon: Mail },
    { id: "workshop", label: "Workshop", icon: Calendar },
    { id: "other", label: "Other", icon: MessageSquare }
]

export function EngagementTimeline({ stakeholder, onUpdate, readOnly }: Props) {
    const [isAdding, setIsAdding] = useState(false)
    const [newInteraction, setNewInteraction] = useState<Partial<Interaction>>({
        type: "meeting",
        date: new Date().toISOString().split('T')[0],
        notes: ""
    })

    const handleAdd = () => {
        if (!newInteraction.notes || !newInteraction.date) return

        const interaction: Interaction = {
            id: crypto.randomUUID(),
            date: newInteraction.date!,
            type: newInteraction.type as any,
            notes: newInteraction.notes!,
            outcome: newInteraction.outcome || ""
        }

        const updated = {
            ...stakeholder,
            interactions: [interaction, ...(stakeholder.interactions || [])]
        }
        
        onUpdate(updated)
        setIsAdding(false)
        setNewInteraction({ type: "meeting", date: new Date().toISOString().split('T')[0], notes: "" })
    }

    const handleDelete = (id: string) => {
        if (readOnly) return
        const updated = {
            ...stakeholder,
            interactions: stakeholder.interactions.filter(i => i.id !== id)
        }
        onUpdate(updated)
    }

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm text-slate-700">Engagement History</h4>
                {!readOnly && (
                    <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-3 w-3 mr-2" /> Log Interaction
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
                    <div className="flex gap-2">
                        <div className="w-1/3">
                            <Label className="text-xs">Date</Label>
                            <Input 
                                type="date" 
                                value={newInteraction.date} 
                                onChange={e => setNewInteraction({...newInteraction, date: e.target.value})}
                                className="bg-white h-8" 
                            />
                        </div>
                        <div className="w-2/3">
                            <Label className="text-xs">Type</Label>
                            <Select 
                                value={newInteraction.type} 
                                onValueChange={v => setNewInteraction({...newInteraction, type: v as any})}
                            >
                                <SelectTrigger className="bg-white h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {INTERACTION_TYPES.map(t => (
                                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs">Notes</Label>
                        <Textarea 
                            value={newInteraction.notes}
                            onChange={e => setNewInteraction({...newInteraction, notes: e.target.value})}
                            placeholder="What was discussed?"
                            className="bg-white text-sm"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                        <Button size="sm" onClick={handleAdd}>Save Log</Button>
                    </div>
                </div>
            )}

            <ScrollArea className="flex-1 pr-4 -mr-4">
                <div className="space-y-4">
                    {(!stakeholder.interactions || stakeholder.interactions.length === 0) && (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            No interactions logged correctly.
                        </div>
                    )}
                    {stakeholder.interactions?.map((item) => {
                        const Icon = INTERACTION_TYPES.find(t => t.id === item.type)?.icon || MessageSquare
                        return (
                            <div key={item.id} className="relative pl-8 pb-4 border-l-2 border-slate-100 last:border-0 last:pb-0">
                                <div className="absolute -left-[9px] top-0 bg-white p-1 rounded-full border">
                                    <Icon className="h-3 w-3 text-slate-500" />
                                </div>
                                <div className="text-xs text-slate-500 mb-1">{item.date} • <span className="capitalize">{item.type}</span></div>
                                <div className="text-sm text-slate-800 bg-slate-50 p-3 rounded-md border">
                                    {item.notes}
                                    {item.outcome && (
                                        <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-600 font-medium">
                                            Outcome: {item.outcome}
                                        </div>
                                    )}
                                </div>
                                {!readOnly && (
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="absolute right-2 top-0 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
