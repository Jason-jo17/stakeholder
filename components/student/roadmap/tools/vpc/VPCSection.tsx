
"use client"

import React from 'react'
import { Plus, GripVertical, Trash2, Info, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { VPCItem } from './types'

interface VPCSectionProps {
    title: string;
    description: string;
    items: VPCItem[];
    type: 'jobs' | 'pains' | 'gains' | 'products' | 'relievers' | 'creators';
    color: string;
    onAddItem: () => void;
    onRemoveItem: (id: string) => void;
    onUpdateItem: (id: string, text: string) => void;
    onUpdateImportance: (id: string, level: number) => void;
}

export function VPCSection({
    title,
    description,
    items,
    type,
    color,
    onAddItem,
    onRemoveItem,
    onUpdateItem,
    onUpdateImportance
}: VPCSectionProps) {
    return (
        <Card className={cn("h-full border-none shadow-none flex flex-col", color)}>
            <div className="p-4 flex items-center justify-between border-b bg-white/50 backdrop-blur-sm">
                <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        {title}
                        <Badge variant="secondary" className="bg-slate-200/50 text-slate-600 font-normal">
                            {items.length}
                        </Badge>
                    </h3>
                    <p className="text-[10px] text-slate-500 italic mt-0.5">{description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onAddItem} className="h-8 w-8 rounded-full hover:bg-white">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            
            <CardContent className="p-3 flex-1 overflow-y-auto min-h-[150px]">
                <div className="space-y-2">
                    {items.length === 0 ? (
                        <div className="h-24 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg border-slate-200/50 bg-white/20">
                            <Plus className="h-6 w-6 mb-1 opacity-20" />
                            <span className="text-[10px] uppercase tracking-wider font-semibold">Empty</span>
                        </div>
                    ) : (
                        items.sort((a, b) => b.importance - a.importance).map((item) => (
                            <div 
                                key={item.id} 
                                className="group bg-white rounded-lg p-3 shadow-sm border border-slate-200/50 flex gap-3 items-start transition-all hover:shadow-md hover:border-slate-300"
                            >
                                <div className="mt-1">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        item.importance >= 4 ? "bg-red-400" : item.importance >= 3 ? "bg-orange-400" : "bg-blue-400"
                                    )} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <textarea
                                        className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-sm font-medium leading-relaxed text-slate-800 placeholder:text-slate-300"
                                        placeholder="Enter details..."
                                        value={item.text}
                                        onChange={(e) => onUpdateItem(item.id, e.target.value)}
                                        rows={Math.max(1, Math.ceil(item.text.length / 30))}
                                    />
                                    <div className="flex items-center justify-between pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => onUpdateImportance(item.id, i)}
                                                    className={cn(
                                                        "w-4 h-4 rounded-full text-[8px] flex items-center justify-center transition-colors border",
                                                        item.importance === i 
                                                            ? "bg-slate-900 text-white border-slate-900" 
                                                            : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                                                    )}
                                                >
                                                    {i}
                                                </button>
                                            ))}
                                            <span className="text-[8px] text-slate-400 ml-1 uppercase font-semibold">Priority</span>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => onRemoveItem(item.id)}
                                            className="h-6 w-6 text-slate-300 hover:text-red-500"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
