
"use client"
// Force re-indexing


import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save, Loader2, RefreshCw, AlertTriangle, TrendingUp, Calendar } from "lucide-react"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"
import { EventLog, EventPatternData, Pattern } from "@/components/student/roadmap/tools/event-pattern/types"
import { EventDialog } from "@/components/student/roadmap/tools/event-pattern/EventDialog"
import { EventTimeline } from "@/components/student/roadmap/tools/event-pattern/EventTimeline"
import { PatternHeatmap } from "@/components/student/roadmap/tools/event-pattern/PatternHeatmap"
import { PatternList } from "@/components/student/roadmap/tools/event-pattern/PatternList"
import { detectPatterns } from "@/components/student/roadmap/tools/event-pattern/pattern-detection"

const INITIAL_DATA: EventPatternData = {
    events: []
}

interface EventPatternProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function EventPattern({ tool, progress, onDataSaved, readOnly = false }: EventPatternProps) {
    const [data, setData] = useState<EventPatternData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [patterns, setPatterns] = useState<Pattern[]>([])

    // Ensure data structure
    useEffect(() => {
        if (!data.events) setData(prev => ({ ...prev, events: [] }))
    }, [])

    // Run pattern detection whenever events change
    useEffect(() => {
        if (data.events.length > 0) {
            const detected = detectPatterns(data.events)
            setPatterns(detected)
        }
    }, [data.events])

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Event log saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const handleAddEvent = (event: EventLog) => {
        setData(prev => ({
            ...prev,
            events: [...prev.events, event].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        }))
        setDialogOpen(false)
        toast.success("Event logged")
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Event Pattern Analysis
                        {patterns.length > 0 && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-200 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" /> {patterns.length} Patterns Detected
                            </span>
                        )}
                    </h2>
                    <p className="text-muted-foreground">Log events, identify triggers, and find recurring problems.</p>
                </div>
                <div className="flex gap-2">
                    {!readOnly && (
                        <>
                            <Button onClick={() => setDialogOpen(true)} variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Log Event
                            </Button>
                            <Button onClick={handleSave} disabled={saving} className="bg-primary shadow-sm">
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Analysis
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Event Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EventTimeline events={data.events} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Temporal Heatmap</CardTitle>
                            <CardDescription>When do these events typically occur?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PatternHeatmap events={data.events} />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Patterns & Stats */}
                <div className="space-y-6">
                    <Card className="bg-slate-50 border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase text-slate-500 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" /> Detected Patterns
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PatternList patterns={patterns} events={data.events} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase text-slate-500 flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Recent Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.events.slice(0, 5).map(event => (
                                <div key={event.id} className="text-sm border-b last:border-0 pb-2 last:pb-0">
                                    <div className="font-medium flex justify-between">
                                        {event.title}
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${event.severity >= 4 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                            Sev {event.severity}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{event.description}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{new Date(event.timestamp).toLocaleString()}</p>
                                </div>
                            ))}
                            {data.events.length === 0 && <p className="text-sm text-muted-foreground italic">No events logged yet.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <EventDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={handleAddEvent}
            />
        </div>
    )
}
