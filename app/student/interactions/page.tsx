"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from "date-fns"

export default function InteractionsPage() {
    // Mock Data for Interactions
    const interactions = [
        {
            id: 1,
            type: "Meeting",
            stakeholder: "Darshan H V",
            role: "Deputy Commissioner",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            subject: "Project Proposal Review",
            notes: "presented the initial value proposition. Feedback was positive regarding the crowd safety measures.",
            mood: "positive"
        },
        {
            id: 2,
            type: "Email",
            stakeholder: "CEO Zilla Panchayat",
            role: "CEO",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
            subject: "Data Request",
            notes: "Requested demographic data for the target villages.",
            mood: "neutral"
        },
        {
            id: 3,
            type: "Field Visit",
            stakeholder: "Local Farmers",
            role: "Community",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
            subject: "Problem Validation",
            notes: "Visited 3 farms to observe current irrigation practices.",
            mood: "positive"
        }
    ]

    return (
        <div className="container py-8 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interaction Log</h1>
                    <p className="text-muted-foreground mt-2">
                        Track your meetings, emails, and field visits with stakeholders.
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Log Interaction
                </Button>
            </div>

            <Card className="mb-8">
                <CardContent className="p-4 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search interactions..." className="pl-9" />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {interactions.map((interaction) => (
                    <div key={interaction.id} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                            <div className="w-px h-6 bg-border group-first:bg-transparent" />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-background ${interaction.mood === 'positive' ? 'border-green-500 text-green-500' :
                                    interaction.mood === 'neutral' ? 'border-yellow-500 text-yellow-500' : 'border-blue-500 text-blue-500'
                                }`}>
                                <Clock className="h-4 w-4" />
                            </div>
                            <div className="w-px h-full bg-border -mt-1" />
                        </div>

                        <Card className="flex-1 mb-2 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline">{interaction.type}</Badge>
                                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDistanceToNow(interaction.date)} ago
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg">{interaction.subject}</CardTitle>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-sm">{interaction.stakeholder}</div>
                                        <div className="text-xs text-muted-foreground">{interaction.role}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                                    {interaction.notes}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
