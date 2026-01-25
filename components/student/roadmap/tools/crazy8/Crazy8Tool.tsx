
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import {
    Timer,
    LayoutGrid,
    Zap,
    CheckCircle2,
    Plus,
    Flame,
    ChevronRight,
    ChevronLeft,
    Save,
    Sparkles,
    Trophy,
    MessageSquare
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { Crazy8Session, SketchPanel, VotingResult } from './types'
import { SketchCanvas } from './SketchCanvas'
import { TimerDisplay } from './TimerDisplay'

const INITIAL_DATA: Crazy8Session = {
    id: `session-${Date.now()}`,
    challengePrompt: "How might we improve the user onboarding experience?",
    context: "New users are dropping off after the first 30 seconds of app usage.",
    constraints: ["Mobile first", "No mandatory login", "Interactive"],
    config: {
        durationPerPanel: 60,
        totalPanels: 8,
        mode: 'freestyle',
        allowIterations: true
    },
    participants: [
        {
            userId: 'p1',
            userName: 'Current User',
            panels: []
        }
    ],
    votingResults: [],
    status: 'setup',
    currentPanelIndex: 0,
    version: 1
}

interface Props {
    tool: any;
    progress: any;
    onDataSaved?: () => void;
}

export function Crazy8Tool({ tool, progress, onDataSaved }: Props) {
    const [data, setData] = useState<Crazy8Session>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
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
                if (!isAuto) toast.success("Crazy 8s Session saved!")
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

    const startSession = () => {
        setData(prev => ({
            ...prev,
            status: 'sketching',
            currentPanelIndex: 0,
            participants: prev.participants.map(p => ({
                ...p,
                panels: Array.from({ length: prev.config.totalPanels }, (_, i) => ({
                    id: `p-${Date.now()}-${i}`,
                    panelNumber: i + 1,
                    sketchData: "",
                    title: `Concept ${i + 1}`,
                    description: "",
                    tags: [],
                    createdAt: new Date().toISOString()
                }))
            }))
        }))
        toast.success("Get ready! Panel 1 starting now.")
    }

    const handlePanelSave = (sketchData: string) => {
        setData(prev => {
            const newParticipants = [...prev.participants]
            const userIdx = newParticipants.findIndex(p => p.userId === 'p1')
            if (userIdx === -1) return prev

            const newPanels = [...newParticipants[userIdx].panels]
            newPanels[prev.currentPanelIndex] = {
                ...newPanels[prev.currentPanelIndex],
                sketchData
            }
            newParticipants[userIdx] = { ...newParticipants[userIdx], panels: newPanels }
            return { ...prev, participants: newParticipants }
        })
    }

    const nextPanel = () => {
        if (data.currentPanelIndex < data.config.totalPanels - 1) {
            setData(prev => ({ ...prev, currentPanelIndex: prev.currentPanelIndex + 1 }))
            toast.info(`Time for Panel ${data.currentPanelIndex + 2}!`)
        } else {
            setData(prev => ({ ...prev, status: 'review' }))
            toast.success("Time's up! Great work on all 8 concepts.")
        }
    }

    const toggleVote = (panelId: string) => {
        setData(prev => {
            const existing = prev.votingResults.find(v => v.panelId === panelId)
            if (existing) {
                return {
                    ...prev,
                    votingResults: prev.votingResults.filter(v => v.panelId !== panelId)
                }
            }
            return {
                ...prev,
                votingResults: [...prev.votingResults, { panelId, votes: 1, comments: [], selectedForRefinement: false }]
            }
        })
    }

    const renderSetup = () => (
        <div className="max-w-2xl mx-auto space-y-8 py-12">
            <div className="text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 shadow-xl">
                    <Flame className="h-8 w-8 text-orange-500 fill-current" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Prepare for Rapid Ideation</h2>
                <p className="text-slate-500">8 panels. 8 minutes. No filtering, just pure creativity.</p>
            </div>

            <Card className="border-2 shadow-sm">
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">The Challenge</label>
                        <Input
                            value={data.challengePrompt}
                            onChange={(e) => setData(prev => ({ ...prev, challengePrompt: e.target.value }))}
                            placeholder="e.g., How might we..."
                            className="text-lg font-bold"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400">Panel Duration</label>
                            <Input
                                type="number"
                                value={data.config.durationPerPanel}
                                onChange={(e) => setData(prev => ({ ...prev, config: { ...prev.config, durationPerPanel: parseInt(e.target.value) } }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400">Action</label>
                            <Button onClick={startSession} className="w-full bg-slate-900 hover:bg-slate-800">
                                Start Session
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderSketching = () => {
        const currentPanel = data.participants[0].panels[data.currentPanelIndex]
        return (
            <div className="flex flex-col h-full bg-slate-50 space-y-6">
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-black bg-slate-900 text-white p-0">
                            {data.currentPanelIndex + 1}
                        </Badge>
                        <div>
                            <h3 className="font-bold text-slate-900">{data.challengePrompt}</h3>
                            <p className="text-xs text-slate-400 font-medium">Concept {data.currentPanelIndex + 1} of {data.config.totalPanels}</p>
                        </div>
                    </div>

                    <TimerDisplay
                        duration={data.config.durationPerPanel}
                        isActive={data.status === 'sketching'}
                        onInterval={() => { }}
                        onComplete={nextPanel}
                    />
                </div>

                <div className="flex-1 px-6 flex items-center justify-center">
                    <div className="w-[800px] aspect-[4/3] bg-white rounded-3xl shadow-2xl border-4 border-slate-900 overflow-hidden flex flex-col p-8">
                        <SketchCanvas
                            width={740}
                            height={500}
                            initialData={currentPanel.sketchData}
                            onSave={handlePanelSave}
                        />
                    </div>
                </div>

                <div className="h-20 bg-white border-t px-6 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => setData(prev => ({ ...prev, currentPanelIndex: Math.max(0, prev.currentPanelIndex - 1) }))}
                        disabled={data.currentPanelIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <div className="flex gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-2 w-8 rounded-full transition-all",
                                    i === data.currentPanelIndex ? "bg-slate-900 w-12" : i < data.currentPanelIndex ? "bg-emerald-400" : "bg-slate-200"
                                )}
                            />
                        ))}
                    </div>
                    <Button
                        className="bg-slate-900"
                        onClick={nextPanel}
                    >
                        {data.currentPanelIndex === 7 ? "Finish Session" : "Next Panel"} <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        )
    }

    const renderReview = () => {
        const userPanels = data.participants[0].panels
        return (
            <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Convergence: Select Top Ideas</h2>
                        <p className="text-slate-500">Pick the concepts with the most potential for refinement.</p>
                    </div>
                    <Button onClick={() => setData(prev => ({ ...prev, status: 'voting' }))} className="bg-slate-900">
                        Open Team Voting <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userPanels.map((panel) => {
                        const isVoted = data.votingResults.some(v => v.panelId === panel.id)
                        return (
                            <Card
                                key={panel.id}
                                className={cn(
                                    "overflow-hidden transition-all border-2 group cursor-pointer",
                                    isVoted ? "border-blue-500 shadow-lg ring-2 ring-blue-100" : "hover:border-slate-300"
                                )}
                                onClick={() => toggleVote(panel.id)}
                            >
                                <div className="aspect-[4/3] bg-white relative">
                                    {panel.sketchData ? (
                                        <img src={panel.sketchData} alt={panel.title} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-300 text-sm italic">No sketch</div>
                                    )}
                                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
                                    <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white">
                                        #{panel.panelNumber}
                                    </Badge>
                                    {isVoted && (
                                        <div className="absolute top-3 right-3 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="py-3 px-4 border-t">
                                    <Input
                                        value={panel.title}
                                        onChange={(e) => {
                                            const newPanels = [...userPanels]
                                            newPanels[panel.panelNumber - 1] = { ...panel, title: e.target.value }
                                            setData(prev => ({
                                                ...prev,
                                                participants: prev.participants.map(p => p.userId === 'p1' ? { ...p, panels: newPanels } : p)
                                            }))
                                        }}
                                        className="h-6 font-bold uppercase text-[10px] tracking-widest border-none p-0 focus-visible:ring-0 bg-transparent"
                                        placeholder="ENTER TITLE..."
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </CardHeader>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }

    const renderVoting = () => (
        <div className="p-8 text-center space-y-12 max-w-4xl mx-auto py-20">
            <div className="space-y-4">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto fill-current" />
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Session Results</h2>
                <p className="text-slate-500 text-lg">Team alignment achieved. Here are your strongest concepts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {data.votingResults.map(vote => {
                    const panel = data.participants[0].panels.find(p => p.id === vote.panelId)
                    if (!panel) return null
                    return (
                        <div key={vote.panelId} className="flex gap-6 items-center bg-white p-6 rounded-3xl border-2 hover:border-blue-500 transition-colors shadow-sm">
                            <div className="w-40 aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden border">
                                <img src={panel.sketchData} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50">Winner</Badge>
                                <h4 className="font-bold text-xl">{panel.title}</h4>
                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Zap size={12} className="text-orange-400" /> High Impact
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={12} className="text-blue-400" /> 12 Comments
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center justify-center gap-4 pt-12">
                <Button variant="outline" onClick={() => setData(prev => ({ ...prev, status: 'setup' }))}>
                    New Session
                </Button>
                <Button className="bg-slate-900" onClick={() => handleSave(false)}>
                    Finalize & Export Results
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            <div className="h-14 border-b px-6 flex items-center justify-between bg-white z-30 shrink-0">
                <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-600" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Crazy 8s Workshop</h2>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-8 w-[1px] bg-slate-200" />
                    <Button size="sm" variant="ghost" className="text-xs font-bold text-slate-500">
                        <LayoutGrid className="h-4 w-4 mr-2" /> Gallery
                    </Button>
                    <Button size="sm" onClick={() => handleSave(false)} disabled={saving} className="bg-slate-900 h-8 text-[10px] font-black uppercase">
                        {saving ? <Sparkles className="h-3.5 w-3.5 mr-2 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-2" />}
                        Save Progress
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {data.status === 'setup' && renderSetup()}
                {data.status === 'sketching' && renderSketching()}
                {data.status === 'review' && renderReview()}
                {data.status === 'voting' && renderVoting()}
            </div>
        </div>
    )
}
