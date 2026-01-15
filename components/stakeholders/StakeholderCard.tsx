"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StakeholderProfile } from "@/types"
import { MapPin, Users, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface StakeholderCardProps {
    stakeholder: StakeholderProfile
    onClick: () => void
}

export function StakeholderCard({ stakeholder, onClick }: StakeholderCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <Card
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted hover:border-blue-500/20 bg-card/50 backdrop-blur-sm cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="flex flex-row items-start gap-4 pb-2 relative z-10">
                <Avatar className="h-16 w-16 border-2 border-background shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src={stakeholder.user.avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{getInitials(stakeholder.user.name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg font-bold truncate pr-2 group-hover:text-blue-600 transition-colors">
                            {stakeholder.user.name}
                        </CardTitle>
                        {stakeholder.verificationStatus === 'verified' && (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        )}
                    </div>
                    <CardDescription className="flex flex-col gap-1 mt-1">
                        <span className="truncate text-foreground/80 font-medium">{stakeholder.designation}</span>
                        <span className="truncate text-xs opacity-70">{stakeholder.organization}</span>
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pb-3 relative z-10 px-6">
                <div className="flex flex-wrap gap-2 mt-2">
                    {stakeholder.organizationType && (
                        <Badge variant="outline" className="text-xs font-normal bg-background/50 backdrop-blur">
                            {stakeholder.organizationType}
                        </Badge>
                    )}
                    <Badge variant="outline" className="text-xs font-normal bg-background/50 backdrop-blur flex items-center">
                        <MapPin className="h-3 w-3 mr-1 opacity-70" />
                        {stakeholder.district}
                    </Badge>
                </div>

                {/* Sectors */}
                <div className="flex flex-wrap gap-1.5">
                    {stakeholder.sectors.slice(0, 3).map(sector => (
                        <Badge
                            key={sector.id}
                            variant="secondary"
                            className="bg-secondary/50 hover:bg-secondary text-xs px-2 py-0.5 transition-colors"
                        >
                            {sector.name}
                        </Badge>
                    ))}
                    {stakeholder.sectors.length > 3 && (
                        <span className="text-[10px] text-muted-foreground flex items-center px-1">+{stakeholder.sectors.length - 3}</span>
                    )}
                </div>

                {/* Problems - More compact */}
                {stakeholder.problemStatements.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                        {stakeholder.problemStatements.slice(0, 2).map((ps) => (
                            <div key={ps.id} className="flex items-center text-[10px] text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-full border border-orange-200 dark:border-orange-900/50">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {ps.id}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex items-center justify-between py-3 px-6 bg-muted/30 border-t border-border/50 relative z-10">
                <div className="text-xs text-muted-foreground flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                    {stakeholder._count.interactions} Interactions
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center">
                    View Profile <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                </div>
            </CardFooter>
        </Card >
    )
}
