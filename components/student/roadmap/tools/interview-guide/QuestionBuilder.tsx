"use client"

import { InterviewGuideData, Question, QuestionType } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowDown, ArrowUp, Plus, Trash2, GripVertical, AlertTriangle } from "lucide-react"

interface Props {
    data: InterviewGuideData
    setData: (data: InterviewGuideData) => void
    readOnly?: boolean
}

const QUESTION_TYPES: { id: QuestionType; label: string; color: string }[] = [
    { id: "opening", label: "Opening / Icebreaker", color: "bg-blue-100 text-blue-800" },
    { id: "context", label: "Context / Background", color: "bg-slate-100 text-slate-800" },
    { id: "problem", label: "Problem Exploration", color: "bg-red-100 text-red-800" },
    { id: "behavior", label: "Past Behavior", color: "bg-purple-100 text-purple-800" },
    { id: "aspiration", label: "Aspirations / Goals", color: "bg-green-100 text-green-800" },
    { id: "closing", label: "Closing / Wrap-up", color: "bg-orange-100 text-orange-800" }
]

export function QuestionBuilder({ data, setData, readOnly }: Props) {
    const handleAddQuestion = () => {
        if (readOnly) return
        const newQ: Question = {
            id: crypto.randomUUID(),
            text: "",
            type: "context",
            timeEstimate: 5,
            rationale: ""
        }
        setData({ ...data, questions: [...data.questions, newQ] })
    }

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        if (readOnly) return
        setData({
            ...data,
            questions: data.questions.map(q => q.id === id ? checkBias({ ...q, ...updates }) : q)
        })
    }

    const checkBias = (q: Question): Question => {
        if (!q.text) return { ...q, biasWarning: undefined }

        let warning = undefined
        const lower = q.text.toLowerCase()

        // Simple heuristics
        if (lower.startsWith("do you") || lower.startsWith("is it") || lower.startsWith("are you")) {
            warning = "Possible Closed-Ended Question (Yes/No). Try 'How' or 'Describe' instead."
        } else if (lower.includes("would you like") || lower.includes("could you see yourself")) {
            warning = "Future speculation. Behavior is better than intent. Ask about past experiences."
        }

        return { ...q, biasWarning: warning }
    }

    const moveQuestion = (idx: number, direction: 'up' | 'down') => {
        if (readOnly) return
        const newQuestions = [...data.questions]
        const targetIdx = direction === 'up' ? idx - 1 : idx + 1

        if (targetIdx >= 0 && targetIdx < newQuestions.length) {
            const temp = newQuestions[idx]
            newQuestions[idx] = newQuestions[targetIdx]
            newQuestions[targetIdx] = temp
            setData({ ...data, questions: newQuestions })
        }
    }

    const deleteQuestion = (idx: number) => {
        if (readOnly) return
        const newQuestions = [...data.questions]
        newQuestions.splice(idx, 1)
        setData({ ...data, questions: newQuestions })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    Build your script by sequencing questions logically. Start broad, then go deep.
                </div>
                {!readOnly && (
                    <Button onClick={handleAddQuestion} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Question
                    </Button>
                )}
            </div>

            {data.questions.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl bg-slate-50">
                    <p className="text-muted-foreground mb-4">No questions yet.</p>
                    {!readOnly && <Button onClick={handleAddQuestion}>Create First Question</Button>}
                </div>
            )}

            <div className="space-y-4">
                {data.questions.map((q, idx) => (
                    <Card key={q.id} className="relative group border-l-4" style={{ borderLeftColor: 'var(--border-left)', '--border-left': q.type === 'problem' ? '#fca5a5' : q.type === 'behavior' ? '#d8b4fe' : '#e2e8f0' } as any}>
                        <CardHeader className="p-4 py-3 bg-slate-50/50 flex flex-row items-center justify-between border-b">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="bg-white font-mono text-xs">#{idx + 1}</Badge>
                                {!readOnly && (
                                    <Select value={q.type} onValueChange={(v: any) => updateQuestion(q.id, { type: v })}>
                                        <SelectTrigger className="w-[180px] h-8 text-xs bg-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {QUESTION_TYPES.map(t => (
                                                <SelectItem key={t.id} value={t.id}>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${t.color.split(' ')[0]}`} />
                                                        {t.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {!readOnly && (
                                    <>
                                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled={idx === 0} onClick={() => moveQuestion(idx, 'up')}>
                                            <ArrowUp className="h-4 w-4 text-slate-400" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled={idx === data.questions.length - 1} onClick={() => moveQuestion(idx, 'down')}>
                                            <ArrowDown className="h-4 w-4 text-slate-400" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-red-600" onClick={() => deleteQuestion(idx)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div>
                                <Label className="text-xs text-muted-foreground mb-1 block">Question Text</Label>
                                <Input
                                    value={q.text}
                                    onChange={e => updateQuestion(q.id, { text: e.target.value })}
                                    placeholder="e.g. Tell me about the last time you..."
                                    className={q.biasWarning ? "border-orange-300 focus-visible:ring-orange-300" : ""}
                                    disabled={readOnly}
                                />
                                {q.biasWarning && (
                                    <div className="flex items-center gap-2 mt-1.5 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                        <AlertTriangle className="h-3 w-3" />
                                        {q.biasWarning}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-3">
                                    <Label className="text-xs text-muted-foreground mb-1 block">Rationale / Focus (Optional)</Label>
                                    <Input
                                        value={q.rationale || ""}
                                        onChange={e => updateQuestion(q.id, { rationale: e.target.value })}
                                        placeholder="What insight are we looking for?"
                                        className="h-9 text-sm"
                                        disabled={readOnly}
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">Time (mins)</Label>
                                    <Input
                                        type="number"
                                        value={q.timeEstimate}
                                        onChange={e => updateQuestion(q.id, { timeEstimate: parseInt(e.target.value) || 0 })}
                                        className="h-9 text-sm"
                                        min={1}
                                        disabled={readOnly}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
