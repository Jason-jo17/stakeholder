'use client'

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Lock, CheckCircle2, ArrowRight, Rocket, Upload, FileText, Link as LinkIcon } from "lucide-react"
import { useJourneyStore } from "@/app/stores/journey-store"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"

const trlLevels = [
    { level: 1, title: "Basic Principles", desc: "Fundamental research and observation of basic principles", requirements: ["Define core scientific principles", "Literature review completed", "Problem statement validated"] },
    { level: 2, title: "Technology Concept", desc: "Technology concept and/or application formulated", requirements: ["Concept paper drafted", "Feasibility analysis done", "Initial stakeholder feedback"] },
    { level: 3, title: "Proof of Concept", desc: "Analytical and experimental critical function proof of concept", requirements: ["Lab prototype created", "Key experiments passed", "Technical report submitted"] },
    { level: 4, title: "Lab Validation", desc: "Technology validated in laboratory environment", requirements: ["Lab testing completed", "Performance benchmarks met", "Peer review passed"] },
    { level: 5, title: "Relevant Environment", desc: "Technology validated in relevant environment", requirements: ["Simulation tests passed", "Integration testing done", "Environment stress test completed"] },
    { level: 6, title: "Demonstrated Model", desc: "Technology demonstrated in relevant environment", requirements: ["Prototype demonstrated", "User testing conducted", "Regulatory pre-assessment"] },
    { level: 7, title: "System Prototype", desc: "System prototype demonstration in operational environment", requirements: ["Operational prototype ready", "Pilot partner identified", "Compliance checklist passed"] },
    { level: 8, title: "System Complete", desc: "System complete and qualified through testing", requirements: ["Full system tested", "Quality assurance passed", "Scale readiness confirmed"] },
    { level: 9, title: "Mission Proven", desc: "Actual system proven in operational environment", requirements: ["Market deployment", "Revenue generated", "Scale operations running"] },
]

