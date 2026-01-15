"use client"

import { useManagerProfile, useMyMentees } from "@/hooks/use-manager"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/student/DashboardComponents"
import { GraduationCap, Users, MessageSquare, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ManagerDashboard() {
    const { data: profile } = useManagerProfile()
    const { data: mentees } = useMyMentees()

    const getTotalStakeholderConnections = (list: any[]) => list?.reduce((acc, m) => acc + m._count.stakeholders, 0) || 0
    const getMonthlyInteractions = (list: any[]) => list?.reduce((acc, m) => acc + m._count.interactions, 0) || 0 // Mock total
    const getValidatedVPs = (list: any[]) => list?.reduce((acc, m) => acc + m._count.valuePropositions, 0) || 0 // Mock logic

    return (
        <div className="container py-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold">Manager Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Monitor mentee activities and stakeholder engagements
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Mentees"
                    value={mentees?.length || 0}
                    icon={GraduationCap}
                />
                <StatCard
                    title="Total Connections"
                    value={getTotalStakeholderConnections(mentees || [])}
                    icon={Users}
                />
                <StatCard
                    title="Interactions (Month)"
                    value={getMonthlyInteractions(mentees || [])}
                    icon={MessageSquare}
                />
                <StatCard
                    title="Validated VPs"
                    value={getValidatedVPs(mentees || [])}
                    icon={CheckCircle}
                />
            </div>

            {/* Mentees Grid */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Mentees</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mentees?.map(mentee => (
                            <Card key={mentee.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={mentee.user.avatar || undefined} />
                                            <AvatarFallback>{mentee.user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold">{mentee.user.name}</div>
                                            <div className="text-sm text-muted-foreground">{mentee.institution}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                                        <div className="bg-muted p-2 rounded">
                                            <div className="font-bold">{mentee._count.stakeholders}</div>
                                            <div className="text-xs text-muted-foreground">Stk.</div>
                                        </div>
                                        <div className="bg-muted p-2 rounded">
                                            <div className="font-bold">{mentee._count.interactions}</div>
                                            <div className="text-xs text-muted-foreground">Int.</div>
                                        </div>
                                        <div className="bg-muted p-2 rounded">
                                            <div className="font-bold">{mentee._count.valuePropositions}</div>
                                            <div className="text-xs text-muted-foreground">VPs</div>
                                        </div>
                                    </div>

                                    <Button className="w-full" asChild>
                                        <Link href={`/manager/mentees/${mentee.id}`}>View Progress</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
