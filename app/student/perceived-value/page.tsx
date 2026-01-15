"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Minus, TrendingUp } from "lucide-react"
import { RecordValueDialog } from "@/components/student/RecordValueDialog"

export default function PerceivedValuePage() {
    // Mock Data
    const metrics = [
        { name: "Ease of Use", score: 85, trend: "up" },
        { name: "Problem Solving", score: 92, trend: "up" },
        { name: "Cost Efficiency", score: 70, trend: "stable" },
        { name: "Support Quality", score: 88, trend: "up" }
    ]

    const feedbacks = [
        { stakeholder: "Ramesh Fisheres", comment: "This solution really helps me save ice costs.", sentiment: "positive" },
        { stakeholder: "Local Panchayat", comment: "Implementation was a bit slow, but good outcome.", sentiment: "neutral" },
        { stakeholder: "Health Worker", comment: "Very intuitive interface.", sentiment: "positive" }
    ]

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Stakeholder Perceived Value</h1>
                    <p className="text-muted-foreground mt-2">
                        Analysis of how stakeholders perceive the value of your deployed solutions.
                    </p>
                </div>
                <RecordValueDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Value Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="text-5xl font-bold text-primary mb-2">84/100</div>
                        <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+5% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Key Value Drivers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {metrics.map((m, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{m.name}</span>
                                    <span className="font-medium">{m.score}%</span>
                                </div>
                                <Progress value={m.score} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-bold mb-4">Direct Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feedbacks.map((f, i) => (
                    <Card key={i}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-sm">{f.stakeholder}</span>
                                {f.sentiment === 'positive' && <ThumbsUp className="h-4 w-4 text-green-500" />}
                                {f.sentiment === 'neutral' && <Minus className="h-4 w-4 text-gray-500" />}
                                {f.sentiment === 'negative' && <ThumbsDown className="h-4 w-4 text-red-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">"{f.comment}"</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
