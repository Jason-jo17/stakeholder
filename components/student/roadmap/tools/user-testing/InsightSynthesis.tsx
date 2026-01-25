
"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Lightbulb, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  BrainCircuit,
  Layers,
  Zap,
  Shield,
  History
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { TestingSession, SessionInsight } from './types'

interface InsightSynthesisProps {
  session: TestingSession;
  onUpdateSession: (updated: TestingSession) => void;
}

export function InsightSynthesis({ session, onUpdateSession }: InsightSynthesisProps) {
  const [isSynthesizing, setIsSynthesizing] = useState(false)

  const synthesizeInsights = () => {
    setIsSynthesizing(true)
    // Mock AI synthesis delay
    setTimeout(() => {
      const mockInsights: SessionInsight[] = [
        {
          id: 'i1',
          issue: "Navigation Friction on Dashboard",
          severity: 'critical',
          frequency: 5,
          userQuotes: ["I couldn't find where the 'Add' button was.", "The sidebar is too collapsed by default."],
          recommendation: "Pin the sidebar by default and move 'Add' actions to a floating action button on mobile."
        },
        {
          id: 'i2',
          issue: "Unclear TRL-4 Requirements",
          severity: 'major',
          frequency: 3,
          userQuotes: ["I don't know what 'Integrate microservices' actually means in this tool.", "The checklist feels too technical."],
          recommendation: "Add 'How-to' videos and documentation links for each TRL-4 requirement."
        }
      ]

      onUpdateSession({
        ...session,
        insights: {
          ...session.insights,
          criticalIssues: mockInsights,
          keyLearnings: ["Users value speed over complexity", "Mobile responsiveness is a dealbreaker"],
          iterationPriorities: ["Redesign Navigation Hub", "Simplified TRL Checklist"]
        },
        status: 'analyzed'
      })
      setIsSynthesizing(false)
    }, 2000)
  }

  const insights = session.insights.criticalIssues

  return (
    <div className="p-10 space-y-12 max-w-5xl mx-auto">
      <section className="flex items-center justify-between p-12 bg-slate-900 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
         <div className="absolute right-0 top-0 p-12 opacity-15">
            <BrainCircuit size={160} />
         </div>
         <div className="space-y-4 relative z-10 flex-1">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Insight Laboratory</h2>
            <p className="text-slate-400 font-medium max-w-lg mb-8">Run AI-powered analysis across your session transcripts, observations, and rubric scores to extract the truth.</p>
            <Button 
              disabled={isSynthesizing}
              onClick={synthesizeInsights}
              className="bg-rose-600 hover:bg-rose-700 h-14 px-10 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-900/50 transition-all active:scale-95 flex items-center gap-3"
            >
               {isSynthesizing ? <Zap className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5 fill-white" />}
               {isSynthesizing ? "Extracting Truth..." : "Synthesize AI Insights"}
            </Button>
         </div>
      </section>

      {insights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                 <AlertCircle className="text-rose-600" /> Discovered Patterns
              </h3>
              {insights.map((insight) => (
                <Card key={insight.id} className="border-2 border-slate-100 rounded-[32px] overflow-hidden hover:border-rose-500 transition-all bg-white relative">
                   <div className="p-8 space-y-4">
                      <div className="flex items-center gap-2">
                         <Badge className={cn(
                           "border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-full",
                           insight.severity === 'critical' ? "bg-rose-600 text-white" : "bg-amber-100 text-amber-600"
                         )}>
                            {insight.severity}
                         </Badge>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{insight.frequency} Users Mentioned</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">{insight.issue}</h4>
                      <p className="text-xs text-slate-500 font-medium italic leading-relaxed">"{insight.userQuotes[0]}"</p>
                      
                      <div className="pt-4 border-t border-slate-50">
                         <div className="flex items-center gap-2 mb-2">
                            <Lightbulb size={14} className="text-indigo-500" />
                            <span className="text-[10px] font-black uppercase text-indigo-600">Actionable Fix</span>
                         </div>
                         <p className="text-xs text-slate-600 font-bold leading-relaxed">{insight.recommendation}</p>
                      </div>
                   </div>
                </Card>
              ))}
           </div>

           <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                 <Target className="text-indigo-600" /> Next Iteration Priorities
              </h3>
              <div className="space-y-4">
                 <Card className="border-2 border-slate-100 rounded-[32px] p-8 space-y-6 bg-white overflow-hidden relative">
                    <div className="absolute right-0 top-0 p-8 opacity-5">
                       <Shield size={100} />
                    </div>
                    <div className="space-y-4">
                       {session.insights.iterationPriorities.map((task, i) => (
                         <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:border-indigo-100 transition-all cursor-pointer">
                            <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 text-white font-black text-[10px]">{i+1}</div>
                            <p className="text-sm font-black text-slate-900">{task}</p>
                         </div>
                       ))}
                    </div>
                    <Button className="w-full h-12 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest">
                       Push to Product Backlog <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                 </Card>

                 <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] space-y-4 text-center">
                    <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto">
                       <CheckCircle2 className="text-emerald-500" />
                    </div>
                    <div>
                       <h5 className="font-black text-slate-900 uppercase text-xs">Insight Saturation</h5>
                       <p className="text-[10px] text-slate-400 font-medium">You have reached a point where new tests are unlikely to yield different results.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] opacity-60">
           <Zap className="h-12 w-12 text-slate-300 mx-auto" />
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Analysis Pending • Launch Insight Laboratory above</p>
        </div>
      )}
    </div>
  )
}
