"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function StatCard({ title, value, icon: Icon, trend }: any) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{value}</div>
                {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
            </CardContent>
        </Card>
    )
}

export function StakeholderList({ stakeholders }: { stakeholders: any[] }) {
    if (!stakeholders?.length) return <div className="text-sm text-muted-foreground">No stakeholders added.</div>

    return (
        <div className="space-y-4">
            {stakeholders.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={member.user.avatar} />
                            <AvatarFallback>{member.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">{member.user.name}</p>
                            <p className="text-xs text-muted-foreground">{member.organization}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/stakeholders/${member.id}`}>
                            <MoreHorizontal className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            ))}
        </div>
    )
}

export function InteractionTimeline({ interactions }: { interactions: any[] }) {
    if (!interactions?.length) return <div className="text-sm text-muted-foreground">No recent interactions.</div>

    return (
        <div className="space-y-4">
            {interactions.map((interaction) => (
                <div key={interaction.id} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <div>
                        <p className="text-sm font-medium">{interaction.subject}</p>
                        <p className="text-xs text-muted-foreground">
                            {interaction.type} • {formatDistanceToNow(new Date(interaction.occurredAt))} ago
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ManagerCard({ manager }: { manager: any }) {
    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={manager.user.avatar} />
                <AvatarFallback>{manager.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-medium">{manager.user.name}</p>
                <p className="text-sm text-muted-foreground">{manager.role}</p>
                <Button variant="link" className="p-0 h-auto text-xs">Message</Button>
            </div>
        </div>
    )
}

export function UpcomingTasksList() {
    return (
        <div className="space-y-3">
            {[
                { id: 1, title: "Update Value Proposition", due: "Today" },
                { id: 2, title: "Follow up with Rajesh", due: "Tomorrow" }
            ].map(task => (
                <div key={task.id} className="flex items-center gap-3 border p-2 rounded">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                    </div>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">Add Task</Button>
        </div>
    )
}
