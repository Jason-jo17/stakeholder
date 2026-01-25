
"use client"

import React, { memo } from 'react'
import { Handle, Position, NodeProps, type Node as FlowNode } from '@xyflow/react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface StickyNoteNodeData extends Record<string, unknown> {
    text: string
    color?: string
    tags?: string[]
    onChangeText?: (val: string) => void
}

type StickyNoteNode = FlowNode<StickyNoteNodeData, 'stickyNote'>

export const StickyNoteNode = memo(({ data, selected }: NodeProps<StickyNoteNode>) => {
    return (
        <div className={cn(
            "group relative transition-all duration-200",
            selected && "ring-2 ring-primary ring-offset-2 rounded-lg"
        )}>
            <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-400" />

            <Card className={cn(
                "w-[200px] min-h-[200px] shadow-lg border-none flex flex-col cursor-grab active:cursor-grabbing",
                data.color || "bg-yellow-100"
            )}>
                <CardContent className="p-4 flex-1 flex flex-col gap-2">
                    <textarea
                        className="w-full flex-1 bg-transparent border-none resize-none focus:ring-0 text-sm font-medium leading-relaxed placeholder:text-black/30 text-slate-900"
                        placeholder="Type insight here..."
                        value={data.text as string}
                        onChange={(e) => data.onChangeText?.(e.target.value)}
                    />

                    <div className="flex flex-wrap gap-1 mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Array.isArray(data.tags) && data.tags.map((tag: string, i: number) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded text-black/60">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-400" />
        </div>
    )
})

StickyNoteNode.displayName = "StickyNoteNode"
