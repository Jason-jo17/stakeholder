"use client"

import { useResearchReports } from "@/lib/hooks/use-research"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Plus, ArrowRight, FileText, Loader2, Calendar } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function ResearchPage() {
    const { data: reports } = useResearchReports()

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Research Reports</h1>
                    <p className="text-muted-foreground mt-2">AI-synthesized insights from stakeholder data</p>
                </div>
                <Button asChild>
                    <Link href="/research/generate">
                        <Plus className="mr-2 h-4 w-4" />
                        Generate New Report
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports?.map((report: any) => (
                    <Card key={report.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="leading-tight">{report.title}</CardTitle>
                                    <CardDescription>{report.scope}</CardDescription>
                                </div>
                                <Badge variant={report.status === 'Completed' ? 'default' : 'secondary'} className={report.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}>
                                    {report.status === 'Processing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                                    {report.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {format(new Date(report.generatedAt), 'PPP')}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {report.sectors.map((s: any) => (
                                        <Badge key={s.id} variant="outline" className="text-xs">{s.name}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" disabled={report.status !== 'Completed'} asChild={report.status === 'Completed'}>
                                {report.status === 'Completed' ? (
                                    <Link href={`/research/${report.id}`}>
                                        View Findings <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                ) : (
                                    <span>Processing...</span>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
