import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { MOCK_PROJECTS } from "@/lib/data/mock-projects"
import { KnowMoreButton } from '@/components/KnowMoreButton'
import { notFound } from "next/navigation"
import { ChevronRight, Share2, FileDown, AlertCircle, TrendingUp, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SolutionPageProps {
    params: Promise<{
        id: string
    }>
}

// Force dynamic rendering to avoid caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { id } = await params

    // Check mock data first
    const mockProjectData = MOCK_PROJECTS[id as keyof typeof MOCK_PROJECTS];
    let solution: any = null;

    if (mockProjectData) {
        const p = mockProjectData.data.project;
        const ps = mockProjectData.data.problem_statement_info;
        const user = mockProjectData.data.user;
        const introStep = mockProjectData.data.steps.find((s: any) => s.title === "Introduction");
        const description = introStep?.content?.blocks?.[0]?.data?.text || p.title;

        solution = {
            id: p.id,
            title: p.title,
            code: "SOL-" + p.id.substring(0, 6).toUpperCase(),
            description: description,
            status: p.status,
            timeline: "6 Months", // Hardcoded based on typical project
            type: p.domains[0],
            budget: 500000, // Estimated
            stakeholders: [{
                organization: "District Administration",
                user: user
            }],
            approach: "Leveraging technology for real-time crowd management.",
            problemStatements: [ps],
            sectors: p.sectors.map((s: string) => ({ name: s })),
            supportingOrgs: [],
            // Add mock proposer data
            proposer: {
                name: user.name,
                email: (user as any).email || `${user.name.toLowerCase().replace(/\s+/g, '.')}@student.edu`,
                studentProfile: {
                    team: {
                        name: (mockProjectData.data as any).team?.name || "Innovation Team",
                        progress: {
                            currentTRL: (mockProjectData.data as any).team?.trl_level || 3,
                            currentStage: (mockProjectData.data as any).team?.current_stage || "ideation",
                            overallProgress: (mockProjectData.data as any).team?.overall_progress || 45
                        }
                    }
                }
            }
        };
    } else {
        solution = await prisma.solution.findFirst({
            where: {
                OR: [
                    { id: id },
                    { slug: id },
                    { code: id }
                ]
            },
            include: {
                stakeholders: {
                    include: {
                        user: true
                    }
                },
                problemStatements: true,
                sectors: true,
                supportingOrgs: true
            }
        })

        // Fetch proposer information if proposedBy exists
        if (solution?.proposedBy) {
            const proposer = await prisma.user.findUnique({
                where: { id: solution.proposedBy },
                include: {
                    studentProfile: {
                        include: {
                            team: {
                                include: {
                                    progress: {
                                        include: {
                                            toolProgress: true,
                                            stageProgress: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            if (proposer) {
                (solution as any).proposer = proposer
            }
        }
    }


    if (!solution) {
        notFound()
    }

    // Alternative solutions from the same sector or just others for now
    // If we used mock data, we might not have alternatives in DB that match, but let's keep the query
    const alternatives = await prisma.solution.findMany({
        where: {
            id: { not: id }
        },
        take: 5
    })

    return (
        <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 lg:px-10 py-8">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 mb-6">
                <Link href="/stakeholders" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Stakeholders</Link>
                <span className="text-muted-foreground/30 text-sm font-medium">/</span>
                <span className="text-muted-foreground text-sm font-medium">
                    {(solution as any).stakeholders?.[0]?.organization || "Directory"}
                </span>
                <span className="text-muted-foreground/30 text-sm font-medium">/</span>
                <span className="text-primary text-sm font-semibold truncate max-w-[200px] sm:max-w-[400px]">
                    {solution.title}
                </span>
            </nav>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">{solution.title} Review</h1>
                    <p className="text-muted-foreground text-base font-normal">Reviewing the proposed strategic solution: {solution.code}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 gap-2 font-bold shadow-sm" suppressHydrationWarning>
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                    </Button>
                    <Button className="h-10 gap-2 font-bold bg-primary text-white shadow-md hover:bg-primary/90 transition-all active:scale-95" suppressHydrationWarning>
                        <FileDown className="w-5 h-5" />
                        <span>Export PDF</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Content */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border">
                        {/* Hero Image / Header */}
                        <div className="w-full aspect-[21/9] bg-primary/10 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                                    {solution.status} Review
                                </span>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="flex justify-between items-start gap-4 mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-foreground mb-3 leading-tight">{solution.title}</h2>
                                    <div className="flex flex-wrap gap-5 text-sm">
                                        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                                            <AlertCircle className="text-blue-500 w-4.5 h-4.5" /> High Priority
                                        </span>
                                        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                                            <TrendingUp className="text-emerald-500 w-4.5 h-4.5" /> Projected Impact High
                                        </span>
                                        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                                            <Calendar className="text-primary w-4.5 h-4.5" /> {solution.timeline || "TBD"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Alignment Score</div>
                                    <div className="text-4xl font-black text-primary">94%</div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div id="executive-summary" className="scroll-mt-24">
                                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-primary rounded-full"></span>
                                        Executive Summary
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {solution.description}
                                    </p>
                                    {solution.approach && (
                                        <p className="mt-4 text-muted-foreground leading-relaxed">
                                            {solution.approach}
                                        </p>
                                    )}
                                </div>

                                {/* Student Proposer Information */}
                                {(solution as any).proposer && (
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-primary rounded-full"></span>
                                            Proposed By
                                        </h3>
                                        <div className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                                    {(solution as any).proposer.name?.[0]?.toUpperCase() || 'S'}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-base font-bold text-foreground">{(solution as any).proposer.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{(solution as any).proposer.email}</p>
                                                    {(solution as any).proposer.studentProfile?.team && (
                                                        <p className="text-xs text-primary font-medium mt-1">
                                                            Team: {(solution as any).proposer.studentProfile.team.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress Information */}
                                            {(solution as any).proposer.studentProfile?.team?.progress && (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-primary/20">
                                                    <div className="p-3 rounded-lg bg-background/50">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">TRL Level</p>
                                                        <p className="text-lg font-black text-primary">
                                                            {/* Map Stage ID to TRL. Stage 4 -> TRL 7-8 */}
                                                            {(solution as any).proposer.studentProfile.team.progress.currentStageId === 4 ? '7/9' :
                                                                (solution as any).proposer.studentProfile.team.progress.currentStageId || 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-background/50">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Current Stage</p>
                                                        <p className="text-sm font-bold text-foreground capitalize">
                                                            {(solution as any).proposer.studentProfile.team.progress.currentStageId === 4 ? 'Pilot / MVC' :
                                                                `Stage ${(solution as any).proposer.studentProfile.team.progress.currentStageId}`}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-background/50">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Overall Progress</p>
                                                        <p className="text-lg font-black text-emerald-600">
                                                            {(solution as any).proposer.studentProfile.team.progress.overallProgress || 0}%
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="p-5 rounded-xl bg-muted/30 border border-border">
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Primary Goal</p>
                                        <p className="text-base text-foreground font-bold">{solution.type}</p>
                                    </div>
                                    <div className="p-5 rounded-xl bg-muted/30 border border-border">
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Proposed Budget</p>
                                        <p className="text-base text-foreground font-bold">
                                            {solution.budget ? `₹${solution.budget.toLocaleString()}` : "To be finalized"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-8 border-t border-border">
                                    {/* Scroll to executive summary */}
                                    <div className="flex-1">
                                        <KnowMoreButton />
                                    </div>
                                    <Button variant="outline" className="flex-1 h-14 font-bold text-lg rounded-xl hover:bg-muted/30 transition-all" suppressHydrationWarning>
                                        Request Feedback
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-foreground text-xl font-black leading-tight">Alternative Solutions</h3>
                        <Link href="/solutions" className="text-primary text-sm font-bold hover:underline transition-colors">View All</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        {alternatives.map((alt: any) => (
                            <Link
                                key={alt.id}
                                href={`/solutions/${alt.id}`}
                                className="flex bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all group"
                            >
                                <div className="w-28 min-w-[7rem] bg-primary/5 flex items-center justify-center">
                                    <div className="text-primary/20 font-black text-2xl">{alt.code.split('_')[1]}</div>
                                </div>
                                <div className="p-5 flex-1">
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">{alt.title}</h4>
                                        {alt.id === id && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{alt.description}</p>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            alt.status === "active" ? "bg-emerald-500" : "bg-blue-500"
                                        )}></div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Stage: {alt.status}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
