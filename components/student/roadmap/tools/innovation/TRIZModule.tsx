
"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Library, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Sparkles,
  Info,
  Boxes,
  Layers,
  Zap,
  ChevronRight,
  TrendingDown,
  TrendingUp
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { InnovationSession, InnovationIdea } from './types'
import { TRIZ_PRINCIPLES, TRIZ_PARAMETERS } from './constants'

interface TRIZModuleProps {
  data: InnovationSession;
  onUpdate: (data: InnovationSession) => void;
}

export function TRIZModule({ data, onUpdate }: TRIZModuleProps) {
  const [activePrincipleId, setActivePrincipleId] = useState<number | null>(null)
  const [newIdeaText, setNewIdeaText] = useState("")

  const addContradiction = () => {
    onUpdate({
      ...data,
      triz: {
        ...data.triz,
        contradictions: [
          ...data.triz.contradictions,
          { improvingParameter: TRIZ_PARAMETERS[0], worseningParameter: TRIZ_PARAMETERS[1], suggestedPrinciples: [1, 5, 13, 28] }
        ]
      }
    })
  }

  const addIdea = (principleId: number) => {
    if (!newIdeaText) return
    const newIdea: InnovationIdea = {
      id: `idea-${Date.now()}`,
      description: newIdeaText,
      feasibility: 3,
      novelty: 4,
      evidence: [],
      technique: TRIZ_PRINCIPLES.find(p => p.id === principleId)?.name || `Principle ${principleId}`,
      framework: 'TRIZ'
    }

    const existingExplored = data.triz.principlesExplored.find(p => p.principleNumber === principleId)
    let newPrinciplesExplored = []

    if (existingExplored) {
      newPrinciplesExplored = data.triz.principlesExplored.map(p => 
        p.principleNumber === principleId ? { ...p, ideas: [...p.ideas, newIdea] } : p
      )
    } else {
      newPrinciplesExplored = [
        ...data.triz.principlesExplored,
        { principleNumber: principleId, howApplied: "", ideas: [newIdea] }
      ]
    }

    onUpdate({
      ...data,
      triz: {
        ...data.triz,
        principlesExplored: newPrinciplesExplored
      }
    })
    setNewIdeaText("")
  }

  return (
    <div className="space-y-8">
      {/* Contradiction Analysis */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
            <Layers className="h-4 w-4" /> 1. Define Contradictions
          </h4>
          <Button variant="ghost" size="sm" onClick={addContradiction} className="text-xs font-bold h-8 border border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50">
            <Plus className="h-3 w-3 mr-1" /> Identify Contradiction
          </Button>
        </div>

        {data.triz.contradictions.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-white/50">
            <p className="text-sm text-slate-400">Identify what parameter you want to improve and what gets worse as a result.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.triz.contradictions.map((c, i) => (
              <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-0 flex h-24">
                  <div className="w-1.5 bg-indigo-500" />
                  <div className="flex-1 p-4 grid grid-cols-3 gap-4 items-center">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                        <TrendingUp size={10} className="text-emerald-500" /> Improving
                      </label>
                      <select 
                        value={c.improvingParameter}
                        onChange={(e) => {
                          const newC = [...data.triz.contradictions]
                          newC[i].improvingParameter = e.target.value
                          onUpdate({ ...data, triz: { ...data.triz, contradictions: newC }})
                        }}
                        className="w-full text-xs font-bold bg-slate-50 border-none h-8 rounded px-2"
                      >
                        {TRIZ_PARAMETERS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                        <TrendingDown size={10} className="text-rose-500" /> Worsening
                      </label>
                      <select 
                        value={c.worseningParameter}
                        onChange={(e) => {
                          const newC = [...data.triz.contradictions]
                          newC[i].worseningParameter = e.target.value
                          onUpdate({ ...data, triz: { ...data.triz, contradictions: newC }})
                        }}
                        className="w-full text-xs font-bold bg-slate-50 border-none h-8 rounded px-2"
                      >
                        {TRIZ_PARAMETERS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 w-full mb-1">Principles to Explore</label>
                      {c.suggestedPrinciples.map(pId => (
                        <Badge 
                          key={pId} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-indigo-100 text-indigo-700 h-6 px-2 text-[10px] font-bold"
                          onClick={() => setActivePrincipleId(pId)}
                        >
                          P{pId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Principle Explorer */}
      <section className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
          <Library className="h-4 w-4" /> 2. Explore Principles
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRIZ_PRINCIPLES.map((principle) => {
            const isActive = activePrincipleId === principle.id
            const explored = data.triz.principlesExplored.find(p => p.principleNumber === principle.id)
            const ideaCount = explored?.ideas.length || 0

            return (
              <Card 
                key={principle.id} 
                className={cn(
                  "transition-all border-2 group shadow-sm flex flex-col",
                  isActive ? "border-indigo-500 ring-2 ring-indigo-50" : "hover:border-slate-300 border-white bg-white"
                )}
                onClick={() => setActivePrincipleId(principle.id)}
              >
                <CardHeader className="py-4 px-5 border-b flex flex-row items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-900 h-6 w-6 rounded-full flex items-center justify-center p-0 text-[10px] font-black">
                      {principle.id}
                    </Badge>
                    <CardTitle className="text-sm font-black tracking-tight text-slate-800">{principle.name}</CardTitle>
                  </div>
                  {ideaCount > 0 && (
                    <Badge className="bg-emerald-500 h-5 px-1.5 text-[9px] font-black">{ideaCount} IDEAS</Badge>
                  )}
                </CardHeader>
                <CardContent className="p-5 flex-1 flex flex-col gap-4">
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{principle.description}</p>
                  
                  {isActive && (
                    <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="p-3 bg-indigo-50 rounded-xl space-y-2">
                         <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                           <Sparkles size={10} /> Examples
                         </span>
                         <ul className="text-[11px] text-indigo-900 font-medium space-y-1 pl-3 list-disc">
                            {principle.examples.map((ex, idx) => <li key={idx}>{ex}</li>)}
                         </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea 
                          value={newIdeaText}
                          onChange={(e) => setNewIdeaText(e.target.value)}
                          placeholder="Apply this principle to your problem..."
                          className="min-h-[80px] text-xs resize-none bg-white border-slate-200 focus:border-indigo-500 rounded-xl"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                              addIdea(principle.id)
                            }
                          }}
                        />
                        <Button 
                          className="w-full h-8 text-[10px] font-black uppercase bg-indigo-600 hover:bg-indigo-700" 
                          onClick={() => addIdea(principle.id)}
                          disabled={!newIdeaText}
                        >
                          Generate Idea
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
