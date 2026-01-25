
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  Circle, 
  Target, 
  Trophy, 
  Sparkles,
  Zap,
  Shield,
  Rocket,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { PrototypeProject } from './types'

interface TRLTrackerProps {
  project: PrototypeProject;
  onUpdateProject: (updated: PrototypeProject) => void;
}

const TRL_LEVELS = [
  { level: 1, name: "Basic Principles Observed", description: "Scientific research begins to be translated into applied research and development.", focus: "Conceptualization" },
  { level: 2, name: "Technology Concept Formulated", description: "Practical applications are invented. Applications are speculative.", focus: "Logic & Architecture" },
  { level: 3, name: "Experimental Proof of Concept", description: "Active research and development is initiated. Includes analytical and laboratory studies.", focus: "Functional Prototype" },
  { level: 4, name: "Technology Validated in Lab", description: "Basic technological components are integrated to establish that they will work together.", focus: "Integrated Prototype" }
]

const MILESTONES = [
  { level: 1, task: "Define problem statement and user personas", status: 'completed' },
  { level: 1, task: "Baseline competitor analysis", status: 'completed' },
  { level: 2, task: "Architecture diagram and tool selection", status: 'completed' },
  { level: 2, task: "Initial wireframes and logic flows", status: 'completed' },
  { level: 3, task: "Functional core features implemented", status: 'in-progress' },
  { level: 3, task: "Initial user feedback on core loop", status: 'pending' },
  { level: 4, task: "Multi-tool integration stress test", status: 'pending' },
  { level: 4, task: "System-wide performance validation", status: 'pending' }
]

export function TRLTracker({ project, onUpdateProject }: TRLTrackerProps) {
  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Technology Readiness Level (TRL) Tracking</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">Standard NASA/DoD framework for prototype maturity assessment</p>
         </div>
         <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 shadow-lg shadow-emerald-100">
            Request Validation Review
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {TRL_LEVELS.map((trl) => {
           const isActive = project.currentStatus.trlLevel >= trl.level
           const isCurrent = project.currentStatus.trlLevel === trl.level
           
           return (
             <Card 
               key={trl.level} 
               className={cn(
                 "border-2 rounded-[32px] overflow-hidden transition-all duration-500 p-6 flex flex-col justify-between h-[280px]",
                 isActive ? (isCurrent ? "border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50 shadow-xl" : "border-emerald-100 bg-emerald-50/10") : "border-slate-100 bg-white opacity-40"
               )}
             >
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm", isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>
                         TRL-{trl.level}
                      </div>
                      {isActive && !isCurrent && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-tight leading-tight">{trl.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{trl.focus}</p>
                   </div>
                   <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{trl.description}</p>
                </div>
                
                {isCurrent && (
                  <Badge className="bg-indigo-600 text-white font-black text-[8px] uppercase tracking-widest w-fit rounded-lg px-3 mb-2">Current Stage</Badge>
                )}
             </Card>
           )
         })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-6">
            <h5 className="font-black text-slate-900 uppercase text-sm tracking-widest flex items-center gap-2">
               <Target size={18} className="text-indigo-600" /> Validation Milestones
            </h5>
            <div className="space-y-3">
               {MILESTONES.map((m, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group",
                     m.status === 'completed' ? "bg-emerald-50/50 border-emerald-100/50" : 
                     (m.status === 'in-progress' ? "bg-indigo-50/50 border-indigo-100 text-indigo-900 shadow-sm" : "bg-white border-slate-100 text-slate-400 group-hover:border-slate-200")
                   )}
                 >
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "h-8 w-8 rounded-lg flex items-center justify-center border-2",
                         m.status === 'completed' ? "bg-emerald-500 border-none text-white" : 
                         (m.status === 'in-progress' ? "border-indigo-600 text-indigo-600" : "border-slate-100 text-slate-100")
                       )}>
                          {m.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                       </div>
                       <div>
                          <p className="text-sm font-black">{m.task}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Level {m.level} Requirement</p>
                       </div>
                    </div>
                    {m.status === 'in-progress' && <Badge className="bg-indigo-100 text-indigo-600 border-none font-black text-[8px] uppercase animate-pulse">In Progress</Badge>}
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <Card className="border-4 border-slate-100 rounded-[40px] p-8 bg-slate-900 text-white space-y-6 sticky top-8 shadow-2xl overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Rocket size={80} />
               </div>
               <div className="space-y-2">
                  <h5 className="font-black uppercase text-xs tracking-widest opacity-60">Success Criteria</h5>
                  <h4 className="text-2xl font-black tracking-tighter">Road to TRL-4</h4>
               </div>
               <div className="space-y-4">
                  {[
                    "All microservices integrated and talking",
                    "Initial user testing data logged",
                    "Source code pushed to main hub branch",
                    "Deployment ready for pilot"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                       <div className="h-5 w-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={12} className="text-indigo-400" />
                       </div>
                       <p className="text-xs font-medium text-slate-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
               </div>
               <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl font-black text-xs uppercase tracking-widest mt-4">
                  View Success Metrics
               </Button>
            </Card>
            
            <div className="bg-indigo-600/5 rounded-[32px] p-8 border-2 border-dashed border-indigo-100 space-y-3">
               <div className="flex items-center gap-2 text-indigo-600">
                  <Info size={16} />
                  <span className="font-black uppercase text-[10px] tracking-widest">About TRL-4</span>
               </div>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">TRL-4 represents the point where you move from individual components to a **system-wide integration**. It proves the technology works as a unified whole.</p>
            </div>
         </div>
      </div>
    </div>
  )
}
