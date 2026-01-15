"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, MessageSquare } from "lucide-react"

export function NetworkTab({ stakeholder }: { stakeholder: any }) {
    // Mock connections
    const connections = [
        { id: 1, name: "Dr. Aditi Sharma", role: "Policy Advisor", org: "District Administration", avatar: null, initial: "AS" },
        { id: 2, name: "Rajesh Gowda", role: "President", org: "Coffee Planters Association", avatar: null, initial: "RG" },
        { id: 3, name: "Priya Menon", role: "NGO Director", org: "Rural Development Trust", avatar: null, initial: "PM" },
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Professional Network</CardTitle>
                    <CardDescription>Key connections and collaborators</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {connections.map((conn) => (
                            <div key={conn.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex gap-3">
                                    <Avatar>
                                        <AvatarImage src={conn.avatar || undefined} />
                                        <AvatarFallback>{conn.initial}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{conn.name}</div>
                                        <div className="text-sm text-muted-foreground">{conn.role}</div>
                                        <div className="text-xs text-muted-foreground mt-0.5">{conn.org}</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Organization Hierarchy</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="border p-3 rounded-lg w-full max-w-xs text-center bg-muted/20">
                            <div className="font-medium text-sm">Director (IARI)</div>
                        </div>
                        <div className="h-6 w-0.5 bg-border"></div>
                        <div className="border-2 border-primary p-3 rounded-lg w-full max-w-xs text-center bg-primary/5">
                            <div className="font-bold">{stakeholder.user.name}</div>
                            <div className="text-xs text-muted-foreground">{stakeholder.designation}</div>
                        </div>
                        <div className="h-6 w-0.5 bg-border"></div>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div className="border p-2 rounded text-center text-sm">Junior Scientists</div>
                            <div className="border p-2 rounded text-center text-sm">Field Staff</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
