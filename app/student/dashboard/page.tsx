"use client"

import { useStudentProfile, useMyStakeholders, useMyValuePropositions } from "@/hooks/use-student"
import { StatCard, StakeholderList, InteractionTimeline, ManagerCard, UpcomingTasksList } from "@/components/student/DashboardComponents"
import { Users, Target, MessageSquare, AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"

export default function StudentDashboard() {
    const { data: profile } = useStudentProfile()
    const { data: stakeholders } = useMyStakeholders()
    const { data: valueProps } = useMyValuePropositions()

    // Helper to count unique problem statements (mock logic)
    const getUniqueProblemStatements = (list: any[]) => {
        // Logic to extract unique problem statements from stakeholders
        return list?.flatMap(s => s.problemStatements) || []
    }

    return (
        <div className="container py-8 space-y-8">
            {/* Welcome Section */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold">Welcome back, {profile?.user?.name}!</h1>
                    <p className="text-muted-foreground mt-2">
                        Track your stakeholder interactions and value propositions
                    </p>
                </div>
                <AddStakeholderDialog mode="student" />
            </div>

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
        </div>
    )
}
