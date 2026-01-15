"use client"

import { useProblems } from "@/lib/hooks/use-problems"
import { ProblemCard } from "@/components/problems/ProblemCard"
import { PLATFORM_PROBLEMS, FILTER_OPTIONS } from "@/lib/data/platform-problems"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter } from "lucide-react"
import { useState } from "react"

export default function ProblemsPage() {
    const { data: problems } = useProblems()
    const [showFilters, setShowFilters] = useState(false)
    const [selectedSector, setSelectedSector] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("")

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold">Problem Statements</h1>
                    <p className="text-muted-foreground mt-2">
                        Explore critical challenges identified across the region
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Problem
                </Button>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search problems..." className="pl-8" />
                </div>
                <Button variant={showFilters ? "secondary" : "outline"} onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            <div className={`grid gap-4 mb-8 p-4 bg-muted/30 rounded-lg border border-border transition-all ${showFilters ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Sector</label>
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                        >
                            <option value="">All Sectors</option>
                            {FILTER_OPTIONS.sectors.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Region</label>
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            <option value="">All Regions</option>
                            {FILTER_OPTIONS.regions.map((r, i) => (
                                <option key={i} value={r.district}>{r.district}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {problems?.map((problem: any) => (
                    <ProblemCard key={problem.id} problem={problem} />
                ))}
            </div>

            <div className="mb-6 mt-12 border-t pt-8">
                <div>
                    <h2 className="text-3xl font-bold">Platform Problem Statements</h2>
                    <p className="text-muted-foreground mt-2">
                        Strategic challenges identified by the central platform
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {PLATFORM_PROBLEMS.filter(p => {
                    if (selectedSector && !p.sectors.includes(selectedSector)) return false;
                    if (selectedRegion && !p.regions.some(r => r.district === selectedRegion)) return false;
                    return true;
                }).map((p) => {
                    const adaptedProblem = {
                        id: p.id,
                        code: `EXT-${p.id.slice(0, 4).toUpperCase()}`,
                        title: p.title,
                        description: p.description,
                        severity: "Medium",
                        domain: p.sectors[0],
                        districts: p.regions.map(r => r.district),
                        affectedPopulation: null
                    }
                    return <ProblemCard key={p.id} problem={adaptedProblem} />
                })}
            </div>
        </div>
    )
}
