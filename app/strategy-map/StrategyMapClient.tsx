'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface StrategyMapClientProps {
    problems: any[];
    solutions: any[];
    sectors: any[];
}

export default function StrategyMapClient({ problems, solutions, sectors }: StrategyMapClientProps) {
    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#f1f2fb] dark:bg-[#111022] font-sans text-[#111118] dark:text-white">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white dark:bg-[#111022] dark:border-gray-800 px-6 py-3 z-30">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#111118] dark:text-white">
                        <div className="size-8 bg-[#786cf9] rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">account_tree</span>
                        </div>
                        <h2 className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">StrategyMapper</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-[#111118] dark:text-gray-300 text-sm font-medium leading-normal hover:text-[#786cf9] transition-colors">Dashboard</Link>
                        <Link href="#" className="text-[#786cf9] text-sm font-bold border-b-2 border-[#786cf9] leading-normal">Strategy Maps</Link>
                        <Link href="/analytics" className="text-[#111118] dark:text-gray-300 text-sm font-medium leading-normal hover:text-[#786cf9] transition-colors">Analytics</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-2 pr-4 border-r border-gray-200 dark:border-gray-800">
                        <Link href="#" className="text-gray-500 text-sm font-medium">Projects</Link>
                        <span className="text-gray-400 text-sm">/</span>
                        <span className="text-[#111118] dark:text-white text-sm font-medium">Live Strategy 2026</span>
                    </div>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#786cf9] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Export Map</span>
                    </button>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCupPfWjBXhij8tA6dnZxtUsQ0Mb_Lrc9qHiVJXgggGmJ9uJruvXPqA0yTwbzwdSqncayU4MbirzQ_O8256I_txygfaPh_xij39eZzolE1iryAzMLCj-LIKjm_ovEzIQrJe_qhh-oNI2F2vmDTxmYMdy11d_B6MpMSQgXPgI1xHvUj8oqmTCI2tSCZKXyR8YN4uTl7U1Qfs66XGb-bjrkqeLKwWuIyc-UhefyKOt88QqkrvzSUod6FV7GjV1T92pf7E-011hft1Q8iS")' }}>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Side Navigation Bar (Collapsible Toolbox) */}
                <aside className="w-72 bg-white dark:bg-[#111022] border-r border-gray-200 dark:border-gray-800 flex flex-col z-20 shadow-sm">
                    <div className="p-6 flex flex-col gap-6 overflow-y-auto">
                        <div className="flex flex-col">
                            <h1 className="text-[#111118] dark:text-white text-base font-bold leading-normal">Strategy Toolbox</h1>
                            <p className="text-gray-500 text-sm font-normal leading-normal">Drag and drop nodes to canvas</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#786cf9]/10 text-[#786cf9] border border-[#786cf9]/20 cursor-pointer">
                                <span className="material-symbols-outlined">category</span>
                                <p className="text-sm font-bold">Node Library</p>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                                <span className="material-symbols-outlined">dashboard_customize</span>
                                <p className="text-sm font-medium">Templates</p>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                                <span className="material-symbols-outlined">layers</span>
                                <p className="text-sm font-medium">Layers</p>
                            </div>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Strategic Nodes</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 cursor-grab hover:border-[#786cf9]/50 transition-all">
                                    <span className="material-symbols-outlined text-[#786cf9]">target</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Impact Goal</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 cursor-grab hover:border-[#786cf9]/50 transition-all">
                                    <span className="material-symbols-outlined text-green-500">lightbulb</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Solution</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 cursor-grab hover:border-[#786cf9]/50 transition-all">
                                    <span className="material-symbols-outlined text-amber-500">database</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Input</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Canvas Area */}
                <main className="flex-1 relative overflow-hidden bg-[#f1f2fb] dark:bg-[#1a192d] canvas-grid">
                    {/* Canvas Toolbar */}
                    <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center pointer-events-none">
                        <div className="bg-white/80 dark:bg-[#111022]/80 backdrop-blur shadow-md rounded-lg p-1 flex gap-1 pointer-events-auto border border-gray-200 dark:border-gray-800">
                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors" title="Zoom In">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            {/* ... toolbar ... */}
                        </div>
                        <button className="flex pointer-events-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#786cf9] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-6 shadow-lg shadow-[#786cf9]/20">
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            <span className="truncate">Save Changes</span>
                        </button>
                    </div>

                    {/* Swimlanes and Cards */}
                    <div className="h-full w-full p-20 flex flex-col gap-12 overflow-auto">
                        {/* SVG Layer for Connections */}
                        <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 1 }}>
                            {/* Connections would be dynamic in a real app */}
                        </svg>

                        {/* Tier 1: Impact Goals (Using Problem Statements as proxies for Goals) */}
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="text-[#111118] dark:text-white text-xl font-bold tracking-tight">Systemic Problems & Goals</h2>
                                <span className="px-2 py-0.5 bg-[#786cf9]/10 text-[#786cf9] text-[10px] font-bold rounded-full uppercase">Strategic</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6 w-full">
                                {problems.slice(0, 3).map((problem) => (
                                    <div key={problem.id} className="w-80 bg-white dark:bg-gray-900 p-5 rounded-lg shadow-xl border-l-4 border-[#786cf9] ring-1 ring-black/5 hover:ring-[#786cf9]/50 transition-all cursor-pointer">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="p-2 bg-[#786cf9]/10 rounded-lg">
                                                <span className="material-symbols-outlined text-[#786cf9] text-xl">eco</span>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-400">more_vert</span>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{problem.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{problem.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {/* Avatars placeholder */}
                                                <div className="size-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px]">A</div>
                                                <div className="size-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px]">B</div>
                                            </div>
                                            <span className="text-[10px] font-bold text-[#786cf9]">{problem.severity?.toUpperCase() || 'HIGH'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tier 2: Proposed Solutions */}
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="text-[#111118] dark:text-white text-xl font-bold tracking-tight">Active Solutions</h2>
                                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase">Tactical</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-12 w-full">
                                {solutions.slice(0, 3).map((solution) => (
                                    <div key={solution.id} className="w-80 bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg border-t-2 border-green-400 hover:ring-[#786cf9]/50 transition-all cursor-pointer">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-500">
                                                <span className="material-symbols-outlined text-xl">precision_manufacturing</span>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-400">more_vert</span>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{solution.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{solution.description}</p>
                                        <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 w-full">
                                            <div className="bg-green-500 h-1.5 rounded-full w-3/4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tier 3: Sectors / Root Causes */}
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="text-[#111118] dark:text-white text-xl font-bold tracking-tight">Impact Sectors</h2>
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-bold rounded-full uppercase">Foundational</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                {sectors.slice(0, 4).map((sector) => (
                                    <div key={sector.id} className="w-72 bg-white dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all cursor-pointer">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="size-8 rounded flex items-center justify-center bg-amber-50">
                                                <span className="text-amber-500 text-xl">{sector.icon || '📍'}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{sector.name}</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{sector.description || 'Sector description unavailable'}</p>
                                        <div className="flex justify-between items-center text-[10px] font-medium text-gray-400">
                                            <span>Active</span>
                                            <span className="text-amber-500">Dataset</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
