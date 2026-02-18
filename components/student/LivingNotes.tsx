"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Save } from "lucide-react"

export function LivingNotes() {
    const [notes, setNotes] = useState("")
    const [lastSaved, setLastSaved] = useState<Date | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem("living-notes")
        if (saved) setNotes(saved)
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("living-notes", notes)
            setLastSaved(new Date())
        }, 1000)
        return () => clearTimeout(timeout)
    }, [notes])

    return (
        <Card className="h-full border-primary/10 shadow-sm flex flex-col">
            <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-bold">Living Notes</CardTitle>
                </div>
                {lastSaved && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Save className="h-3 w-3" /> Auto-saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}
            </CardHeader>
            <CardContent className="flex-1 p-0 px-4 pb-4">
                <Textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Capture ideas, research findings, and next steps here..."
                    className="h-full min-h-[150px] resize-none border-none focus-visible:ring-0 bg-primary/5 p-4 rounded-xl text-sm leading-relaxed"
                />
            </CardContent>
        </Card>
    )
}
