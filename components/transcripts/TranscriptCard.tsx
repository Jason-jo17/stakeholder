import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import Link from "next/link"
import { User, FileText, Clock, Eye, Sparkles } from "lucide-react"

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case 'completed': return 'default'
        case 'processing': return 'secondary'
        case 'failed': return 'destructive'
        default: return 'outline'
    }
}

export function TranscriptCard({ transcript }: { transcript: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg">{transcript.title}</CardTitle>
                        <CardDescription>
                            {format(new Date(transcript.recordedDate), 'PPP')}
                        </CardDescription>
                    </div>
                    <Badge variant={getStatusVariant(transcript.processingStatus)}>
                        {transcript.processingStatus}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Stakeholder */}
                {transcript.stakeholder && (
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{transcript.stakeholder.user.name}</span>
                    </div>
                )}

                {/* Type & Duration */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {transcript.transcriptType}
                    </div>
                    {transcript.calendarEvent && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {transcript.calendarEvent.duration}min
                        </div>
                    )}
                </div>

                {/* AI Insights */}
                {transcript.processingStatus === 'completed' && transcript.themes && (
                    <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">AI Analysis</span>
                            <Badge variant="secondary" className="text-xs">
                                {transcript.themes.length} themes
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {transcript.themes.slice(0, 3).map((theme: string) => (
                                <Badge key={theme} variant="outline" className="text-xs">
                                    {theme}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quality Score */}
                {transcript.qualityScore && (
                    <div className="flex items-center gap-2">
                        <Progress value={transcript.qualityScore} className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                            {transcript.qualityScore}%
                        </span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                >
                    <Link href={`/transcripts/${transcript.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                    </Link>
                </Button>
                {transcript.processingStatus === 'completed' && (
                    <Button size="sm" className="flex-1">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
