
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  CheckCircle2, 
  Target, 
  Trophy, 
  TrendingUp, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  Boxes
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { SixPathsSession, SynthesisOpportunity } from './types'

interface SynthesisDashboardProps {
  data: SixPathsSession;
  onUpdate: (data: SixPathsSession) => void;
}

export function SynthesisDashboard({ data, onUpdate }: SynthesisDashboardProps) {
  const mockOpportunities: SynthesisOpportunity[] = [
    {
       id: 'o1',
       title: 'Self-Serve Autonomous Delivery Hubs',
       sourcePaths: [1, 4],
       description: 'Combining shared infrastructure models from the bike-sharing industry with e-commerce logistics.',
       valueInnovation: 'Eliminate door-to-door cost, Improve customer pickup flexibility.',
       differentiation: 'High',
       costStructureImpact: 'Significant reduction in last-mile labor.',
       priority: 5
    },
    {
       id: 'o2',
       title: 'Emotional Delivery Experience',
       sourcePaths: [5],
       description: 'Shifting the standard functional package drop into a "moment of unboxing" service.',
       valueInnovation: 'High emotional engagement, Premium brand loyalty.',
       differentiation: 'Extreme',
       costStructureImpact: 'Small increase in variable cost, high margin potential.',
       priority: 4
    }
  ]

  return (
    <div className="p-8 space-y-10 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
         <Badge className="bg-yellow-500 text-white font-black uppercase tracking-widest px-4 py-1">Synthesis Phase</Badge>
         <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Your Blue Ocean Portfolio</h2>
         <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
            We've analyzed the six paths. Here are the reconstructed market boundaries with the highest potential for value innovation.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {(data.synthesis.blueOceanOpportunities.length > 0 ? data.synthesis.blueOceanOpportunities : mockOpportunities).map((ops) => (
            <Card key={ops.id} className="border-4 border-slate-100 rounded-[32px] overflow-hidden hover:border-blue-500 transition-all group hover:shadow-2xl">
               <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between bg-slate-50/50">
                  <div className="flex flex-wrap gap-2">
                     {ops.sourcePaths.map(p => (
                        <Badge key={p} className="bg-slate-900 text-[10px] font-black uppercase tracking-wider">Path {p}</Badge>
                     ))}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-black">
                     <Trophy size={16} />
                     <span className="text-xs uppercase">Top Opportunity</span>
                  </div>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{ops.title}</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{ops.description}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                     <div className="bg-blue-50 p-5 rounded-2xl space-y-2 border border-blue-100/50">
                        <div className="flex items-center gap-2 text-blue-700 font-black text-[10px] uppercase tracking-widest">
                           <Zap size={14} /> Value Innovation
                        </div>
                        <p className="text-xs text-blue-900 font-bold">{ops.valueInnovation}</p>
                     </div>

                     <div className="bg-emerald-50 p-5 rounded-2xl space-y-2 border border-emerald-100/50">
                        <div className="flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase tracking-widest">
                           <TrendingUp size={14} /> Cost Impact
                        </div>
                        <p className="text-xs text-emerald-900 font-bold">{ops.costStructureImpact}</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Differentiation</span>
                        <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 font-black h-6">{ops.differentiation}</Badge>
                     </div>
                     <Button variant="ghost" className="h-10 rounded-xl px-4 font-black text-[10px] uppercase text-blue-600 group-hover:bg-blue-50">
                        Refine in ERRC <ChevronRight size={14} className="ml-1" />
                     </Button>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <Sparkles size={120} className="text-white" />
         </div>
         <h4 className="text-white text-2xl font-black tracking-tight">Ready to create your Strategy Canvas?</h4>
         <p className="text-slate-400 font-medium max-w-lg mx-auto">All these opportunities can be exported directly to the ERRC Grid to define your new value curve.</p>
         <div className="flex justify-center gap-4 pt-4">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest">
               Export to ERRC Analysis
            </Button>
            <Button variant="outline" className="text-white border-slate-700 hover:bg-slate-800 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest">
               Download PDF Report
            </Button>
         </div>
      </div>
    </div>
  )
}
