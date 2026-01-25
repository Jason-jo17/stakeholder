
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Plus,
    Search,
    ExternalLink,
    Zap,
    CheckCircle2,
    AlertCircle,
    Link2,
    GitBranch,
    Figma as FigmaIcon,
    Github as GithubIcon,
    Layers,
    Terminal,
    Cpu,
    Smartphone,
    Globe,
    Settings,
    MoreVertical,
    Layout
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { PrototypeProject, ToolIntegration } from './types'

interface ToolLauncherProps {
    project: PrototypeProject;
    onUpdateProject: (updated: PrototypeProject) => void;
}

const TOOL_METADATA = {
    n8n: { label: 'n8n Automation', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', description: 'Visual workflow automation for backend logic and API integrations.' },
    tinkercad: { label: 'Tinkercad Hardware', icon: Cpu, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', description: 'Design circuits, 3D enclosures, and simulate Arduino/IoT code.' },
    bubble: { label: 'Bubble No-Code', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', description: 'Build sophisticated web applications without writing code.' },
    mit_app_inventor: { label: 'MIT App Inventor', icon: Smartphone, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', description: 'Create functional Android/iOS mobile apps using block programming.' },
    figma: { label: 'Figma Design', icon: FigmaIcon, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', description: 'Collaborative interface design and interactive wireframing.' },
    github: { label: 'GitHub Repo', icon: GithubIcon, color: 'text-slate-900', bg: 'bg-slate-100', border: 'border-slate-200', description: 'Version control, issue tracking, and source code management.' }
}

export function ToolLauncher({ project, onUpdateProject }: ToolLauncherProps) {
    const connectedTools = project.tools

    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Integrated Prototyping Stack</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">Connect and launch tools specific to your prototype type</p>
                </div>
                <Button className="bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6">
                    <Plus className="h-4 w-4 mr-2" /> Add New Tool
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {connectedTools.length > 0 ? (
                    connectedTools.map((tool: any, i: number) => {
                        const meta = (TOOL_METADATA as any)[tool.toolName]
                        const Icon = meta?.icon || Layers

                        return (
                            <Card key={i} className="border-2 border-slate-100 rounded-[32px] overflow-hidden hover:border-slate-900 hover:shadow-xl transition-all group bg-white">
                                <div className="p-8 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110", meta?.bg)}>
                                                <Icon className={cn("h-7 w-7", meta?.color)} />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-slate-900 uppercase tracking-tighter text-lg">{meta?.label}</h4>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[8px] font-black tracking-widest uppercase border-slate-100">{tool.integrationStatus}</Badge>
                                                    <span className="text-[10px] text-slate-400 font-bold">Updated 45m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-200 hover:text-slate-900">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{meta?.description}</p>

                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                                        <Button className="flex-1 bg-slate-900 hover:bg-black text-white px-4 h-11 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                                            Launch Workspace <ExternalLink className="h-3.5 w-3.5 ml-2" />
                                        </Button>
                                        <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-100 hover:bg-slate-50">
                                            <Settings className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                ) : (
                    <div className="col-span-full py-16 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] space-y-4 opacity-70">
                        <Link2 className="h-12 w-12 text-slate-300 mx-auto" />
                        <div className="space-y-1 px-8">
                            <h4 className="text-xl font-black text-slate-900 uppercase">No tools connected</h4>
                            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto italic leading-relaxed">Your project currently has no digital tools integrated. Add a tool to start prototyping.</p>
                        </div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest text-white mt-4">
                            Open Tool Market
                        </Button>
                    </div>
                )}
            </div>

            {/* Embedded Preview Mock (Optional Expansion) */}
            <Card className="border-4 border-slate-100 rounded-[40px] overflow-hidden bg-slate-50 p-1">
                <div className="bg-white rounded-[36px] p-10 space-y-8 shadow-inner border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-rose-50 rounded-2xl flex items-center justify-center">
                                <FigmaIcon className="h-6 w-6 text-rose-600" />
                            </div>
                            <div>
                                <h5 className="font-black text-slate-900 uppercase tracking-tighter text-lg leading-none mb-1">Live Integration Preview</h5>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mobile App Wireframe v2 (Figma)</p>
                            </div>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-widest h-8 px-4 rounded-full flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Sync Active
                        </Badge>
                    </div>

                    <div className="aspect-video bg-slate-100 rounded-[32px] border-4 border-slate-50 flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[32px] z-10">
                            <Button className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest">
                                Interact with Prototype
                            </Button>
                        </div>
                        <div className="text-center space-y-4">
                            <Layout className="h-16 w-16 text-slate-300 mx-auto" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Figma Embedding Placeholder</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
