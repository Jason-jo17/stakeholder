
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ToolCard } from "./ToolCard"
import { CheckCircle2, Lock } from "lucide-react"

interface StageCardProps {
    stage: any
    stageProgress: any
    toolProgressMap: Record<string, any>
    onStartTool: (toolId: string) => void
    onOpenTool: (toolId: string) => void
    isLocked: boolean
    isAdmin?: boolean
}

export function StageCard({ stage, stageProgress, toolProgressMap, onStartTool, onOpenTool, isLocked, isAdmin = false }: StageCardProps) {
    // Calculate stage completion
    const tools = stage.tools || []
    const completedTools = tools.filter((tool: any) => {
        const tp = toolProgressMap[tool.toolId]
        return tp?.status === 'completed'
    }).length

    const progressPercent = tools.length > 0 ? (completedTools / tools.length) * 100 : 0
    const status = isLocked ? "locked" : stageProgress?.status || "unlocked"

    return (
        <div className={`space-y-4 ${isLocked ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        {isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                        Stage {stage.stageNumber}: {stage.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Weeks {stage.weeks.join(', ')}</p>
                </div>
                <div className="flex items-center gap-4">
                    {status === 'completed' && <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>}
                    <div className="w-32 space-y-1">
                        <div className="flex justify-between text-xs">
                            <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools.map((tool: any) => (
                    <ToolCard
                        key={tool.id}
                        tool={tool}
                        progress={toolProgressMap[tool.toolId]}
                        onStart={onStartTool}
                        onOpen={onOpenTool}
                        isStageLocked={isLocked}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
        </div>
    )
}
