
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { CheckCircle2, Circle, AlertCircle, ExternalLink } from "lucide-react"
import { submitTask } from "@/app/actions/roadmap"
import { toast } from "sonner"

interface TaskDialogProps {
    tool: any
    progress: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onTaskUpdated: () => void
}
import { ToolRunner } from "./ToolRunner"

export function TaskDialog({ tool, progress, open, onOpenChange, onTaskUpdated }: TaskDialogProps) {
    if (!tool) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <DialogTitle className="text-2xl">{tool.name}</DialogTitle>
                            <DialogDescription>
                                {tool.description} • Week {tool.week}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="tool" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                        <TabsTrigger value="tool">Interactive Tool</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks & Submission</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tool" className="mt-6 space-y-6">
                        <ToolRunner
                            tool={tool}
                            progress={progress}
                            onDataSaved={onTaskUpdated}
                        />
                    </TabsContent>

                    <TabsContent value="tasks" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <h4 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Requirements</h4>

                                <div className="space-y-4">
                                    {tool.tasks.map((task: any) => {
                                        const taskProgress = progress?.taskProgress?.find((tp: any) => tp.taskId === task.id)
                                        return (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                taskProgress={taskProgress}
                                                onSubmitted={onTaskUpdated}
                                            />
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                                    <h4 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Resources</h4>
                                    <p className="text-sm text-muted-foreground">No resources attached to this tool yet.</p>

                                    <div className="pt-4 border-t">
                                        <h4 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider mb-2">Mentor Feedback</h4>
                                        <p className="text-sm text-muted-foreground italic">No feedback received.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

function TaskItem({ task, taskProgress, onSubmitted }: any) {
    const [submitting, setSubmitting] = useState(false)
    const [content, setContent] = useState(taskProgress?.submissionText || "")
    const [url, setUrl] = useState(taskProgress?.submissionUrl || "")
    const isSubmitted = taskProgress?.status === 'submitted' || taskProgress?.status === 'approved'

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const res = await submitTask(task.id, content, url)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Task submitted successfully")
                onSubmitted()
            }
        } catch (e) {
            toast.error("Failed to submit task")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="border rounded-lg p-4 bg-card">
            <div className="flex gap-3 items-start mb-4">
                {isSubmitted ?
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" /> :
                    <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                }
                <div>
                    <h5 className="font-medium text-base">{task.description}</h5>
                    <p className="text-xs text-muted-foreground mt-1">Deliverable: {task.deliverableType}</p>
                </div>
            </div>

            <div className="pl-8 space-y-4">
                <div className="bg-muted/50 p-3 rounded text-sm space-y-2">
                    <p className="font-medium text-xs uppercase text-muted-foreground">Validation Criteria</p>
                    <ul className="list-disc pl-4 space-y-1">
                        {task.validationCriteria?.map((vc: string, i: number) => (
                            <li key={i}>{vc}</li>
                        ))}
                    </ul>
                </div>

                {!isSubmitted ? (
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <Label>Submission Notes / Content</Label>
                            <Textarea
                                placeholder="Paste your work or notes here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Link to Deliverable (Drive, Figma, etc)</Label>
                            <Input
                                placeholder="https://..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleSubmit} disabled={submitting || (!content && !url)}>
                            {submitting ? "Submitting..." : "Submit for Review"}
                        </Button>
                    </div>
                ) : (
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 p-3 rounded flex justify-between items-center">
                        <span className="text-sm font-medium text-green-800 dark:text-green-300">Submitted on {new Date(taskProgress.submittedAt).toLocaleDateString()}</span>
                        <Button variant="ghost" size="sm" onClick={() => toast.info("Feedback editing not implemented yet")}>
                            View Submission
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
