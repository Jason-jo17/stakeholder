
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    BarChart3,
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Target,
    Zap,
    AlertTriangle,
    CheckCircle2,
    Heart,
    MessageSquare,
    Sparkles,
    ArrowRight,
    Plus
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { UserTestingState } from './types'

interface AnalyticsDashboardProps {
    data: UserTestingState;
    onBack: () => void;
}

export function AnalyticsDashboard({ data, onBack }: AnalyticsDashboardProps) {
    return (
        <div className="h-full overflow-y-auto bg-slate-50/50 p-8 space-y-10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-xl bg-white border shadow-sm">
                            <ArrowLeft size={16} />
                        </Button>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Insights & Analytics</h2>
                    </div>
                    <p className="text-slate-500 font-medium pl-14">Aggregate performance data from all user testing cycles.</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button className="bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-6 shadow-lg shadow-slate-100 transition-all hover:bg-black">
                        Generate Report <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Avg. NPS', value: '42', trend: '+5%', status: 'up', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
                    { label: 'Usability Score', value: '78%', trend: '+12%', status: 'up', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { label: 'Task Success', value: '84%', trend: '-2%', status: 'down', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Avg. Time on Task', value: '4:21', trend: '-15%', status: 'up', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-2 border-slate-100 rounded-[32px] p-6 space-y-4 bg-white shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("h-6 w-6", stat.color)} />
                            </div>
                            <Badge className={cn(
                                "border-none font-black text-[10px] uppercase px-2 py-0.5 rounded-lg flex items-center gap-1",
                                stat.status === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>
                                {stat.status === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.trend}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Insight Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                        <AlertTriangle className="text-amber-500" /> Top Critical Issues
                    </h3>
                    <div className="space-y-4">
                        {[
                            { issue: "Onboarding flow is too long", frequency: 4, severity: "Critical", suggestion: "Remove step 3 and 4; combine with profile setup." },
                            { issue: "Payment button hidden on mobile", frequency: 3, severity: "Major", suggestion: "Increase contrast and z-index of the fixed footer." },
                            { issue: "Confusion with 'Sensor Settings' icon", frequency: 2, severity: "Minor", suggestion: "Replace with more literal 'Gear' or 'Slider' icon." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white border-2 border-slate-100 rounded-[32px] space-y-4 hover:border-slate-300 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Badge className={cn(
                                            "border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full",
                                            item.severity === 'Critical' ? "bg-rose-600 text-white" : "bg-amber-50 text-amber-600"
                                        )}>
                                            {item.severity}
                                        </Badge>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.frequency} Users Affected</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-200 hover:text-slate-900"><Plus size={18} /></Button>
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 leading-tight">{item.issue}</h4>
                                    <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 flex gap-3">
                                        <Sparkles className="h-5 w-5 text-indigo-500 shrink-0" />
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">AI Recommendation: {item.suggestion}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="p-8 bg-slate-900 rounded-[40px] text-white space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Heart size={100} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter">Emotional Response</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Excitement", value: 65, color: "bg-emerald-500" },
                                { label: "Confusion", value: 25, color: "bg-amber-500" },
                                { label: "Frustration", value: 10, color: "bg-rose-500" }
                            ].map((emo, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span>{emo.label}</span>
                                        <span>{emo.value}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full", emo.color)} style={{ width: `${emo.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed pt-2">Based on sentiment analysis of 124 voice transcripts.</p>
                    </div>

                    <Card className="border-4 border-slate-100 rounded-[40px] p-8 space-y-6">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                            <MessageSquare className="text-blue-500" /> Key Testimonials
                        </h3>
                        <div className="space-y-4">
                            {[
                                "It’s faster than anything I currently use for my garden.",
                                "The color scheme is a bit overwhelming on the settings page.",
                                "I wish I could share my sensor data with my neighbor easily."
                            ].map((quote, i) => (
                                <div key={i} className="space-y-2">
                                    <p className="text-xs text-slate-600 font-medium italic leading-relaxed">"{quote}"</p>
                                    <div className="h-[1px] bg-slate-100 w-1/4" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
