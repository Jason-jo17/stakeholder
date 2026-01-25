
"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
   Plus,
   Search,
   Filter,
   MoreVertical,
   ExternalLink,
   ArrowUpRight,
   Clock,
   Target,
   Box,
   Smartphone,
   Globe,
   Zap,
   ChevronRight,
   PlusCircle
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { PrototypingSession, PrototypeProject, PrototypeType } from './types'

interface ProjectDashboardProps {
   data: PrototypingSession;
   onUpdate: (data: PrototypingSession) => void;
   onSelectProject: (id: string) => void;
}

export function ProjectDashboard({ data, onUpdate, onSelectProject }: ProjectDashboardProps) {
   const [searchTerm, setSearchTerm] = useState("")
   const [typeFilter, setTypeFilter] = useState<PrototypeType | 'all'>('all')

   const filteredProjects = data.projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         p.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || p.type === typeFilter
      return matchesSearch && matchesType
   })

   const displayProjects = filteredProjects

   return (
      <div className="h-full overflow-y-auto bg-slate-50/50 p-8 space-y-10">
         {/* Welcome & Stats Section */}
         <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
               <Badge className="bg-indigo-600/10 text-indigo-600 border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest">Active Workspace</Badge>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Your Prototyping Hub</h2>
               <p className="text-slate-500 font-medium text-lg leading-tight">Create, manage, and scale your prototypes from concept to TRL-4.</p>
            </div>

            <div className="flex items-center gap-3">
               <div className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-4 px-6">
                  <div className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projects</p>
                     <p className="text-xl font-black text-slate-900">{data.projects.length}</p>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-100" />
                  <div className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. TRL</p>
                     <p className="text-xl font-black text-indigo-600">2.4</p>
                  </div>
               </div>

               <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all active:scale-95">
                  <Plus className="h-5 w-5 mr-2" /> New Project
               </Button>
            </div>
         </section>

         {/* Search & Filter Bar */}
         <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
               <Input
                  placeholder="Search projects by name, description or tools..."
                  className="pl-11 h-12 bg-white border-2 border-slate-100 rounded-2xl font-medium focus:ring-indigo-600 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <div className="flex items-center gap-2 bg-white border-2 border-slate-100 p-1 rounded-2xl shrink-0">
               {(['all', 'web_app', 'mobile_app', 'hardware', 'automation', 'service'] as const).map(type => (
                  <Button
                     key={type}
                     variant={typeFilter === type ? 'secondary' : 'ghost'}
                     size="sm"
                     className={cn(
                        "h-10 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest transition-all",
                        typeFilter === type ? "bg-indigo-50 text-indigo-600" : "text-slate-400"
                     )}
                     onClick={() => setTypeFilter(type)}
                  >
                     {type.replace('_', ' ')}
                  </Button>
               ))}
            </div>
         </div>

         {/* Project Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {displayProjects.length > 0 ? (
               displayProjects.map((project: any) => (
                  <Card
                     key={project.id}
                     className="group border-2 border-slate-100 rounded-[32px] overflow-hidden hover:border-indigo-500 hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white flex flex-col h-[320px]"
                     onClick={() => onSelectProject(project.id)}
                  >
                     <CardHeader className="p-8 pb-4 flex flex-row items-start justify-between">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2">
                              {project.type === 'hardware' && <Badge className="bg-orange-50 text-orange-600 border-none font-black text-[9px] uppercase tracking-widest rounded-md"><Box className="h-3 w-3 mr-1" /> Hardware</Badge>}
                              {project.type === 'mobile_app' && <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[9px] uppercase tracking-widest rounded-md"><Smartphone className="h-3 w-3 mr-1" /> Mobile</Badge>}
                              {project.type === 'web_app' && <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest rounded-md"><Globe className="h-3 w-3 mr-1" /> Web App</Badge>}
                              {project.type === 'automation' && <Badge className="bg-purple-50 text-purple-600 border-none font-black text-[9px] uppercase tracking-widest rounded-md"><Zap className="h-3 w-3 mr-1" /> Automation</Badge>}
                           </div>
                           <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{project.name}</h3>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 group-hover:text-slate-900 transition-colors">
                           <MoreVertical className="h-5 w-5" />
                        </Button>
                     </CardHeader>

                     <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between">
                        <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed">{project.description}</p>

                        <div className="space-y-6">
                           <div className="space-y-2">
                              <div className="flex justify-between items-end">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress to TRL-4</span>
                                 <span className="text-xs font-black text-indigo-600">{project.currentStatus.completionPercentage}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                 <div
                                    className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                                    style={{ width: `${project.currentStatus.completionPercentage}%` }}
                                 />
                              </div>
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                 {project.tools.map((t: any, i: number) => (
                                    <div key={i} className="h-8 w-8 rounded-lg bg-slate-900 border-2 border-white flex items-center justify-center text-[8px] font-black text-white uppercase overflow-hidden shadow-sm">
                                       {t.toolName.slice(0, 2)}
                                    </div>
                                 ))}
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-indigo-600 transition-colors">
                                 <span className="text-[10px] font-black uppercase tracking-widest">Enter Workspace</span>
                                 <ArrowUpRight className="h-4 w-4" />
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))
            ) : (
               <div className="col-span-full py-20 text-center space-y-4">
                  <div className="h-20 w-20 bg-slate-100 rounded-[32px] flex items-center justify-center mx-auto opacity-50">
                     <PlusCircle className="h-10 w-10 text-slate-400" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-xl font-black text-slate-900 uppercase">No projects found</h4>
                     <p className="text-slate-500 font-medium italic">Start your prototyping journey by creating a new project above.</p>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
