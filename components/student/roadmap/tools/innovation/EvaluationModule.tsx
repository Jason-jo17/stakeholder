
"use client"

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  CheckCircle2, 
  Trophy, 
  Target, 
  Zap, 
  AlertCircle,
  Star,
  ChevronRight,
  Filter
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { InnovationSession, InnovationIdea } from './types'

interface EvaluationModuleProps {
  data: InnovationSession;
  onUpdate: (data: InnovationSession) => void;
}

export function EvaluationModule({ data, onUpdate }: EvaluationModuleProps) {
  // Flatten all ideas from both frameworks
  const allIdeas = useMemo(() => {
    const trizIdeas = data.triz.principlesExplored.flatMap(p => p.ideas)
    const scamperIdeas = [
      ...data.scamper.substitute.ideas,
      ...data.scamper.combine.ideas,
      ...data.scamper.adapt.ideas,
      ...data.scamper.modify.ideas,
      ...data.scamper.putToOtherUses.ideas,
      ...data.scamper.eliminate.ideas,
      ...data.scamper.reverse.ideas
    ]
    return [...trizIdeas, ...scamperIdeas]
  }, [data])

  const toggleSelection = (idea: InnovationIdea) => {
    const isSelected = data.selectedIdeas.some(i => i.id === idea.id)
    if (isSelected) {
      onUpdate({
        ...data,
        selectedIdeas: data.selectedIdeas.filter(i => i.id !== idea.id)
      })
    } else {
      onUpdate({
        ...data,
        selectedIdeas: [...data.selectedIdeas, { ...idea, nextSteps: "" }]
      })
    }
  }

  const updateIdeaScore = (ideaId: string, field: 'feasibility' | 'novelty', score: number) => {
    // This is complex because ideas are deep in TRIZ/SCAMPER
    // For MVP, we'll update the data and it will refilter in useMemo
    const updateIdeas = (ideas: InnovationIdea[]) => ideas.map(i => i.id === ideaId ? { ...i, [field]: score } : i)

    const updatedTRIZ = {
      ...data.triz,
      principlesExplored: data.triz.principlesExplored.map(p => ({
        ...p,
        ideas: updateIdeas(p.ideas)
      }))
    }

    const updatedSCAMPER = {
      ...data.scamper,
      substitute: { ...data.scamper.substitute, ideas: updateIdeas(data.scamper.substitute.ideas) },
      combine: { ...data.scamper.combine, ideas: updateIdeas(data.scamper.combine.ideas) },
      adapt: { ...data.scamper.adapt, ideas: updateIdeas(data.scamper.adapt.ideas) },
      modify: { ...data.scamper.modify, ideas: updateIdeas(data.scamper.modify.ideas) },
      putToOtherUses: { ...data.scamper.putToOtherUses, ideas: updateIdeas(data.scamper.putToOtherUses.ideas) },
      eliminate: { ...data.scamper.eliminate, ideas: updateIdeas(data.scamper.eliminate.ideas) },
      reverse: { ...data.scamper.reverse, ideas: updateIdeas(data.scamper.reverse.ideas) }
    }

    onUpdate({
      ...data,
      triz: updatedTRIZ,
      scamper: updatedSCAMPER,
      selectedIdeas: data.selectedIdeas.map(i => i.id === ideaId ? { ...i, [field]: score } : i)
    })
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Idea Convergence</h2>
          <p className="text-sm text-slate-500 font-medium">Evaluate all {allIdeas.length} generated concepts and select the most promising ones.</p>
        </div>
        <div className="flex gap-4">
          <Card className="px-4 py-2 border-none shadow-sm flex items-center gap-3 bg-white">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-slate-400">Selected</div>
              <div className="text-sm font-black">{data.selectedIdeas.length} Concepts</div>
            </div>
          </Card>
        </div>
      </div>

      {allIdeas.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="h-16 w-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto">
            <Filter className="h-8 w-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">No ideas generated yet. Go back to the Ideation Lab to start.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allIdeas.map((idea) => {
            const isSelected = data.selectedIdeas.some(i => i.id === idea.id)
            const score = (idea.feasibility + idea.novelty) / 2

            return (
              <Card 
                key={idea.id} 
                className={cn(
                  "flex flex-col border-2 transition-all group overflow-hidden bg-white",
                  isSelected ? "border-indigo-500 shadow-xl ring-2 ring-indigo-50" : "hover:border-slate-300"
                )}
              >
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b bg-slate-50/50">
                   <Badge variant="outline" className={cn(
                     "text-[9px] font-black uppercase tracking-widest px-1.5 h-5",
                     idea.framework === 'TRIZ' ? "border-indigo-200 text-indigo-600" : "border-emerald-200 text-emerald-600"
                   )}>
                     {idea.framework}: {idea.technique}
                   </Badge>
                   <button 
                    onClick={() => toggleSelection(idea)}
                    className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center transition-all border",
                      isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-200 text-slate-300 hover:border-indigo-300 hover:text-indigo-400"
                    )}
                   >
                     <CheckCircle2 size={14} />
                   </button>
                </CardHeader>
                <CardContent className="p-5 flex-1 flex flex-col gap-6">
                  <p className="text-sm text-slate-800 font-bold leading-relaxed">{idea.description}</p>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                          <span>Novelty</span>
                          <span className="text-slate-900">{idea.novelty}/5</span>
                       </div>
                       <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              onClick={() => updateIdeaScore(idea.id, 'novelty', s)}
                              className={cn(
                                "flex-1 h-2 rounded-full transition-all",
                                s <= idea.novelty ? "bg-indigo-500" : "bg-slate-100"
                              )}
                            />
                          ))}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                          <span>Feasibility</span>
                          <span className="text-slate-900">{idea.feasibility}/5</span>
                       </div>
                       <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              onClick={() => updateIdeaScore(idea.id, 'feasibility', s)}
                              className={cn(
                                "flex-1 h-2 rounded-full transition-all",
                                s <= idea.feasibility ? "bg-emerald-500" : "bg-slate-100"
                              )}
                            />
                          ))}
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
