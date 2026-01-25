
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, X, Save, Loader2, AlertCircle, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"

// Standard 6Ms for Manufacturing/Product (can be adapted)
const CATEGORIES = [
    { id: "manpower", label: "Manpower (People)", x: 200, y: 100, side: "top" },
    { id: "methods", label: "Methods (Process)", x: 400, y: 100, side: "top" },
    { id: "machines", label: "Machines (Equipment)", x: 600, y: 100, side: "top" },
    { id: "materials", label: "Materials", x: 200, y: 500, side: "bottom" },
    { id: "measurements", label: "Measurements", x: 400, y: 500, side: "bottom" },
    { id: "environment", label: "Mother Nature (Environment)", x: 600, y: 500, side: "bottom" },
]

interface Cause {
    id: string
    categoryId: string
    text: string
    severity: "low" | "medium" | "high"
}

interface FishboneData {
    problem: string
    causes: Cause[]
}

const INITIAL_DATA: FishboneData = {
    problem: "Core Problem Statement",
    causes: []
}

interface FishboneDiagramProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function FishboneDiagram({ tool, progress, onDataSaved, readOnly = false }: FishboneDiagramProps) {
    const [data, setData] = useState<FishboneData>(progress?.data || INITIAL_DATA)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [newCauseText, setNewCauseText] = useState("")
    const [newCauseSeverity, setNewCauseSeverity] = useState<"low" | "medium" | "high">("medium")
    const [saving, setSaving] = useState(false)

    // Ensure initial structure
    useEffect(() => {
        if (!data.problem) setData(prev => ({ ...prev, problem: "Core Problem Statement" }))
        if (!data.causes) setData(prev => ({ ...prev, causes: [] }))
    }, [])

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Fishbone Diagram saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const handleAddCause = () => {
        if (!newCauseText || !selectedCategory) return

        const newCause: Cause = {
            id: crypto.randomUUID(),
            categoryId: selectedCategory,
            text: newCauseText,
            severity: newCauseSeverity
        }

        setData(prev => ({
            ...prev,
            causes: [...prev.causes, newCause]
        }))
        setNewCauseText("")
        setNewCauseSeverity("medium")
        setSelectedCategory(null) // Close dialog
        toast.success("Cause added")
    }

    const removeCause = (id: string) => {
        if (readOnly) return
        setData(prev => ({
            ...prev,
            causes: prev.causes.filter(c => c.id !== id)
        }))
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold">Fishbone Diagram</h2>
                    <p className="text-muted-foreground">Ishikawa Diagram / Cause-and-Effect Analysis</p>
                </div>
                {!readOnly && (
                    <Button onClick={handleSave} disabled={saving} size="lg" className="bg-primary shadow-lg hover:shadow-xl transition-all">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Diagram
                    </Button>
                )}
            </div>

            <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center text-sm text-muted-foreground bg-blue-50 p-3 rounded border border-blue-100">
                        <Info className="h-4 w-4 text-blue-500" />
                        Identify the root causes of the problem using the 6M framework. Click on the category boxes to add causes.
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="flex-1 space-y-2">
                            <Label>Main Problem Statement (The Head)</Label>
                            <Input
                                value={data.problem}
                                onChange={(e) => setData({ ...data, problem: e.target.value })}
                                placeholder="e.g., Decreasing Customer Retention"
                                disabled={readOnly}
                                className="text-lg font-semibold bg-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 border rounded-xl p-8 bg-white min-h-[600px] overflow-x-auto relative shadow-inner">
                    <div className="min-w-[800px] h-[500px] relative select-none">

                        {/* Main Spine */}
                        <div className="absolute top-1/2 left-10 right-40 h-2 bg-slate-800 rounded-full z-0" />

                        {/* Head (Problem) */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-auto min-h-[100px] border-4 border-slate-800 rounded-lg flex items-center justify-center p-4 bg-slate-100 z-10 text-center font-bold text-sm shadow-xl">
                            {data.problem || " Problem..."}
                        </div>

                        {/* Ribs and Categories */}
                        {CATEGORIES.map((cat) => (
                            <div key={cat.id} className="absolute transition-all duration-300" style={{ left: cat.x, top: cat.side === 'top' ? 50 : 300 }}>
                                {/* Rib Line */}
                                <div
                                    className={`absolute w-1 bg-slate-400 h-40 origin-bottom ${cat.side === 'top' ? '-rotate-45' : 'rotate-45'}`}
                                    style={{
                                        left: 20,
                                        top: cat.side === 'top' ? 60 : -60,
                                        height: 200
                                    }}
                                />

                                {/* Category Label Box */}
                                <Button
                                    variant="outline"
                                    className="relative z-10 border-2 border-slate-600 bg-slate-50 font-bold min-w-[140px] shadow-sm hover:bg-blue-50 hover:border-blue-500 transition-colors"
                                    onClick={() => !readOnly && setSelectedCategory(cat.id)}
                                >
                                    {cat.label}
                                    {!readOnly && <Plus className="ml-2 h-4 w-4 opacity-50" />}
                                </Button>

                                {/* Causes for this category */}
                                <div className={`absolute flex flex-col gap-2 ${cat.side === 'top' ? 'top-20' : '-top-40'} left-16 w-56`}>
                                    {data.causes.filter(c => c.categoryId === cat.id).map((cause, idx) => (
                                        <div
                                            key={cause.id}
                                            className={`
                                                relative p-2 rounded text-xs border bg-white shadow-sm group animate-in fade-in zoom-in duration-300
                                                ${cause.severity === 'high' ? 'border-red-200 bg-red-50' : cause.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-slate-200'}
                                            `}
                                            style={{ marginLeft: idx * 8 }}
                                        >
                                            <div className="flex justify-between items-start gap-1">
                                                <span className="break-words w-full">{cause.text}</span>
                                                {!readOnly && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); removeCause(cause.id); }}
                                                        className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity ml-1 bg-white/50 rounded-full p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Dialog open={!!selectedCategory} onOpenChange={(o) => !o && setSelectedCategory(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Cause to {CATEGORIES.find(c => c.id === selectedCategory)?.label}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Cause Description</Label>
                            <Textarea
                                value={newCauseText}
                                onChange={(e) => setNewCauseText(e.target.value)}
                                placeholder="What is causing the problem?"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Severity / Impact</Label>
                            <Select
                                value={newCauseSeverity}
                                onValueChange={(v: any) => setNewCauseSeverity(v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low Impact</SelectItem>
                                    <SelectItem value="medium">Medium Impact</SelectItem>
                                    <SelectItem value="high">High Impact (Critical)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setSelectedCategory(null)}>Cancel</Button>
                        <Button onClick={handleAddCause} disabled={!newCauseText}>Add Cause</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
