"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import {
    ChevronRight,
    ChevronLeft,
    Save,
    Sparkles,
    Hexagon,
    Target,
    Zap,
    Layers,
    Search,
    Users,
    Box,
    Brain,
    Timer
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { SixPathsSession, Opportunity, SynthesisOpportunity, HexagonalNav, PathExplorer, SynthesisDashboard } from './index'

const INITIAL_DATA: SixPathsSession = {
    id: `session-${Date.now()}`,
    industryContext: "E-commerce Logistics",
    currentBusinessModel: "Traditional door-to-door delivery with standard pricing.",
    paths: {
        path1: { currentIndustry: "Logistics", alternativeIndustries: [] },
        path2: { strategicGroupsInIndustry: [], opportunities: [] },
        path3: { typicalBuyer: "Corporate Procurement", alternativeBuyers: [] },
        path4: { coreProductService: "Package Delivery", beforeDuringAfterJourney: [] },
        path5: { currentOrientation: 'functional', industryNorm: "Cost and speed focus", opportunitiesFromFlipping: [] },
        path6: { currentTrends: [], futureOpportunities: [] }
    },
    synthesis: {
        blueOceanOpportunities: [],
        recommendedFocus: "",
        nextSteps: []
    },
    status: 'setup',
    currentPathIndex: 0,
    version: 1
}

interface Props {
    tool: any;
    progress: any;
    onDataSaved?: () => void;
}

export function SixPathsTool({ tool, progress, onDataSaved }: Props) {
    const [data, setData] = useState<SixPathsSession>(progress?.data || INITIAL_DATA)
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
                if (!isAuto) toast.success("Six Paths Analysis saved!")
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
        <div className="max-w-3xl mx-auto py-16 px-6 space-y-12">
            <div className="text-center space-y-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 shadow-2xl rotate-12 transition-transform hover:rotate-0">
                    <Hexagon className="h-10 w-10 text-white fill-white/20" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Six Paths Framework</h2>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">Reconstruct market boundaries to discover Blue Ocean opportunities where competition is irrelevant.</p>
            </div>

            <Card className="border-2 shadow-sm rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardContent className="p-8 space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Industry Context</label>
                        <Input
                            value={data.industryContext}
                            onChange={(e) => setData(prev => ({ ...prev, industryContext: e.target.value }))}
                            placeholder="e.g., Luxury Travel, Fast Food, Cloud Computing..."
                            className="text-xl font-bold h-14 bg-white border-slate-200 focus:border-blue-500 rounded-2xl shadow-sm"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Current Business Model</label>
                        <textarea
                            value={data.currentBusinessModel}
                            onChange={(e) => setData(prev => ({ ...prev, currentBusinessModel: e.target.value }))}
                            placeholder="Describe how you currently compete in the Red Ocean..."
                            className="w-full min-h-[120px] p-4 text-base font-medium bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl resize-none shadow-sm transition-all"
                        />
                    </div>

                    <Button
                        className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg transition-all active:scale-[0.98]"
                        onClick={() => setData(prev => ({ ...prev, status: 'exploration' }))}
                    >
                        Start Market Reconstruction <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-6 text-center">
                {[
                    { icon: Search, label: "Alternatives" },
                    { icon: Users, label: "Strategic Groups" },
                    { icon: Target, label: "Buyer Chain" },
                    { icon: Box, label: "Complementary" },
                    { icon: Brain, label: "Emotional" },
                    { icon: Timer, label: "Time/Trends" }
                ].map((path, i) => (
                    <div key={i} className="space-y-2 opacity-40 group hover:opacity-100 transition-opacity">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto group-hover:bg-blue-50 transition-colors">
                            <path.icon className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600">{path.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderExploration = () => (
        <div className="flex flex-col h-full bg-slate-50/50">
            <div className="h-16 border-b bg-white px-6 flex items-center justify-between z-30 shrink-0">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => setData(prev => ({ ...prev, status: 'setup' }))}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="h-8 w-[1px] bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <Hexagon className="h-5 w-5 text-blue-600 fill-blue-50" />
                        <h3 className="font-black text-slate-900 text-sm tracking-tight">{data.industryContext}</h3>
                    </div>
                </div>

                <HexagonalNav
                    activeIndex={data.currentPathIndex}
                    onPathClick={(index: number) => setData(prev => ({ ...prev, currentPathIndex: index }))}
                />

                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="text-xs font-bold text-slate-500" onClick={() => setData(prev => ({ ...prev, status: 'synthesis' }))}>
                        Synthesis View
                    </Button>
                    <Button size="sm" onClick={() => handleSave(false)} disabled={saving} className="bg-slate-900 rounded-xl px-5 h-9 font-bold text-xs">
                        {saving ? <Sparkles className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Progress
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <PathExplorer
                    data={data}
                    onUpdate={setData}
                    pathIndex={data.currentPathIndex}
                />
            </div>
        </div>
    )

    const renderSynthesis = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="h-16 border-b px-6 flex items-center justify-between shrink-0">
                <Button variant="ghost" onClick={() => setData(prev => ({ ...prev, status: 'exploration' }))}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Back to Exploration
                </Button>
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500 fill-yellow-100" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Blue Ocean Synthesis</h2>
                </div>
                <Button size="sm" className="bg-slate-900" onClick={() => handleSave(false)}>
                    Export Strategy
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <SynthesisDashboard data={data} onUpdate={setData} />
            </div>
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border overflow-hidden">
            {data.status === 'setup' ? (
                <div className="flex-1 overflow-y-auto">
                    {renderSetup()}
                </div>
            ) : (
                <div className="flex-1 flex flex-col overflow-hidden">
                    {data.status === 'exploration' && renderExploration()}
                    {data.status === 'synthesis' && renderSynthesis()}
                </div>
            )}
        </div>
    )
}
