
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, CheckCircle, Clock, ArrowRight, FileText } from "lucide-react"

interface ToolCardProps {
    tool: any
    progress: any
    onStart: (toolId: string) => void
    onOpen: (toolId: string) => void
    isStageLocked: boolean
    isAdmin?: boolean
}

export function ToolCard({ tool, progress, onStart, onOpen, isStageLocked, isAdmin = false }: ToolCardProps) {
    const status = isAdmin ? "unlocked" : (progress?.status || (tool.isLocked || isStageLocked ? "locked" : "unlocked"))

    // Calculate progress % based on tasks
    const totalTasks = tool.tasks.length
    const completedTasks = progress?.taskProgress?.filter((tp: any) => tp.status === "approved" || tp.status === "submitted").length || 0
    const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    return (
        <Card className={`relative ${status === 'locked' ? 'opacity-75 bg-muted/50' : ''}`}>
            {status === 'locked' && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/10 z-10">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
            )}

            <CardHeader className="dir-col pb-2">
                <div className="flex justify-between items-start">
                    <Badge variant={status === 'completed' ? 'default' : status === 'in_progress' ? 'secondary' : 'outline'}>
                        {status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Week {tool.week}</span>
                </div>
                <CardTitle className="text-lg leading-tight mt-2">{tool.name}</CardTitle>
            </CardHeader>

            <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>

                {status !== 'locked' && (
                    <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{Math.round(percent)}%</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-2">
                {(status === 'unlocked' || !progress) ? (
                    <Button size="sm" className="w-full" onClick={() => onStart(tool.toolId)} disabled={status === 'locked'}>
                        Start Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button size="sm" variant={status === 'completed' ? "outline" : "default"} className="w-full" onClick={() => onOpen(tool.toolId)}>
                        {status === 'completed' ? 'Review Work' : 'Continue'} <FileText className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
