import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ArrowLeft, MoreVertical, Download, Share2, Edit, Trash2, Sparkles, Search, Highlighter, Brain, AlertCircle, Lightbulb, Calendar, User, FileText } from "lucide-react"
import { format } from "date-fns"
import { getTranscript } from "@/lib/hooks/use-transcripts"

// Helper for sentiment badge (Dummy implementation for now)
function SentimentBadge({ sentiment }: { sentiment: any }) {
    return <Badge variant="outline">{sentiment}</Badge>
}

// Helper for TranscriptText
function TranscriptText({ text, annotations }: any) {
    return <div className="whitespace-pre-wrap">{text}</div>
}

export default async function TranscriptViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const transcript = await getTranscript(id)

    return (
        <div className="container py-8">
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/transcripts">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Transcripts
                </Link>
            </Button>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{transcript.title}</h1>
                        <p className="text-muted-foreground mt-2">
                            {format(new Date(transcript.recordedDate), 'PPP')} • {transcript.transcriptType}
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Metadata
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Content */}
                <div className="col-span-8 space-y-6">
                    {/* AI Summary */}
                    {transcript.summary && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-yellow-500" />
                                    AI Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed">{transcript.summary}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Key Quotes */}
                    {transcript.keyQuotes.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Key Quotes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {transcript.keyQuotes.map((quote: string, index: number) => (
                                    <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-sm">
                                        "{quote}"
                                    </blockquote>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Full Transcript */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Full Transcript</CardTitle>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Search className="h-4 w-4 mr-2" />
                                    Find in Text
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Highlighter className="h-4 w-4 mr-2" />
                                    Highlight
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none">
                                <TranscriptText
                                    text={transcript.rawText}
                                    annotations={transcript.annotations}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-6">
                    {/* Metadata */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {transcript.stakeholder && (
                                <div>
                                    <div className="text-sm font-medium mb-1">Stakeholder</div>
                                    <Link
                                        href={`/stakeholders/${transcript.stakeholderId}`}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        {transcript.stakeholder.user.name}
                                    </Link>
                                </div>
                            )}

                            <div>
                                <div className="text-sm font-medium mb-1">Interviewer(s)</div>
                                <div className="text-sm text-muted-foreground">
                                    {transcript.interviewer.join(', ')}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-medium mb-1">Date</div>
                                <div className="text-sm text-muted-foreground">
                                    {format(new Date(transcript.recordedDate), 'PPP')}
                                </div>
                            </div>

                            {transcript.language && (
                                <div>
                                    <div className="text-sm font-medium mb-1">Language</div>
                                    <div className="text-sm text-muted-foreground">
                                        {transcript.language}
                                    </div>
                                </div>
                            )}

                            {transcript.qualityScore && (
                                <div>
                                    <div className="text-sm font-medium mb-1">Quality Score</div>
                                    <div className="flex items-center gap-2">
                                        <Progress value={transcript.qualityScore} className="flex-1" />
                                        <span className="text-sm">{transcript.qualityScore}%</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* AI Insights */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                AI Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Themes */}
                            {transcript.themes.length > 0 && (
                                <div>
                                    <div className="text-sm font-medium mb-2">Themes Identified</div>
                                    <div className="flex flex-wrap gap-2">
                                        {transcript.themes.map((theme: string) => (
                                            <Badge key={theme} variant="secondary">
                                                {theme}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Problems Identified */}
                            {transcript.problemsIdentified.length > 0 && (
                                <div>
                                    <div className="text-sm font-medium mb-2">Problems Identified</div>
                                    <ul className="space-y-2">
                                        {transcript.problemsIdentified.map((problem: string, idx: number) => (
                                            <li key={idx} className="text-sm flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                                <span>{problem}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Solutions Discussed */}
                            {transcript.solutionsDiscussed.length > 0 && (
                                <div>
                                    <div className="text-sm font-medium mb-2">Solutions Discussed</div>
                                    <ul className="space-y-2">
                                        {transcript.solutionsDiscussed.map((solution: string, idx: number) => (
                                            <li key={idx} className="text-sm flex items-start gap-2">
                                                <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                <span>{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Sentiment */}
                            {transcript.sentimentAnalysis && (
                                <div>
                                    <div className="text-sm font-medium mb-2">Overall Sentiment</div>
                                    <SentimentBadge sentiment={transcript.sentimentAnalysis} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Linked Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Related Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {transcript.calendarEvent && (
                                <Link
                                    href={`/calendar?event=${transcript.eventId}`}
                                    className="flex items-center gap-2 text-sm p-2 hover:bg-accent rounded-lg transition-colors"
                                >
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Linked Calendar Event</span>
                                </Link>
                            )}

                            <Link
                                href={`/stakeholders/${transcript.stakeholderId}`}
                                className="flex items-center gap-2 text-sm p-2 hover:bg-accent rounded-lg transition-colors"
                            >
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>Stakeholder Profile</span>
                            </Link>

                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                Create Interaction Log
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
