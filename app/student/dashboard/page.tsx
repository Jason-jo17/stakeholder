"use client"

import { useStudentProfile, useMyStakeholders, useMyValuePropositions } from "@/hooks/use-student"
import { StatCard, StakeholderList, InteractionTimeline, ManagerCard, UpcomingTasksList } from "@/components/student/DashboardComponents"
import { Users, Target, MessageSquare, AlertCircle, Plus, Map, LayoutDashboard, Rocket, ShieldCheck, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoadmapView } from "@/components/student/roadmap/RoadmapView"
import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"
import { RecommendationsList } from "@/components/student/Recommendations"
import { CofounderRecommendations } from "@/components/student/CofounderRecommendations"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LivingNotes } from "@/components/student/LivingNotes"
import { CoInnovatorBot } from "@/components/student/CoInnovatorBot"
import { useQuery } from "@tanstack/react-query"

const SECTORS = ["Energy", "Health", "Fintech", "Agritech", "Edtech", "Deeptech", "Smart Cities"]
const SOLUTIONS = ["Software/AI", "Hardware/IoT", "D2C/Service", "Deep Science", "Social Enterprise"]

export default function StudentDashboard() {
    const { data: profile } = useStudentProfile()
    const { data: stakeholders } = useMyStakeholders()
    const { data: valueProps } = useMyValuePropositions()

    // Innovator Filters
    const [selectedSector, setSelectedSector] = useState("Energy")
    const [selectedSolution, setSelectedSolution] = useState("Software/AI")

    // Fetch recommendations for tool card injection
    const { data: recommendations } = useQuery({
        queryKey: ['cofounder-recommendations', selectedSector, selectedSolution],
        queryFn: async () => {
            const params = new URLSearchParams({ sector: selectedSector, solution: selectedSolution })
            const res = await fetch(`/api/student/recommendations?${params.toString()}`)
            return res.json()
        },
    })

    const recs = recommendations?.recommendations || []
    const getRecForCategory = (cat: string) => recs.find((r: any) => r.category === cat)

    // Helper to count unique problem statements (mock logic)
    const getUniqueProblemStatements = (list: any[]) => {
        return list?.flatMap(s => s.problemStatements) || []
    }

    const [activeTab, setActiveTab] = useState("dashboard")

    return (
        <div className="container py-8 space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold">Welcome back, {profile?.user?.name}!</h1>
                    <p className="text-muted-foreground mt-2">
                        Track your stakeholder interactions and value propositions
                    </p>
                </div>
                <AddStakeholderDialog mode="student" />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
                    <TabsTrigger value="dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="roadmap" className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        Roadmap
                    </TabsTrigger>
                    <TabsTrigger value="innovator" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Inunity Innovator
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="space-y-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Stakeholders"
                            value={stakeholders?.length || 0}
                            icon={Users}
                            trend="+2 this week"
                        />
                        <StatCard
                            title="Value Propositions"
                            value={valueProps?.length || 0}
                            icon={Target}
                            trend="3 validated"
                        />
                        <StatCard
                            title="Interactions"
                            value={profile?._count?.interactions || 0}
                            icon={MessageSquare}
                            trend="Last interaction 2 days ago"
                        />
                        <StatCard
                            title="Problem Statements"
                            value={5} // Mock value
                            icon={AlertCircle}
                            trend="5 sectors covered"
                        />
                    </div>

                    {/* Quick Access Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    Value Proposition Canvas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Map your product's value to stakeholder needs, pains, and gains.
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button className="w-full" size="sm" asChild>
                                        <Link href="/student/stakeholders/st_1/value">Open Canvas</Link>
                                    </Button>
                                    <Button className="w-full" size="sm" variant="outline" asChild>
                                        <Link href="/student/stakeholders/st_1/value?tab=fishbone">Use Fishbone Tool</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-100 dark:border-green-900">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-green-600" />
                                    Stakeholder Perceived Value
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Analyze how stakeholders rate your solution's impact and usability.
                                </p>
                                <Button className="w-full" size="sm" variant="outline" asChild>
                                    <Link href="/student/perceived-value">View Insights</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* New Tool: Strategic Mapping */}
                        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-100 dark:border-amber-900">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-amber-600" />
                                    Strategic Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Map problems to stakeholders and provide evidence-based justification.
                                </p>
                                <Button className="w-full" size="sm" variant="outline" asChild>
                                    <Link href="/student/mapping">Open Mapping Tool</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Left Column */}
                        <div className="col-span-12 md:col-span-8 space-y-6">
                            {/* My Stakeholders */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>My Stakeholders</CardTitle>
                                    <div className="flex gap-2">
                                        <AddStakeholderDialog
                                            mode="student"
                                            trigger={
                                                <Button size="sm" variant="secondary">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add New
                                                </Button>
                                            }
                                        />
                                        <Button asChild size="sm">
                                            <Link href="/stakeholders">
                                                <Users className="h-4 w-4 mr-2" />
                                                Find
                                            </Link>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <StakeholderList stakeholders={stakeholders || []} />
                                </CardContent>
                            </Card>

                            {/* Recent Interactions */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Interactions</CardTitle>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href="#">View All</Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <InteractionTimeline
                                        interactions={profile?.interactions || []}
                                    />
                                </CardContent>
                            </Card>
                        </div>


                        {/* Right Column */}
                        <div className="col-span-12 md:col-span-4 space-y-6">
                            {/* Recommendations */}
                            <RecommendationsList profile={profile} />

                            {/* Manager Info */}
                            {profile?.manager && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Manager</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ManagerCard manager={profile.manager} />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Upcoming Tasks */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <UpcomingTasksList />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="roadmap">
                    <RoadmapView onViewRecommendations={() => setActiveTab("innovator")} />
                </TabsContent>

                <TabsContent value="innovator" className="space-y-6">
                    {/* Header & Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold tracking-tight">Co Innovator Workspace</h2>
                                <Button asChild size="sm" variant="outline" className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider border-primary/20 hover:bg-primary hover:text-white transition-all">
                                    <Link href="/student/cofounder">Full Dashboard</Link>
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">Tailored advice for your project path</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold uppercase text-muted-foreground pl-1">Sector</span>
                                <Select value={selectedSector} onValueChange={setSelectedSector}>
                                    <SelectTrigger className="w-[160px] h-9 text-xs bg-white">
                                        <SelectValue placeholder="Select Sector" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold uppercase text-muted-foreground pl-1">Solution Type</span>
                                <Select value={selectedSolution} onValueChange={setSelectedSolution}>
                                    <SelectTrigger className="w-[160px] h-9 text-xs bg-white">
                                        <SelectValue placeholder="Select Solution" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SOLUTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left: Tools Grid (8 cols) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'trl', title: 'TRL Tracker', icon: Rocket, color: 'text-orange-500', path: 'trl-tracker' },
                                    { id: 'roadmap', title: 'Strategic Roadmap', icon: Map, color: 'text-blue-500', path: 'roadmap' },
                                    { id: 'compliance', title: 'Compliance Hub', icon: ShieldCheck, color: 'text-emerald-500', path: 'compliance' },
                                    { id: 'experiments', title: 'Experiment Sandbox', icon: Zap, color: 'text-amber-500', path: 'experiments' },
                                    { id: 'resources', title: 'Resource Network', icon: Users, color: 'text-purple-500', path: 'resources' },
                                    { id: 'industry', title: 'Industry Connect', icon: Target, color: 'text-red-500', path: 'industry' },
                                    { id: 'api', title: 'API Directory', icon: LayoutDashboard, color: 'text-cyan-500', path: 'api-directory' }
                                ].map((tool) => {
                                    const rec = getRecForCategory(tool.id)
                                    const Icon = tool.icon
                                    return (
                                        <Card key={tool.id} className="group hover:border-primary/50 transition-all shadow-sm overflow-hidden flex flex-col">
                                            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
                                                <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                                                    <Icon className={`h-5 w-5 ${tool.color}`} />
                                                </div>
                                                <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">
                                                    {tool.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 flex-1 space-y-3">
                                                <div className="min-h-[60px] p-3 rounded-lg bg-muted/30 text-[11px] leading-relaxed border border-transparent group-hover:border-primary/10">
                                                    {rec ? (
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-1.5 font-bold text-primary">
                                                                <Zap className="h-3 w-3 fill-primary" />
                                                                NEXT STEP
                                                            </div>
                                                            <p className="text-muted-foreground">{rec.description}</p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted-foreground italic opacity-50">Fetching advice...</p>
                                                    )}
                                                </div>
                                                <Button asChild variant="ghost" size="sm" className="w-full h-8 text-xs font-semibold group-hover:bg-primary group-hover:text-white border border-transparent group-hover:border-primary">
                                                    <Link href={`/student/cofounder/${tool.path}`}>
                                                        Enter Tool <ChevronRight className="ml-1 h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right: Workspace Sidebar (4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="min-h-[300px]">
                                <CofounderRecommendations sector={selectedSector} solution={selectedSolution} />
                            </div>
                            <div className="min-h-[220px]">
                                <LivingNotes />
                            </div>
                            <div className="min-h-[320px]">
                                <CoInnovatorBot />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
