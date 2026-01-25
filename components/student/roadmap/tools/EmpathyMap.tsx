"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Save, Loader2, Trash2, Mic, Image as ImageIcon, MoreVertical, GripVertical, AlertCircle } from 'lucide-react'
import { saveToolData } from '@/app/actions/roadmap'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// --- Types ---

type QuadrantType = 'says' | 'thinks' | 'does' | 'feels'

interface Note {
    id: string
    text: string
    source: 'interview' | 'observation' | 'survey'
    quadrant: QuadrantType
    color: string
}

interface Persona {
    name: string
    role: string
    description: string
    avatarUrl?: string
}

interface EmpathyMapData {
    persona: Persona
    notes: Note[]
    synthesis?: string
}

const INITIAL_DATA: EmpathyMapData = {
    persona: {
        name: "Target User",
        role: "Potential Customer",
        description: "Describe the user here..."
    },
    notes: [],
    synthesis: ""
}

const COLORS = [
    { name: 'Yellow', value: 'bg-yellow-200 hover:bg-yellow-300 text-yellow-900' },
    { name: 'Blue', value: 'bg-blue-200 hover:bg-blue-300 text-blue-900' },
    { name: 'Green', value: 'bg-green-200 hover:bg-green-300 text-green-900' },
    { name: 'Pink', value: 'bg-pink-200 hover:bg-pink-300 text-pink-900' },
]

interface EmpathyMapProps {
    tool: any
    progress: any
    onDataSaved?: () => void
}

export function EmpathyMap({ tool, progress, onDataSaved }: EmpathyMapProps) {
    const [data, setData] = useState<EmpathyMapData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null)

    // Ensure we have valid data structure if loaded from empty state
    useEffect(() => {
        if (!data.persona) setData(prev => ({ ...prev, persona: INITIAL_DATA.persona }))
        if (!data.notes) setData(prev => ({ ...prev, notes: [] }))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Empathy Map saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const addNote = (quadrant: QuadrantType) => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            text: "New observation...",
            source: 'interview',
            quadrant,
            color: 'bg-yellow-200 hover:bg-yellow-300 text-yellow-900'
        }
        setData(prev => ({
            ...prev,
            notes: [...prev.notes, newNote]
        }))
    }

    const updateNote = (id: string, updates: Partial<Note>) => {
        setData(prev => ({
            ...prev,
            notes: prev.notes.map(n => n.id === id ? { ...n, ...updates } : n)
        }))
    }

    const deleteNote = (id: string) => {
        setData(prev => ({
            ...prev,
            notes: prev.notes.filter(n => n.id !== id)
        }))
    }

    // --- Drag and Drop Logic ---

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedNoteId(id)
        e.dataTransfer.setData('text/plain', id)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e: React.DragEvent, targetQuadrant: QuadrantType) => {
        e.preventDefault()
        const noteId = e.dataTransfer.getData('text/plain')
        
        if (noteId) {
            updateNote(noteId, { quadrant: targetQuadrant })
        }
        setDraggedNoteId(null)
    }

    // --- Components ---

    const Quadrant = ({ type, title, icon }: { type: QuadrantType, title: string, icon: React.ReactNode }) => {
        const notes = data.notes?.filter(n => n.quadrant === type) || []

        return (
            <div 
                className={`flex flex-col h-full min-h-[300px] border-2 border-dashed rounded-xl p-4 transition-colors ${draggedNoteId ? 'bg-muted/30 border-primary/50' : 'bg-muted/10 border-muted-foreground/20'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, type)}
            >
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
                        {icon} {title}
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => addNote(type)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="flex-1 space-y-3">
                    {notes.map(note => (
                        <div
                            key={note.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, note.id)}
                            className={`p-3 rounded shadow-sm cursor-move group relative transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${note.color}`}
                        >
                            <div className="flex justify-between items-start gap-2">
                                <Textarea 
                                    value={note.text}
                                    onChange={(e) => updateNote(note.id, { text: e.target.value })}
                                    className="min-h-[60px] p-0 bg-transparent border-none resize-none focus-visible:ring-0 text-sm font-medium placeholder:text-black/40"
                                />
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-black/10">
                                                <MoreVertical className="h-3 w-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {COLORS.map(c => (
                                                <DropdownMenuItem key={c.name} onClick={() => updateNote(note.id, { color: c.value })}>
                                                    <div className={`w-3 h-3 rounded-full mr-2 ${c.value.split(' ')[0]}`} />
                                                    {c.name}
                                                </DropdownMenuItem>
                                            ))}
                                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteNote(note.id)}>
                                                <Trash2 className="h-3 w-3 mr-2" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="bg-black/10 hover:bg-black/20 text-xs border-none text-current opacity-70">
                                    {note.source}
                                </Badge>
                                <GripVertical className="h-3 w-3 ml-auto opacity-30" />
                            </div>
                        </div>
                    ))}
                    {notes.length === 0 && (
                        <div className="h-20 flex items-center justify-center border-2 border-dashed border-black/5 rounded text-muted-foreground text-xs italic">
                            Drop notes here
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold">Empathy Map Canvas</h2>
                    <p className="text-muted-foreground">Map your customer's sensory experience</p>
                </div>
                <Button onClick={handleSave} disabled={saving} size="lg" className="bg-primary shadow-lg hover:shadow-xl transition-all">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Map
                </Button>
            </div>

            {/* Persona Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="h-24 w-24 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white overflow-hidden shrink-0">
                        {data.persona?.avatarUrl ? (
                            <img src={data.persona.avatarUrl} alt="Persona" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-blue-200">User</span>
                        )}
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-400">Persona Name</label>
                                <Input 
                                    className="bg-white/80 border-blue-200 font-bold text-lg" 
                                    value={data.persona?.name}
                                    onChange={(e) => setData({...data, persona: {...data.persona, name: e.target.value}})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-400">Role / Segment</label>
                                <Input 
                                    className="bg-white/80 border-blue-200"
                                    value={data.persona?.role}
                                    onChange={(e) => setData({...data, persona: {...data.persona, role: e.target.value}})}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-blue-400">Context & Goals</label>
                             <Textarea 
                                className="bg-white/80 border-blue-200 min-h-[60px]"
                                value={data.persona?.description}
                                onChange={(e) => setData({...data, persona: {...data.persona, description: e.target.value}})}
                             />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Canvas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
                <Quadrant type="says" title="Says" icon={<Mic className="h-5 w-5" />} />
                <Quadrant type="thinks" title="Thinks" icon={<AlertCircle className="h-5 w-5" />} />
                <Quadrant type="does" title="Does" icon={<AlertCircle className="h-5 w-5" />} />
                <Quadrant type="feels" title="Feels" icon={<AlertCircle className="h-5 w-5" />} />
            </div>

            {/* Synthesis */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-indigo-500" /> 
                        Synthesis & Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Identify contradictions, unexpected patterns, or latent needs based on the map above.</p>
                        <Textarea 
                             className="min-h-[100px] bg-background"
                             placeholder="E.g., The user says they care about health but does not track their diet..."
                             value={data.synthesis}
                             onChange={(e) => setData({...data, synthesis: e.target.value})}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
