"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, Loader2, Trash2, ChevronRight, ChevronDown, CheckCircle2, AlertTriangle, GitBranch } from 'lucide-react'
import { saveToolData } from '@/app/actions/roadmap'
import { toast } from 'sonner'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

// --- Types ---

interface WhyNodeData {
    id: string
    answer: string
    evidence: string
    isRootCause: boolean
    children: WhyNodeData[]
}

interface SevenWhysData {
    problemStatement: string
    rootNode: WhyNodeData
}

const INITIAL_DATA: SevenWhysData = {
    problemStatement: "",
    rootNode: {
        id: 'root',
        answer: "", // This is the first "Why" answer technically, or we can structure it differently. 
        // Let's say rootNode.children are the first level answers to the problem. 
        // Actually, typically it's Problem -> Why 1 -> Why 2. 
        // Let's treat the 'rootNode' as the container for Level 1 answers.
        evidence: "",
        isRootCause: false,
        children: []
    }
}

interface SevenWhysProps {
    tool: any
    progress: any
    onDataSaved?: () => void
}

export function SevenWhys({ tool, progress, onDataSaved }: SevenWhysProps) {
    const [data, setData] = useState<SevenWhysData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)

    // Ensure structure validity on load
    useEffect(() => {
        if (!data.rootNode) setData(INITIAL_DATA)
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Analysis saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    // Helper to update the tree immutably
    const updateTree = (nodeId: string, updateFn: (node: WhyNodeData) => WhyNodeData) => {
        const updateRecursive = (node: WhyNodeData): WhyNodeData => {
            if (node.id === nodeId) {
                return updateFn(node)
            }
            return {
                ...node,
                children: node.children.map(child => updateRecursive(child))
            }
        }

        // Special case: if we are updating the "virtual root" (not recommended usually), handled inside.
        // Actually, we usually add children to the root.

        setData(prev => ({
            ...prev,
            rootNode: updateRecursive(prev.rootNode)
        }))
    }

    const addNode = (parentId: string) => {
        const newNode: WhyNodeData = {
            id: `why-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            answer: "",
            evidence: "",
            isRootCause: false,
            children: []
        }

        updateTree(parentId, (node) => ({
            ...node,
            children: [...node.children, newNode]
        }))
    }

    const deleteNode = (nodeId: string) => {
        const deleteRecursive = (node: WhyNodeData): WhyNodeData => {
            return {
                ...node,
                children: node.children.filter(c => c.id !== nodeId).map(deleteRecursive)
            }
        }
        setData(prev => ({ ...prev, rootNode: deleteRecursive(prev.rootNode) }))
    }

    const updateNodeData = (id: string, field: keyof WhyNodeData, value: any) => {
        updateTree(id, (node) => ({ ...node, [field]: value }))
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold">7 Whys Root Cause Analysis</h2>
                    <p className="text-muted-foreground">Drill down into the problem by asking "Why?" repeatedly.</p>
                </div>
                <Button onClick={handleSave} disabled={saving} size="lg" className="bg-primary shadow-lg">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Analysis
                </Button>
            </div>

            {/* Problem Statement Section */}
            <Card className="border-l-4 border-l-primary shadow-sm bg-muted/5">
                <CardHeader>
                    <CardTitle className="text-lg uppercase tracking-wide text-primary">Core Problem Statement</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Describe the specific problem you are investigating..."
                        className="text-lg font-medium bg-background"
                        value={data.problemStatement || ""}
                        onChange={(e) => setData(prev => ({ ...prev, problemStatement: e.target.value }))}
                    />
                </CardContent>
            </Card>

            {/* Tree Visualization */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <GitBranch className="h-4 w-4" />
                    <span>Analysis Tree</span>
                </div>

                {/* Level 1 (Roots) */}
                <div className="space-y-6 pl-4 border-l-2 border-dashed border-muted-foreground/20">
                    {data.rootNode?.children.map((child, index) => (
                        <WhyNode
                            key={child.id}
                            node={child}
                            depth={1}
                            onAdd={() => addNode(child.id)}
                            onDelete={() => deleteNode(child.id)}
                            onUpdate={updateNodeData}
                            parentQuestion={data.problemStatement || "The Problem"}
                        />
                    ))}

                    <Button variant="outline" className="w-full border-dashed" onClick={() => addNode(data.rootNode.id)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Primary Cause (Why #1)
                    </Button>
                </div>
            </div>
        </div>
    )
}

// --- Recursive Node Component ---

interface WhyNodeProps {
    node: WhyNodeData
    depth: number
    onAdd: (parentId: string) => void
    onDelete: (nodeId: string) => void
    onUpdate: (id: string, field: keyof WhyNodeData, value: any) => void
    parentQuestion: string
}

function WhyNode({ node, depth, onAdd, onDelete, onUpdate, parentQuestion }: WhyNodeProps) {
    const [isOpen, setIsOpen] = useState(true)
    const isRootCause = node.isRootCause
    const hasChildren = node.children.length > 0

    return (
        <div className="relative group">
            {/* Connector Line */}
            <div className="absolute -left-4 top-5 w-4 h-0.5 bg-muted-foreground/30"></div>

            <Card className={`transition-all duration-200 ${isRootCause ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'hover:border-primary/50'}`}>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="p-4 flex flex-col gap-3">
                        {/* Header Row */}
                        <div className="flex items-start gap-3">
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 mt-1 shrink-0 p-0 hover:bg-muted">
                                    {hasChildren ? (
                                        isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                                    ) : (
                                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                                    )}
                                </Button>
                            </CollapsibleTrigger>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                    <Badge variant="outline" className="w-fit text-[10px] uppercase text-muted-foreground bg-muted/50">
                                        Why #{depth}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground italic">
                                        Because: "{parentQuestion.substring(0, 50)}{parentQuestion.length > 50 ? '...' : ''}"
                                    </span>
                                </div>

                                <Textarea
                                    value={node.answer}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate(node.id, 'answer', e.target.value)}
                                    placeholder="Enter reason..."
                                    className={`min-h-[60px] resize-y font-medium text-base ${isRootCause ? 'border-green-200 focus-visible:ring-green-500' : ''}`}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Button
                                    variant={isRootCause ? "default" : "ghost"}
                                    size="sm"
                                    className={`${isRootCause ? 'bg-green-600 hover:bg-green-700' : 'text-muted-foreground hover:text-green-600'}`}
                                    onClick={() => onUpdate(node.id, 'isRootCause', !isRootCause)}
                                    title="Toggle Root Cause"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => onDelete(node.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Evidence & Actions Row */}
                        <div className="pl-11 flex flex-col md:flex-row gap-4 items-start">
                            <div className="flex-1 w-full relative">
                                <Input
                                    value={node.evidence}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(node.id, 'evidence', e.target.value)}
                                    placeholder="Supporting evidence (optional)"
                                    className="text-xs h-8 bg-muted/30"
                                />
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs shrink-0" onClick={() => onAdd(node.id)} disabled={depth >= 7 || isRootCause}>
                                <Plus className="mr-1 h-3 w-3" /> Because...
                            </Button>
                        </div>
                    </div>

                    <CollapsibleContent>
                        <div className="pl-8 py-2 space-y-4 border-l-2 border-muted ml-5 my-2">
                            {node.children.map(child => (
                                <WhyNode
                                    key={child.id}
                                    node={child}
                                    depth={depth + 1}
                                    onAdd={() => onAdd(child.id)}
                                    onDelete={() => onDelete(child.id)}
                                    onUpdate={onUpdate}
                                    parentQuestion={node.answer}
                                />
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </Card>
        </div>
    )
}
