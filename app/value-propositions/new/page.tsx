"use client"

import { ValuePropositionCanvas } from "@/components/student/canvas/ValuePropositionCanvas"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewValuePropositionPage() {
    return (
        <div className="container py-8 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/value-propositions"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">New Value Proposition</h1>
                    <p className="text-muted-foreground text-sm">Create a new canvas for your idea</p>
                </div>
            </div>

            <ValuePropositionCanvas />
        </div>
    )
}
