"use client"

import { useValueProposition } from "@/lib/hooks/use-value-propositions"
import { ValuePropositionCanvas } from "@/components/student/canvas/ValuePropositionCanvas"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ValuePropositionDetailPage() {
    const params = useParams()
    const { data: vp, isLoading } = useValueProposition(params.id as string)

    if (isLoading || !vp) {
        return <div className="container py-8">Loading...</div>
    }

    // Transform data array to strings for the canvas component if needed, 
    // or update component to handle arrays.
    // Assuming the component expects strings based on previous refactor.
    const canvasData = {
        customerJobs: Array.isArray(vp.customerJobs) ? vp.customerJobs.join('\n') : vp.customerJobs,
        pains: Array.isArray(vp.pains) ? vp.pains.join('\n') : vp.pains,
        gains: Array.isArray(vp.gains) ? vp.gains.join('\n') : vp.gains,
        productsServices: Array.isArray(vp.productsServices) ? vp.productsServices.join('\n') : vp.productsServices,
        painRelievers: Array.isArray(vp.painRelievers) ? vp.painRelievers.join('\n') : vp.painRelievers,
        gainCreators: Array.isArray(vp.gainCreators) ? vp.gainCreators.join('\n') : vp.gainCreators,
    }

    return (
        <div className="container py-8 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/value-propositions"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">{vp.title}</h1>
                    <p className="text-muted-foreground text-sm">Status: {vp.status}</p>
                </div>
            </div>

            <ValuePropositionCanvas initialData={canvasData} />
        </div>
    )
}
