"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StakeholderProfile } from "@/types"
import {
    CheckCircle, MapPin, Briefcase, Users, Mail, Phone, MessageSquare,
    Calendar, MoreVertical, Edit, Share2, Download
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProfileHeader({ stakeholder }: { stakeholder: StakeholderProfile }) {
    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Avatar */}
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={stakeholder.user.avatar || undefined} />
                        <AvatarFallback className="text-2xl">
                            {getInitials(stakeholder.user.name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h1 className="text-3xl font-bold">{stakeholder.user.name}</h1>
                            {stakeholder.verificationStatus === 'verified' && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Verified
                                </Badge>
                            )}
                        </div>

                        <p className="text-xl text-muted-foreground mb-4">
                            {stakeholder.designation} at {stakeholder.organization}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-6 mb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{stakeholder.district}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{stakeholder.yearsExperience} years experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{stakeholder.teamSize} team members</span>
                            </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm">
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                            </Button>
                            <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-2" />
                                Call
                            </Button>
                            {stakeholder.whatsapp && (
                                <Button size="sm" variant="outline">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    WhatsApp
                                </Button>
                            )}
                            <Button size="sm" variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule Meeting
                            </Button>
                        </div>
                    </div>

                    {/* Actions Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export Data
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}
