"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Plus,
    Trash2,
    Sparkles,
    Info,
    Lightbulb,
    ArrowRight,
    PlusCircle,
    HelpCircle,
    Link2,
    Users,
    Target,
    Box,
    Timer,
    Search,
    ChevronRight,
    Zap
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { SixPathsSession, Opportunity, JourneyStage, StrategicGroup, Buyer } from './types'

interface PathExplorerProps {
    data: SixPathsSession;
    onUpdate: (data: SixPathsSession) => void;
    pathIndex: number;
}

export function PathExplorer({ data, onUpdate, pathIndex }: PathExplorerProps) {
    const [newOpportunity, setNewOpportunity] = useState("")

    const addOpportunity = (pathKey: string, payload: any) => {
        // Generic handler for adding things to paths
        onUpdate({
            ...data,
            paths: {
                ...data.paths,
                [pathKey]: payload
            }
        })
    }

    const renderPath1 = () => { // Alternatives
        const path = data.paths.path1
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex gap-6 items-start">
                    <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                        <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">Path 1: Look Across Alternative Industries</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Alternatives are broader than substitutes. Cinema and restaurants are alternatives because they both fulfill the need for "an evening out". What other industries fulfill the same basic need as yours?
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-2 border-slate-100 rounded-3xl shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50/50 py-4 px-6 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Alternative Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Industry Name</label>
                                    <Input
                                        placeholder="e.g., Luxury Travel -> Private Jets"
                                        className="rounded-xl h-12 border-slate-200"
                                        value={path.currentIndustry}
                                        onChange={(e) => onUpdate({
                                            ...data,
                                            paths: { ...data.paths, path1: { ...path, currentIndustry: e.target.value } }
                                        })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Why customers choose it over you?</label>
                                    <Textarea
                                        placeholder="e.g., Speed, Status, Privacy..."
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <Button className="w-full bg-slate-900 h-12 text-[10px] uppercase font-black tracking-widest text-white shadow-md hover:bg-slate-800 rounded-xl">
                                    Add Alternative <Plus className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Discovered Opportunities</h5>
                        <div className="grid grid-cols-1 gap-4">
                            {path.alternativeIndustries.length === 0 ? (
                                <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-3xl opacity-50">
                                    <Search className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">No opportunities yet</p>
                                </div>
                            ) : (
                                path.alternativeIndustries.flatMap(ai => ai.opportunities).map(o => (
                                    <div key={o.id} className="p-5 bg-white border-2 rounded-2xl flex items-center justify-between group hover:border-blue-400 transition-all shadow-sm">
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-900">{o.description}</p>
                                            <Badge variant="outline" className="text-[9px] border-blue-100 text-blue-600 bg-blue-50">Impact: High</Badge>
                                        </div>
                                        <Button variant="ghost" className="h-8 w-8 text-slate-300 group-hover:text-rose-500">
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderPath5 = () => { // Functional-Emotional
        const path = data.paths.path5
        return (
            <div className="space-y-8 max-w-4xl mx-auto py-10 animate-in zoom-in-95">
                <div className="text-center space-y-4 mb-12">
                    <Badge className="bg-indigo-600 text-[10px] px-3 py-1 font-black uppercase tracking-widest">Psychology & Orientation</Badge>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Look Across Functional-Emotional Orientation</h3>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium">Some industries compete on price and function (functional); others on feelings and lifestyle (emotional). What happens if you flip your industry's orientation?</p>
                </div>

                <div className="grid grid-cols-2 gap-8 h-[300px]">
                    <div className={cn(
                        "p-8 rounded-[40px] border-4 flex flex-col items-center justify-center text-center gap-4 transition-all",
                        path.currentOrientation === 'functional' ? "border-blue-500 bg-blue-50 shadow-2xl scale-105" : "border-slate-100 bg-slate-50 opacity-40 grayscale"
                    )}>
                        <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl">
                            <Zap className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900">Functional Orientation</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Focus: Performance, Utility, Price</p>
                        <Button
                            className={cn("mt-4 rounded-full px-6 h-9 font-black text-[10px] uppercase", path.currentOrientation === 'functional' && "bg-blue-600")}
                            onClick={() => onUpdate({ ...data, paths: { ...data.paths, path5: { ...path, currentOrientation: 'functional' } } })}
                        >
                            {path.currentOrientation === 'functional' ? 'Current Norm' : 'Select'}
                        </Button>
                    </div>

                    <div className={cn(
                        "p-8 rounded-[40px] border-4 flex flex-col items-center justify-center text-center gap-4 transition-all",
                        path.currentOrientation === 'emotional' ? "border-rose-500 bg-rose-50 shadow-2xl scale-105" : "border-slate-100 bg-slate-50 opacity-40 grayscale"
                    )}>
                        <div className="h-16 w-16 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-xl">
                            <Sparkles className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900">Emotional Orientation</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Focus: Experience, Feelings, Status</p>
                        <Button
                            className={cn("mt-4 rounded-full px-6 h-9 font-black text-[10px] uppercase", path.currentOrientation === 'emotional' && "bg-rose-600")}
                            onClick={() => onUpdate({ ...data, paths: { ...data.paths, path5: { ...path, currentOrientation: 'emotional' } } })}
                        >
                            {path.currentOrientation === 'emotional' ? 'Current Norm' : 'Select'}
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] border-2 border-slate-100 shadow-sm space-y-6">
                    <h5 className="font-black text-slate-900 text-lg flex items-center gap-2">
                        <ArrowRight className="text-blue-500 h-5 w-5" /> The Reconstruction Opportunity
                    </h5>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Industry Norm / Baseline</label>
                        <Input
                            value={path.industryNorm}
                            onChange={(e) => onUpdate({
                                ...data,
                                paths: { ...data.paths, path5: { ...path, industryNorm: e.target.value } }
                            })}
                            placeholder="e.g., Focus on speed and efficiency"
                            className="rounded-2xl h-12 border-slate-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Flipped Value Proposition</label>
                        <Textarea
                            placeholder={`If we shift from ${path.currentOrientation} to ${path.currentOrientation === 'functional' ? 'emotional' : 'functional'}, how does the value proposition change?`}
                            className="min-h-[120px] rounded-3xl border-slate-200 p-6 text-base font-medium focus:ring-blue-500"
                        />
                    </div>
                    <Button className="bg-slate-900 w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-slate-800 transition-all">
                        Log Blue Ocean Opportunity <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        )
    }

    const renderPath2 = () => { // Strategic Groups
        const path = data.paths.path2
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex gap-6 items-start">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                        <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">Path 2: Look Across Strategic Groups</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Strategic groups are companies within an industry that pursue a similar strategy. For example, in the auto industry, there are "Luxury" and "Economy" groups. Why do customers trade up or down between these groups?
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Identify Strategic Groups</h5>
                        <Card className="rounded-[32px] border-2 border-slate-100 p-8 space-y-6 bg-white shadow-sm hover:border-emerald-200 transition-all">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Strategic Group Name</label>
                                <Input placeholder="e.g., Luxury Segment" className="rounded-2xl h-12 border-slate-200" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Common Competitive Factors</label>
                                <Input placeholder="e.g., High performance, Luxury interiors..." className="rounded-2xl h-12 border-slate-200" />
                            </div>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-2xl h-14 font-black uppercase tracking-widest text-xs text-white shadow-lg shadow-emerald-100 transition-all">
                                Register Strategic Group
                            </Button>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Untapped Opportunities</h5>
                        {path.opportunities.length === 0 ? (
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-12 text-center opacity-60">
                                <PlusCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                                <p className="text-xs text-slate-400 font-black uppercase tracking-widest leading-relaxed">
                                    Identify patterns across groups.<br />Add an opportunity here.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {path.opportunities.map(o => (
                                    <div key={o.id} className="p-6 bg-white border-2 rounded-3xl flex items-center justify-between group hover:border-emerald-400 transition-all shadow-sm">
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-900">{o.description}</p>
                                            <Badge className="bg-emerald-50 text-emerald-600 text-[9px] font-black border-emerald-100">Trade-off Gap</Badge>
                                        </div>
                                        <Button variant="ghost" className="h-10 w-10 rounded-xl text-slate-300 hover:bg-emerald-50 hover:text-rose-500 transition-all">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const renderPath3 = () => { // Buyer Chain
        const path = data.paths.path3
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 flex gap-6 items-start">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                        <Target className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">Path 3: Look Across the Chain of Buyers</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Industries usually focus on a single buyer group (e.g., Doctors in pharma, Purchasing agents in office supplies). But there are also users, influencers, and decision-makers. What happens if you shift the focus?
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border-2 border-slate-100 p-8 rounded-[40px] shadow-sm flex items-center justify-between">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Typical Industry Focus</label>
                            <Input
                                value={path.typicalBuyer}
                                onChange={(e) => onUpdate({
                                    ...data,
                                    paths: { ...data.paths, path3: { ...path, typicalBuyer: e.target.value } }
                                })}
                                placeholder="e.g., Purchasing Managers"
                                className="text-xl font-bold h-14 bg-slate-50 border-none rounded-2xl w-[300px]"
                            />
                        </div>
                        <ArrowRight className="text-slate-200 h-8 w-8" />
                        <div className="text-center bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Blue Ocean Shift</p>
                            <p className="text-sm font-bold">Focus on Users or Influencers</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {['Purchasers', 'Users', 'Influencers'].map(type => (
                            <Card key={type} className={cn(
                                "border-4 transition-all rounded-[32px] p-8 space-y-4 bg-white hover:shadow-xl",
                                path.typicalBuyer.toLowerCase().includes(type.toLowerCase().slice(0, -1))
                                    ? "border-slate-100 opacity-60"
                                    : "border-indigo-100 hover:border-indigo-500"
                            )}>
                                <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-2">
                                    <Users className="h-6 w-6 text-indigo-600" />
                                </div>
                                <h5 className="font-black text-slate-900 text-lg">{type}</h5>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                    What criteria does this group value most?
                                </p>
                                <Button className="w-full h-12 text-[10px] font-black uppercase rounded-xl bg-slate-900 text-white shadow-md">Analyze Unmet Needs</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const renderPath4 = () => { // Complementaries
        const path = data.paths.path4
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 flex gap-6 items-start">
                    <div className="h-12 w-12 rounded-2xl bg-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-200">
                        <Box className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">Path 4: Look Across Complementary Product Offerings</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Few products are used in a vacuum. Most are used with other products. Think about what happens before, during, and after your product is used. Where are the pain points?
                        </p>
                    </div>
                </div>

                <Card className="border-2 border-slate-100 rounded-[40px] p-8 space-y-6 bg-white shadow-sm overflow-hidden">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Core Product / Service</label>
                        <Input
                            value={path.coreProductService}
                            onChange={(e) => onUpdate({
                                ...data,
                                paths: { ...data.paths, path4: { ...path, coreProductService: e.target.value } }
                            })}
                            placeholder="e.g., Package Delivery"
                            className="text-xl font-bold h-14 bg-amber-50/30 border-none rounded-2xl"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {['Before', 'During', 'After'].map(stage => (
                            <div key={stage} className="space-y-4">
                                <Badge className="bg-amber-100 text-amber-700 font-black uppercase text-[10px] w-full justify-center h-10 rounded-xl leading-none">{stage} Usage</Badge>
                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 min-h-[140px] flex items-center justify-center text-center group hover:bg-white hover:border-amber-400 transition-all cursor-pointer">
                                    <div className="space-y-1">
                                        <PlusCircle className="h-5 w-5 text-slate-300 mx-auto group-hover:text-amber-500" />
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Identify Pain Points</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        )
    }

    const renderPath6 = () => { // Time/Trends
        const path = data.paths.path6
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 flex gap-8 items-start text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                        <Timer size={120} />
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg">
                        <Timer className="h-7 w-7 text-slate-900" />
                    </div>
                    <div className="space-y-2 relative z-10">
                        <h4 className="text-2xl font-black text-white tracking-tight">Path 6: Look Across Time</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-xl">
                            Identify irreversible environmental trends that have a clear trajectory and will significantly impact your industry over time.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Identify Trends", icon: Search, color: "blue" },
                        { title: "Trace Trajectory", icon: ChevronRight, color: "emerald" },
                        { title: "Define Impact", icon: Sparkles, color: "amber" }
                    ].map((step, i) => (
                        <Card key={i} className="border-2 border-slate-100 rounded-[32px] p-8 space-y-4 bg-white hover:shadow-2xl transition-all group hover:-translate-y-1">
                            <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                                i === 0 ? "bg-blue-50 text-blue-600" : i === 1 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                            )}>
                                <step.icon className="h-6 w-6" />
                            </div>
                            <h5 className="font-black text-slate-900 text-lg tracking-tight">{step.title}</h5>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">Map out the {step.title.toLowerCase()} for your market context.</p>
                            <Button variant="ghost" className="w-full justify-between h-10 text-[10px] font-black uppercase text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-xl px-4">
                                Analyze Phase <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    const renderContent = () => {
        switch (pathIndex) {
            case 0: return renderPath1()
            case 1: return renderPath2()
            case 2: return renderPath3()
            case 3: return renderPath4()
            case 4: return renderPath5()
            case 5: return renderPath6()
            default: return (
                <div className="flex items-center justify-center h-full text-slate-400 font-black uppercase text-xl animate-pulse">
                    Path {pathIndex + 1} Module Under Construction
                </div>
            )
        }
    }

    return (
        <div className="h-full overflow-y-auto px-8 pb-12">
            {renderContent()}
        </div>
    )
}

function Textarea(props: any) {
    return <textarea
        {...props}
        className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            props.className
        )}
    />
}
