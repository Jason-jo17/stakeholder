"use client"

import { useMentee } from "@/hooks/use-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractionTimeline } from "@/components/student/DashboardComponents"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

import { use } from "react"

export default function MenteeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { data: mentee } = useMentee(id)

    if (!mentee) return <div className="container py-8">Loading...</div>

    return (
        <div className="container py-8">
            {/* Mentee Header */}
            <Card className="mb-6">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={mentee?.user.avatar || undefined} />
                        <AvatarFallback>{mentee?.user.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold">{mentee?.user.name}</h1>
                        <p className="text-muted-foreground">
                            {mentee?.institution} • {mentee?.program}
                        </p>
                        <div className="text-sm font-medium mt-1">Project: {mentee.projectName}</div>
                        <div className="flex justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{mentee?._count.stakeholders} Stakeholders</span>
                            <span>{mentee?._count.interactions} Interactions</span>
                            <span>{mentee?._count.valuePropositions} Value Propositions</span>
                        </div>
                    </div>

                    <Button asChild>
                        <Link href={`/manager/mentees/${id}/review`}>
                            Review Progress
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                    <TabsTrigger value="value-props">Value Props</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader><CardTitle>Project Overview</CardTitle></CardHeader>
                        <CardContent>Content for project overview...</CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="stakeholders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stakeholder Connections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mentee.stakeholders.map((s: any) => (
                                    <div key={s.id} className="p-4 border rounded flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">{s.user.name}</div>
                                            <div className="text-sm text-muted-foreground">{s.organization}</div>
                                        </div>
                                        <Button variant="outline" size="sm">View</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interactions">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Interaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <InteractionTimeline
                                interactions={mentee?.interactions}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="value-props">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mentee?.valuePropositions.map((vp: any) => (
                            <Card key={vp.id}>
                                <CardHeader>
                                    <CardTitle className="text-base">{vp.productsServices[0]}</CardTitle>
                                    <Badge className="w-fit" variant={vp.validationStatus === 'validated' ? 'default' : 'secondary'}>{vp.validationStatus}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground">Created: {new Date(vp.createdAt).toLocaleDateString()}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