export default function TRLProgress() {
    const { journey } = useJourneyStore()
    const queryClient = useQueryClient()
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
    const [evidenceText, setEvidenceText] = useState("")
    const [evidenceLink, setEvidenceLink] = useState("")

    const currentTRL = journey?.trlLevel || 1
    const progressPercentage = (currentTRL / 9) * 100

    const submitEvidenceMutation = useMutation({
        mutationFn: async (level: number) => {
            const res = await fetch('/api/student/journey/evidence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trlLevel: level,
                    evidenceText,
                    evidenceLinks: evidenceLink ? [evidenceLink] : [],
                    requirements: {} // Could collect specific requirement checkboxes here
                })
            })
            if (!res.ok) throw new Error('Failed to submit evidence')
            return res.json()
        },
        onSuccess: () => {
            toast.success("Evidence submitted successfully!")
            setSelectedLevel(null)
            setEvidenceText("")
            setEvidenceLink("")
            queryClient.invalidateQueries({ queryKey: ['journey'] })
        },
        onError: () => {
            toast.error("Failed to submit evidence. Please try again.")
        }
    })

    const handleLevelClick = (level: number) => {
        // Allow clicking card to open dialog if current level
        if (level === currentTRL) {
            setSelectedLevel(level)
        }
    }

    return (
        <div className="container mx-auto p-6 lg:p-10 max-w-[1000px]" suppressHydrationWarning>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">TRL Progress</h1>
                    <p className="text-muted-foreground mt-1">Technology Readiness Level advancement tracker</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/student/cofounder">Back to Dashboard</Link>
                </Button>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-10 -mb-10 pointer-events-none" />

                <div className="relative z-10">
                    <p className="text-blue-200 text-[12px] font-medium uppercase tracking-wider mb-1">Current Level</p>
                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-5xl font-bold">TRL {currentTRL}</span>
                        <span className="text-blue-200 text-lg mb-1 hidden sm:inline-block font-light">— {trlLevels[currentTRL - 1]?.title}</span>
                    </div>

                    <div className="relative pt-2">
                        <div className="flex justify-between text-[10px] font-medium text-blue-200 mb-2 px-1">
                            <span>Idea (1)</span>
                            <span>Proof (3)</span>
                            <span>Pilot (6)</span>
                            <span>Scale (9)</span>
                        </div>
                        <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 relative">
                <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-gray-100 -z-10" />

                {trlLevels.map((trl, idx) => {
                    const isCompleted = trl.level < currentTRL
                    const isCurrent = trl.level === currentTRL
                    const isLocked = trl.level > currentTRL

                    return (
                        <div
                            key={trl.level}
                            onClick={() => handleLevelClick(trl.level)}
                            className={`rounded-2xl border p-5 transition-all duration-300 group ${isCurrent
                                    ? "bg-white border-blue-200 shadow-lg shadow-blue-50/50 scale-[1.01] cursor-pointer ring-2 ring-blue-100"
                                    : isCompleted
                                        ? "bg-white border-gray-100 opacity-80 hover:opacity-100"
                                        : "bg-gray-50/50 border-gray-100/50 opacity-60"
                                }`}
                        >
                            <div className="flex items-start gap-5">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg shadow-sm transition-colors ${isCurrent
                                        ? "bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-50"
                                        : isCompleted
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-gray-100 text-gray-400"
                                    }`}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : isLocked ? <Lock className="w-5 h-5" /> : trl.level}
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <h4 className={`text-base font-semibold ${isLocked ? "text-gray-400" : "text-gray-900"}`}>
                                                {trl.title}
                                            </h4>
                                            {isCurrent && (
                                                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full tracking-wide">CURRENT PHASE</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Changed p to div to avoid hydration mismatch with nested divs if any */}
                                    <div className={`text-sm mb-4 leading-relaxed ${isLocked ? "text-gray-400" : "text-gray-500"}`}>{trl.desc}</div>

                                    {(isCurrent || isCompleted) && (
                                        <div className="bg-gray-50/80 rounded-xl p-4 space-y-3">
                                            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Requirements</h5>
                                            <div className="space-y-2">
                                                {trl.requirements.map((req, ri) => (
                                                    <div key={ri} className="flex items-start gap-3">
                                                        <CheckCircle2 className={`w-4 h-4 mt-0.5 ${isCompleted ? "text-emerald-500" : "text-gray-300"}`} />
                                                        <span className={`text-sm ${isCompleted ? "text-gray-400 line-through" : "text-gray-700"}`}>
                                                            {req}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            {isCurrent && (
                                                <div className="pt-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedLevel(trl.level);
                                                        }}
                                                        suppressHydrationWarning
                                                    >
                                                        <Upload className="w-3 h-3 mr-2" /> Upload Evidence
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Dialog open={!!selectedLevel} onOpenChange={(open) => !open && setSelectedLevel(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Submit TRL Evidence</DialogTitle>
                        <DialogDescription>
                            Provide documentation to prove you have met the requirements for TRL {selectedLevel}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Requirements Checklist</Label>
                            <div className="bg-muted p-3 rounded-md space-y-2">
                                {selectedLevel && trlLevels[selectedLevel - 1]?.requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                        <span className="text-sm">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Evidence Description</Label>
                            <Textarea
                                placeholder="Describe your progress and how requirements are met..."
                                value={evidenceText}
                                onChange={(e) => setEvidenceText(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Link to Documents (Drive, GitHub, etc.)</Label>
                            <div className="flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="https://"
                                    value={evidenceLink}
                                    onChange={(e) => setEvidenceLink(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedLevel(null)}>Cancel</Button>
                        <Button onClick={() => selectedLevel && submitEvidenceMutation.mutate(selectedLevel)} disabled={submitEvidenceMutation.isPending}>
                            {submitEvidenceMutation.isPending ? "Submitting..." : "Submit Evidence"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
