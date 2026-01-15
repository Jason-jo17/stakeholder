"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

type Cause = {
    id: string
    text: string
}

type Category = {
    id: string
    name: string
    causes: Cause[]
}

export function FishboneAnalysis() {
    const [categories, setCategories] = useState<Category[]>([
        { id: 'cat-1', name: 'Manpower', causes: [{ id: 'c-1', text: 'Insufficient training for pickers' }, { id: 'c-2', text: 'High staff turnover' }] },
        { id: 'cat-2', name: 'Methods', causes: [{ id: 'c-3', text: 'Outdated sorting process' }] },
        { id: 'cat-3', name: 'Machines', causes: [{ id: 'c-4', text: 'Dryer unit #4 malfunction' }] },
        { id: 'cat-4', name: 'Materials', causes: [{ id: 'c-5', text: 'Inferior fertilizer quality' }] },
        { id: 'cat-5', name: 'Measurements', causes: [{ id: 'c-6', text: 'Calibration errors in scales' }] },
        { id: 'cat-6', name: 'Environment', causes: [{ id: 'c-7', text: 'Heavy rainfall' }] },
    ])

    const [editingCause, setEditingCause] = useState<{ catId: string, causeId?: string } | null>(null)
    const [tempText, setTempText] = useState("")

    const handleAddClick = (catId: string) => {
        setEditingCause({ catId })
        setTempText("")
    }

    const handleSave = () => {
        if (!editingCause || !tempText.trim()) {
            setEditingCause(null)
            return
        }

        setCategories(prev => prev.map(cat => {
            if (cat.id !== editingCause.catId) return cat

            // Adding new cause
            return {
                ...cat,
                causes: [...cat.causes, { id: `c-${Date.now()}`, text: tempText }]
            }
        }))
        setEditingCause(null)
        setTempText("")
    }

    const handleCancel = () => {
        setEditingCause(null)
        setTempText("")
    }

    const handleDelete = (catId: string, causeId: string) => {
        if (confirm("Remove this cause?")) {
            setCategories(prev => prev.map(cat => {
                if (cat.id !== catId) return cat
                return {
                    ...cat,
                    causes: cat.causes.filter(c => c.id !== causeId)
                }
            }))
        }
    }

    // Split categories for top/bottom rendering
    const topCategories = categories.slice(0, 3)
    const bottomCategories = categories.slice(3, 6)

    return (
        <div className="w-full h-full bg-background-light dark:bg-background-dark font-display text-navy border rounded-xl overflow-hidden">

            <div className="max-w-[1440px] mx-auto px-10 py-6">
                <div className="flex flex-col gap-2 mb-6">
                    <div className="flex justify-between items-start">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                            <a className="hover:text-primary transition-colors" href="#">Root Cause Analysis</a>
                            <span className="material-symbols-outlined text-sm">{'>'}</span>
                            <span className="text-foreground font-semibold">Q4 Production Audit</span>
                        </nav>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold hover:bg-primary/5 transition-all group">
                            <span className="material-symbols-outlined text-sm">info</span>
                            <span>Tutorial Mode: <span className="text-foreground">ON</span></span>
                            <div className="w-8 h-4 bg-primary/20 rounded-full relative ml-1">
                                <div className="absolute left-4 top-0.5 w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-between items-end gap-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-foreground dark:text-white text-4xl font-black tracking-tighter">Fishbone Analysis: Declining Coffee Yields</h1>
                            <p className="text-muted-foreground dark:text-white/60 text-base max-w-2xl">Visualizing primary factors and sub-causes contributing to the decrease in production output.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (confirm("Reset all causes to default?")) window.location.reload()
                                }}
                                className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white border border-navy/10 text-foreground text-sm font-bold hover:bg-background-light transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">refresh</span>
                                <span>Reset Diagram</span>
                            </button>
                            <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
                                <span className="material-symbols-outlined text-sm">add_circle</span>
                                <span>+ New Category</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full h-[650px] bg-white rounded-xl shadow-sm border border-navy/5 overflow-hidden p-8 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#1c2a3b 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}></div>
                    <div className="fishbone-spine absolute left-8 right-[320px] h-1 bg-primary z-10 top-1/2 -translate-y-1/2"></div>

                    {/* Problem Statement Head */}
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20">
                        <div className="w-[280px] p-6 bg-[#DC143C] text-white rounded-lg shadow-xl shadow-[#DC143C]/20 border-2 border-white/20">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 block mb-1">Problem Statement</span>
                            <h3 className="text-xl font-black leading-tight">Declining Coffee Yields</h3>
                            <p className="text-xs mt-2 opacity-90 font-medium">15% drop observed in Q4 output.</p>
                            <div className="mt-4 flex justify-end">
                                <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md font-bold transition-all">Edit Statement</button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 flex justify-around px-[100px] pr-[380px]">
                        {/* Top Bones */}
                        {topCategories.map((cat) => (
                            <div key={cat.id} className="relative h-1/2 w-0 flex justify-center">
                                <div className="bone-line absolute w-0.5 bg-primary h-[180px] z-0 bottom-0 origin-bottom transform -rotate-45"></div>
                                <button
                                    onClick={() => handleAddClick(cat.id)}
                                    className="absolute -bottom-4 -right-4 z-30 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform guide-highlight"
                                >
                                    <span className="material-symbols-outlined text-lg">+</span>
                                </button>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <div className="px-5 py-2 bg-[#1C2A3B] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg mb-4 whitespace-nowrap">
                                        {cat.name}
                                    </div>
                                    <div className="flex flex-col gap-3 w-44">
                                        {cat.causes.map((cause) => (
                                            <div
                                                key={cause.id}
                                                className="group relative bg-white p-3 rounded-lg shadow-sm border border-navy/5 text-xs text-foreground font-semibold hover:border-primary cursor-pointer transition-all flex items-start gap-2"
                                            >
                                                <span className="material-symbols-outlined text-muted-foreground text-base cursor-grab active:cursor-grabbing">drag_indicator</span>
                                                <span>{cause.text}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDelete(cat.id, cause.id)
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-[10px] block">close</span>
                                                </button>
                                            </div>
                                        ))}

                                        {editingCause?.catId === cat.id && !editingCause.causeId && (
                                            <div className="bg-primary/5 p-2 rounded-lg border-2 border-primary/30 ml-4 animate-in fade-in zoom-in-95">
                                                <input
                                                    autoFocus
                                                    className="w-full text-xs bg-transparent border-none focus:ring-0 p-1 font-medium placeholder:text-navy/40"
                                                    placeholder="Type cause..."
                                                    type="text"
                                                    value={tempText}
                                                    onChange={(e) => setTempText(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                                />
                                                <div className="flex justify-end gap-1 mt-2">
                                                    <button onClick={handleCancel} className="px-2 py-1 text-[10px] font-bold text-navy/50 hover:text-navy">Cancel</button>
                                                    <button onClick={handleSave} className="px-3 py-1 text-[10px] font-bold bg-primary text-white rounded hover:bg-primary/90">Save</button>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => handleAddClick(cat.id)}
                                            className="self-start ml-4 size-6 bg-white border border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                                        >
                                            <span className="material-symbols-outlined text-sm">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute inset-0 flex justify-around px-[100px] pr-[380px]">
                        {/* Bottom Bones */}
                        {bottomCategories.map((cat) => (
                            <div key={cat.id} className="relative top-1/2 h-1/2 w-0 flex justify-center">
                                <div className="bone-line absolute w-0.5 bg-primary h-[180px] z-0 top-0 origin-top transform rotate-45"></div>
                                <button
                                    onClick={() => handleAddClick(cat.id)}
                                    className="absolute -top-4 -right-4 z-30 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-lg">+</span>
                                </button>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
                                    <div className="px-5 py-2 bg-[#1C2A3B] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg mb-4 whitespace-nowrap">
                                        {cat.name}
                                    </div>
                                    <div className="flex flex-col-reverse gap-3 w-44">
                                        {cat.causes.map((cause) => (
                                            <div
                                                key={cause.id}
                                                className="group relative bg-white p-3 rounded-lg shadow-sm border border-navy/5 text-xs text-foreground font-semibold hover:border-primary cursor-pointer transition-all flex items-start gap-2"
                                            >
                                                <span className="material-symbols-outlined text-muted-foreground text-base cursor-grab active:cursor-grabbing">drag_indicator</span>
                                                <span>{cause.text}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDelete(cat.id, cause.id)
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 absolute -right-2 -bottom-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-[10px] block">close</span>
                                                </button>
                                            </div>
                                        ))}

                                        {editingCause?.catId === cat.id && !editingCause.causeId && (
                                            <div className="bg-primary/5 p-2 rounded-lg border-2 border-primary/30 ml-4 animate-in fade-in zoom-in-95">
                                                <input
                                                    autoFocus
                                                    className="w-full text-xs bg-transparent border-none focus:ring-0 p-1 font-medium placeholder:text-navy/40"
                                                    placeholder="Type cause..."
                                                    type="text"
                                                    value={tempText}
                                                    onChange={(e) => setTempText(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                                />
                                                <div className="flex justify-end gap-1 mt-2">
                                                    <button onClick={handleCancel} className="px-2 py-1 text-[10px] font-bold text-navy/50 hover:text-navy">Cancel</button>
                                                    <button onClick={handleSave} className="px-3 py-1 text-[10px] font-bold bg-primary text-white rounded hover:bg-primary/90">Save</button>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => handleAddClick(cat.id)}
                                            className="self-start ml-4 size-6 bg-white border border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                                        >
                                            <span className="material-symbols-outlined text-sm">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                        <div className="flex bg-white rounded-lg shadow-lg border border-navy/5 overflow-hidden">
                            <button className="p-2.5 hover:bg-background-light text-foreground transition-colors">
                                <span className="material-symbols-outlined">zoom_in</span>
                            </button>
                            <div className="w-px bg-navy/5"></div>
                            <button className="p-2.5 hover:bg-background-light text-foreground transition-colors">
                                <span className="material-symbols-outlined">zoom_out</span>
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="size-10 flex items-center justify-center bg-white rounded-lg shadow-lg border border-navy/5 hover:bg-background-light text-foreground transition-all">
                                <span className="material-symbols-outlined">undo</span>
                            </button>
                            <button className="size-10 flex items-center justify-center bg-white rounded-lg shadow-lg border border-navy/5 hover:bg-background-light text-foreground transition-all">
                                <span className="material-symbols-outlined">redo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mt-8">
                    <div className="bg-white p-5 rounded-lg border border-navy/5 shadow-sm">
                        <p className="text-xs font-bold text-navy/40 uppercase tracking-wider mb-1">Total Root Causes</p>
                        <p className="text-2xl font-black text-foreground">
                            {categories.reduce((acc, cat) => acc + cat.causes.length, 0)} Factors
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-navy/5 shadow-sm">
                        <p className="text-xs font-bold text-navy/40 uppercase tracking-wider mb-1">Critical Priority</p>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-black text-[#DC143C]">3</p>
                            <span className="text-[10px] px-2 py-0.5 bg-[#DC143C]/10 text-[#DC143C] rounded font-bold uppercase">Attention</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-navy/5 shadow-sm">
                        <p className="text-xs font-bold text-navy/40 uppercase tracking-wider mb-1">Impacted Category</p>
                        <p className="text-lg font-black text-foreground">Environment</p>
                    </div>
                    <div className="bg-primary/5 p-5 rounded-lg border border-primary/10 shadow-sm flex flex-col justify-center">
                        <button className="flex items-center justify-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm">
                            Generate AI Insight
                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .fishbone-spine {
                    height: 4px;
                    background-color: #786BF9;
                    width: 100%;
                }
                .bone-line {
                    width: 2px;
                    background-color: #786BF9;
                }
                .guide-highlight {
                    box-shadow: 0 0 0 4px rgba(120, 107, 249, 0.3);
                }
                .guide-pulse::after {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border: 2px solid #786BF9;
                    border-radius: inherit;
                    animation: pulse-ring 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.95); opacity: 1; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
            `}</style>
        </div>
    )
}
