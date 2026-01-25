
"use client"

import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Rocket, 
  Target, 
  Briefcase, 
  Globe, 
  ChevronRight,
  Sparkles,
  Zap,
  Building
} from 'lucide-react'
import { PitchContext } from './types'
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  onSelect: (context: PitchContext) => void;
  onBack: () => void;
}

const TEMPLATES: { 
  id: PitchContext; 
  title: string; 
  description: string; 
  icon: any; 
  slides: string[];
  color: string;
}[] = [
  {
    id: 'seed',
    title: 'Seed Round',
    description: 'Perfect for early-stage startups focus on problem/solution fit.',
    icon: Rocket,
    slides: ['Problem', 'Solution', 'Market Size', 'Team', 'Traction'],
    color: 'indigo'
  },
  {
    id: 'angel',
    title: 'Angel/Pre-Seed',
    description: 'Focus on the "Why" and the founding team\'s vision.',
    icon: Zap,
    slides: ['Vision', 'The Paint', 'Our Approach', 'Team', 'Milestones'],
    color: 'amber'
  },
  {
    id: 'accelerator',
    title: 'Accelerator App',
    description: 'Condensed 5-7 slide deck for programs like YC or Techstars.',
    icon: Sparkles,
    slides: ['10-sec pitch', 'The Secret Sauce', 'Competition', 'Progress'],
    color: 'rose'
  },
  {
    id: 'grant',
    title: 'Innovation Grant',
    description: 'Structured for technical feasibility and public impact.',
    icon: Globe,
    slides: ['Scientific Basis', 'Technical Map', 'Social Impact', 'Budget'],
    color: 'emerald'
  },
  {
    id: 'series_a',
    title: 'Series A',
    description: 'Data-driven deck for scaling operations and market dominance.',
    icon: Building,
    slides: ['Unit Economics', 'GTM Strategy', 'Financial Projections', 'Scaling'],
    color: 'slate'
  }
]

export function TemplateSelector({ onSelect, onBack }: TemplateSelectorProps) {
  return (
    <div className="flex-1 p-12 overflow-y-auto bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
           <Badge className="bg-indigo-600/10 text-indigo-600 border-none px-4 py-1 font-black text-[10px] uppercase tracking-widest">Storytelling Frameworks</Badge>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Choose Your Narrative</h1>
           <p className="text-slate-500 font-medium max-w-xl mx-auto">Select a pre-built structure optimized for your current funding context.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {TEMPLATES.map((tpl) => (
             <Card 
               key={tpl.id}
               className="p-8 cursor-pointer border-2 border-slate-100 rounded-[32px] hover:border-indigo-500 hover:shadow-2xl transition-all duration-500 bg-white group relative overflow-hidden flex flex-col"
               onClick={() => onSelect(tpl.id)}
             >
                <div className={cn(
                  "absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full",
                  `bg-${tpl.color}-500`
                )} />
                
                <div className="flex items-start justify-between mb-6">
                   <div className={cn(
                     "h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform duration-500",
                     `bg-${tpl.color}-600`
                   )}>
                      <tpl.icon size={28} />
                   </div>
                   <ChevronRight className="text-slate-200 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                </div>

                <div className="space-y-2 mb-6">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{tpl.title}</h3>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">{tpl.description}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                   {tpl.slides.map(s => (
                     <span key={s} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-slate-400 rounded-md border border-slate-100">{s}</span>
                   ))}
                </div>
             </Card>
           ))}
        </div>

        <div className="flex justify-center pt-8">
           <Button variant="ghost" onClick={onBack} className="text-slate-400 font-black text-xs uppercase tracking-widest">
             <ChevronRight className="rotate-180 mr-2 h-4 w-4" /> Go Back
           </Button>
        </div>
      </div>
    </div>
  )
}
