
"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    Settings,
    Share2,
    Trash2,
    History,
    Zap,
    CheckCircle2,
    Lock,
    Unlock,
    ExternalLink,
    Plus,
    Rocket,
    Shield,
    Clock,
    ChevronRight
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { PrototypeProject, ToolIntegration, PrototypeVersion } from './types'
import { ToolLauncher } from '@/components/student/roadmap/tools/prototyping-hub/ToolLauncher'
import { TRLTracker } from '@/components/student/roadmap/tools/prototyping-hub/TRLTracker'
import { VersionTimeline } from '@/components/student/roadmap/tools/prototyping-hub/VersionTimeline'

interface ProjectDetailsProps {
    project: PrototypeProject;
    onUpdateProject: (updated: PrototypeProject) => void;
    onBack: () => void;
}

export function ProjectDetails({ project, onUpdateProject, onBack }: ProjectDetailsProps) {
    const [activeTab, setActiveTab] = useState("tools")

    if (!project) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <History className="h-8 w-8 text-slate-300" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-black text-slate-900 uppercase">Project Not Found</p>
                    <p className="text-xs text-slate-500 font-medium">The selected project could not be loaded.</p>
                </div>
                <Button variant="outline" onClick={onBack} className="rounded-xl px-6 font-black text-[10px] uppercase">
                    Back to Dashboard
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-white transition-all animate-in fade-in duration-500">
            {/* Project Header */}
            <div className="px-8 py-6 border-b flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="h-10 w-10 rounded-xl hover:bg-slate-50 border border-slate-100 shadow-sm"
                    >
                        <ArrowLeft className="h-4 w-4 text-slate-900" />
                    </Button>

                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{project.name}</h2>
                            <Badge className="bg-slate-900 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-lg h-5 shrink-0">TRL-{project.currentStatus.trlLevel}</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <Clock className="h-3 w-3" /> Last activity 2h ago
                            </p>
                            <div className="h-3 w-[1px] bg-slate-200" />
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> All tools synced
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-10 rounded-xl border-slate-100 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest text-slate-600 px-4">
                        <Share2 className="h-3.5 w-3.5 mr-2" /> Share
                    </Button>
                    <Button variant="outline" className="h-10 w-10 rounded-xl border-slate-100 hover:bg-slate-50 text-slate-600 p-0 overflow-hidden">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button className="h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100">
                        New Version <Plus className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                </div>
            </div>

            {/* Main Workspace Tabs */}
            <div className="flex-1 flex flex-col min-h-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full bg-slate-50/30">
                    <div className="px-8 bg-white border-b shrink-0 h-14 flex items-center">
                        <TabsList className="bg-transparent h-full p-0 flex gap-8">
                            <TabsTrigger
                                value="tools"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-indigo-600 h-full transition-all"
                            >
                                Prototyping Tools
                            </TabsTrigger>
                            <TabsTrigger
                                value="timeline"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-indigo-600 h-full transition-all"
                            >
                                Version Timeline
                            </TabsTrigger>
                            <TabsTrigger
                                value="trl"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-indigo-600 h-full transition-all"
                            >
                                TRL Advancement
                            </TabsTrigger>
                            <TabsTrigger
                                value="team"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-indigo-600 h-full transition-all"
                            >
                                Team & Access
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto min-h-0">
                        <TabsContent value="tools" className="h-full m-0">
                            <ToolLauncher project={project} onUpdateProject={onUpdateProject} />
                        </TabsContent>

                        <TabsContent value="timeline" className="h-full m-0">
                            <VersionTimeline project={project} onUpdateProject={onUpdateProject} />
                        </TabsContent>

                        <TabsContent value="trl" className="h-full m-0">
                            <TRLTracker project={project} onUpdateProject={onUpdateProject} />
                        </TabsContent>

                        <TabsContent value="team" className="h-full m-0 p-8">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute right-0 top-0 p-12 opacity-10">
                                        <Shield size={120} />
                                    </div>
                                    <h4 className="text-3xl font-black tracking-tighter mb-2">Team Governance</h4>
                                    <p className="text-slate-400 font-medium mb-8 max-w-lg">Manage role-based access to connected tools and audit the collaborative activity feed.</p>
                                    <Button className="bg-white text-slate-900 hover:bg-slate-100 h-11 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest">
                                        Invite Collaborator
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border-2 border-slate-100 rounded-[32px] p-8 space-y-6">
                                        <h5 className="font-black text-slate-900 uppercase text-xs tracking-widest">Active Roles</h5>
                                        <div className="space-y-4">
                                            {[
                                                { name: "John Doe", role: "Super Admin", tools: ["n8n", "Figma"] },
                                                { name: "Jane Smith", role: "Hardware Lead", tools: ["Tinkercad"] }
                                            ].map((member, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900">{member.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {member.tools.map(t => <Badge key={t} variant="outline" className="text-[8px] border-slate-200">{t}</Badge>)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    <Card className="border-2 border-slate-100 rounded-[32px] p-8 space-y-6 bg-slate-900 text-white">
                                        <h5 className="font-black text-white uppercase text-xs tracking-widest opacity-60">Security Level</h5>
                                        <div className="flex items-center gap-4 py-4">
                                            <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                                                <Unlock className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-black tracking-tight">VPC Protection: Active</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SSO enforced for all integrated tools</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
