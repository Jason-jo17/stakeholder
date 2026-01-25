
"use client"

import { InterviewGuideData } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

interface Props {
    data: InterviewGuideData
}

export function ProtocolPreview({ data }: Props) {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handlePrint} variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" /> Print Guide
                </Button>
            </div>

            <Card className="max-w-3xl mx-auto shadow-none border-slate-200">
                <CardContent className="p-8 space-y-8 font-serif leading-relaxed text-slate-900">
                    
                    {/* Header */}
                    <div className="border-b pb-6">
                        <h1 className="text-3xl font-bold mb-2">{data.title || "Untitled Interview Guide"}</h1>
                        <div className="text-sm text-slate-500 flex gap-4">
                            <span><strong>Target:</strong> {data.targetStakeholder}</span>
                            <span>•</span>
                            <span><strong>Est. Time:</strong> {data.questions.reduce((a, b) => a + (b.timeEstimate || 0), 0)} mins</span>
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="bg-slate-50 p-6 rounded-lg border">
                        <h3 className="font-sans text-xs font-bold uppercase text-slate-500 mb-2">Introduction & Consent</h3>
                        <p className="whitespace-pre-wrap">{data.introductionScript}</p>
                        {data.ethics.recordingPermission && (
                            <p className="mt-4 italic text-slate-600 bg-white p-2 rounded border inline-block">
                                "With your permission, I would like to record this conversation to ensure I don't miss any details. Is that okay with you?"
                            </p>
                        )}
                    </div>

                    {/* Questions */}
                    <div className="space-y-8">
                        {data.questions.map((q, idx) => (
                            <div key={q.id} className="pl-4 border-l-2 border-slate-200">
                                <div className="font-sans text-xs font-bold uppercase text-slate-400 mb-1">
                                    Q{idx + 1} • {q.timeEstimate} min • {q.type}
                                </div>
                                <p className="text-xl font-medium mb-2">{q.text}</p>
                                {q.rationale && (
                                    <p className="text-sm text-slate-500 ms-1 opacity-75">
                                        💡 Focus: {q.rationale}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Closing */}
                    <div className="bg-slate-50 p-6 rounded-lg border">
                        <h3 className="font-sans text-xs font-bold uppercase text-slate-500 mb-2">Closing</h3>
                        <p className="whitespace-pre-wrap">{data.closingScript}</p>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
