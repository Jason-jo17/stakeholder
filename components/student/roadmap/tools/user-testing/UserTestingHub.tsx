
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import {
    Plus,
    Search,
    Settings,
    Activity,
    History,
    Users,
    ChevronRight,
    Sparkles,
    Rocket,
    Play,
    BarChart3,
    Calendar,
    Layout
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { UserTestingState, TestingSession, TestParticipant } from './types'
import { SessionDashboard } from '@/components/student/roadmap/tools/user-testing/SessionDashboard'
import { LiveObservation } from '@/components/student/roadmap/tools/user-testing/LiveObservation'
import { AnalyticsDashboard } from '@/components/student/roadmap/tools/user-testing/AnalyticsDashboard'
import { InsightSynthesis } from '@/components/student/roadmap/tools/user-testing/InsightSynthesis'

const INITIAL_DATA: UserTestingState = {
    sessions: [
        {
            id: 's1',
            prototypeVersionId: 'v1.0.0',
            metadata: {
                date: new Date().toISOString(),
                type: 'usability',
                location: 'Remote (Zoom)',
                duration: 45,
                facilitators: ['Jason'],
                observers: ['Team Alpha'],
                tasks: ["Sign up", "Add sensor"]
            },
            status: 'scheduled',
            participants: [
                {
                    id: 'p1',
                    name: 'Sarah Miller',
                    personaMatch: 'Urban Hobbyist',
                    demographics: { age: 28, techSavvy: 5 },
                    preTestQuestionnaire: {},
                    observations: [],
                    taskPerformance: [],
                    rubrics: {
                        usability: { easeOfUse: 3, learnability: 3, efficiency: 3, errorTolerance: 3, satisfaction: 3 },
                        desirability: { problemRelevance: 3, solutionFit: 3, likelihoodToUse: 3, recommendationScore: 8, emotionalResponse: '' },
                        valueProposition: { uniqueness: 3, improvementOverCurrent: 3, willingnessToPay: '', switchingCostAcceptable: true }
                    },
                    postTestInterview: { likes: [], dislikes: [], confusions: [], suggestions: [], openFeedback: '' }
                }
            ],
            insights: { criticalIssues: [], positiveFindings: [], usabilityScore: 0, npsScore: 0, keyLearnings: [], iterationPriorities: [] },
            teamId: 'team-1'
        },
        {
            id: 's2',
            prototypeVersionId: 'v0.9.5',
            metadata: {
                date: new Date(Date.now() - 86400000).toISOString(),
                type: 'desirability',
                location: 'In-person (Innovation Lab)',
                duration: 60,
                facilitators: ['Alex'],
                observers: ['Jason'],
                tasks: ["Check value prop", "Test mobile button"]
            },
            status: 'completed',
            participants: [
                {
                    id: 'p2',
                    name: 'Michael Chen',
                    personaMatch: 'Eco-Conscious Homeowner',
                    demographics: { age: 45, techSavvy: 3 },
                    preTestQuestionnaire: {},
                    observations: [
                        { id: 'o1', timestamp: 120, type: 'quote', description: 'This would save me so much time in the mornings.', severity: 3 }
                    ],
                    taskPerformance: [],
                    rubrics: {
                        usability: { easeOfUse: 4, learnability: 5, efficiency: 4, errorTolerance: 4, satisfaction: 5 },
                        desirability: { problemRelevance: 5, solutionFit: 5, likelihoodToUse: 5, recommendationScore: 9, emotionalResponse: 'Excited' },
                        valueProposition: { uniqueness: 4, improvementOverCurrent: 5, willingnessToPay: '$15/mo', switchingCostAcceptable: true }
                    },
                    postTestInterview: { likes: ['Speed', 'UI'], dislikes: ['Setup time'], confusions: [], suggestions: [], openFeedback: '' }
                }
            ],
            insights: {
                criticalIssues: [],
                positiveFindings: ['Clear value prop', 'Engaging UI'],
                usabilityScore: 82,
                npsScore: 45,
                keyLearnings: ['Pricing needs adjustment'],
                iterationPriorities: ['Onboarding flow']
            },
            teamId: 'team-1'
        }
    ],
    currentSessionId: null,
    activeParticipantId: null,
    view: 'dashboard',
    version: 1
}

interface UserTestingHubProps {
    tool: any;
    progress: any;
    onDataSaved?: () => void;
}

export function UserTestingHub({ tool, progress, onDataSaved }: UserTestingHubProps) {
    const [data, setData] = useState<UserTestingState>(progress?.data || INITIAL_DATA)
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
                if (!isAuto) toast.success("Testing Hub synced!")
                setLastSavedData(currentDataStr)
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            if (!isAuto) toast.error("Failed to sync testing hub")
        } finally {
            setSaving(false)
        }
    }, [data, lastSavedData, tool.toolId, onDataSaved])

    useEffect(() => {
        if (JSON.stringify(debouncedData) !== lastSavedData) {
            handleSave(true)
        }
    }, [debouncedData, handleSave, lastSavedData])

    const currentSession = data.sessions.find(s => s.id === data.currentSessionId)

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden font-sans">
            {/* Global Header */}
            <header className="h-16 border-b bg-white px-6 flex items-center justify-between shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-100 rotate-3 group hover:rotate-0 transition-transform cursor-pointer">
                        <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-slate-900 uppercase tracking-tighter">User Testing & Feedback Hub</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Customer Discovery & Validation</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <Button
                            variant={data.view === 'dashboard' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-8 text-[10px] font-black uppercase rounded-md px-3"
                            onClick={() => setData(prev => ({ ...prev, view: 'dashboard', currentSessionId: null }))}
                        >
                            <Layout className="h-3 w-3 mr-1.5" /> Hub
                        </Button>
                        <Button
                            variant={data.view === 'analytics' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-8 text-[10px] font-black uppercase rounded-md px-3"
                            onClick={() => setData(prev => ({ ...prev, view: 'analytics' }))}
                        >
                            <BarChart3 className="h-3 w-3 mr-1.5" /> Analytics
                        </Button>
                        <Button
                            variant={data.view === 'session_detail' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-8 text-[10px] font-black uppercase rounded-md px-3"
                            onClick={() => setData(prev => ({ ...prev, view: 'session_detail' }))}
                        >
                            <Sparkles className="h-3 w-3 mr-1.5" /> Insights
                        </Button>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1" />

                    <Button
                        size="sm"
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="bg-slate-900 hover:bg-black text-white px-4 h-9 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-md"
                    >
                        {saving ? <Sparkles className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3 fill-white" />}
                        {saving ? "Syncing..." : "Manual Sync"}
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative">
                {data.view === 'dashboard' && (
                    <SessionDashboard
                        data={data}
                        onUpdate={setData}
                        onSelectSession={(id: string) => setData(prev => ({ ...prev, view: 'session_detail', currentSessionId: id }))}
                    />
                )}

                {data.view === 'live_capture' && currentSession && (
                    <LiveObservation
                        session={currentSession}
                        onUpdateSession={(updated: TestingSession) => setData(prev => ({
                            ...prev,
                            sessions: prev.sessions.map(s => s.id === updated.id ? updated : s)
                        }))}
                        onBack={() => setData(prev => ({ ...prev, view: 'dashboard' }))}
                    />
                )}

                {data.view === 'analytics' && (
                    <AnalyticsDashboard
                        data={data}
                        onBack={() => setData(prev => ({ ...prev, view: 'dashboard' }))}
                    />
                )}

                {data.view === 'session_detail' && currentSession && (
                    <InsightSynthesis
                        session={currentSession}
                        onUpdateSession={(updated: TestingSession) => setData(prev => ({
                            ...prev,
                            sessions: prev.sessions.map(s => s.id === updated.id ? updated : s)
                        }))}
                    />
                )}
            </main>
        </div>
    )
}
