
"use client"

import { useEffect, useState } from "react"
import { getRoadmapData, startTool, getAdminRoadmapData } from "@/app/actions/roadmap"
import { StageCard } from "./StageCard"
import { TaskDialog } from "./TaskDialog"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface RoadmapViewProps {
    isAdmin?: boolean
}

export function RoadmapView({ isAdmin = false }: RoadmapViewProps) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [selectedTool, setSelectedTool] = useState<any>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = isAdmin ? await getAdminRoadmapData() : await getRoadmapData()
            if ('error' in res && res.error) {
                toast.error(res.error)
            } else {
                setData(res)
            }
        } catch (e) {
            toast.error("Failed to load roadmap")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleStartTool = async (toolId: string) => {
        if (isAdmin) {
            toast.info("Tool started (Admin Mode)")
            handleOpenTool(toolId)
            return
        }
        try {
            const res = await startTool(toolId)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Tool started!")
                fetchData() // Refresh to show unlocked state
            }
        } catch (e) {
            toast.error("Failed to start tool")
        }
    }

    const handleOpenTool = (toolId: string) => {
        // Find tool data
        const stage = data.stages.find((s: any) => s.tools.find((t: any) => t.toolId === toolId))
        const tool = stage?.tools.find((t: any) => t.toolId === toolId)

        if (tool) {
            setSelectedTool(tool)
            setDialogOpen(true)
        }
    }

    if (loading && !data) {
        return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    if (!data) return <div className="p-4 text-center">Failed to load roadmap.</div>

    // Build map of progress for easy lookup
    const toolProgressMap = data.progress?.toolProgress?.reduce((acc: any, curr: any) => {
        acc[curr.toolId] = curr
        return acc
    }, {}) || {}

    const stageProgressMap = data.progress?.stageProgress?.reduce((acc: any, curr: any) => {
        acc[curr.stageNumber] = curr
        return acc
    }, {}) || {}

    const currentStageId = data.progress?.currentStageId || 1

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Student Journey Roadmap
                        {isAdmin && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-200">Admin Preview Mode</span>}
                    </h2>
                    <p className="text-muted-foreground">Team: {data.team?.name || 'Admin Sandbox'} • Cohort: {data.team?.cohort || 'Test'}</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchData}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                </Button>
            </div>

            <div className="space-y-12">
                {data.stages.map((stage: any) => (
                    <StageCard
                        key={stage.id}
                        stage={stage}
                        stageProgress={stageProgressMap[stage.stageNumber]}
                        toolProgressMap={toolProgressMap}
                        onStartTool={handleStartTool}
                        onOpenTool={handleOpenTool}
                        isLocked={isAdmin ? false : (stage.stageNumber > currentStageId && stage.stageNumber !== 1)}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>

            <TaskDialog
                tool={selectedTool}
                progress={selectedTool ? toolProgressMap[selectedTool.toolId] : null}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onTaskUpdated={() => {
                    fetchData()
                }}
            />
        </div>
    )
}
