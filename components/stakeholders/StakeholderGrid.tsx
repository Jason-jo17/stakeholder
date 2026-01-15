"use client"

import { StakeholderProfile } from "@/types"
import { StakeholderCard } from "./StakeholderCard"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues with Leaflet
const StakeholderMap = dynamic(() => import('./StakeholderMap'), {
    loading: () => <div className="h-[600px] w-full bg-muted/20 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>,
    ssr: false
})

interface StakeholderGridProps {
    stakeholders: StakeholderProfile[]
    isLoading?: boolean
    viewMode?: 'grid' | 'list' | 'map'
}

export function StakeholderGrid({ stakeholders, isLoading, viewMode = 'grid' }: StakeholderGridProps) {
    const router = useRouter()

    if (isLoading) {
        return (
            <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} ${viewMode === 'map' ? 'h-[600px] block' : ''}`}>
                {viewMode === 'map' ? (
                    <div className="h-full bg-muted/20 animate-pulse rounded-lg" />
                ) : (
                    [1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className={`bg-muted/20 animate-pulse rounded-lg ${viewMode === 'list' ? 'h-[100px]' : 'h-[300px]'}`} />
                    ))
                )}
            </div>
        )
    }

    if (stakeholders.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No stakeholders found matching your filters.</p>
            </div>
        )
    }

    if (viewMode === 'map') {
        return <StakeholderMap stakeholders={stakeholders} />
    }

    return (
        <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {stakeholders.map((stakeholder) => (
                <div key={stakeholder.id} className={viewMode === 'list' ? "flex items-center" : ""}>
                    <StakeholderCard
                        stakeholder={stakeholder}
                        onClick={() => router.push(`/stakeholders/${stakeholder.id}`)}
                    />
                </div>
            ))}
        </div>
    )
}
