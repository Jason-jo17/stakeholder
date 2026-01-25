
"use client"

import React, { memo } from 'react'
import { NodeProps, type Node as FlowNode } from '@xyflow/react'
import { cn } from "@/lib/utils"

interface ClusterNodeData extends Record<string, unknown> {
    label: string
    description?: string
    color?: string
    onChangeLabel?: (val: string) => void
    onChangeDescription?: (val: string) => void
}

type ClusterNode = FlowNode<ClusterNodeData, 'cluster'>

export const ClusterNode = memo(({ data, selected }: NodeProps<ClusterNode>) => {
    return (
        <div className={cn(
            "relative w-full h-full min-w-[300px] min-h-[300px] rounded-2xl border-2 border-dashed transition-all duration-300",
            selected ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-slate-300 bg-slate-50/50",
            data.color as string
        )}>
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between px-2">
                <input
                    type="text"
                    className="bg-transparent border-none focus:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-400 w-full"
                    placeholder="Cluster Name..."
                    value={data.label as string}
                    onChange={(e) => data.onChangeLabel?.(e.target.value)}
                />
            </div>

            <div className="absolute -bottom-12 left-0 right-0">
                <textarea
                    className="w-full bg-transparent border-none resize-none focus:ring-0 text-sm text-slate-500 placeholder:text-slate-400 italic"
                    placeholder="Describe the theme or insight pattern..."
                    value={data.description as string}
                    onChange={(e) => data.onChangeDescription?.(e.target.value)}
                    rows={2}
                />
            </div>

            {/* Background pattern for visual depth */}
            <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />
        </div>
    )
})

ClusterNode.displayName = "ClusterNode"
