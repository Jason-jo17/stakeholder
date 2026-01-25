
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import {
    Lightbulb,
    Settings2,
    BrainCircuit,
    Layers,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Save,
    Wand2,
    Library,
    Target,
    ChevronRight,
    Boxes
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { InnovationSession, InnovationIdea, TRIZData, SCAMPERData } from './types'
import { TRIZ_PRINCIPLES, SCAMPER_PROMPTS } from './constants'
import { TRIZModule } from './TRIZModule'
import { SCAMPERModule } from './SCAMPERModule'
import { EvaluationModule } from './EvaluationModule'

const INITIAL_DATA: InnovationSession = {
    id: `session-${Date.now()}`,
    framework: 'Hybrid',
    problemStatement: "Increase user retention for our productivity app",
    context: "Users are signing up but dropping off after 3 days.",
    triz: {
        contradictions: [],
        principlesExplored: []
    },
    scamper: {
        substitute: { ideas: [], activePrompts: [] },
        combine: { ideas: [], activePrompts: [] },
        adapt: { ideas: [], activePrompts: [] },
        modify: { ideas: [], activePrompts: [] },
        putToOtherUses: { ideas: [], activePrompts: [] },
        eliminate: { ideas: [], activePrompts: [] },
        reverse: { ideas: [], activePrompts: [] }
    },
    selectedIdeas: [],
    status: 'setup',
    version: 1
}

interface Props {
    tool: any;
    progress: any;
    onDataSaved?: () => void;
}

export function InnovationTool({ tool, progress, onDataSaved }: Props) {
    const [data, setData] = useState<InnovationSession>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("framework")
    const [lastSavedData, setLastSavedData] = useState<string>(JSON.stringify(progress?.data || INITIAL_DATA))

    const debouncedData = useDebounce(data, 3000)

    const handleSave = useCallback(async (isAuto = false) => {
        const currentDataStr = JSON.stringify(data)
        if (isAuto && currentDataStr === lastSavedData) return

        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                if (!isAuto) toast.error(res.error)
            } else {
                if (!isAuto) toast.success("Innovation Session saved!")
                setLastSavedData(currentDataStr)
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            if (!isAuto) toast.error("Failed to save session")
        } finally {
            setSaving(false)
        }
    }, [data, lastSavedData, tool.toolId, onDataSaved])

    useEffect(() => {
        if (JSON.stringify(debouncedData) !== lastSavedData) {
            handleSave(true)
        }
    }, [debouncedData, handleSave, lastSavedData])

    const renderSetup = () => (
        <div className="max-w-3xl mx-auto space-y-8 py-12">
            <div className="text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-xl">
                    <BrainCircuit className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Systematic Innovation Lab</h2>
                <p className="text-slate-500">Solve complex problems using engineering principles (TRIZ) and creative modification (SCAMPER).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                    className={cn(
                        "cursor-pointer transition-all border-2 group",
                        data.framework === 'TRIZ' ? "border-indigo-500 ring-2 ring-indigo-50" : "hover:border-slate-300"
                    )}
                    onClick={() => {
                        if (data.framework === 'TRIZ') {
                            setData(prev => ({ ...prev, status: 'ideation' }))
                        } else {
                            setData(prev => ({ ...prev, framework: 'TRIZ' }))
                        }
                    }}
                >
                    <CardContent className="p-6 space-y-4">
                        <Boxes className="h-8 w-8 text-indigo-600" />
                        <div>
                            <h3 className="font-bold text-lg">TRIZ Framework</h3>
                            <p className="text-sm text-slate-500">Engineering-based systematic innovation using 40 inventive principles.</p>
                        </div>
                        {data.framework === 'TRIZ' && <Badge className="bg-indigo-600">Selected</Badge>}
                    </CardContent>
                </Card>

                <Card
                    className={cn(
                        "cursor-pointer transition-all border-2 group",
                        data.framework === 'SCAMPER' ? "border-emerald-500 ring-2 ring-emerald-50" : "hover:border-slate-300"
                    )}
                    onClick={() => {
                        if (data.framework === 'SCAMPER') {
                            setData(prev => ({ ...prev, status: 'ideation' }))
                        } else {
                            setData(prev => ({ ...prev, framework: 'SCAMPER' }))
                        }
                    }}
                >
                    <CardContent className="p-6 space-y-4">
                        <Wand2 className="h-8 w-8 text-emerald-600" />
                        <div>
                            <h3 className="font-bold text-lg">SCAMPER Technique</h3>
                            <p className="text-sm text-slate-500">Creative modification technique: Substitute, Combine, Adapt, Modify...</p>
                        </div>
                        {data.framework === 'SCAMPER' && <Badge className="bg-emerald-600">Selected</Badge>}
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 shadow-sm bg-slate-50/50">
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Problem Statement</label>
                        <Input
                            value={data.problemStatement}
                            onChange={(e) => setData(prev => ({ ...prev, problemStatement: e.target.value }))}
                            placeholder="What is the core problem you are trying to solve?"
                            className="text-lg font-bold bg-white h-12 border-slate-200 focus:border-indigo-500 rounded-xl"
                        />
                    </div>
                    <Button
                        className="w-full h-12 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        onClick={() => setData(prev => ({ ...prev, status: 'ideation' }))}
                    >
                        Enter Innovation Lab <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

    const renderIdeation = () => (
        <div className="flex flex-col h-full bg-slate-50">
            <div className="h-16 border-b bg-white px-6 flex items-center justify-between z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 text-sm tracking-tight">{data.problemStatement}</h3>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] h-4 py-0 uppercase border-indigo-200 text-indigo-600 bg-indigo-50">
                                {data.framework} Mode
                            </Badge>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                    <TabsList className="bg-transparent h-full p-0 gap-8">
                        <TabsTrigger value="framework" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 h-full text-xs font-black uppercase tracking-widest text-slate-500">
                            Ideation Space
                        </TabsTrigger>
                        <TabsTrigger value="evaluation" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 h-full text-xs font-black uppercase tracking-widest text-slate-500">
                            Evaluation & Selection
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setData(prev => ({ ...prev, status: 'setup' }))}>
                        Config
                    </Button>
                    <Button size="sm" onClick={() => handleSave(false)} disabled={saving} className="bg-slate-900">
                        {saving ? <Sparkles className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Lab
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === "framework" ? (
                    <div className="h-full overflow-y-auto p-6">
                        {data.framework === 'TRIZ' && <TRIZModule data={data} onUpdate={setData} />}
                        {data.framework === 'SCAMPER' && <SCAMPERModule data={data} onUpdate={setData} />}
                        {data.framework === 'Hybrid' && (
                            <div className="grid grid-cols-2 gap-6">
                                <TRIZModule data={data} onUpdate={setData} />
                                <SCAMPERModule data={data} onUpdate={setData} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto p-0">
                        <EvaluationModule data={data} onUpdate={setData} />
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-white rounded-xl border overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                {data.status === 'setup' ? renderSetup() : renderIdeation()}
            </div>
        </div>
    )
}

// Sub-components are now in separate files
