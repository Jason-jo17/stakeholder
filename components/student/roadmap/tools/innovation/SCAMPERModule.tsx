
"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  RefreshCcw, 
  Minimize2, 
  Plus, 
  Trash2, 
  Sparkles,
  Search,
  Wand2,
  ChevronRight,
  HandMetal,
  Hammer,
  Link2,
  Maximize2,
  Scissors,
  ArrowRightLeft
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { InnovationSession, InnovationIdea, SCAMPERData } from './types'
import { SCAMPER_PROMPTS } from './constants'

interface SCAMPERModuleProps {
  data: InnovationSession;
  onUpdate: (data: InnovationSession) => void;
}

type SCAMPERKey = keyof typeof SCAMPER_PROMPTS;

export function SCAMPERModule({ data, onUpdate }: SCAMPERModuleProps) {
  const [activeTechnique, setActiveTechnique] = useState<SCAMPERKey>('substitute')
  const [newIdeaText, setNewIdeaText] = useState("")

  const techniques: { key: SCAMPERKey; label: string; icon: any; color: string }[] = [
    { key: 'substitute', label: 'Substitute', icon: RefreshCcw, color: 'text-blue-500' },
    { key: 'combine', label: 'Combine', icon: Link2, color: 'text-emerald-500' },
    { key: 'adapt', label: 'Adapt', icon: HandMetal, color: 'text-purple-500' },
    { key: 'modify', label: 'Modify', icon: Maximize2, color: 'text-orange-500' },
    { key: 'putToOtherUses', label: 'Put to use', icon: Hammer, color: 'text-indigo-500' },
    { key: 'eliminate', label: 'Eliminate', icon: Scissors, color: 'text-rose-500' },
    { key: 'reverse', label: 'Reverse', icon: ArrowRightLeft, color: 'text-slate-500' },
  ]

  const addIdea = (techKey: SCAMPERKey) => {
    if (!newIdeaText) return
    const newIdea: InnovationIdea = {
      id: `idea-${Date.now()}`,
      description: newIdeaText,
      feasibility: 3,
      novelty: 4,
      evidence: [],
      technique: techKey.charAt(0).toUpperCase() + techKey.slice(1),
      framework: 'SCAMPER'
    }

    onUpdate({
      ...data,
      scamper: {
        ...data.scamper,
        [techKey]: {
          ...data.scamper[techKey],
          ideas: [...data.scamper[techKey].ideas, newIdea]
        }
      }
    })
    setNewIdeaText("")
  }

  const activeData = data.scamper[activeTechnique]
  const currentPrompts = SCAMPER_PROMPTS[activeTechnique]

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar Navigation */}
      <div className="col-span-3 space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">7 Techniques</h4>
        {techniques.map((tech) => (
          <button
            key={tech.key}
            onClick={() => setActiveTechnique(tech.key)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold text-sm",
              activeTechnique === tech.key 
                ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200" 
                : "text-slate-500 hover:bg-slate-100"
            )}
          >
            <div className="flex items-center gap-3">
              <tech.icon className={cn("h-4 w-4", activeTechnique === tech.key ? tech.color : "text-slate-400")} />
              {tech.label}
            </div>
            {data.scamper[tech.key].ideas.length > 0 && (
              <Badge className="bg-emerald-500 text-white border-none h-5 min-w-[20px] flex items-center justify-center p-0 text-[10px] font-black">
                {data.scamper[tech.key].ideas.length}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="col-span-9 space-y-6">
        <Card className="border-none shadow-xl bg-white overflow-hidden rounded-3xl">
          <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 capitalize tracking-tight flex items-center gap-3">
                {activeTechnique}
                <Sparkles className="h-5 w-5 text-yellow-500" />
              </h3>
              <p className="text-sm text-slate-500 font-medium">Think about how to {activeTechnique === 'putToOtherUses' ? 'repurpose' : activeTechnique} elements of your solution.</p>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-8">
            {/* Prompts */}
            <div className="grid grid-cols-2 gap-3">
              {currentPrompts.map((prompt, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 flex gap-3 items-start group hover:border-indigo-300 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-white border shadow-sm flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 group-hover:text-indigo-500 group-hover:border-indigo-200">
                    ?
                  </div>
                  <p className="text-xs text-slate-600 font-bold leading-relaxed">{prompt}</p>
                </div>
              ))}
            </div>

            {/* Ideation Area */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">New Concept</label>
                <div className="text-[10px] font-bold text-slate-400">Ctrl + Enter to Save</div>
              </div>
              <div className="relative">
                <Textarea 
                  value={newIdeaText}
                  onChange={(e) => setNewIdeaText(e.target.value)}
                  placeholder={`Applying ${activeTechnique}...`}
                  className="min-h-[120px] text-lg font-medium p-6 rounded-3xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-500 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      addIdea(activeTechnique)
                    }
                  }}
                />
                <Button 
                  className="absolute bottom-4 right-4 bg-slate-900 px-6 h-10 rounded-2xl font-black text-xs uppercase"
                  onClick={() => addIdea(activeTechnique)}
                  disabled={!newIdeaText}
                >
                  Log Idea <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Recent Ideas for this technique */}
            {activeData.ideas.length > 0 && (
               <div className="space-y-4 pt-8">
                  <h5 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Generated Concepts</h5>
                  <div className="space-y-3">
                    {activeData.ideas.map((idea) => (
                      <div key={idea.id} className="bg-white p-4 rounded-2xl border flex justify-between items-start group hover:shadow-lg transition-all">
                        <div className="flex-1">
                          <p className="text-sm text-slate-800 font-bold">{idea.description}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-200 hover:text-rose-500 group-hover:text-slate-400"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
               </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
