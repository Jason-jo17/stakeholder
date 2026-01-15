"use client"

import { useResearchReport } from "@/lib/hooks/use-research"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Download, Share2, BookOpen, Quote, Target } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { format } from "date-fns"

export default function ResearchReportPage() {
    const params = useParams()
    const { data: report, isLoading } = useResearchReport(params.id as string)

    if (isLoading || !report) {
        return <div className="container py-8">Loading...</div>
    }

    return (
        <div className="container py-8 space-y-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/research"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <Badge variant="outline" className="mb-1">{report.scope}</Badge>
                        <h1 className="text-2xl font-bold">{report.title}</h1>
                        <p className="text-muted-foreground text-sm">Generated on {format(new Date(report.generatedAt), 'PPP')} by {report.generatedBy}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> PDF</Button>
                    <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Key Findings */}
                    <Card className="bg-blue-50/50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-800">
                                <Target className="h-5 w-5" />
                                Key Findings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {report.keyFindings.map((finding: string, i: number) => (
                                    <li key={i} className="flex gap-2 items-start">
                                        <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">{i + 1}</span>
                                        <span>{finding}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Full Report
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose max-w-none">
                            <p>{report.content}</p>
                            <div className="text-center p-8 text-muted-foreground italic border-2 border-dashed rounded-lg my-4">
                                (Full AI-generated content would be rendered here in markdown)
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Research Questions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Research Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                {report.questions.map((q: string, i: number) => (
                                    <li key={i}>{q}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Sources */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Sources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {report.sources.map((source: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-2 border rounded bg-muted/30">
                                        {source.type === 'PDF' ? <BookOpen className="h-4 w-4" /> : <Quote className="h-4 w-4" />}
                                        <div className="overflow-hidden">
                                            <div className="text-sm font-medium truncate">{source.title}</div>
                                            <div className="text-xs text-muted-foreground">{source.type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
