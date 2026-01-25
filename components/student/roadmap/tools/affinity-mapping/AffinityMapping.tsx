
"use client"

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Connection,
    Edge,
    type Node as FlowNode,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Search,
    Plus,
    Save,
    Sparkles,
    Download,
    Trash2,
    ZoomIn,
    ZoomOut,
    Maximize,
    LayoutTemplate,
    FileUp
} from 'lucide-react'
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'

import { StickyNoteNode } from './StickyNoteNode'
import { ClusterNode } from './ClusterNode'
import { AffinityMapData, AffinityNote, AffinityCluster } from './types'

const nodeTypes = {
    stickyNote: StickyNoteNode,
    cluster: ClusterNode,
}

const INITIAL_DATA: AffinityMapData = {
    notes: [],
    clusters: [],
    themes: [],
    relationships: [],
    projectContext: ""
}

const COLORS = [
    'bg-yellow-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-pink-100',
    'bg-purple-100',
    'bg-orange-100',
]

interface Props {
    tool: any
    progress: any
    onDataSaved?: () => void
}

export function AffinityMapping({ tool, progress, onDataSaved }: Props) {
    const [nodes, setNodes] = useState<FlowNode[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const [saving, setSaving] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // Initialize data from progress
    useEffect(() => {
        if (progress?.data) {
            const data = progress.data as AffinityMapData

            // Map data to ReactFlow nodes
            const initialNodes: FlowNode[] = [
                ...(data.clusters?.map(c => ({
                    id: c.id,
                    type: 'cluster',
                    position: c.position,
                    data: {
                        label: c.label,
                        description: c.description,
                        color: c.color,
                        onChangeLabel: (val: string) => updateNodeData(c.id, { label: val }),
                        onChangeDescription: (val: string) => updateNodeData(c.id, { description: val }),
                    },
                    style: { width: 400, height: 400 },
                    dragHandle: '.drag-handle',
                })) || []),
                ...(data.notes?.map(n => ({
                    id: n.id,
                    type: 'stickyNote',
                    position: n.position,
                    data: {
                        text: n.text,
                        color: n.color,
                        tags: n.tags,
                        onChangeText: (val: string) => updateNodeData(n.id, { text: val }),
                    },
                })) || [])
            ]

            setNodes(initialNodes)
            // relationships to edges if needed, but affinity mapping usually clusters by position
        }
    }, [])

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds) as FlowNode[]),
        []
    )

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    )

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    )

    const updateNodeData = (nodeId: string, newData: any) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, data: { ...node.data, ...newData } }
                }
                return node
            })
        )
    }

    const addNote = () => {
        const id = `note-${Date.now()}`
        const newNode: FlowNode = {
            id,
            type: 'stickyNote',
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: {
                text: '',
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                tags: [],
                onChangeText: (val: string) => updateNodeData(id, { text: val }),
            },
        }
        setNodes((nds) => nds.concat(newNode))
    }

    const addCluster = () => {
        const id = `cluster-${Date.now()}`
        const newCluster: FlowNode = {
            id,
            type: 'cluster',
            position: { x: 100, y: 100 },
            data: {
                label: 'New Cluster',
                description: '',
                color: '',
                onChangeLabel: (val: string) => updateNodeData(id, { label: val }),
                onChangeDescription: (val: string) => updateNodeData(id, { description: val }),
            },
            style: { width: 400, height: 400 },
        }
        setNodes((nds) => nds.concat(newCluster))
    }

    const handleSave = async () => {
        setSaving(true)

        // Convert ReactFlow state back to our data model
        const appData: AffinityMapData = {
            notes: nodes.filter(n => n.type === 'stickyNote').map(n => ({
                id: n.id,
                text: (n.data as any).text as string,
                color: (n.data as any).color as string,
                tags: ((n.data as any).tags || []) as string[],
                position: n.position,
                clusterId: n.parentId, // ReactFlow parentId identifies cluster
            })),
            clusters: nodes.filter(n => n.type === 'cluster').map(c => ({
                id: c.id,
                label: (c.data as any).label as string,
                description: (c.data as any).description as string,
                color: (c.data as any).color as string,
                position: c.position,
                noteIds: nodes.filter(n => n.parentId === c.id).map(n => n.id)
            })),
            themes: [],
            relationships: edges.map(e => ({
                fromId: e.source,
                toId: e.target,
                type: 'related',
                description: ''
            }))
        }

        try {
            const res = await saveToolData(tool.toolId, appData)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Affinity Map saved successfully")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("An error occurred while saving")
        } finally {
            setSaving(false)
        }
    }

    const clearCanvas = () => {
        if (confirm("Are you sure you want to clear the entire canvas?")) {
            setNodes([])
            setEdges([])
        }
    }

    const handleBulkImport = () => {
        toast.info("Selecting findings from interview transcripts...")
        // Mock bulk import
        const mockInsights = [
            "Users find the onboarding process confusing.",
            "Pricing feels too high for small teams.",
            "Real-time collaboration is a must-have feature.",
            "Most users prefer mobile-first experience.",
            "Integrations with Slack are highly requested."
        ]

        const newNodes: FlowNode[] = mockInsights.map((insight, i) => {
            const id = `imported-${Date.now()}-${i}`
            return {
                id,
                type: 'stickyNote',
                position: { x: 500, y: 100 + (i * 220) },
                data: {
                    text: insight,
                    color: COLORS[i % COLORS.length],
                    tags: ['imported', 'interview'],
                    onChangeText: (val: string) => updateNodeData(id, { text: val }),
                }
            }
        })

        setNodes(nds => nds.concat(newNodes))
        toast.success(`Imported ${mockInsights.length} insights`)
    }

    const handleAISuggestions = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                loading: 'AI analyzing insights and suggesting clusters...',
                success: 'AI identified 2 new clusters based on your notes!',
                error: 'AI analysis failed',
            }
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50 overflow-hidden rounded-xl border">
            {/* Toolbar */}
            <div className="h-14 border-b bg-white flex items-center justify-between px-4 z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={addNote}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                    </Button>
                    <Button variant="outline" size="sm" onClick={addCluster}>
                        <LayoutTemplate className="h-4 w-4 mr-2" />
                        New Cluster
                    </Button>
                    <div className="h-6 w-[1px] bg-slate-200 mx-2" />
                    <Button variant="ghost" size="sm" onClick={handleBulkImport}>
                        <FileUp className="h-4 w-4 mr-2" />
                        Bulk Import
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleAISuggestions} className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Suggest
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search notes..."
                            className="h-9 pl-9 bg-slate-50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button size="sm" onClick={handleSave} disabled={saving}>
                        {saving ? <Sparkles className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Progress
                    </Button>
                    <Button variant="outline" size="icon" onClick={clearCanvas} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    snapToGrid
                    snapGrid={[20, 20]}
                >
                    <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
                    <Controls />

                    <Panel position="top-right" className="bg-white/80 backdrop-blur border p-2 rounded-lg m-4 flex gap-1 shadow-sm">
                        <Button variant="ghost" size="icon" onClick={() => { }} className="h-8 w-8"><ZoomIn className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { }} className="h-8 w-8"><ZoomOut className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { }} className="h-8 w-8"><Maximize className="h-4 w-4" /></Button>
                    </Panel>

                    <Panel position="bottom-left" className="m-4">
                        <Card className="bg-white/90 backdrop-blur border shadow-sm w-64">
                            <CardContent className="p-3 space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <span>Workspace Insight</span>
                                    <Sparkles className="h-3 w-3" />
                                </div>
                                <div className="text-sm text-slate-700 font-medium">
                                    {nodes.length} Items on Canvas
                                </div>
                                <div className="flex gap-2 text-[10px]">
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-none font-normal">
                                        {nodes.filter(n => n.type === 'stickyNote').length} Notes
                                    </Badge>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-800 border-none font-normal">
                                        {nodes.filter(n => n.type === 'cluster').length} Clusters
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    )
}
