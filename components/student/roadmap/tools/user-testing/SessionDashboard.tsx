
"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'sonner'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import {
   Plus,
   Search,
   Calendar,
   Users,
   CheckCircle2,
   Clock,
   ArrowUpRight,
   Filter,
   MoreVertical,
   Play,
   BarChart3,
   Video,
   ArrowRight,
   Target,
   FileText
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { UserTestingState, TestingSession } from './types'

interface SessionDashboardProps {
   data: UserTestingState;
   onUpdate: (data: UserTestingState) => void;
   onSelectSession: (id: string) => void;
}

export function SessionDashboard({ data, onUpdate, onSelectSession }: SessionDashboardProps) {
   const [searchTerm, setSearchTerm] = useState("")
   const [isDialogOpen, setIsDialogOpen] = useState(false)
   const [activeTab, setActiveTab] = useState("basics")
   const [newSessionData, setNewSessionData] = useState({
      type: 'usability' as any,
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      location: 'Remote (Zoom)',
      duration: '45',
      facilitators: '',
      protoVersion: 'v1.0.0',
      researchGoal: '',
      recruitmentCriteria: '',
      discussionGuideUrl: '',
      tasks: ''
   })

   const sessions = data.sessions

   const handleCreateSession = () => {
      if (!newSessionData.facilitators) {
         toast.error("Please add at least one facilitator")
         return
      }

      const newSession: TestingSession = {
         id: `s-${Date.now()}`,
         prototypeVersionId: newSessionData.protoVersion,
         metadata: {
            date: `${newSessionData.date}T${newSessionData.time}:00Z`,
            type: newSessionData.type,
            location: newSessionData.location,
            duration: parseInt(newSessionData.duration),
            facilitators: newSessionData.facilitators.split(',').map(s => s.trim()),
            observers: [],
            researchGoal: newSessionData.researchGoal,
            recruitmentCriteria: newSessionData.recruitmentCriteria,
            discussionGuideUrl: newSessionData.discussionGuideUrl,
            tasks: newSessionData.tasks.split('\n').filter(t => t.trim() !== '')
         },
         status: 'scheduled',
         participants: [],
         insights: { criticalIssues: [], positiveFindings: [], usabilityScore: 0, npsScore: 0, keyLearnings: [], iterationPriorities: [] },
         teamId: 'team-1'
      }

      onUpdate({
         ...data,
         sessions: [newSession, ...data.sessions]
      })

      setIsDialogOpen(false)
      toast.success("New testing session scheduled!")
   }

   return (
      <div className="h-full overflow-y-auto bg-slate-50/50 p-8 space-y-10">
         {/* Stats Overview */}
         <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
               <Badge className="bg-rose-600/10 text-rose-600 border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest">Research Workspace</Badge>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">User Testing Hub</h2>
               <p className="text-slate-500 font-medium text-lg leading-tight">Validate your assumptions with real user feedback and structured analysis.</p>
            </div>

            <div className="flex items-center gap-3">
               <div className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-4 px-6">
                  <div className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sessions</p>
                     <p className="text-xl font-black text-slate-900">{sessions.length}</p>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-100" />
                  <div className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. NPS</p>
                     <p className="text-xl font-black text-rose-600">42</p>
                  </div>
               </div>

               <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="h-14 px-8 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-100 transition-all active:scale-95"
               >
                  <Plus className="h-5 w-5 mr-2" /> Schedule Test
               </Button>
            </div>
         </section>

         {/* Filters */}
         <div className="flex items-center gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <Input
                  placeholder="Search sessions, users, or insights..."
                  className="pl-11 h-12 bg-white border-2 border-slate-100 rounded-2xl font-medium focus:ring-rose-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Button variant="outline" className="h-12 w-12 rounded-2xl border-slate-100 bg-white p-0">
               <Filter className="h-4 w-4 text-slate-400" />
            </Button>
         </div>

         {/* Session Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session, i) => (
               <Card
                  key={session.id}
                  className="group border-2 border-slate-100 rounded-[32px] overflow-hidden hover:border-rose-500 hover:shadow-2xl transition-all duration-500 bg-white"
               >
                  <div className="p-8 space-y-6">
                     <div className="flex items-start justify-between">
                        <div className="space-y-1">
                           <Badge className={cn(
                              "border-none px-2.5 py-0.5 font-black text-[9px] uppercase tracking-widest rounded-lg",
                              session.status === 'live' ? "bg-rose-600 text-white animate-pulse" :
                                 (session.status === 'scheduled' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600")
                           )}>
                              {session.status}
                           </Badge>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-tight pt-1">
                              {session.metadata.type} Session
                           </h3>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-200 hover:text-slate-900 rounded-xl">
                           <MoreVertical className="h-5 w-5" />
                        </Button>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-xs text-slate-500 font-bold uppercase tracking-widest">
                           <Calendar className="h-3.5 w-3.5" />
                           {new Date(session.metadata.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-500 font-bold uppercase tracking-widest">
                           <Clock className="h-3.5 w-3.5" />
                           {session.metadata.duration} Minutes • {session.metadata.location}
                        </div>
                     </div>

                     {session.metadata.researchGoal && (
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                              <Target size={10} className="text-rose-500" /> Research Goal
                           </p>
                           <p className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed italic">
                              "{session.metadata.researchGoal}"
                           </p>
                        </div>
                     )}

                     {session.metadata.discussionGuideUrl && (
                        <Button
                           variant="outline"
                           className="w-full h-10 border-slate-100 bg-white rounded-xl text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50"
                           onClick={(e) => {
                              e.stopPropagation();
                              window.open(session.metadata.discussionGuideUrl, '_blank');
                           }}
                        >
                           <FileText className="h-3.5 w-3.5 mr-2" /> Discussion Guide
                        </Button>
                     )}

                     <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex -space-x-2">
                           {[1, 2, 3].map(n => (
                              <div key={n} className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                                 <Users size={12} className="text-slate-400" />
                              </div>
                           ))}
                        </div>

                        <Button
                           className={cn(
                              "h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                              session.status === 'completed' || session.status === 'analyzed' ?
                                 "bg-slate-900 hover:bg-black text-white" : "bg-rose-600 hover:bg-rose-700 text-white"
                           )}
                           onClick={() => {
                              if (session.status === 'scheduled') {
                                 onUpdate({ ...data, view: 'live_capture', currentSessionId: session.id })
                              } else {
                                 onSelectSession(session.id)
                              }
                           }}
                        >
                           {session.status === 'completed' || session.status === 'analyzed' ? (
                              <>View Report <BarChart3 className="h-3.5 w-3.5 ml-2" /></>
                           ) : (
                              <>Launch Session <Play className="h-3 w-3 ml-2 fill-white" /></>
                           )}
                        </Button>
                     </div>
                  </div>
               </Card>
            ))}

            <Card
               onClick={() => setIsDialogOpen(true)}
               className="border-4 border-dashed border-slate-200 rounded-[32px] bg-white/50 flex flex-col items-center justify-center p-8 text-center transition-all hover:bg-white hover:border-rose-200 cursor-pointer group h-[320px]"
            >
               <div className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-rose-50 transition-colors">
                  <Plus className="h-6 w-6 text-slate-400 group-hover:text-rose-600" />
               </div>
               <h4 className="font-black text-slate-900 uppercase tracking-tighter">Plan New Research</h4>
               <p className="text-xs text-slate-400 font-medium px-4">Identify a prototype version and schedule a testing interval.</p>
            </Card>
         </div>

         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[650px] rounded-[32px] border-none shadow-2xl p-0 overflow-hidden bg-white">
               <div className="h-2 w-full bg-rose-600" />
               <DialogHeader className="p-8 pb-4">
                  <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Research Form Builder</DialogTitle>
                  <DialogDescription className="font-medium text-slate-500">Define your testing parameters and research objectives.</DialogDescription>
               </DialogHeader>

               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="px-8 flex justify-center border-b border-slate-100 pb-2">
                     <TabsList className="bg-slate-50 rounded-xl p-1 h-12">
                        <TabsTrigger value="basics" className="rounded-lg px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">1. Session Basics</TabsTrigger>
                        <TabsTrigger value="planning" className="rounded-lg px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">2. Research Plan</TabsTrigger>
                     </TabsList>
                  </div>

                  <TabsContent value="basics" className="p-8 pt-6 space-y-6 focus-visible:outline-none">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session Type</Label>
                           <Select value={newSessionData.type} onValueChange={(v) => setNewSessionData(d => ({ ...d, type: v }))}>
                              <SelectTrigger className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold uppercase tracking-widest text-[10px]">
                                 <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-none shadow-xl">
                                 <SelectItem value="usability">Usability</SelectItem>
                                 <SelectItem value="desirability">Desirability</SelectItem>
                                 <SelectItem value="feasibility">Feasibility</SelectItem>
                                 <SelectItem value="concept">Concept</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prototype Version</Label>
                           <Input
                              value={newSessionData.protoVersion}
                              onChange={(e) => setNewSessionData(d => ({ ...d, protoVersion: e.target.value }))}
                              placeholder="e.g. v1.0.1"
                              className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</Label>
                           <Input
                              type="date"
                              value={newSessionData.date}
                              onChange={(e) => setNewSessionData(d => ({ ...d, date: e.target.value }))}
                              className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</Label>
                           <Input
                              type="time"
                              value={newSessionData.time}
                              onChange={(e) => setNewSessionData(d => ({ ...d, time: e.target.value }))}
                              className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration (Mins)</Label>
                           <Input
                              type="number"
                              value={newSessionData.duration}
                              onChange={(e) => setNewSessionData(d => ({ ...d, duration: e.target.value }))}
                              className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facilitators</Label>
                           <Input
                              value={newSessionData.facilitators}
                              onChange={(e) => setNewSessionData(d => ({ ...d, facilitators: e.target.value }))}
                              placeholder="e.g. Jason, Sarah"
                              className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location / Method</Label>
                        <Input
                           value={newSessionData.location}
                           onChange={(e) => setNewSessionData(d => ({ ...d, location: e.target.value }))}
                           placeholder="e.g. Zoom, Google Meet, In-person Lab"
                           className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                        />
                     </div>
                  </TabsContent>

                  <TabsContent value="planning" className="p-8 pt-6 space-y-6 focus-visible:outline-none">
                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Research Objective / Goal</Label>
                        <Textarea
                           value={newSessionData.researchGoal}
                           onChange={(e) => setNewSessionData(d => ({ ...d, researchGoal: e.target.value }))}
                           placeholder="What are you trying to learn?"
                           className="min-h-[80px] rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-medium px-4 py-3"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recruitment Criteria</Label>
                        <Input
                           value={newSessionData.recruitmentCriteria}
                           onChange={(e) => setNewSessionData(d => ({ ...d, recruitmentCriteria: e.target.value }))}
                           placeholder="e.g. 5 existing users, 3 non-users"
                           className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Documents (Discussion Guide / Notes Link)</Label>
                        <Input
                           value={newSessionData.discussionGuideUrl}
                           onChange={(e) => setNewSessionData(d => ({ ...d, discussionGuideUrl: e.target.value }))}
                           placeholder="Paste link to Google Doc, Notion, or PDF"
                           className="h-12 rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-bold px-4"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Key Tasks to Test (One per line)</Label>
                        <Textarea
                           value={newSessionData.tasks}
                           onChange={(e) => setNewSessionData(d => ({ ...d, tasks: e.target.value }))}
                           placeholder="1. Login&#10;2. Add sensor&#10;3. View chart"
                           className="min-h-[100px] rounded-xl border-2 border-slate-100 bg-slate-50 focus:ring-rose-600 font-medium px-4 py-3"
                        />
                     </div>
                  </TabsContent>
               </Tabs>

               <DialogFooter className="p-8 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                  <div className="flex gap-2">
                     <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-12">Cancel</Button>
                     {activeTab === 'basics' ? (
                        <Button onClick={() => setActiveTab('planning')} className="bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-12">Next: Plan <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
                     ) : (
                        <Button onClick={() => setActiveTab('basics')} className="bg-slate-100 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-12">Back</Button>
                     )}
                  </div>
                  <Button
                     onClick={handleCreateSession}
                     className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs uppercase tracking-widest h-12 px-10 shadow-xl shadow-rose-100 transition-all hover:scale-105 active:scale-95"
                  >
                     Complete Hub Setup
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   )
}
