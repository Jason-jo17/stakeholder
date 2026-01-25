
"use client"

import { Stakeholder, ValueDimension } from "./types"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface Props {
    stakeholder: Stakeholder
    dimensions: ValueDimension[]
    onUpdate: (s: Stakeholder) => void
    readOnly?: boolean
}

export function ValueGapAnalysis({ stakeholder, dimensions, onUpdate, readOnly }: Props) {
    const activeDimensions = stakeholder.valuedDimensions || []

    const handleValueChange = (dimId: string, field: 'importance' | 'satisfaction', val: number) => {
        if (readOnly) return
        
        const existing = activeDimensions.find(d => d.dimensionId === dimId)
        let updatedDimensions = [...activeDimensions]

        if (existing) {
            updatedDimensions = updatedDimensions.map(d => {
                 if (d.dimensionId === dimId) {
                     const newData = { ...d, [field]: val }
                     newData.gap = newData.importance - newData.satisfaction
                     return newData
                 }
                 return d
            })
        } else {
            // Should not happen if UI is correct, but safe fallback
            updatedDimensions.push({
                dimensionId: dimId,
                importance: field === 'importance' ? val : 3,
                satisfaction: field === 'satisfaction' ? val : 3,
                gap: 0
            })
        }
        
        onUpdate({ ...stakeholder, valuedDimensions: updatedDimensions })
    }

    const toggleDimension = (dimId: string) => {
        if (readOnly) return
        const isActive = activeDimensions.some(d => d.dimensionId === dimId)
        
        let newDims
        if (isActive) {
            newDims = activeDimensions.filter(d => d.dimensionId !== dimId)
        } else {
            newDims = [...activeDimensions, { dimensionId: dimId, importance: 3, satisfaction: 3, gap: 0 }]
        }
        onUpdate({ ...stakeholder, valuedDimensions: newDims })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
                {dimensions.map(dim => {
                    const isActive = activeDimensions.some(d => d.dimensionId === dim.id)
                    return (
                        <Button
                            key={dim.id}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleDimension(dim.id)}
                            className="rounded-full text-xs h-7"
                            disabled={readOnly}
                        >
                            {isActive ? <X className="h-3 w-3 mr-1" /> : <Plus className="h-3 w-3 mr-1" />}
                            {dim.name}
                        </Button>
                    )
                })}
            </div>

            <div className="space-y-6">
                {activeDimensions.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-lg">
                        Select value dimensions relevant to this stakeholder to analyze gaps.
                    </div>
                )}
                
                {activeDimensions.map(val => {
                    const dimName = dimensions.find(d => d.id === val.dimensionId)?.name || val.dimensionId
                    const gapColor = val.gap > 0 ? "text-red-500" : val.gap < 0 ? "text-green-500" : "text-slate-500"
                    
                    return (
                        <div key={val.dimensionId} className="bg-slate-50 p-4 rounded-lg border">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-semibold text-sm">{dimName}</h4>
                                <div className={`text-xs font-bold ${gapColor}`}>
                                    Gap: {val.gap > 0 ? "+" : ""}{val.gap} ({val.gap > 0 ? "Underserved" : val.gap < 0 ? "Overserved" : "Balanced"})
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs text-slate-500">Importance to them</Label>
                                        <span className="text-xs font-mono">{val.importance}/5</span>
                                    </div>
                                    <Slider 
                                        value={[val.importance]} 
                                        min={1} max={5} step={1}
                                        onValueChange={([v]) => handleValueChange(val.dimensionId, 'importance', v)}
                                        className="py-1"
                                        disabled={readOnly}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs text-slate-500">Current Satisfaction</Label>
                                        <span className="text-xs font-mono">{val.satisfaction}/5</span>
                                    </div>
                                    <Slider 
                                        value={[val.satisfaction]} 
                                        min={1} max={5} step={1}
                                        onValueChange={([v]) => handleValueChange(val.dimensionId, 'satisfaction', v)}
                                        className="py-1"
                                        disabled={readOnly}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
