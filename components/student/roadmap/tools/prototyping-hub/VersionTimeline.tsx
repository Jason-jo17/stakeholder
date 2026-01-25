
"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  GitCommit, 
  GitPullRequest, 
  History, 
  Plus, 
  ChevronRight, 
  Shield, 
  Eye, 
  Download,
  Clock,
  User,
  Zap,
  Tag
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { PrototypeProject, PrototypeVersion } from './types'

interface VersionTimelineProps {
  project: PrototypeProject;
  onUpdateProject: (updated: PrototypeProject) => void;
}

export function VersionTimeline({ project, onUpdateProject }: VersionTimelineProps) {
  const versions = project.versions

  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Project History & Snapshots</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">Immutable version control across all prototyping tools</p>
         </div>
         <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 shadow-lg shadow-indigo-100">
            Create Baseline Snapshot
         </Button>
      </div>

      <div className="relative space-y-12">
        {/* Continuous Timeline Line */}
        <div className="absolute left-6 top-2 bottom-2 w-1 bg-slate-100 rounded-full" />

        {versions.length > 0 ? (
          versions.map((v, i) => (
            <div key={v.id} className="relative pl-16 group">
               {/* Version Marker */}
               <div className="absolute left-4 top-1 h-5 w-5 rounded-full bg-white border-4 border-indigo-600 z-10 group-hover:scale-125 transition-transform" />
               
               <Card className="border-2 border-slate-100 rounded-[32px] overflow-hidden hover:border-slate-300 transition-all bg-white relative">
                  <div className="p-8 space-y-6">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                           <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                              <span className="text-sm font-black">v{v.versionNumber}</span>
                           </div>
                           <div>
                              <div className="flex items-center gap-2">
                                 <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Feature Integration & TRL Advancement</h4>
                                 <Badge className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-md">TRL-{v.trlLevel}</Badge>
                              </div>
                              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                 <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(v.createdAt).toLocaleDateString()}</span>
                                 <span className="flex items-center gap-1.5"><User size={12} /> {v.createdBy}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                              Compare <ChevronRight size={14} className="ml-1" />
                           </Button>
                           <Button className="h-9 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 font-black text-[10px] uppercase tracking-widest">
                              Restore Point
                           </Button>
                        </div>
                     </div>

                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{v.changes}"</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {v.artifacts.map((artifact, j) => (
                           <div key={j} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 transition-colors cursor-pointer group/art">
                              <div className="flex items-center gap-3">
                                 <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <Eye size={16} className="text-slate-400" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black text-slate-900">{artifact.fileName}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{artifact.toolSource} ({artifact.fileType})</p>
                                 </div>
                              </div>
                              <Download size={14} className="text-slate-300 group-hover/art:text-indigo-600 transition-colors" />
                           </div>
                        ))}
                     </div>
                  </div>
               </Card>
            </div>
          ))
        ) : (
          /* Mock timeline if empty */
          [1, 2].map((_, i) => (
            <div key={i} className="relative pl-16 opacity-30">
               <div className="absolute left-4 top-1 h-5 w-5 rounded-full bg-slate-200" />
               <div className="h-40 bg-slate-100 rounded-[32px] border-2 border-dashed border-slate-200" />
            </div>
          ))
        )}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <History size={140} />
         </div>
         <h4 className="text-3xl font-black tracking-tighter mb-4">Master Version Control</h4>
         <p className="text-slate-400 font-medium max-w-lg mx-auto mb-8">Every time you hit "Create Version", we capture a snapshot across Figma, GitHub, and your other connected tools. Rollback anytime.</p>
         <div className="flex justify-center gap-4">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
               Manage All Snapshots
            </Button>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest">
               Sync with GitHub Hub
            </Button>
         </div>
      </div>
    </div>
  )
}
