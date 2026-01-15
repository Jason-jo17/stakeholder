"use client"

import { useInstitutions } from "@/lib/hooks/use-institutions"
import { InstitutionCard } from "@/components/institutions/InstitutionCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react"

export default function InstitutionsPage() {
    const { data: institutions } = useInstitutions()

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold">Institutions Directory</h1>
                    <p className="text-muted-foreground mt-2">
                        Connect with supporting organizations, incubators, and NGOs
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Institution
                </Button>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search institutions..." className="pl-8" />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutions?.map((inst: any) => (
                    <InstitutionCard key={inst.id} institution={inst} />
                ))}
            </div>
        </div>
    )
}
