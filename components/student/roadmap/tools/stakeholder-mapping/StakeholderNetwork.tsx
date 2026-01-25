
"use client"

import { useCallback, useMemo } from 'react'
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Node, Edge, Position } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Stakeholder, Relationship } from './types'

// Use absolute imports for reliability
import { Card } from "@/components/ui/card"

interface Props {
    stakeholders: Stakeholder[]
    relationships: Relationship[]
    onConnect?: (sourceId: string, targetId: string) => void
    height?: number
}

// Custom Node Style logic could go here, for now use default

export function StakeholderNetwork({ stakeholders, relationships, onConnect, height = 500 }: Props) {
    // Transform data to React Flow format
    
    // Auto-layout is complex effectively without a library like dagre.
    // For MVP, we'll randomize positions or use a circle layout.
    
    const initialNodes: Node[] = useMemo(() => {
        return stakeholders.map((s, idx) => {
            // Simple circular layout
            const angle = (idx / stakeholders.length) * 2 * Math.PI
            const radius = 250
            const x = 300 + radius * Math.cos(angle)
            const y = 300 + radius * Math.sin(angle)

            return {
                id: s.id,
                position: { x, y },
                data: { label: s.name },
                style: { 
                    background: '#fff', 
                    border: '1px solid #777', 
                    borderRadius: '8px', 
                    padding: '10px',
                    width: 150,
                    fontSize: '12px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                },
                // Handle handles...? React Flow adds them by default
            } as Node
        })
    }, [stakeholders])

    const initialEdges: Edge[] = useMemo(() => {
        return relationships.map(r => ({
            id: r.id,
            source: r.sourceId,
            target: r.targetId,
            animated: r.type === 'influence' || r.type === 'communication',
            style: { 
                strokeWidth: r.strength, 
                stroke: r.type === 'conflict' ? 'red' : r.type === 'collaboration' ? 'green' : '#b1b1b7' 
            },
            label: r.type !== 'communication' ? r.type : undefined
        }))
    }, [relationships])

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    // Sync if props change? For now, simplistic
    
    const onConnectHandler = useCallback((params: any) => {
        if (onConnect) {
            onConnect(params.source, params.target)
        }
    }, [onConnect])

    return (
        <div style={{ width: '100%', height: height }} className="border rounded-xl bg-slate-50 overflow-hidden">
             <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnectHandler}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}
