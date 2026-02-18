"use client"

import Link from "next/link"
import { MoreVertical, ChevronRight, ChevronLeft, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { AddToProjectDialog } from "./AddToProjectDialog"
import { useState } from "react"

interface StakeholderTableViewProps {
    stakeholders: any[]
}

export function StakeholderTableView({ stakeholders }: StakeholderTableViewProps) {
    const [addingStakeholder, setAddingStakeholder] = useState<any | null>(null)
    return (
        <div className="w-full bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1100px] table-fixed">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-foreground text-xs font-bold uppercase tracking-wider text-left w-[32%]">
                                Stakeholder Identity
                            </th>
                            <th className="px-6 py-4 text-foreground text-xs font-bold uppercase tracking-wider text-center w-[18%]">
                                Problems
                            </th>
                            <th className="px-6 py-4 text-foreground text-xs font-bold uppercase tracking-wider text-left w-[30%]">
                                Proposed Solutions
                            </th>
                            <th className="px-6 py-4 text-foreground text-xs font-bold uppercase tracking-wider text-center w-[15%]">
                                Supporting Resources
                            </th>
                            <th className="px-6 py-4 w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {stakeholders.map((s: any) => (
                            <tr key={s.id} className="hover:bg-muted/20 transition-colors group">
                                <td className="px-6 py-5 align-top border-r border-border/10">
                                    <div className="flex gap-4">
                                        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden">
                                            {s.user.avatar ? (
                                                <img src={s.user.avatar} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                s.user.name.split(' ').map((n: any) => n[0]).join('')
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <Link href={`/stakeholders/${s.id}`} className="text-foreground font-bold text-base leading-tight hover:text-primary transition-colors hover:underline block truncate">
                                                {s.user.name}
                                            </Link>
                                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                                <p className="text-primary text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{s.designation}</p>
                                                {s.sectors.map((sec: any) => (
                                                    <Badge key={sec.id} variant="outline" className="text-[8px] font-black uppercase py-0.5 px-1.5 h-auto bg-muted/30 border-primary/20 text-primary/70 whitespace-nowrap">
                                                        {sec.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-muted-foreground text-xs mt-2 font-medium line-clamp-2 leading-relaxed">
                                                {s.bio || `${s.designation} at ${s.organization || 'District Administration'}.`}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top text-center border-r border-border/10">
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        {s.problemStatements.map((ps: any) => (
                                            <span
                                                key={ps.id}
                                                title={ps.title}
                                                className={cn(
                                                    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight",
                                                    ps.code.includes('PS_1') ? "bg-red-500/10 text-red-600 border border-red-500/20" :
                                                        ps.code.includes('PS_2') ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                                                            ps.code.includes('PS_3') ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                                                                "bg-primary/10 text-primary border border-primary/20"
                                                )}
                                            >
                                                {ps.title.length > 40 ? ps.title.substring(0, 40) + '...' : ps.title}
                                            </span>
                                        ))}
                                        {s.problemStatements.length === 0 && (
                                            <span className="text-muted-foreground/50 text-[10px] font-bold uppercase">No Mapped Problems</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        {s.solutions.length > 0 ? (
                                            <>
                                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                                    {s.solutions[0].description}
                                                </p>
                                                <Link
                                                    href={`/solutions/${s.solutions[0].id}`}
                                                    className="text-primary text-xs font-bold flex items-center hover:underline mt-1"
                                                >
                                                    View All Solutions ({s.solutions.length}) <ChevronRight className="w-3 h-3 ml-0.5" />
                                                </Link>
                                            </>
                                        ) : (
                                            <p className="text-muted-foreground/50 text-sm">No solutions proposed yet.</p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex -space-x-2 justify-center overflow-hidden">
                                        {s.supportingOrgs.slice(0, 3).map((rel: any, idx: number) => (
                                            <div
                                                key={rel.id}
                                                title={rel.organization.name}
                                                className="inline-block size-9 rounded-full ring-2 ring-card bg-muted overflow-hidden border border-border/20"
                                            >
                                                <div className="w-full h-full flex items-center justify-center bg-secondary text-[10px] font-bold uppercase">
                                                    {rel.organization.name.substring(0, 2)}
                                                </div>
                                            </div>
                                        ))}
                                        {s.supportingOrgs.length > 3 && (
                                            <div className="inline-block size-9 rounded-full ring-2 ring-card bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                                +{s.supportingOrgs.length - 3}
                                            </div>
                                        )}
                                        {s.supportingOrgs.length === 0 && (
                                            <div className="size-9 rounded-full border border-dashed border-border flex items-center justify-center bg-muted/20">
                                                <UserPlus className="w-4 h-4 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-muted-foreground hover:text-green-600 hover:bg-green-50"
                                            title="Add to My Project"
                                            onClick={() => setAddingStakeholder(s)}
                                            suppressHydrationWarning
                                        >
                                            <UserPlus className="w-4 h-4" />
                                        </Button>
                                        <button className="text-muted-foreground hover:text-foreground transition-colors p-1" suppressHydrationWarning>
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dialog Component */}
            {addingStakeholder && (
                <AddToProjectDialog
                    isOpen={!!addingStakeholder}
                    onOpenChange={(open) => !open && setAddingStakeholder(null)}
                    stakeholderName={addingStakeholder.user.name}
                    onConfirm={(reason) => {
                        alert(`Added ${addingStakeholder.user.name} to your project.\nReason: ${reason}`)
                        setAddingStakeholder(null)
                    }}
                />
            )}

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-muted/30 border-t border-border">
                <div className="text-sm text-muted-foreground">
                    Showing <span className="font-bold text-foreground">1-{stakeholders.length}</span> of <span className="font-bold text-foreground">{stakeholders.length}</span> stakeholders
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="size-9 rounded-lg" disabled suppressHydrationWarning>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="size-9 rounded-lg font-bold text-sm bg-primary hover:bg-primary/90 text-white border-primary transition-all" suppressHydrationWarning>1</Button>
                    <Button variant="outline" size="icon" className="size-9 rounded-lg font-medium text-sm" suppressHydrationWarning>2</Button>
                    <Button variant="outline" size="icon" className="size-9 rounded-lg font-medium text-sm" suppressHydrationWarning>3</Button>
                    <Button variant="outline" size="icon" className="size-9 rounded-lg" suppressHydrationWarning>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
