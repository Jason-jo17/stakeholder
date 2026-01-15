"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSectors, DAKSHINA_KARNATAKA_DISTRICTS } from "@/hooks/use-master-data"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { Slider } from "@/components/ui/slider"
import { MOCK_PROBLEMS } from "@/lib/hooks/use-problems"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FilterState {
    query: string
    sectors: string[]
    districts: string[]
    problemStatements: string[]
    verificationStatus: string
    experienceRange: [number, number]
}

interface SearchFiltersProps {
    onFilterChange: (filters: FilterState) => void
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
    const sectors = useSectors()
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 300)

    const [selectedSectors, setSelectedSectors] = useState<string[]>([])
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
    const [selectedProblems, setSelectedProblems] = useState<string[]>([])
    const [experienceRange, setExperienceRange] = useState<[number, number]>([0, 50])
    const [verificationStatus, setVerificationStatus] = useState<string>("all")

    // Notify parent of changes
    useEffect(() => {
        onFilterChange({
            query: debouncedQuery,
            sectors: selectedSectors,
            districts: selectedDistricts,
            problemStatements: selectedProblems,
            verificationStatus,
            experienceRange
        })
    }, [debouncedQuery, selectedSectors, selectedDistricts, selectedProblems, verificationStatus, experienceRange, onFilterChange])

    const handleSectorToggle = (sectorId: string) => {
        setSelectedSectors(prev =>
            prev.includes(sectorId) ? prev.filter(id => id !== sectorId) : [...prev, sectorId]
        )
    }

    const handleDistrictToggle = (district: string) => {
        setSelectedDistricts(prev =>
            prev.includes(district) ? prev.filter(d => d !== district) : [...prev, district]
        )
    }

    const handleProblemToggle = (problemCode: string) => {
        setSelectedProblems(prev =>
            prev.includes(problemCode) ? prev.filter(p => p !== problemCode) : [...prev, problemCode]
        )
    }

    const handleReset = () => {
        setQuery("")
        setSelectedSectors([])
        setSelectedDistricts([])
        setSelectedProblems([])
        setExperienceRange([0, 50])
        setVerificationStatus("all")
    }

    return (
        <Card className="p-4 space-y-6">
            {/* Text Search */}
            <div className="space-y-2">
                <Label>Search Keywords</Label>
                <Input
                    placeholder="Name, organization, expertise..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <Accordion type="multiple" defaultValue={["sectors", "problems", "districts"]} className="w-full">
                {/* Sectors */}
                <AccordionItem value="sectors">
                    <AccordionTrigger>Sectors</AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-40 border rounded-md p-2">
                            <div className="space-y-2">
                                {sectors.map(sector => (
                                    <div key={sector.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`sector-${sector.id}`}
                                            checked={selectedSectors.includes(sector.name)}
                                            onCheckedChange={() => handleSectorToggle(sector.name)}
                                        />
                                        <label
                                            htmlFor={`sector-${sector.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {sector.icon} {sector.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>

                {/* Problem Statements */}
                <AccordionItem value="problems">
                    <AccordionTrigger>Problem Statements</AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-40 border rounded-md p-2">
                            <div className="space-y-2">
                                {MOCK_PROBLEMS.map(problem => (
                                    <div key={problem.id} className="flex items-start space-x-2">
                                        <Checkbox
                                            id={`problem-${problem.id}`}
                                            checked={selectedProblems.includes(problem.code)}
                                            onCheckedChange={() => handleProblemToggle(problem.code)}
                                            className="mt-1"
                                        />
                                        <label
                                            htmlFor={`problem-${problem.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 grid gap-1.5"
                                        >
                                            <span className="font-semibold text-xs text-muted-foreground">{problem.code}</span>
                                            <span>{problem.title}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>

                {/* Districts */}
                <AccordionItem value="districts">
                    <AccordionTrigger>Districts</AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-40 border rounded-md p-2">
                            <div className="space-y-2">
                                {DAKSHINA_KARNATAKA_DISTRICTS.map(district => (
                                    <div key={district} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`district-${district}`}
                                            checked={selectedDistricts.includes(district)}
                                            onCheckedChange={() => handleDistrictToggle(district)}
                                        />
                                        <label
                                            htmlFor={`district-${district}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {district}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Experience */}
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Label>Experience</Label>
                    <span className="text-xs text-muted-foreground">{experienceRange[0]} - {experienceRange[1]} years</span>
                </div>
                <Slider
                    defaultValue={[0, 50]}
                    min={0}
                    max={50}
                    step={1}
                    value={[experienceRange[0], experienceRange[1]]}
                    onValueChange={(value) => setExperienceRange([value[0], value[1]])}
                />
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={handleReset}
            >
                Reset Filters
            </Button>
        </Card>
    )
}
