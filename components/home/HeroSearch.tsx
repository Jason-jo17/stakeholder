"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, TrendingUp, MapPin, Building2, Users, Globe, Network } from "lucide-react"
import { FILTER_OPTIONS } from "@/lib/data/platform-problems"

export function HeroSearch() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [region, setRegion] = useState("")
    const [sector, setSector] = useState("")
    const [impact, setImpact] = useState("")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (searchQuery) params.set("q", searchQuery)
        if (region) params.set("region", region)
        if (sector) params.set("sector", sector)
        if (impact) params.set("impact", impact)

        router.push(`/stakeholders?${params.toString()}`)
    }

    return (
        <main className="flex flex-col items-center justify-center px-4 py-16 md:py-24 max-w-5xl mx-auto">
            {/* Headline */}
            <div className="mb-10 text-center">
                <h1 className="text-[#111118] dark:text-white tracking-tight text-4xl md:text-5xl font-bold leading-tight pb-3">
                    Find the right stakeholders <br className="hidden md:block" /> for your project.
                </h1>
                <p className="text-[#64608a] dark:text-muted-foreground text-lg">Access a global directory of organizations, experts, and influencers.</p>
            </div>

            {/* Search & Discovery Container */}
            <div className="w-full max-w-3xl bg-white dark:bg-[#1c1b33] p-6 md:p-8 rounded-2xl shadow-xl shadow-primary/5">
                {/* Large Search Bar */}
                <div className="mb-6">
                    <label className="flex flex-col w-full">
                        <div className="flex w-full items-stretch rounded-xl h-16 shadow-inner bg-[#f6f5f8] dark:bg-background-dark/50 border border-transparent focus-within:border-primary/30 transition-all select-none">
                            <div className="text-primary flex items-center justify-center pl-6">
                                <Search className="w-6 h-6" />
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-[#64608a] px-4 text-lg font-normal text-[#111118] dark:text-white outline-none"
                                placeholder="Search by name, organization, or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                suppressHydrationWarning
                            />
                        </div>
                    </label>
                </div>

                {/* Stylish Dropdown Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Region Filter */}
                    <div className="flex flex-col">
                        <p className="text-[#111118] dark:text-gray-200 text-xs font-bold uppercase tracking-wider leading-normal pb-2 px-1">Region</p>
                        <select
                            className="flex w-full rounded-lg text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dcdbe6] dark:border-gray-700 bg-white dark:bg-background h-12 text-sm font-medium px-3 outline-none"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            suppressHydrationWarning
                        >
                            <option value="">Global Coverage</option>
                            {FILTER_OPTIONS.regions.map((r, i) => (
                                <option key={i} value={r.district}>{r.district} {r.city ? `(${r.city})` : ''}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sector Filter */}
                    <div className="flex flex-col">
                        <p className="text-[#111118] dark:text-gray-200 text-xs font-bold uppercase tracking-wider leading-normal pb-2 px-1">Sector</p>
                        <select
                            className="flex w-full rounded-lg text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dcdbe6] dark:border-gray-700 bg-white dark:bg-background h-12 text-sm font-medium px-3 outline-none"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            suppressHydrationWarning
                        >
                            <option value="">All Sectors</option>
                            {FILTER_OPTIONS.sectors.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Impact Area Filter */}
                    <div className="flex flex-col">
                        <p className="text-[#111118] dark:text-gray-200 text-xs font-bold uppercase tracking-wider leading-normal pb-2 px-1">Impact Area</p>
                        <select
                            className="flex w-full rounded-lg text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dcdbe6] dark:border-gray-700 bg-white dark:bg-background h-12 text-sm font-medium px-3 outline-none"
                            value={impact}
                            onChange={(e) => setImpact(e.target.value)}
                            suppressHydrationWarning
                        >
                            <option value="">Any Impact Area</option>
                            {FILTER_OPTIONS.sdgs.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto min-w-[240px] flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                        suppressHydrationWarning
                    >
                        <span className="truncate">Search Stakeholders</span>
                    </button>
                </div>
            </div>

            {/* Discovery Tags */}
            <div className="mt-12 w-full max-w-3xl px-4">
                <div className="flex flex-col gap-6">
                    {/* Trending Sectors */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-[#64608a] dark:text-muted-foreground">Trending Sectors:</span>
                        {[
                            { label: "Renewable Energy", icon: TrendingUp },
                            { label: "Urban Planning", icon: TrendingUp },
                            { label: "Circular Economy", icon: TrendingUp }
                        ].map((tag, i) => (
                            <Link key={i} href={`/stakeholders?sector=${tag.label}`} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
                                <tag.icon className="w-4 h-4" />
                                {tag.label}
                            </Link>
                        ))}
                    </div>

                    {/* Popular Regions */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-[#64608a] dark:text-muted-foreground">Popular Regions:</span>
                        {[
                            { label: "Southeast Asia" },
                            { label: "Nordics" },
                            { label: "Sub-Saharan Africa" }
                        ].map((tag, i) => (
                            <Link key={i} href={`/stakeholders?region=${tag.label}`} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all">
                                <MapPin className="w-4 h-4" />
                                {tag.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Illustration/Icon Group */}
            <div className="mt-20 flex gap-8 opacity-20 dark:opacity-10 grayscale pointer-events-none select-none">
                <Building2 className="w-16 h-16" />
                <Users className="w-16 h-16" />
                <Globe className="w-16 h-16" />
                <Network className="w-16 h-16" />
            </div>
        </main>
    )
}
