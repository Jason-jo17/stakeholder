
"use client"

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Plus,
    Trash2,
    Layout,
    Sparkles,
    Eye,
    Presentation,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    MessageSquare,
    History,
    Info,
    Loader2
} from 'lucide-react'
import { PitchDeck, Slide, SlideType } from './types'
import { cn } from "@/lib/utils"

interface DeckEditorProps {
    deck: PitchDeck;
    onUpdate: (deck: PitchDeck) => void;
    onBack: () => void;
}

const SLIDE_TYPES: { type: SlideType; label: string; icon: any }[] = [
    { type: 'cover', label: 'Cover', icon: Layout },
    { type: 'problem', label: 'Problem', icon: Info },
    { type: 'solution', label: 'Solution', icon: Sparkles },
    { type: 'product_demo', label: 'Demo', icon: Eye },
    { type: 'market_opportunity', label: 'Market', icon: Presentation },
    { type: 'traction', label: 'Traction', icon: History },
    { type: 'competition', label: 'Competition', icon: Layout },
    { type: 'ask', label: 'The Ask', icon: Info },
]

export function DeckEditor({ deck, onUpdate, onBack }: DeckEditorProps) {
    const [activeSlideId, setActiveSlideId] = useState(deck.slides[0]?.slide_id || null)
    const [isOptimizing, setIsOptimizing] = useState(false)
    const activeSlide = deck.slides.find(s => s.slide_id === activeSlideId)

    const handleUpdateSlide = (updatedSlide: Slide) => {
        onUpdate({
            ...deck,
            slides: deck.slides.map(s => s.slide_id === updatedSlide.slide_id ? updatedSlide : s)
        })
    }

    const handleOptimize = async () => {
        if (!activeSlide) return
        setIsOptimizing(true)

        // Mock AI optimization delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        toast.success("Slide narrative optimized by AI!")
        setIsOptimizing(false)
    }

    const handleAddSlide = (type: SlideType = 'solution') => {
        const newSlide: Slide = {
            slide_id: `slide-${Date.now()}`,
            slide_number: deck.slides.length + 1,
            slide_type: type,
            template_used: 'default',
            content: {
                headline: `New ${type.replace('_', ' ')} Slide`,
                body_text: "",
                bullet_points: [],
                images: [],
                charts: [],
                evidence_references: []
            },
            presenter_notes: "",
            ai_suggestions: [],
            review_comments: [],
            design: { layout: 'standard', theme: 'professional' }
        }

        onUpdate({
            ...deck,
            slides: [...deck.slides, newSlide]
        })
        setActiveSlideId(newSlide.slide_id)
    }

    return (
        <div className="flex h-full bg-white overflow-hidden">
            {/* Sidebar: Slide Navigation */}
            <div className="w-64 border-r bg-slate-50 flex flex-col">
                <div className="p-4 border-b bg-white flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-slate-900 px-0">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Dashboard
                    </Button>
                    <Badge className="bg-indigo-50 text-indigo-600 border-none px-2 py-0.5 text-[9px] uppercase font-black">Editor</Badge>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {deck.slides.map((slide, idx) => (
                        <div
                            key={slide.slide_id}
                            onClick={() => setActiveSlideId(slide.slide_id)}
                            className={cn(
                                "group relative aspect-video w-full rounded-lg border-2 transition-all cursor-pointer overflow-hidden p-2 text-[8px] font-bold uppercase",
                                activeSlideId === slide.slide_id ? "border-indigo-600 bg-white shadow-lg ring-4 ring-indigo-50" : "border-slate-100 bg-white/50 hover:border-slate-300"
                            )}
                        >
                            <div className="absolute top-1 left-1 text-[6px] text-slate-400">{idx + 1}</div>
                            <div className="h-full flex flex-col justify-center items-center text-center px-4">
                                <p className="line-clamp-2 text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{slide.content.headline || "Untitled Slide"}</p>
                                <div className="mt-1 h-0.5 w-4 bg-slate-100 rounded-full" />
                            </div>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        className="w-full aspect-video border-dashed border-2 bg-transparent hover:bg-slate-100 hover:border-slate-400 group rounded-lg"
                        onClick={() => handleAddSlide()}
                    >
                        <Plus className="h-5 w-5 text-slate-300 group-hover:text-slate-900" />
                    </Button>
                </div>
            </div>

            {/* Main Area: Slide Canvas & Controls */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-100/50">
                {/* Toolbar */}
                <div className="h-16 border-b bg-white px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
                            {deck.deck_title}
                        </h2>
                        <div className="h-6 w-[1px] bg-slate-200" />
                        <Select
                            value={activeSlide?.slide_type}
                            onValueChange={(v) => activeSlide && handleUpdateSlide({ ...activeSlide, slide_type: v as SlideType })}
                        >
                            <SelectTrigger className="h-9 w-40 rounded-xl border-none bg-slate-50 font-black text-[9px] uppercase tracking-widest text-indigo-600 focus:ring-0">
                                <SelectValue placeholder="Slide Type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-none shadow-2xl">
                                {SLIDE_TYPES.map(t => (
                                    <SelectItem key={t.type} value={t.type} className="font-bold text-[10px] uppercase tracking-wider">{t.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900"><MessageSquare size={18} /></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900"><History size={18} /></Button>
                        <div className="h-6 w-[1px] bg-slate-200 mx-1" />
                        <Button className="bg-slate-900 hover:bg-black text-white rounded-xl h-10 px-6 font-black text-[10px] uppercase tracking-widest">
                            <Eye className="h-4 w-4 mr-2" /> Live Preview
                        </Button>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 p-12 overflow-y-auto flex justify-center items-start">
                    {activeSlide ? (
                        <Card className="aspect-video w-full max-w-4xl bg-white shadow-2xl rounded-[32px] overflow-hidden flex flex-col p-16 relative">
                            <div className="space-y-8 flex-1 flex flex-col">
                                <Input
                                    value={activeSlide.content.headline}
                                    onChange={(e) => handleUpdateSlide({
                                        ...activeSlide,
                                        content: { ...activeSlide.content, headline: e.target.value }
                                    })}
                                    className="text-4xl font-black border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-slate-200"
                                    placeholder="CLICK TO ADD HEADLINE"
                                />

                                <div className="flex-1 min-h-0">
                                    {activeSlide.slide_type === 'market_opportunity' ? (
                                        <div className="grid grid-cols-3 gap-8 py-8 h-full">
                                            {[
                                                { label: 'TAM', sub: 'Total Addressable', color: 'bg-indigo-600', field: 'tam' },
                                                { label: 'SAM', sub: 'Serviceable Addressable', color: 'bg-indigo-400', field: 'sam' },
                                                { label: 'SOM', sub: 'Serviceable Obtainable', color: 'bg-indigo-300', field: 'som' }
                                            ].map(m => (
                                                <div key={m.label} className="flex flex-col items-center">
                                                    <div className={cn("w-full aspect-square rounded-full flex flex-col items-center justify-center text-white p-6 shadow-xl", m.color)}>
                                                        <p className="text-4xl font-black tracking-tighter">$1.2B</p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest mt-1">{m.label}</p>
                                                    </div>
                                                    <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{m.sub}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : activeSlide.slide_type === 'traction' ? (
                                        <div className="grid grid-cols-2 gap-8 h-full">
                                            <div className="overflow-y-auto pr-4 space-y-4">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Proof Points</h4>
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <div className="h-4 w-4 rounded-full border-2 border-indigo-400 shrink-0" />
                                                        <Input placeholder="Enter milestone..." className="border-none bg-transparent p-0 h-auto text-sm font-bold focus-visible:ring-0" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-slate-900 rounded-[24px] p-8 flex flex-col justify-between text-white border-4 border-indigo-500/20">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Growth Metric</p>
                                                    <h3 className="text-4xl font-black tracking-tighter italic">240% MoM</h3>
                                                </div>
                                                <div className="h-32 w-full bg-gradient-to-t from-indigo-600/20 to-transparent rounded-xl border border-white/10 flex items-center justify-center">
                                                    <History className="text-white/20" size={48} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Textarea
                                            value={activeSlide.content.body_text}
                                            onChange={(e) => handleUpdateSlide({
                                                ...activeSlide,
                                                content: { ...activeSlide.content, body_text: e.target.value }
                                            })}
                                            className="text-lg font-medium border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-slate-200 min-h-[250px] resize-none"
                                            placeholder="Type your bullet points or narrative here..."
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Notes Toggle Placeholder */}
                            <div className="absolute bottom-8 left-16 right-16 flex items-center justify-between text-slate-300">
                                <div className="flex items-center gap-4">
                                    <Layout size={16} className="cursor-pointer hover:text-indigo-600 transition-colors" />
                                    <Presentation size={16} className="cursor-pointer hover:text-indigo-600 transition-colors" />
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-widest tabular-nums">{activeSlide.slide_number} / {deck.slides.length}</p>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
                            <Layout size={48} />
                            <p className="font-black uppercase tracking-widest italic">Select a slide to start editing</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Content Assistant */}
            <div className="w-80 border-l bg-white flex flex-col shrink-0">
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={14} /> AI content assistant
                        </h3>
                        <Badge className="bg-indigo-50 text-indigo-600 border-none text-[8px] font-black h-4 px-1.5 uppercase">v1.2</Badge>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-tight">Get slide-specific storytelling and narrative guidance.</p>
                </div>

                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    {activeSlide && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="p-4 bg-indigo-50/50 rounded-[20px] border border-indigo-100 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-[40px]" />
                                    <h4 className="text-[9px] font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                        <Info size={10} /> Strategy: {activeSlide.slide_type}
                                    </h4>
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium italic relative z-10">
                                        {activeSlide.slide_type === 'problem' ? '"Use a specific, relatable example. Quantify the pain with evidence from research."' :
                                            activeSlide.slide_type === 'solution' ? '"Focus on the value prop in 1 sentence. Use a visual demo or mockup."' :
                                                activeSlide.slide_type === 'market_opportunity' ? '"Bottom-up TAM/SAM/SOM is more credible than top-down percentages."' :
                                                    activeSlide.slide_type === 'traction' ? '"Show momentum, not just static numbers. Investors love growth curves."' :
                                                        '"Keep it simple and focus on the primary takeaway."'}
                                    </p>
                                </div>

                                <Button
                                    onClick={handleOptimize}
                                    disabled={isOptimizing}
                                    className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all"
                                >
                                    {isOptimizing ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> Optimizing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-3.5 w-3.5 mr-2" /> Optimize Narrative
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Presenter Notes</Label>
                                    <span className="text-[8px] font-bold text-slate-300">CTRL+N to focus</span>
                                </div>
                                <Textarea
                                    value={activeSlide.presenter_notes}
                                    onChange={(e) => handleUpdateSlide({ ...activeSlide, presenter_notes: e.target.value })}
                                    className="h-32 rounded-2xl text-xs font-medium border-slate-100 bg-slate-50/50 focus:ring-indigo-600 resize-none px-4 py-3"
                                    placeholder="Scripts, key talking points, or cues..."
                                />
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Integrations</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="h-8 rounded-lg text-[8px] border-slate-200 font-black uppercase tracking-widest">VPC Data</Button>
                                    <Button variant="outline" className="h-8 rounded-lg text-[8px] border-slate-200 font-black uppercase tracking-widest">Metrics</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
