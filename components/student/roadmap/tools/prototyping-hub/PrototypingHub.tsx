
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import {
    Plus,
    Search,
    Layers,
    Layout,
    Settings,
    Activity,
    History,
    Users,
    ChevronRight,
    Sparkles,
    Rocket
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { PrototypingSession, PrototypeProject, PrototypeType } from './types'
import { ProjectDashboard } from '@/components/student/roadmap/tools/prototyping-hub/ProjectDashboard'
import { ProjectDetails } from '@/components/student/roadmap/tools/prototyping-hub/ProjectDetails'

const INITIAL_DATA: PrototypingSession = {
    projects: [
        {
            id: 'p1',
            name: 'Smart Garden IoT System',
            type: 'hardware',
            description: 'Automated plant watering system with moisture sensors and real-time dashboard.',
            userPersonas: ['Urban Hobbyist', 'Eco-Conscious Homeowner'],
            problemSolving: 'Plants dying due to inconsistent watering and lack of data.',
            tools: [
                { toolName: 'tinkercad', projectUrl: '#', purpose: 'Hardware Simulation', integrationStatus: 'connected' },
                { toolName: 'n8n', projectUrl: '#', purpose: 'Logic Automation', integrationStatus: 'connected' }
            ],
            versions: [
                {
                    id: 'v1',
                    versionNumber: '1.0.0',
                    createdAt: new Date().toISOString(),
                    createdBy: 'Jason',
                    changes: 'Initial functional prototype with moisture sensing logic.',
                    trlLevel: 3,
                    artifacts: [],
                    testingResults: ['Successful threshold detection']
                }
            ],
            currentStatus: {
                trlLevel: 3,
                completionPercentage: 65,
                blockers: ['Sensor calibration needed'],
                nextMilestones: ['Integrate solar power', 'Mobile notifications']
            },
            teamMembers: [],
            teamId: 'team-1'
        },
        {
            id: 'p2',
            name: 'EduLink Mobile App',
            type: 'mobile_app',
            description: 'Peer-to-peer tutoring platform for high school students.',
            userPersonas: ['High School Students', 'Volunteer Tutors'],
            problemSolving: 'Difficult to find affordable, local tutoring for specialized subjects.',
            tools: [
                { toolName: 'figma', projectUrl: '#', purpose: 'UI/UX Design', integrationStatus: 'connected' },
                { toolName: 'mit_app_inventor', projectUrl: '#', purpose: 'Mobile Development', integrationStatus: 'pending' }
            ],
            versions: [],
            currentStatus: {
                trlLevel: 2,
                completionPercentage: 40,
                blockers: ['UI/UX not finalized'],
                nextMilestones: ['Complete wireframes', 'Initial block logic']
            },
            teamMembers: [],
            teamId: 'team-1'
        }
    ],
    currentProjectId: null,
    status: 'dashboard',
    version: 1
}

interface PrototypingHubProps {
    tool: any;
    progress: any;
    onDataSaved?: () => void;
}

export function PrototypingHub({ tool, progress, onDataSaved }: PrototypingHubProps) {
    const [data, setData] = useState<PrototypingSession>(progress?.data || INITIAL_DATA)
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
                if (!isAuto) toast.success("Prototyping Hub saved!")
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

    const currentProject = data.projects.find(p => p.id === data.currentProjectId)

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden font-sans">
            {/* Global Header */}
            <header className="h-16 border-b bg-white px-6 flex items-center justify-between shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 rotate-3 group hover:rotate-0 transition-transform cursor-pointer">
                        <Rocket className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Unified Prototyping Hub</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">TRL-4 Validation Workspace</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <Button
                            variant={data.status === 'dashboard' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-8 text-[10px] font-black uppercase rounded-md px-3"
                            onClick={() => setData(prev => ({ ...prev, status: 'dashboard', currentProjectId: null }))}
                        >
                            <Layout className="h-3 w-3 mr-1.5" /> Dashboard
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[10px] font-black uppercase rounded-md px-3"
                        >
                            <History className="h-3 w-3 mr-1.5" /> Activity
                        </Button>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1" />

                    <Button
                        size="sm"
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="bg-slate-900 hover:bg-black text-white px-4 h-9 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-md"
                    >
                        {saving ? <Sparkles className="h-3 w-3 animate-spin" /> : <Layers className="h-3 w-3" />}
                        {saving ? "Syncing..." : "Manual Sync"}
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative">
                {data.status === 'dashboard' ? (
                    <ProjectDashboard
                        data={data}
                        onUpdate={setData}
                        onSelectProject={(id: string) => setData(prev => ({ ...prev, status: 'project_detail', currentProjectId: id }))}
                    />
                ) : (
                    <ProjectDetails
                        project={currentProject!}
                        onUpdateProject={(updated: PrototypeProject) => setData(prev => ({
                            ...prev,
                            projects: prev.projects.map(p => p.id === updated.id ? updated : p)
                        }))}
                        onBack={() => setData(prev => ({ ...prev, status: 'dashboard', currentProjectId: null }))}
                    />
                )}
            </main>
        </div>
    )
}
