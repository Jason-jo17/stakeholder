"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { useTranscripts } from "@/lib/hooks/use-transcripts"
import { TranscriptCard } from "@/components/transcripts/TranscriptCard"
import { TranscriptUploadDialog } from "@/components/transcripts/TranscriptUploadDialog"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export default function TranscriptsPage() {
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const { data: transcripts } = useTranscripts()

    return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-4xl font-bold">Interview Transcripts</h1>
                    <p className="text-muted-foreground mt-2">
                        Upload, manage, and analyze interview transcripts
                    </p>
                </div>

                <Button onClick={() => setUploadDialogOpen(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Transcript
                </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <Input
                            placeholder="Search transcripts..."
                            className="max-w-sm"
                        />
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="interview">Interview</SelectItem>
                                <SelectItem value="focus-group">Focus Group</SelectItem>
                                <SelectItem value="meeting">Meeting Notes</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <DateRangePicker />
                    </div>
                </CardContent>
            </Card>

            {/* Transcripts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transcripts?.map((transcript: any) => (
                    <TranscriptCard key={transcript.id} transcript={transcript} />
                ))}
            </div>

            <TranscriptUploadDialog
                open={uploadDialogOpen}
                onOpenChange={setUploadDialogOpen}
            />
        </div>
    )
}
