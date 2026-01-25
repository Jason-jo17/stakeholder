
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { JourneyMap, JourneyStage, Persona } from './types'
import {
    Plus,
    ChevronRight,
    Smile,
    Meh,
    Frown,
    MapPin,
    AlertCircle,
    Lightbulb,
    MessageSquare,
    Activity,
    Trash2
} from 'lucide-react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea
} from 'recharts'
import { cn } from "@/lib/utils"

interface Props {
    journey: JourneyMap;
    persona?: Persona;
    onChange: (journey: JourneyMap) => void;
}

export function JourneyMapper({ journey, persona, onChange }: Props) {
    const addStage = () => {
        const newStage: JourneyStage = {
            id: `stage-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            name: "New Stage",
            duration: "1 day",
            goals: [],
            actions: [],
            thoughts: [],
            emotion: { valence: 0, intensity: 3 },
            touchpoints: [],
            painPoints: [],
            opportunities: []
        }
        onChange({ ...journey, stages: [...journey.stages, newStage] })
    }

    const updateStage = (id: string, updates: Partial<JourneyStage>) => {
        onChange({
            ...journey,
            stages: journey.stages.map(s => s.id === id ? { ...s, ...updates } : s)
        })
    }

    const removeStage = (id: string) => {
        onChange({ ...journey, stages: journey.stages.filter(s => s.id !== id) })
    }

    const chartData = journey.stages.map(s => ({
        name: s.name,
        emotion: s.emotion.valence
    }))

    const getEmotionIcon = (valence: number) => {
        if (valence > 1) return <Smile className="text-emerald-500" />
        if (valence < -1) return <Frown className="text-rose-500" />
        return <Meh className="text-slate-400" />
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Activity className="text-blue-600" />
                        User Journey: {journey.scenario || "Untitled Scenario"}
                    </h3>
                    <p className="text-sm text-slate-500">Mapping the experience for {persona?.name || "Target Persona"}</p>
                </div>
                <Button onClick={addStage} size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Stage
                </Button>
            </div>

            {/* Emotional Curve Visualization */}
            <Card className="border shadow-none bg-white overflow-hidden">
                <CardHeader className="bg-slate-50 py-3 px-6 border-b">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">Emotional Journey Curve</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" hide />
                                <YAxis domain={[-5, 5]} hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <ReferenceArea y1={0} y2={5} fill="#f0fdf4" fillOpacity={0.5} />
                                <ReferenceArea y1={-5} y2={0} fill="#fef2f2" fillOpacity={0.5} />
                                <Line
                                    type="monotone"
                                    dataKey="emotion"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Horizontal Journey Map */}
            <ScrollArea className="w-full whitespace-nowrap rounded-xl border bg-white shadow-sm">
                <div className="flex min-w-max p-6 gap-6">
                    {journey.stages.map((stage, idx) => (
                        <div key={stage.id} className="w-[300px] flex flex-col gap-6 group">
                            {/* Header with connection */}
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center bg-slate-100 text-slate-600 border-none font-bold">
                                        {idx + 1}
                                    </Badge>
                                    <Input
                                        value={stage.name}
                                        onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                                        className="h-7 font-bold border-none p-0 focus-visible:ring-0 text-slate-900 bg-transparent"
                                    />
                                    <Button variant="ghost" size="icon" onClick={() => removeStage(stage.id)} className="h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 ml-auto">
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                                {idx < journey.stages.length - 1 && (
                                    <div className="absolute top-3 -right-6 w-6 h-[2px] bg-slate-100 z-0" />
                                )}
                            </div>

                            {/* Actions Swim Lane */}
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                                    <Activity size={12} />
                                    Actions
                                </Label>
                                <div className="min-h-[100px] p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                    {stage.actions.map((act, i) => (
                                        <div key={i} className="text-xs text-slate-700 bg-white p-2 rounded-lg border shadow-sm whitespace-normal">
                                            {act}
                                        </div>
                                    ))}
                                    <button onClick={() => updateStage(stage.id, { actions: [...stage.actions, "Doing something..."] })} className="w-full py-1 text-[10px] text-slate-400 hover:text-blue-600 border border-dashed rounded-lg transition-colors">
                                        + Add Action
                                    </button>
                                </div>
                            </div>

                            {/* Thoughts Swim Lane */}
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                                    <MessageSquare size={12} />
                                    Thoughts
                                </Label>
                                <div className="min-h-[80px] p-3 rounded-xl bg-blue-50/30 border border-blue-100/50 space-y-2 border-dashed">
                                    {stage.thoughts.map((thought, i) => (
                                        <div key={i} className="text-xs italic text-blue-800 whitespace-normal">
                                            "{thought}"
                                        </div>
                                    ))}
                                    <button onClick={() => updateStage(stage.id, { thoughts: [...stage.thoughts, "Thinking about..."] })} className="w-full py-1 text-[10px] text-blue-400 hover:text-blue-600 border border-dashed border-blue-200 rounded-lg transition-colors">
                                        + Add Thought
                                    </button>
                                </div>
                            </div>

                            {/* Emotions Swim Lane */}
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                                    {stage.emotion.valence > 0 ? <Smile size={12} /> : <Frown size={12} />}
                                    Emotion
                                </Label>
                                <div className={cn(
                                    "p-3 rounded-xl border flex items-center justify-between",
                                    stage.emotion.valence > 1 ? "bg-emerald-50 border-emerald-100" :
                                        stage.emotion.valence < -1 ? "bg-rose-50 border-rose-100" : "bg-slate-50 border-slate-100"
                                )}>
                                    <div className="flex items-center gap-2">
                                        {getEmotionIcon(stage.emotion.valence)}
                                        <span className="text-xs font-bold">{stage.emotion.valence > 1 ? "Happy" : stage.emotion.valence < -1 ? "Anxious" : "Neutral"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => updateStage(stage.id, { emotion: { ...stage.emotion, valence: Math.max(-5, stage.emotion.valence - 1) } })} className="p-1 hover:bg-white rounded">
                                            <ChevronRight className="h-3 w-3 rotate-180" />
                                        </button>
                                        <span className="text-[10px] font-mono">{stage.emotion.valence}</span>
                                        <button onClick={() => updateStage(stage.id, { emotion: { ...stage.emotion, valence: Math.min(5, stage.emotion.valence + 1) } })} className="p-1 hover:bg-white rounded">
                                            <ChevronRight className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pain Points & Opps */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-rose-500 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        Pain points
                                    </Label>
                                    {stage.painPoints.map((p, i) => (
                                        <div key={i} className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-lg border-rose-100 border whitespace-normal">
                                            {p}
                                        </div>
                                    ))}
                                    <button onClick={() => updateStage(stage.id, { painPoints: [...stage.painPoints, "Identify pain..."] })} className="w-full py-1 text-[10px] text-rose-400 hover:text-rose-600 border border-dashed border-rose-200 rounded-lg transition-colors">
                                        + Log Pain Point
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1">
                                        <Lightbulb size={12} />
                                        Opportunities
                                    </Label>
                                    {stage.opportunities.map((o, i) => (
                                        <div key={i} className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border-emerald-100 border whitespace-normal">
                                            {o}
                                        </div>
                                    ))}
                                    <button onClick={() => updateStage(stage.id, { opportunities: [...stage.opportunities, "Future solution..."] })} className="w-full py-1 text-[10px] text-emerald-400 hover:text-emerald-600 border border-dashed border-emerald-200 rounded-lg transition-colors">
                                        + Add Opportunity
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <ScrollBar orientation="horizontal" />
                </div>
            </ScrollArea>
        </div>
    )
}
