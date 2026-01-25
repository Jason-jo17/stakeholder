
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    Mic,
    Video,
    Pause,
    Square,
    Zap,
    MessageSquare,
    AlertTriangle,
    CheckCircle2,
    Smile,
    Frown,
    Clock,
    Plus,
    ArrowRight,
    Shield,
    Smartphone,
    Layout,
    User,
    MoreVertical,
    Flag,
    Play,
    Settings,
    History as HistoryIcon
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { toast } from 'sonner'
import { TestingSession, TestParticipant, Observation, ObservationType } from './types'

interface LiveObservationProps {
    session: TestingSession;
    onUpdateSession: (updated: TestingSession) => void;
    onBack: () => void;
}

export function LiveObservation({ session, onUpdateSession, onBack }: LiveObservationProps) {
    const [activeParticipant, setActiveParticipant] = useState<TestParticipant | null>(session.participants[0] || null)
    const [isRecording, setIsRecording] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [noteText, setNoteText] = useState("")
    const [newParticipantName, setNewParticipantName] = useState("")
    const [newTaskText, setNewTaskText] = useState("")
    const [tasks, setTasks] = useState<string[]>(session.metadata.tasks || [])
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 1)
            }, 1000)
        } else {
            if (timerRef.current) clearInterval(timerRef.current)
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [isRecording])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const addObservation = (type: ObservationType, text?: string) => {
        if (!activeParticipant) return

        const newObs: Observation = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: elapsedTime,
            type,
            description: text || noteText,
            severity: 3
        }

        const updatedParticipant = {
            ...activeParticipant,
            observations: [newObs, ...activeParticipant.observations]
        }

        onUpdateSession({
            ...session,
            participants: session.participants.map(p => p.id === activeParticipant.id ? updatedParticipant : p)
        })

        setActiveParticipant(updatedParticipant)
        if (!text) setNoteText("")
    }

    const handleAddParticipant = () => {
        if (!newParticipantName.trim()) {
            toast.error("Please enter a participant name")
            return
        }

        const newParticipant: TestParticipant = {
            id: `p-${Date.now()}`,
            name: newParticipantName.trim(),
            personaMatch: 'Select Persona',
            demographics: {},
            preTestQuestionnaire: {},
            observations: [],
            taskPerformance: [],
            rubrics: {
                usability: { easeOfUse: 3, learnability: 3, efficiency: 3, errorTolerance: 3, satisfaction: 3 },
                desirability: { problemRelevance: 3, solutionFit: 3, likelihoodToUse: 3, recommendationScore: 0, emotionalResponse: '' },
                valueProposition: { uniqueness: 3, improvementOverCurrent: 3, willingnessToPay: '', switchingCostAcceptable: true }
            },
            postTestInterview: { likes: [], dislikes: [], confusions: [], suggestions: [], openFeedback: '' }
        }

        const updatedSession = {
            ...session,
            participants: [...session.participants, newParticipant]
        }

        onUpdateSession(updatedSession)
        setActiveParticipant(newParticipant)
        setNewParticipantName("")
        toast.success("New participant added to session!")
    }

    const handleAddTask = () => {
        if (!newTaskText.trim()) return
        setTasks(prev => [...prev, newTaskText.trim()])
        setNewTaskText("")
        toast.success("Task added!")
    }

    return (
        <div className="flex flex-col h-full bg-white transition-all animate-in fade-in duration-500">
            {/* Recording Control Header */}
            <div className="px-8 py-4 border-b flex items-center justify-between bg-slate-900 text-white shrink-0">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10 h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 mr-2" /> End Session
                    </Button>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "h-3 w-3 rounded-full animate-pulse",
                            isRecording ? "bg-red-500" : "bg-slate-500"
                        )} />
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recording Session</p>
                            <p className="text-xl font-mono font-black tabular-nums">{formatTime(elapsedTime)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={isRecording ? 'destructive' : 'secondary'}
                        className="h-11 px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl"
                        onClick={() => setIsRecording(!isRecording)}
                    >
                        {isRecording ? <Square className="h-4 w-4 mr-2 fill-white" /> : <Play className="h-4 w-4 mr-2 fill-slate-900" />}
                        {isRecording ? "Pause" : "Start Capture"}
                    </Button>
                    <Button variant="ghost" className="h-11 w-11 rounded-xl text-white hover:bg-white/10 p-0">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex min-h-0">
                {/* Sidebar: Participants & Tasks */}
                <div className="w-80 border-r bg-slate-50 overflow-y-auto p-6 space-y-8 flex flex-col">
                    <div className="space-y-4 flex-1">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <User size={14} /> Active Participant
                        </h4>

                        <div className="space-y-2 mb-4">
                            <Input
                                placeholder="Enter name..."
                                value={newParticipantName}
                                onChange={(e) => setNewParticipantName(e.target.value)}
                                className="h-10 rounded-xl border-2 border-slate-100 bg-white focus:ring-rose-500 font-bold text-xs"
                            />
                            <Button
                                onClick={handleAddParticipant}
                                className="w-full h-10 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Participant
                            </Button>
                        </div>

                        <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                            {session.participants.length > 0 ? (
                                session.participants.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => setActiveParticipant(p)}
                                        className={cn(
                                            "p-4 rounded-2xl border-2 transition-all cursor-pointer",
                                            activeParticipant?.id === p.id ? "bg-white border-rose-500 shadow-lg ring-4 ring-rose-50" : "bg-white border-slate-100 opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <p className="text-sm font-black text-slate-900">{p.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.personaMatch}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl opacity-40">
                                    <User className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                    <p className="text-[10px] font-black uppercase tracking-tight text-slate-400">No participants added</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Flag size={14} /> Testing Tasks
                        </h4>

                        <div className="flex gap-2 mb-4">
                            <Input
                                placeholder="Add task..."
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                className="h-9 rounded-xl border-2 border-slate-100 bg-white focus:ring-rose-500 font-bold text-[10px]"
                            />
                            <Button
                                onClick={handleAddTask}
                                size="icon"
                                className="h-9 w-9 bg-slate-900 hover:bg-black text-white rounded-xl shrink-0"
                            >
                                <Plus size={14} />
                            </Button>
                        </div>

                        <div className="space-y-2 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                            {tasks.map((task, i) => (
                                <div key={i} className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 animate-in slide-in-from-right-2 duration-200">
                                    <div className="h-5 w-5 rounded border-2 border-slate-200 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-sm bg-slate-100 group-hover:bg-rose-500 transition-colors" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-600 line-clamp-2 flex-1 leading-tight">{task}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTasks(tasks.filter((_, idx) => idx !== i))}
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-600 shrink-0"
                                    >
                                        <Plus className="h-3 w-3 rotate-45" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Observation Area */}
                <div className="flex-1 flex flex-col min-h-0 bg-white">
                    {/* Quick Capture Toolbar */}
                    <div className="p-6 border-b flex items-center gap-3 shrink-0">
                        {[
                            { label: 'Confusion', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', type: 'confusion' },
                            { label: 'Success', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', type: 'success' },
                            { label: 'Significant Quote', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50', type: 'quote' },
                            { label: 'Critical Action', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50', type: 'action' },
                            { label: 'Positive Emotion', icon: Smile, color: 'text-rose-500', bg: 'bg-rose-50', type: 'emotion' },
                        ].map((btn) => (
                            <Button
                                key={btn.label}
                                variant="ghost"
                                className={cn("h-11 px-4 rounded-xl flex items-center gap-2 h-14 border-2 border-transparent hover:scale-105 transition-all text-slate-500", btn.bg)}
                                onClick={() => addObservation(btn.type as ObservationType, `User demonstrated ${btn.label.toLowerCase()}`)}
                            >
                                <btn.icon className={cn("h-5 w-5", btn.color)} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{btn.label}</span>
                            </Button>
                        ))}
                    </div>

                    {/* Live Feed & Notes */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex-1 overflow-y-auto p-10 space-y-6">
                            {activeParticipant?.observations.map((obs, i) => (
                                <div key={obs.id} className="flex gap-6 animate-in slide-in-from-left-4 duration-300">
                                    <span className="text-[10px] font-black text-rose-500 tabular-nums w-12 pt-1.5">{formatTime(obs.timestamp)}</span>
                                    <div className="flex-1 p-5 rounded-[24px] bg-slate-50 border border-slate-100 relative group">
                                        <div className="absolute -left-3 top-5 p-1.5 rounded-lg bg-white shadow-sm border border-slate-100">
                                            {obs.type === 'confusion' && <AlertTriangle size={14} className="text-amber-500" />}
                                            {obs.type === 'success' && <CheckCircle2 size={14} className="text-emerald-500" />}
                                            {obs.type === 'quote' && <MessageSquare size={14} className="text-blue-500" />}
                                            {obs.type === 'action' && <Zap size={14} className="text-purple-500" />}
                                            {obs.type === 'emotion' && <Smile size={14} className="text-rose-500" />}
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 leading-relaxed">{obs.description}</p>
                                        <div className="absolute right-4 top-4 hidden group-hover:flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900"><HistoryIcon size={14} /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600"><Plus size={14} /></Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {(!activeParticipant || activeParticipant.observations.length === 0) && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4 opacity-50">
                                    <Mic size={48} />
                                    <p className="text-sm font-black uppercase tracking-widest italic">Capturing live interactions...</p>
                                </div>
                            )}
                        </div>

                        {/* Note Input */}
                        <div className="p-8 border-t bg-slate-50/50">
                            <div className="max-w-4xl mx-auto relative">
                                <Input
                                    placeholder="Type observation and hit Enter..."
                                    className="h-20 bg-white border-2 border-slate-100 rounded-[28px] px-8 text-lg font-medium pr-32 shadow-xl focus:ring-rose-500 focus:border-rose-500"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addObservation('action')}
                                />
                                <Button
                                    className="absolute right-3 top-3 bottom-3 bg-slate-900 hover:bg-black text-white px-8 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-200"
                                    onClick={() => addObservation('action')}
                                >
                                    Log Note
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
