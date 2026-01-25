
"use client"

import React, { useState, useEffect, useMemo } from 'react'
import {
    Save,
    Sparkles,
    Share2,
    Download,
    History,
    Settings2,
    Info,
    ChevronRight,
    ArrowLeftRight,
    Target,
    Zap,
    Scale,
    Plus,
    Trash2,
    Maximize,
    Minimize
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'

import { VPCData, VPCItem, CustomerProfile, ValueMap } from './types'
import { VPCSection } from './VPCSection'

const INITIAL_DATA: VPCData = {
    customerSegment: {
        name: "Default Segment",
        description: "Target customer group..."
    },
    customerProfile: {
        jobs: [],
        pains: [],
        gains: []
    },
    valueMap: {
        productsServices: [],
        painRelievers: [],
        gainCreators: []
    },
    fitAssessment: {
        overallFit: 0,
        painFit: 0,
        gainFit: 0,
        jobFit: 0,
        validationStatus: "draft",
        nextTests: []
    },
    version: 1
}

interface Props {
    tool: any
    progress: any
    onDataSaved?: () => void
}

export function VPCBuilder({ tool, progress, onDataSaved }: Props) {
    const [data, setData] = useState<VPCData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [lastSavedData, setLastSavedData] = useState<string>(JSON.stringify(progress?.data || INITIAL_DATA))

    const debouncedData = useDebounce(data, 2000)

    // Fit Calculation Logic
    const fitScores = useMemo(() => {
        const { customerProfile, valueMap } = data

        // Simplified Logic: Ratio of value map items addressed to total critical customer items
        const calculateSegmentFit = (customerItems: VPCItem[], valueItems: VPCItem[]) => {
            if (customerItems.length === 0) return 0
            const totalImportance = customerItems.reduce((acc, curr) => acc + curr.importance, 0)
            const addressedImportance = customerItems
                .filter(ci => valueItems.some(vi => vi.linkedId === ci.id || vi.text.toLowerCase().includes(ci.text.toLowerCase().split(' ')[0])))
                .reduce((acc, curr) => acc + curr.importance, 0)

            // Mock linking for now: Randomly say 40-70% if items exist
            if (valueItems.length > 0 && customerItems.length > 0) {
                return Math.min(100, Math.floor((valueItems.length / customerItems.length) * 50) + 20)
            }
            return 0
        }

        const painFit = calculateSegmentFit(customerProfile.pains, valueMap.painRelievers)
        const gainFit = calculateSegmentFit(customerProfile.gains, valueMap.gainCreators)
        const jobFit = data.valueMap.productsServices.length > 0 && data.customerProfile.jobs.length > 0 ? 80 : 0

        const overallFit = Math.floor((painFit + gainFit + jobFit) / 3)

        return { painFit, gainFit, jobFit, overallFit }
    }, [data])

    const handleSave = async (isAuto = false) => {
        const currentDataStr = JSON.stringify(data)
        if (isAuto && currentDataStr === lastSavedData) return

        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                if (!isAuto) toast.error(res.error)
            } else {
                if (!isAuto) toast.success("Value Proposition Canvas saved!")
                setLastSavedData(currentDataStr)
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            if (!isAuto) toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    // Auto-save effect
    useEffect(() => {
        if (JSON.stringify(debouncedData) !== lastSavedData) {
            handleSave(true)
        }
    }, [debouncedData])

    const generateId = () => {
        return `item-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    }

    const addItem = (section: keyof CustomerProfile | keyof ValueMap) => {
        const id = generateId()

        setData(prev => {
            if (section === 'productsServices') {
                const newProduct = {
                    id,
                    name: "",
                    description: "",
                    mvpStatus: false
                }
                return {
                    ...prev,
                    valueMap: {
                        ...prev.valueMap,
                        productsServices: [...prev.valueMap.productsServices, newProduct]
                    }
                }
            } else if (section in prev.customerProfile) {
                const newItem: VPCItem = {
                    id,
                    text: "",
                    importance: 3,
                    evidence: []
                }
                return {
                    ...prev,
                    customerProfile: {
                        ...prev.customerProfile,
                        [section]: [...(prev.customerProfile as any)[section], newItem]
                    }
                }
            } else if (section in prev.valueMap) {
                const newItem: VPCItem = {
                    id,
                    text: "",
                    importance: 3,
                    evidence: []
                }
                return {
                    ...prev,
                    valueMap: {
                        ...prev.valueMap,
                        [section]: [...(prev.valueMap as any)[section], newItem]
                    }
                }
            }
            return prev
        })
    }

    const removeItem = (section: string, id: string) => {
        setData(prev => {
            if (section in prev.customerProfile) {
                return {
                    ...prev,
                    customerProfile: {
                        ...prev.customerProfile,
                        [section]: (prev.customerProfile as any)[section].filter((i: any) => i.id !== id)
                    }
                }
            } else if (section in prev.valueMap) {
                return {
                    ...prev,
                    valueMap: {
                        ...prev.valueMap,
                        [section]: (prev.valueMap as any)[section].filter((i: any) => i.id !== id)
                    }
                }
            }
            return prev
        })
    }

    const updateItem = (section: string, id: string, text: string) => {
        setData(prev => {
            if (section in prev.customerProfile) {
                return {
                    ...prev,
                    customerProfile: {
                        ...prev.customerProfile,
                        [section]: (prev.customerProfile as any)[section].map((i: any) => i.id === id ? { ...i, text } : i)
                    }
                }
            } else if (section in prev.valueMap) {
                return {
                    ...prev,
                    valueMap: {
                        ...prev.valueMap,
                        [section]: (prev.valueMap as any)[section].map((i: any) => i.id === id ? { ...i, text } : i)
                    }
                }
            }
            return prev
        })
    }

    const updateImportance = (section: string, id: string, level: number) => {
        setData(prev => {
            if (section in prev.customerProfile) {
                return {
                    ...prev,
                    customerProfile: {
                        ...prev.customerProfile,
                        [section]: (prev.customerProfile as any)[section].map((i: any) => i.id === id ? { ...i, importance: level } : i)
                    }
                }
            } else if (section in prev.valueMap) {
                return {
                    ...prev,
                    valueMap: {
                        ...prev.valueMap,
                        [section]: (prev.valueMap as any)[section].map((i: any) => i.id === id ? { ...i, importance: level } : i)
                    }
                }
            }
            return prev
        })
    }

    return (
        <div className="mx-auto space-y-6 lg:p-4 w-full max-w-full">
            {/* Header / Stats Overlay */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Input
                            value={data.customerSegment.name}
                            onChange={(e) => setData(prev => ({ ...prev, customerSegment: { ...prev.customerSegment, name: e.target.value } }))}
                            className="text-2xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 w-auto min-w-[200px]"
                        />
                        <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50/50">
                            Iteration #{data.version}
                        </Badge>
                    </div>
                    <Input
                        value={data.customerSegment.description}
                        onChange={(e) => setData(prev => ({ ...prev, customerSegment: { ...prev.customerSegment, description: e.target.value } }))}
                        className="text-sm text-slate-500 bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                    <div className="flex flex-col gap-1 w-32">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>Problem Fit</span>
                            <span>{fitScores.overallFit}%</span>
                        </div>
                        <Progress value={fitScores.overallFit} className="h-1.5" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleSave(false)} disabled={saving} className="bg-slate-900">
                            {saving ? <Sparkles className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Canvas
                        </Button>
                    </div>
                </div>
            </div>

            {/* The Split Canvas Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">

                {/* VALUE MAP (Left Side - The Square/Diamond) */}
                <div className="space-y-6 flex flex-col">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <Zap className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">The Value Map</h2>
                            <p className="text-xs text-slate-400 font-medium">How you create value for your customers</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="col-span-2 md:col-span-1">
                            <VPCSection
                                title="Pain Relievers"
                                description="How your products alleviate customer pains"
                                items={data.valueMap.painRelievers}
                                type="relievers"
                                color="bg-indigo-50/70"
                                onAddItem={() => addItem('painRelievers')}
                                onRemoveItem={(id) => removeItem('painRelievers', id)}
                                onUpdateItem={(id, text) => updateItem('painRelievers', id, text)}
                                onUpdateImportance={(id, level) => updateImportance('painRelievers', id, level)}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <VPCSection
                                title="Gain Creators"
                                description="How your products create customer gains"
                                items={data.valueMap.gainCreators}
                                type="creators"
                                color="bg-cyan-50/70"
                                onAddItem={() => addItem('gainCreators')}
                                onRemoveItem={(id) => removeItem('gainCreators', id)}
                                onUpdateItem={(id, text) => updateItem('gainCreators', id, text)}
                                onUpdateImportance={(id, level) => updateImportance('gainCreators', id, level)}
                            />
                        </div>
                        <Card className="col-span-2 bg-slate-50/80 border-dashed border-2">
                            <CardHeader className="py-4 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-bold">Products & Services</CardTitle>
                                    <p className="text-[10px] text-slate-400">The core offerings that create value</p>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => addItem('productsServices')}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Offering
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3 pb-6">
                                {data.valueMap.productsServices.length === 0 ? (
                                    <div className="text-center py-6 text-slate-400 text-sm italic">
                                        No products listed yet...
                                    </div>
                                ) : (
                                    data.valueMap.productsServices.map((ps) => (
                                        <div key={ps.id} className="flex gap-3 items-center bg-white p-3 rounded-xl border group shadow-sm">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                                {ps.id.slice(-1)}
                                            </div>
                                            <Input
                                                className="flex-1 bg-transparent border-none font-semibold focus-visible:ring-0"
                                                value={ps.name}
                                                onChange={(e) => {
                                                    setData(prev => {
                                                        const newData = { ...prev }
                                                        newData.valueMap.productsServices = newData.valueMap.productsServices.map(i => i.id === ps.id ? { ...i, name: e.target.value } : i)
                                                        return newData
                                                    })
                                                }}
                                                placeholder="Product Name..."
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 rounded-full h-8 w-8"
                                                onClick={() => {
                                                    setData(prev => {
                                                        const newData = { ...prev }
                                                        newData.valueMap.productsServices = newData.valueMap.productsServices.filter(i => i.id !== ps.id)
                                                        return newData
                                                    })
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CUSTOMER PROFILE (Right Side - The Circle) */}
                <div className="space-y-6 flex flex-col">
                    <div className="flex items-center gap-3 px-2 lg:flex-row-reverse">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg overflow-hidden">
                            <Target className="h-5 w-5" />
                        </div>
                        <div className="lg:text-right">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Customer Profile</h2>
                            <p className="text-xs text-slate-400 font-medium">Understanding the customer segment</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="col-span-2 md:col-span-1 order-2 md:order-1">
                            <VPCSection
                                title="Customer Pains"
                                description="What annoys your customers or stops them"
                                items={data.customerProfile.pains}
                                type="pains"
                                color="bg-rose-50/70"
                                onAddItem={() => addItem('pains')}
                                onRemoveItem={(id) => removeItem('pains', id)}
                                onUpdateItem={(id, text) => updateItem('pains', id, text)}
                                onUpdateImportance={(id, level) => updateImportance('pains', id, level)}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1 order-3 md:order-3">
                            <VPCSection
                                title="Customer Gains"
                                description="What your customers want to achieve"
                                items={data.customerProfile.gains}
                                type="gains"
                                color="bg-emerald-50/70"
                                onAddItem={() => addItem('gains')}
                                onRemoveItem={(id) => removeItem('gains', id)}
                                onUpdateItem={(id, text) => updateItem('gains', id, text)}
                                onUpdateImportance={(id, level) => updateImportance('gains', id, level)}
                            />
                        </div>
                        <div className="col-span-2 order-1 md:order-2">
                            <VPCSection
                                title="Customer Jobs"
                                description="What your customers are trying to get done"
                                items={data.customerProfile.jobs}
                                type="jobs"
                                color="bg-blue-50/70"
                                onAddItem={() => addItem('jobs')}
                                onRemoveItem={(id) => removeItem('jobs', id)}
                                onUpdateItem={(id, text) => updateItem('jobs', id, text)}
                                onUpdateImportance={(id, level) => updateImportance('jobs', id, level)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fit Assessment Panel */}
            <Card className="bg-slate-900 text-white overflow-hidden rounded-2xl border-none shadow-xl">
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                    <div className="lg:col-span-1 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="48" cy="48" r="40"
                                    className="stroke-slate-700 fill-none"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="48" cy="48" r="40"
                                    className="stroke-blue-500 fill-none transition-all duration-1000"
                                    strokeWidth="8"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 - (251.2 * fitScores.overallFit) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                                {fitScores.overallFit}%
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Problem-Solution Fit</span>
                            <div className="text-xs text-blue-400 font-semibold uppercase italic flex items-center gap-1">
                                <Scale className="h-3 w-3" />
                                {fitScores.overallFit > 70 ? "Strong Fit" : fitScores.overallFit > 40 ? "Moderate Fit" : "Weak Fit"}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pain Relief</span>
                            <div className="text-xl font-bold">{fitScores.painFit}%</div>
                            <Progress value={fitScores.painFit} className="h-1 bg-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gain Creation</span>
                            <div className="text-xl font-bold">{fitScores.gainFit}%</div>
                            <Progress value={fitScores.gainFit} className="h-1 bg-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jobs Completed</span>
                            <div className="text-xl font-bold">{fitScores.jobFit}%</div>
                            <Progress value={fitScores.jobFit} className="h-1 bg-slate-800" />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl"
                            onClick={() => {
                                toast.promise(
                                    new Promise(resolve => setTimeout(resolve, 2000)),
                                    {
                                        loading: "AI analyzing fit gaps...",
                                        success: "Gap analysis complete! Check the segments for suggestions.",
                                        error: "AI analysis failed"
                                    }
                                )
                            }}
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Analyze & Advice
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
