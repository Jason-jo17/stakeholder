import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { MoreVertical, Download, Filter, ChevronRight, ChevronLeft, Search, UserPlus, LayoutGrid, List, Map as MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { StakeholderTableView } from "@/components/stakeholders/StakeholderTableView"
import StakeholderMapWrapper from "@/components/stakeholders/StakeholderMapWrapper"

const FALLBACK_COORDINATES: Record<string, { lat: number, lng: number }> = {
    "st_1": { lat: 12.9141, lng: 74.8560 },
    "st_2": { lat: 13.9299, lng: 75.5681 },
    "st_3": { lat: 12.8700, lng: 74.8800 },
    "st_4": { lat: 12.9716, lng: 77.5946 },
    "st_5": { lat: 12.9800, lng: 77.6000 },
    "st_6": { lat: 12.8900, lng: 74.8400 },
    "st_7": { lat: 13.0033, lng: 76.1004 },
    "st_8": { lat: 13.0100, lng: 76.0900 },
    "st_9": { lat: 12.3051, lng: 76.6551 },
    "st_10": { lat: 12.3115, lng: 76.6651 },
    "st_11": { lat: 12.3000, lng: 76.6400 },
    "st_12": { lat: 12.3080, lng: 76.6480 },
}

interface StakeholdersPageProps {
    searchParams: Promise<{
        q?: string;
        sector?: string;
        region?: string;
        problem?: string;
        impact?: string;

        view?: 'list' | 'grid' | 'map';
        sort?: string;
    }>
}

export default async function StakeholdersPage({ searchParams }: StakeholdersPageProps) {
    const params = await searchParams
    const q = params.q
    const sectorId = params.sector
    const region = params.region
    const problemId = params.problem

    const view = params.view || 'list'
    const sort = params.sort || 'newest'

    let sectors = [];
    let allProblemStatements = [];
    let districts = [];
    let stakeholders = [];
    let mappedStakeholders = [];
    let sortedStakeholders = [];

    try {
        // Fetch filter options
        sectors = await prisma.sector.findMany({
            orderBy: { name: 'asc' }
        })

        allProblemStatements = await prisma.problemStatement.findMany({
            orderBy: { code: 'asc' }
        })

        districts = await prisma.stakeholderProfile.findMany({
            select: { district: true },
            distinct: ['district'],
            orderBy: { district: 'asc' }
        })

        stakeholders = await prisma.stakeholderProfile.findMany({
            where: {
                AND: [
                    q ? {
                        OR: [
                            { user: { name: { contains: q, mode: 'insensitive' } } },
                            { organization: { contains: q, mode: 'insensitive' } },
                            { designation: { contains: q, mode: 'insensitive' } },
                            { problemStatements: { some: { title: { contains: q, mode: 'insensitive' } } } },
                            { problemStatements: { some: { code: { contains: q, mode: 'insensitive' } } } },
                        ]
                    } : {},
                    sectorId && sectorId !== 'all' ? {
                        sectors: { some: { id: sectorId } }
                    } : {},
                    region && region !== 'all' ? {
                        district: region
                    } : {},
                    problemId && problemId !== 'all' ? {
                        problemStatements: { some: { id: problemId } }
                    } : {},
                ]
            },
            include: {
                user: true,
                sectors: true,
                problemStatements: true,
                solutions: true,
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
            },
            orderBy: {
                id: 'asc'
            },
            take: 300 // increased limit to allow for sorting
        })

        // In-memory sorting
        if (sort === 'problems_desc') {
            stakeholders.sort((a: any, b: any) => (b.problemStatements?.length || 0) - (a.problemStatements?.length || 0));
        } else if (sort === 'solutions_desc') {
            stakeholders.sort((a: any, b: any) => (b.solutions?.length || 0) - (a.solutions?.length || 0));
        } else if (sort === 'resources_desc') {
            stakeholders.sort((a: any, b: any) => (b.supportingOrgs?.length || 0) - (a.supportingOrgs?.length || 0));
        }
        // Default is 'newest' which is handled by Prisma orderBy

        // Custom sorting: Move "Darshan H V" to the bottom
        sortedStakeholders = [...stakeholders].sort((a: any, b: any) => {
            if (a.user.name === "Darshan H V") return 1;
            if (b.user.name === "Darshan H V") return -1;
            return 0;
        });

        // Map to StakeholderProfile interface (ensure compatibility)
        mappedStakeholders = sortedStakeholders.map((s: any) => {
            const fallback = FALLBACK_COORDINATES[s.id];
            return {
                ...s,
                lastContacted: s.lastInteraction || null,
                verificationStatus: s.verificationStatus as "pending" | "verified" | "rejected",
                latitude: s.latitude || fallback?.lat || null,
                longitude: s.longitude || fallback?.lng || null
            };
        });

    } catch (error) {
        console.error("Failed to fetch stakeholders:", error);
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 m-4">
                <h3 className="text-lg font-bold">Error Loading Data</h3>
                <p className="text-sm">Could not fetch stakeholders. Please check database connection.</p>
                <div className="mt-2 text-xs opacity-70 font-mono p-2 bg-black/5 rounded">
                    {String(error)}
                </div>
            </div>
        )
    }

    return (
        <main className="flex flex-col flex-1 px-4 md:px-10 py-6 max-w-[1440px] mx-auto w-full">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 py-2 mb-2">
                <Link href="/" className="text-muted-foreground text-sm font-medium leading-normal hover:text-primary transition-colors">Home</Link>
                <span className="text-muted-foreground/50 text-sm font-medium leading-normal">/</span>
                <span className="text-foreground text-sm font-medium leading-normal">Stakeholder Directory</span>
            </nav>

            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
                <div className="flex min-w-72 flex-col gap-2">
                    <h1 className="text-foreground text-3xl font-black leading-tight tracking-[-0.033em]">Stakeholder Directory</h1>
                    <p className="text-muted-foreground text-base font-normal leading-normal max-w-2xl">
                        Manage and explore stakeholder mappings, problem statements, and proposed solutions.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-muted/50 p-1 rounded-lg border border-border mr-2">
                        <Link
                            href={{ query: { ...params, view: 'grid' } }}
                            className={cn("p-2 rounded-md transition-all", view === 'grid' ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </Link>
                        <Link
                            href={{ query: { ...params, view: 'list' } }}
                            className={cn("p-2 rounded-md transition-all", view === 'list' ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
                        >
                            <List className="w-4 h-4" />
                        </Link>
                        <Link
                            href={{ query: { ...params, view: 'map' } }}
                            className={cn("p-2 rounded-md transition-all", view === 'map' ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
                        >
                            <MapIcon className="w-4 h-4" />
                        </Link>
                    </div>
                    <Button variant="outline" className="h-10 gap-2 font-bold shadow-sm">
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="lg:w-72 shrink-0 space-y-6">
                    <form className="bg-card rounded-xl border border-border p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Search & Filters</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    name="q"
                                    defaultValue={q}
                                    placeholder="Search keywords..."
                                    className="w-full bg-muted/30 border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Sector</label>
                                <select
                                    name="sector"
                                    defaultValue={sectorId || 'all'}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="all">All Sectors</option>
                                    {sectors.map((s: any) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Problem Statement</label>
                                <select
                                    name="problem"
                                    defaultValue={problemId || 'all'}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="all">All Problem Statements</option>
                                    {allProblemStatements.map((ps: any) => (
                                        <option key={ps.id} value={ps.id}>{ps.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Region / District</label>
                                <select
                                    name="region"
                                    defaultValue={region || 'all'}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="all">Global Coverage</option>
                                    {districts.map((d: any) => (
                                        <option key={d.district} value={d.district}>{d.district}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Sort By</label>
                            <select
                                name="sort"
                                defaultValue={sort || 'newest'}
                                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="newest">Newest Added</option>
                                <option value="problems_desc">Most Context (Problems)</option>
                                <option value="solutions_desc">Most Solutions</option>
                                <option value="resources_desc">Most Resources</option>
                            </select>
                        </div>

                        <input type="hidden" name="view" value={view} />
                        <div className="flex flex-col gap-2 mt-6">
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-lg shadow-lg shadow-primary/20">
                                Apply Filters
                            </Button>
                            <Button asChild variant="ghost" className="w-full font-bold h-11 rounded-lg border border-transparent hover:border-border">
                                <Link href="/stakeholders">Clear All</Link>
                            </Button>
                        </div>
                    </form>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {view === 'list' && (
                        <StakeholderTableView stakeholders={mappedStakeholders} />
                    )}

                    {view === 'grid' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {sortedStakeholders.map((s: any) => (
                                <div key={s.id} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all p-6 flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl shrink-0">
                                            {s.user.name.split(' ').map((n: any) => n[0]).join('')}
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-8 -mt-2 -mr-2">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div>
                                        <Link href={`/stakeholders/${s.id}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors hover:underline">
                                            {s.user.name}
                                        </Link>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <p className="text-primary text-xs font-bold uppercase tracking-wider">{s.designation}</p>
                                            {s.sectors.slice(0, 1).map((sec: any) => (
                                                <Badge key={sec.id} variant="outline" className="text-[9px] font-black uppercase py-0 h-4 bg-muted/30 border-primary/20 text-primary/70">
                                                    {sec.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 min-h-[1.5rem]">
                                        {s.problemStatements.slice(0, 3).map((ps: any) => (
                                            <span
                                                key={ps.id}
                                                title={ps.title}
                                                className={cn(
                                                    "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight cursor-help",
                                                    ps.code.includes('PS_1') ? "bg-red-500/10 text-red-600 border border-red-500/20" :
                                                        ps.code.includes('PS_2') ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                                                            ps.code.includes('PS_3') ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                                                                "bg-primary/10 text-primary border border-primary/20"
                                                )}
                                            >
                                                {ps.code}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {s.bio || `${s.designation} at ${s.organization || 'District Administration'}.`}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                                        <div className="flex -space-x-2">
                                            {s.supportingOrgs.slice(0, 3).map((rel: any) => (
                                                <div key={rel.id} className="size-7 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-[8px] font-bold uppercase">
                                                    {rel.organization.name.substring(0, 2)}
                                                </div>
                                            ))}
                                        </div>
                                        <Link href={`/stakeholders/${s.id}`} className="text-primary text-xs font-bold flex items-center hover:underline">
                                            Details <ChevronRight className="w-3 h-3 ml-0.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'map' && (
                        <StakeholderMapWrapper stakeholders={mappedStakeholders} />
                    )}
                </div>
            </div>
        </main >
    )
}
