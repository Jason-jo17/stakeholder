
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { CheckCircle2, Circle, AlertCircle, ExternalLink, Minimize } from "lucide-react"
import { submitTask } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface TaskDialogProps {
    tool: any
    progress: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onTaskUpdated: () => void
}
import { ToolRunner } from "./ToolRunner"
import { VPCBuilder } from "./tools/vpc/VPCBuilder"

export function TaskDialog({ tool, progress, open, onOpenChange, onTaskUpdated }: TaskDialogProps) {
    const [isMaximized, setIsMaximized] = useState(false)
    if (!tool) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "transition-all duration-500 ease-in-out flex flex-col overflow-hidden shadow-none border-none",
                    isMaximized
                        ? "!fixed !inset-0 !m-0 !p-0 !z-[9999] !w-screen !h-screen !max-w-none !translate-x-0 !translate-y-0 !top-0 !left-0 !rounded-none bg-slate-50/98 backdrop-blur-xl"
                        : "max-w-5xl w-[90vw] h-[85vh] max-h-[85vh] p-6 rounded-xl shadow-2xl bg-card border"
                )}
                style={isMaximized ? {
                    transform: 'none',
                    left: 0,
                    top: 0,
                    width: '100vw',
                    height: '100vh',
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    position: 'fixed',
                    zIndex: 9999
                } : {}}
            >
                <DialogHeader className={cn(
                    "shrink-0",
                    isMaximized ? "p-4 border-b bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg" : ""
                )}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <DialogTitle className={cn(
                                "font-bold tracking-tight",
                                isMaximized ? "text-xl text-white" : "text-2xl"
                            )}>
                                {tool.name}
                            </DialogTitle>
                            <DialogDescription className={cn(
                                isMaximized ? "text-xs text-slate-300" : ""
                            )}>
                                {tool.description} • Week {tool.week}
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2 mr-6">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsMaximized(!isMaximized)}
                                className={cn(
                                    "h-9 px-3 font-semibold transition-all duration-300",
                                    isMaximized
                                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                                        : "hover:bg-slate-100"
                                )}
                            >
                                {isMaximized ? (
                                    <>
                                        <Minimize className="h-4 w-4 mr-2" />
                                        Restore
                                    </>
                                ) : (
                                    <>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Full Page
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="tool" className={cn(
                    "flex-1 flex flex-col min-h-0",
                    isMaximized ? "" : "mt-4"
                )}>
                    <TabsList className={cn(
                        "shrink-0",
                        isMaximized ? "mx-4 mt-2 justify-start bg-transparent gap-4" : "grid w-full grid-cols-2 max-w-[400px]"
                    )}>
                        <TabsTrigger
                            value="tool"
                            className={cn(
                                "transition-all duration-300",
                                isMaximized
                                    ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-8 py-2 text-sm font-bold shadow-sm"
                                    : ""
                            )}
                        >
                            Interactive Tool
                        </TabsTrigger>
                        <TabsTrigger
                            value="tasks"
                            className={cn(
                                "transition-all duration-300",
                                isMaximized
                                    ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-8 py-2 text-sm font-bold shadow-sm"
                                    : ""
                            )}
                        >
                            Review Requirements
                        </TabsTrigger>
                    </TabsList>

                    <div className={cn(
                        "flex-1 min-h-0 overflow-y-auto w-full",
                        isMaximized ? "p-0" : ""
                    )}>
                        <TabsContent value="tool" className="h-full w-full m-0 p-0 border-none">
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
                    </div>
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
