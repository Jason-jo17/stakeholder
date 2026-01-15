"use client"

import { useState } from "react"
import { ValuePropositionCanvas } from "@/components/student/canvas/ValuePropositionCanvas"
import { ThemedValueCanvas } from "./ThemedValueCanvas"
import { Button } from "@/components/ui/button"

export default function ValuePropositionPage() {
    const [viewMode, setViewMode] = useState<'standard' | 'themed'>('standard')

    if (viewMode === 'themed') {
        return (
            <div className="relative">
                <div className="fixed top-20 right-10 z-[100]">
                    <Button variant="secondary" size="sm" onClick={() => setViewMode('standard')}>
                        Exit Themed View
                    </Button>
                </div>
                <ThemedValueCanvas />
            </div>
        )
    }

    return (
        <div className="container py-8 transition-all">
            <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={() => setViewMode('themed')}>
                    Try New Canvas Theme
                </Button>
            </div>
            <ValuePropositionCanvas />
        </div>
    )
}
