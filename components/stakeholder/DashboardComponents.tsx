
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function IdeaCard({ type, title, description, status, code, id, slug, proposer }: {
    type: 'problem' | 'solution',
    title: string,
    description: string,
    status: string,
    code: string,
    id: string,
    slug?: string | null,
    proposer?: { name: string | null, email: string } | null
}) {
    return (
        <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                    <Badge variant={type === 'problem' ? "destructive" : "default"} className="mb-2">
                        {type === 'problem' ? 'Problem Statement' : 'Solution'}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs">{code}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{description}</p>
                {proposer && (
                    <div className="flex items-center gap-2 mb-3 p-2 bg-muted/30 rounded-md">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                            {proposer.name?.[0]?.toUpperCase() || 'S'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">Proposed by {proposer.name || 'Student'}</p>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="text-muted-foreground uppercase tracking-wider">Status:</span>
                    <Badge variant="secondary" className="capitalize">{status}</Badge>
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full justify-between group" asChild>
                    <Link href={`/${type === 'problem' ? 'problems' : 'solutions'}/${slug || id}`}>
                        View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export function ConnectionRequestCard({ request, onAccept, onReject }: {
    request: any,
    onAccept: (id: string) => void,
    onReject: (id: string) => void
}) {
    return (
        <Card className="bg-muted/30">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {request.initiator?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold text-sm">{request.initiator?.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{request.notes || "Wants to connect with you."}</p>
                </div>
                <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onReject(request.id)}>
                        <X className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-600 hover:bg-green-100" onClick={() => onAccept(request.id)}>
                        <Check className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

import { Target, Lightbulb, Users, Zap, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
    Target,
    Lightbulb,
    Users,
    Zap
}

export function StatCard({ title, value, iconName, trend }: { title: string, value: string | number, iconName: string, trend?: string }) {
    const Icon = iconMap[iconName] || Target
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{value}</div>
                    {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
                </div>
            </CardContent>
        </Card>
    )
}
