"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PLATFORM_PROBLEMS, MOCK_STAKEHOLDERS } from '@/lib/data/platform-problems'

export default function MappingTool() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main font-display min-h-screen flex flex-col">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdce6] bg-white dark:bg-slate-900 px-10 py-3 z-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-primary">
                        <Link href="/" className="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_6_330)">
                                    <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                                </g>
                                <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
                            </svg>
                        </Link>
                        <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Strategic Analysis v1.0</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/student/dashboard" className="text-text-main/70 dark:text-white/70 text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                        <a className="text-text-main/70 dark:text-white/70 text-sm font-medium hover:text-primary transition-colors" href="#">Workspaces</a>
                        <a className="text-text-main dark:text-white text-sm font-bold border-b-2 border-primary pb-1" href="#">Mapping</a>
                        <a className="text-text-main/70 dark:text-white/70 text-sm font-medium hover:text-primary transition-colors" href="#">Reports</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all shadow-sm">
                        <span className="truncate">Finalize Mapping</span>
                    </button>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZ69erh4RWZ_lpmaM8PQ2QYUfi6hGI2tveQjboR7xKXPYpwvmpohhgKsbbmBh8yYBWd4MGKhEmS8xknJ4yY9EBfOjjYHDC8owc654eLqKEi4S6tsEbWkcsGeR4HRlUdBFiDYO-cZU9n7EnjR5EX2IIAziQ0MRun6YlheHblnxQ6GA8O8_cfqlKEe6Zy6k7xtAjl8BQ1qCFmYyxE5T7iQRbh-W7fAuEJt3zOIOobs5WkTN-G3Rx0jSdEN9Eg0f2cFeGsBRhAScdZiaz")' }}></div>
                </div>
            </header>
            <main className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
                <aside className="w-80 flex flex-col bg-white dark:bg-slate-900 border-r border-[#dbdce6] dark:border-slate-700">
                    <div className="p-4 border-b border-[#dbdce6] dark:border-slate-700">
                        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-text-main/60 dark:text-white/60">Problem Statements</h3>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-main/40">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50" placeholder="Filter problems..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {PLATFORM_PROBLEMS.map((problem) => (
                            <div key={problem.id} className="bg-white dark:bg-slate-800 border border-[#dbdce6] dark:border-slate-700 rounded-lg p-3 shadow-sm cursor-move hover:border-primary/50 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", problem.visible ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600")}>Medium Priority</span>
                                    <span className="material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                                </div>
                                <h4 className="text-sm font-bold text-text-main dark:text-white leading-snug line-clamp-2">{problem.title}</h4>
                                <p className="text-xs text-text-main/60 dark:text-slate-400 mt-1 line-clamp-2">{problem.description}</p>
                            </div>
                        ))}
                    </div>
                </aside>
                <section className="flex-1 flex flex-col min-w-0">
                    <div className="bg-white dark:bg-slate-900 px-8 border-b border-[#dbdce6] dark:border-slate-700 flex items-center justify-between">
                        <div className="flex gap-8">
                            <a className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-[13px] pt-4" href="#">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">hub</span>
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Relationship Canvas</p>
                                </div>
                            </a>
                            <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-text-main/60 dark:text-slate-400 pb-[13px] pt-4 hover:text-text-main" href="#">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">grid_on</span>
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Matrix Table</p>
                                </div>
                            </a>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-main/40 dark:text-white/40">
                                Legend:
                                <div className="flex items-center gap-1 ml-2"><div className="bg-impact-primary w-2.5 h-2.5 rounded-full"></div> <span>Primary</span></div>
                                <div className="flex items-center gap-1 ml-2"><div className="bg-impact-secondary w-2.5 h-2.5 rounded-full"></div> <span>Secondary</span></div>
                                <div className="flex items-center gap-1 ml-2"><div className="bg-impact-affected w-2.5 h-2.5 rounded-full"></div> <span>Affected</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-8 overflow-auto relative">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-text-main dark:text-white mb-2">Problem-Stakeholder Matrix</h1>
                            <p className="text-text-main/60 dark:text-slate-400">Map your project stakeholders to specific pain points to visualize impact levels and provide supporting evidence.</p>
                        </div>
                        <div className="border-4 border-dashed border-primary/20 rounded-xl min-h-[600px] flex flex-col items-center justify-start bg-white/50 dark:bg-slate-800/30 p-8">
                            <div className="grid grid-cols-1 gap-8 w-full max-w-5xl">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                                    <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-impact-primary px-3 py-1 bg-impact-primary/10 rounded-full">Primary Impact</span>
                                            <div className="flex items-center gap-2 text-text-main/40">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                <span className="text-[10px] font-bold uppercase">Updated 2h ago</span>
                                            </div>
                                        </div>
                                        <button className="text-text-main/20 hover:text-red-400 transition-colors"><span className="material-symbols-outlined">close</span></button>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-[1fr,48px,1fr] gap-6 mb-8 items-center bg-background-light/30 dark:bg-slate-900/30 p-4 rounded-lg">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-text-main/40 tracking-wider">Problem Statement</p>
                                                <h5 className="text-sm font-bold text-text-main dark:text-white">{PLATFORM_PROBLEMS[0]?.title}</h5>
                                            </div>
                                            <div className="flex justify-center text-primary">
                                                <span className="material-symbols-outlined text-[32px]">sync_alt</span>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <p className="text-[10px] uppercase font-bold text-text-main/40 tracking-wider">Stakeholder</p>
                                                <h5 className="text-sm font-bold text-text-main dark:text-white">{MOCK_STAKEHOLDERS[0]?.user.name}</h5>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                                                    <h6 className="text-xs font-bold uppercase tracking-wider text-text-main/70 dark:text-white/70">Reasoning &amp; Justification</h6>
                                                </div>
                                                <textarea className="reasoning-textarea w-full h-32 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-main/30 focus:outline-none" placeholder="Type the logical justification for this link..."></textarea>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                                                        <h6 className="text-xs font-bold uppercase tracking-wider text-text-main/70 dark:text-white/70">Supporting Evidence</h6>
                                                    </div>
                                                    <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                                                        <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                                        Add Evidence
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                                                        <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold truncate">Q3_Fleet_Analysis.pdf</p>
                                                            <p className="text-[10px] text-text-main/40">2.4 MB • Oct 12, 2023</p>
                                                        </div>
                                                        <button className="text-text-main/30 hover:text-text-main"><span className="material-symbols-outlined text-[18px]">open_in_new</span></button>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                                                        <span className="material-symbols-outlined text-blue-500">link</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold truncate">Transit Optimization Report</p>
                                                            <p className="text-[10px] text-text-main/40">https://internal.portal/reports/...</p>
                                                        </div>
                                                        <button className="text-text-main/30 hover:text-text-main"><span className="material-symbols-outlined text-[18px]">open_in_new</span></button>
                                                    </div>
                                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                                                        <div className="flex gap-4">
                                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">image</span>
                                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">attachment</span>
                                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">description</span>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-slate-400 group-hover:text-primary">Drag files or click to upload</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-4 flex-1">
                                        <span className="text-[9px] font-bold uppercase tracking-tighter text-impact-secondary px-2 py-0.5 bg-impact-secondary/10 rounded">Secondary</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold">Lack of real-time passenger data</span>
                                            <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
                                            <span className="text-xs font-bold">Data Analytics Providers</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">2+</div>
                                        </div>
                                        <button className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded">Expand to Edit Evidence</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4 text-text-main/40 py-12">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[32px]">add_link</span>
                                </div>
                                <p className="text-sm font-medium">Drag a Problem and a Stakeholder here to link them</p>
                            </div>
                        </div>
                    </div>
                </section>
                <aside className="w-80 flex flex-col bg-white dark:bg-slate-900 border-l border-[#dbdce6] dark:border-slate-700">
                    <div className="p-4 border-b border-[#dbdce6] dark:border-slate-700">
                        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-text-main/60 dark:text-white/60">Stakeholders</h3>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-main/40">
                                <span className="material-symbols-outlined text-[20px]">group</span>
                            </div>
                            <input className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50" placeholder="Search stakeholders..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {MOCK_STAKEHOLDERS.map((stakeholder) => (
                            <div key={stakeholder.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-slate-800 transition-all cursor-move group">
                                <div className="size-10 rounded-full bg-center bg-cover border-2 border-white shadow-sm bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {stakeholder.user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-text-main dark:text-white truncate">{stakeholder.user.name}</h4>
                                    <div className="flex gap-1.5 mt-0.5">
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded truncate">{stakeholder.designation}</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors text-[20px]">drag_pan</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-background-light/50 dark:bg-slate-800/50">
                        <button className="w-full py-2 border-2 border-dashed border-primary/30 rounded-lg text-primary text-xs font-bold hover:bg-primary/5 transition-colors">
                            + Add New Stakeholder
                        </button>
                    </div>
                </aside>
            </main>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border border-[#dbdce6] dark:border-slate-700 px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 z-20">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-main/60 dark:text-white/60">Total Problems: <span className="text-primary">12</span></span>
                </div>
                <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-main/60 dark:text-white/60">Mapped Connections: <span className="text-primary">4</span></span>
                </div>
                <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-text-main/60 dark:text-white/60">Mapping Progress:</span>
                    <div className="w-32 h-2 bg-background-light dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3"></div>
                    </div>
                    <span className="text-[10px] font-bold text-primary">33%</span>
                </div>
            </div>

            <style jsx global>{`
                .reasoning-textarea:focus { 
                    border-color: #786BF9; 
                    --tw-ring-color: #786BF9; 
                }
            `}</style>
        </div >
    )
}
