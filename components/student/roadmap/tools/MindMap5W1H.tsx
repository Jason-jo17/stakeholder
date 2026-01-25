"use client"

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Node,
  Edge,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from '@/components/ui/button'
import { Save, Loader2, Plus, Trash2, Maximize2, LayoutGrid, TableProperties } from 'lucide-react'
import { saveToolData } from '@/app/actions/roadmap'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


// Initial Nodes Structure for 5W1H
const initialNodes: any[] = [
  {
    id: 'center',
    type: 'input',
    data: { label: 'Central Problem Statement' },
    position: { x: 0, y: 0 },
    style: { background: '#f8fafc', fontWeight: 'bold', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px' },
  },
  // Primary 5W1H Branches
  { id: 'who', data: { label: 'WHO' }, position: { x: -250, y: -150 }, style: { background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '4px' } },
  { id: 'what', data: { label: 'WHAT' }, position: { x: 250, y: -150 }, style: { background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '4px' } },
  { id: 'when', data: { label: 'WHEN' }, position: { x: -350, y: 0 }, style: { background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '4px' } },
  { id: 'where', data: { label: 'WHERE' }, position: { x: 350, y: 0 }, style: { background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '4px' } },
  { id: 'why', data: { label: 'WHY' }, position: { x: -250, y: 150 }, style: { background: '#faf5ff', border: '1px solid #8b5cf6', borderRadius: '4px' } },
  { id: 'how', data: { label: 'HOW' }, position: { x: 250, y: 150 }, style: { background: '#fdf2f8', border: '1px solid #ec4899', borderRadius: '4px' } },
]

const initialEdges: any[] = [
  { id: 'e-who', source: 'center', target: 'who', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-what', source: 'center', target: 'what', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-when', source: 'center', target: 'when', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-where', source: 'center', target: 'where', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-why', source: 'center', target: 'why', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-how', source: 'center', target: 'how', markerEnd: { type: MarkerType.ArrowClosed } },
]

interface MindMap5W1HProps {
  tool: any
  progress: any
  onDataSaved?: () => void
}

export function MindMap5W1H({ tool, progress, onDataSaved }: MindMap5W1HProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(progress?.data?.nodes || initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(progress?.data?.edges || initialEdges)
  const [saving, setSaving] = useState(false)
  const [viewMode, setViewMode] = useState<'canvas' | 'sheet'>('canvas')

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await saveToolData(tool.toolId, { nodes, edges })
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Mind map saved!")
        if (onDataSaved) onDataSaved()
      }
    } catch (e) {
      toast.error("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const addNode = (parentId?: string, label: string = 'New Factor') => {
    const id = `node-${Date.now()}`
    const newNode = {
      id,
      data: { label },
      position: { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
      style: { background: '#fff', border: '1px solid #94a3b8', borderRadius: '4px' },
    }
    setNodes((nds) => [...nds, newNode])

    if (parentId) {
      setEdges((eds) => [...eds, {
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        markerEnd: { type: MarkerType.ArrowClosed }
      }])
    }
  }

  const updateNodeLabel = (id: string, newLabel: string) => {
    setNodes((nds) => nds.map(n => n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n))
  }

  const deleteNode = (id: string) => {
    setNodes((nds) => nds.filter(n => n.id !== id))
    setEdges((eds) => eds.filter(e => e.source !== id && e.target !== id))
  }

  // Helper to get children of a node
  const getChildren = (parentId: string) => {
    return edges
      .filter(e => e.source === parentId)
      .map(e => nodes.find(n => n.id === e.target))
      .filter(Boolean) as Node[]
  }

  const categories = [
    { id: 'who', label: 'WHO', color: 'bg-red-50 border-red-200' },
    { id: 'what', label: 'WHAT', color: 'bg-blue-50 border-blue-200' },
    { id: 'when', label: 'WHEN', color: 'bg-emerald-50 border-emerald-200' },
    { id: 'where', label: 'WHERE', color: 'bg-amber-50 border-amber-200' },
    { id: 'why', label: 'WHY', color: 'bg-purple-50 border-purple-200' },
    { id: 'how', label: 'HOW', color: 'bg-pink-50 border-pink-200' },
  ]

  return (
    <div className="h-[700px] w-full border rounded-xl overflow-hidden bg-background relative flex flex-col">
      <div className="flex justify-between items-center p-4 border-b bg-muted/50">
        <div>
          <h3 className="font-semibold">5W1H Mind Map</h3>
          <p className="text-xs text-muted-foreground">Who, What, When, Where, Why, How</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-background rounded-lg border p-1 flex">
            <Button
              variant={viewMode === 'canvas' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={() => setViewMode('canvas')}
            >
              <LayoutGrid className="h-3 w-3 mr-1" /> Canvas
            </Button>
            <Button
              variant={viewMode === 'sheet' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={() => setViewMode('sheet')}
            >
              <TableProperties className="h-3 w-3 mr-1" /> Sheet
            </Button>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Work
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'canvas' ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
            <Panel position="top-right" className="space-y-2">
              <Button onClick={() => addNode('center')} size="sm" variant="secondary" className="bg-background">
                <Plus className="h-4 w-4 mr-1" /> Add Node
              </Button>
            </Panel>
          </ReactFlow>
        ) : (
          <div className="h-full overflow-y-auto p-6 bg-slate-50/50">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Central Problem */}
              <Card className="border-2 border-primary/20 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Central Problem Statement</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={nodes.find(n => n.id === 'center')?.data.label as string || ''}
                    onChange={(e) => updateNodeLabel('center', e.target.value)}
                    className="resize-none font-medium text-lg"
                    rows={2}
                  />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map(cat => (
                  <Card key={cat.id} className={`border ${cat.color} overflow-hidden`}>
                    <CardHeader className="py-3 px-4 bg-white/50 border-b flex flex-row justify-between items-center">
                      <span className="font-bold text-sm tracking-wider">{cat.label}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => addNode(cat.id, 'New Point')}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-3 space-y-2 bg-white/30 min-h-[150px]">
                      {getChildren(cat.id).length === 0 && (
                        <p className="text-xs text-muted-foreground italic text-center py-4">No points added yet.</p>
                      )}
                      {getChildren(cat.id).map(child => (
                        <div key={child.id} className="flex gap-2 items-start group">
                          <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-current opacity-50 shrink-0" />
                          <Textarea
                            value={child.data.label as string}
                            onChange={(e) => updateNodeLabel(child.id, e.target.value)}
                            className="min-h-[2.5rem] py-1 px-2 text-sm resize-none bg-transparent hover:bg-white focus:bg-white border-transparent hover:border-input focus:border-input transition-colors"
                            rows={1}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => deleteNode(child.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

