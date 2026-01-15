import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    MapPin, Mail, Phone, Globe, Briefcase, Users,
    CheckCircle, Linkedin, ArrowLeft, MessageSquare, Share2, Lightbulb
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { TimelineTab } from "@/components/stakeholders/tabs/TimelineTab"
import { WorkTab } from "@/components/stakeholders/tabs/WorkTab"
import { NetworkTab } from "@/components/stakeholders/tabs/NetworkTab"

interface StakeholderProfilePageProps {
    params: Promise<{
        id: string
    }>
}

export default async function StakeholderProfilePage({ params }: StakeholderProfilePageProps) {
    const { id } = await params

    const stakeholder = await prisma.stakeholderProfile.findUnique({
        where: { id },
        include: {
            user: true,
            sectors: true,
            problemStatements: true,
            solutions: true,
            interactions: {
                orderBy: { occurredAt: 'desc' }
            },
            supportingOrgs: {
                include: {
                    organization: true
                }
            },
            _count: {
                select: {
                    interactions: true,
                    linkedStakeholders: true
                }
            }
        }
    })

    if (!stakeholder) {
        notFound()
    }

    const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

    return (
        <div className="container py-8 space-y-8 max-w-[1200px] mx-auto">
            {/* Top Action Bar */}
            <div>
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary transition-colors" asChild>
                    <Link href="/stakeholders"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory</Link>
                </Button>
            </div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start bg-card p-8 rounded-2xl border border-border shadow-sm">
                <Avatar className="h-40 w-40 border-4 border-background shadow-xl rounded-2xl">
                    <AvatarImage src={stakeholder.user.avatar || undefined} />
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary font-black">{getInitials(stakeholder.user.name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-foreground tracking-tight">{stakeholder.user.name}</h1>
                            {stakeholder.verificationStatus === 'verified' && (
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold px-3">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Verified
                                </Badge>
                            )}
                        </div>
                        <p className="text-2xl text-primary font-bold">
                            {stakeholder.designation} <span className="text-muted-foreground font-normal">at</span> {stakeholder.organization || "District Administration"}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium bg-muted/30 p-4 rounded-xl border border-border/50">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4.5 w-4.5 text-primary" />
                            {stakeholder.district} {stakeholder.taluk && `• ${stakeholder.taluk}`}
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-4.5 w-4.5 text-primary" />
                            {stakeholder.yearsExperience || 0}+ Years Professional Experience
                        </div>
                        {stakeholder.teamSize && (
                            <div className="flex items-center gap-2">
                                <Users className="h-4.5 w-4.5 text-primary" />
                                Managing Team of {stakeholder.teamSize}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-lg shadow-lg shadow-primary/20">
                            <MessageSquare className="mr-2 h-4.5 w-4.5" />
                            Contact Stakeholder
                        </Button>
                        <Button variant="outline" className="h-11 px-6 rounded-lg font-bold border-border hover:bg-muted/50">
                            <Share2 className="mr-2 h-4.5 w-4.5" />
                            Share Profile
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-xl border border-border mb-8 max-w-md">
                    <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-sm">Overview</TabsTrigger>
                    <TabsTrigger value="work" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-sm">Solutions</TabsTrigger>
                    <TabsTrigger value="network" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-sm">Network</TabsTrigger>
                    <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-sm">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            {/* Strategic Asset | Value Proposition */}
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                                <div className="h-48 bg-primary/5 relative">
                                    <div className="absolute top-8 left-8 p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20">
                                        <Lightbulb className="h-8 w-8" />
                                    </div>
                                    <button className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-primary transition-colors">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="mb-6">
                                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Strategic Asset</h4>
                                        <h3 className="text-3xl font-black text-foreground tracking-tight">Value Proposition</h3>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <p className="text-lg text-foreground font-medium leading-relaxed">
                                            {stakeholder.bio?.split('.')[0]}. {stakeholder.user.name} bridges the gap between high-level policy and technical implementation.
                                        </p>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            Provides critical oversight for the <span className="text-primary font-bold">Local Development Initiatives</span> and facilitates cross-departmental resource allocation across the {stakeholder.district} hub.
                                        </p>
                                    </div>
                                    <div className="pt-8 mt-auto">
                                        <Link href="/strategy-map" className="text-primary font-black text-xs uppercase tracking-widest flex items-center hover:gap-2 transition-all">
                                            View Strategy Map <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Expertise */}
                            <Card className="rounded-2xl border-border overflow-hidden shadow-sm">
                                <CardHeader className="bg-muted/30 border-b border-border">
                                    <CardTitle className="text-xl font-bold">Expertise & Strategic Focus</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-8">
                                    <div>
                                        <h4 className="text-xs font-black text-foreground/50 uppercase tracking-widest mb-4">Core Domains</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {stakeholder.expertise.map((exp: any) => (
                                                <Badge key={exp} variant="secondary" className="bg-primary/5 text-primary border-primary/10 font-bold px-3 py-1">{exp}</Badge>
                                            ))}
                                            {stakeholder.expertise.length === 0 && <span className="text-sm text-muted-foreground italic">No domains listed.</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-foreground/50 uppercase tracking-widest mb-4">Active Sectors</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {stakeholder.sectors.map((s: any) => (
                                                <Badge key={s.id} variant="outline" className="border-border bg-card shadow-sm px-4 py-2 text-sm font-bold gap-2">
                                                    <span className="text-xl">{s.icon || "📌"}</span> {s.name}
                                                </Badge>
                                            ))}
                                            {stakeholder.sectors.length === 0 && <span className="text-sm text-muted-foreground italic">No sectors listed.</span>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Problems */}
                            <Card className="rounded-2xl border-border overflow-hidden shadow-sm">
                                <CardHeader className="bg-muted/30 border-b border-border">
                                    <CardTitle className="text-xl font-bold">Associated Problem Statements</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    {stakeholder.problemStatements.map((ps: any) => (
                                        <div key={ps.id} className="group p-5 rounded-xl border border-border hover:border-primary/30 transition-all bg-card hover:shadow-md">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{ps.title}</div>
                                                <Badge className={cn(
                                                    "font-black uppercase text-[10px] tracking-wider px-2 py-0.5",
                                                    ps.severity === 'Critical' ? "bg-red-500 text-white" :
                                                        ps.severity === 'High' ? "bg-orange-500 text-white" : "bg-primary text-white"
                                                )}>
                                                    {ps.severity}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{ps.description}</p>
                                        </div>
                                    ))}
                                    {stakeholder.problemStatements.length === 0 && (
                                        <div className="p-12 text-center border border-dashed border-border rounded-xl">
                                            <p className="text-muted-foreground italic text-lg">No problem statements currently mapped to this stakeholder.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                            {/* Contact Info */}
                            <Card className="rounded-2xl border-border overflow-hidden shadow-sm">
                                <CardHeader className="bg-muted/30 border-b border-border">
                                    <CardTitle className="text-xl font-bold">Contact Details</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    {stakeholder.user.email && (
                                        <div className="flex items-center gap-4 group">
                                            <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email Address</p>
                                                <div className="text-sm font-bold truncate">{stakeholder.user.email}</div>
                                            </div>
                                        </div>
                                    )}
                                    {stakeholder.officePhone && (
                                        <div className="flex items-center gap-4 group">
                                            <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Office Phone</p>
                                                <div className="text-sm font-bold">{stakeholder.officePhone}</div>
                                            </div>
                                        </div>
                                    )}
                                    {stakeholder.website && (
                                        <div className="flex items-center gap-4 group">
                                            <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <Globe className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Professional Website</p>
                                                <a href={`https://${stakeholder.website}`} target="_blank" className="text-sm font-bold text-primary hover:underline truncate block">
                                                    {stakeholder.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {stakeholder.linkedIn && (
                                        <div className="flex items-center gap-4 group">
                                            <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <Linkedin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">LinkedIn Profile</p>
                                                <a href={`https://${stakeholder.linkedIn}`} target="_blank" className="text-sm font-bold text-primary hover:underline truncate block">
                                                    Visit Profile
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Influence Score */}
                            <Card className="rounded-2xl border-border overflow-hidden shadow-sm">
                                <CardHeader className="bg-muted/30 border-b border-border">
                                    <CardTitle className="text-xl font-bold">Influence Performance</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative size-32 mb-4">
                                            <svg className="size-full" viewBox="0 0 100 100">
                                                <circle
                                                    className="text-muted/30 stroke-current"
                                                    strokeWidth="10"
                                                    fill="transparent"
                                                    r="40"
                                                    cx="50"
                                                    cy="50"
                                                />
                                                <circle
                                                    className="text-primary stroke-current"
                                                    strokeWidth="10"
                                                    strokeDasharray={2 * Math.PI * 40}
                                                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.8)}
                                                    strokeLinecap="round"
                                                    fill="transparent"
                                                    r="40"
                                                    cx="50"
                                                    cy="50"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-black text-foreground">80</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs font-black text-emerald-500 uppercase tracking-widest flex items-center justify-center gap-1">
                                                <ArrowLeft className="h-3 w-3 rotate-90" /> +12% monthly
                                            </div>
                                            <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Tier 1 Influencer</div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-muted-foreground">Network Reach</span>
                                                <span className="text-foreground">85%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-muted-foreground">Decision Authority</span>
                                                <span className="text-foreground">70%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-sky-500 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Supporting Organizations */}
                            <Card className="rounded-2xl border-border overflow-hidden shadow-sm">
                                <CardHeader className="bg-muted/30 border-b border-border">
                                    <CardTitle className="text-xl font-bold">Affiliated Organizations</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    {stakeholder.supportingOrgs.map((rel: any) => (
                                        <div key={rel.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                                            <div className="size-10 rounded-full bg-secondary flex items-center justify-center font-black text-xs uppercase text-foreground">
                                                {rel.organization.name.substring(0, 2)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold truncate text-foreground">{rel.organization.name}</div>
                                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{rel.relationshipType}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {stakeholder.supportingOrgs.length === 0 && (
                                        <p className="text-center py-4 text-muted-foreground italic text-sm">No affiliated organizations listed.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="work" className="mt-0">
                    <WorkTab stakeholder={stakeholder} />
                </TabsContent>
                <TabsContent value="network" className="mt-0">
                    <NetworkTab stakeholder={stakeholder} />
                </TabsContent>
                <TabsContent value="activity" className="mt-0">
                    <TimelineTab stakeholder={stakeholder} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
