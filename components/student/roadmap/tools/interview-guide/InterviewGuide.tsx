
"use client"
// Interview Guide Tool

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, Users, ShieldCheck, FileText, Plus } from "lucide-react"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"
import { InterviewGuideData, DEFAULT_GUIDE } from "@/components/student/roadmap/tools/interview-guide/types"
import { QuestionBuilder } from "@/components/student/roadmap/tools/interview-guide/QuestionBuilder"
import { EthicsChecklist } from "@/components/student/roadmap/tools/interview-guide/EthicsChecklist"
import { ProtocolPreview } from "@/components/student/roadmap/tools/interview-guide/ProtocolPreview"

interface Props {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function InterviewGuide({ tool, progress, onDataSaved, readOnly = false }: Props) {
    const [data, setData] = useState<InterviewGuideData>(progress?.data || DEFAULT_GUIDE)
    const [saving, setSaving] = useState(false)

    // Ensure structure integrity on load
    useEffect(() => {
        if (!data.questions) setData(prev => ({ ...prev, questions: [] }))
        if (!data.ethics) setData(prev => ({ ...prev, ethics: DEFAULT_GUIDE.ethics }))
    }, [])

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Interview guide saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const totalTime = data.questions.reduce((acc, q) => acc + (q.timeEstimate || 0), 0)

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Interview Guide Builder
                        <Badge variant="secondary" className="font-normal text-xs">
                            {data.questions.length} Questions • ~{totalTime} mins
                        </Badge>
                    </h2>
                    <p className="text-muted-foreground">Design ethical, high-impact discovery interviews.</p>
                </div>
                <div className="flex gap-2">
                    {!readOnly && (
                        <Button onClick={handleSave} disabled={saving} className="bg-primary shadow-sm">
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Guide
                        </Button>
                    )}
                </div>
            </div>

            {/* METADATA FORM */}
            <Card>
                <CardContent className="p-6 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Interview Title / Topic</Label>
                        <Input
                            value={data.title}
                            onChange={e => setData({ ...data, title: e.target.value })}
                            placeholder="e.g. Early Adopter Discovery"
                            disabled={readOnly}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Target Stakeholder</Label>
                        <Input
                            value={data.targetStakeholder}
                            onChange={e => setData({ ...data, targetStakeholder: e.target.value })}
                            placeholder="e.g. University Students"
                            disabled={readOnly}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>Research Purpose</Label>
                        <Textarea
                            value={data.purpose}
                            onChange={e => setData({ ...data, purpose: e.target.value })}
                            placeholder="What do we want to learn?"
                            className="h-20"
                            disabled={readOnly}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* TABS */}
            <Tabs defaultValue="questions">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="questions"><Users className="h-4 w-4 mr-2" /> Question Builder</TabsTrigger>
                    <TabsTrigger value="ethics"><ShieldCheck className="h-4 w-4 mr-2" /> Ethics & Privacy</TabsTrigger>
                    <TabsTrigger value="preview"><FileText className="h-4 w-4 mr-2" /> Protocol Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="mt-6">
                    <QuestionBuilder data={data} setData={setData} readOnly={readOnly} />
                </TabsContent>

                <TabsContent value="ethics" className="mt-6">
                    <EthicsChecklist data={data} setData={setData} readOnly={readOnly} />
                </TabsContent>

                <TabsContent value="preview" className="mt-6">
                    <ProtocolPreview data={data} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
