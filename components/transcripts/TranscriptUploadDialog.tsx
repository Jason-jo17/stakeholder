"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Need to ensure Alert exists
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Mic, Type } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Uppy from "@uppy/core"
import AwsS3 from "@uppy/aws-s3"
// import { Dashboard, useUppy } from "@uppy/react"
import '@uppy/core/css/style.css'
import '@uppy/dashboard/css/style.css'

import { StakeholderCombobox } from "@/components/ui/stakeholder-combobox"
import { CalendarEventSelect } from "@/components/ui/calendar-event-select"
import { DatePicker } from "@/components/ui/date-picker"
import { TagInput } from "@/components/ui/tag-input"

export function TranscriptUploadDialog({ open, onOpenChange }: any) {
    const [uploadMethod, setUploadMethod] = useState<'file' | 'text' | 'audio'>('file')
    const form = useForm()

    /* const uppy = useUppy(() => {
        return new Uppy({
            restrictions: {
                maxFileSize: 50 * 1024 * 1024, // 50MB
                allowedFileTypes: ['.pdf', '.docx', '.txt', '.mp3', '.m4a', '.wav']
            }
        })
        // .use(AwsS3, { companionUrl: '/api/upload' }) // Commented out until AWS configured
    }) */
    const uppy = null as any;

    const onSubmit = (data: any) => {
        console.log("Submitting transcript:", data)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload Interview Transcript</DialogTitle>
                </DialogHeader>

                <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as any)}>
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="file">
                            <FileText className="h-4 w-4 mr-2" />
                            Document
                        </TabsTrigger>
                        <TabsTrigger value="audio">
                            <Mic className="h-4 w-4 mr-2" />
                            Audio
                        </TabsTrigger>
                        <TabsTrigger value="text">
                            <Type className="h-4 w-4 mr-2" />
                            Text
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="file" className="space-y-4">
                        <div className="bg-muted p-4 rounded text-sm">
                            Upload PDF, Word, or text documents. We'll automatically extract and process the content.
                        </div>

                        {/* <Dashboard
                            uppy={uppy}
                            plugins={['Webcam']}
                            height={300}
                            width="100%"
                        /> */}
                        <div className="border-2 border-dashed border-border rounded-lg h-[300px] flex items-center justify-center text-muted-foreground">
                            Uppy Dashboard Placeholder (Build Fix)
                        </div>
                    </TabsContent>

                    <TabsContent value="audio" className="space-y-4">
                        <div className="bg-muted p-4 rounded text-sm">
                            Upload audio recordings (MP3, M4A, WAV). We'll transcribe them using AI.
                        </div>

                        {/* <Dashboard
                            uppy={uppy}
                            plugins={['Audio']}
                            height={300}
                            width="100%"
                        /> */}
                    </TabsContent>

                    <TabsContent value="text" className="space-y-4">
                        <FormField
                            control={form.control}
                            name="rawText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Paste Transcript Text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Paste the interview transcript here..."
                                            rows={15}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        {/* Basic Info */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Interview with..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            {/* Stakeholder */}
                            <FormField
                                control={form.control}
                                name="stakeholderId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stakeholder</FormLabel>
                                        <StakeholderCombobox
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />

                            {/* Calendar Event */}
                            <FormField
                                control={form.control}
                                name="eventId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link to Calendar Event (Optional)</FormLabel>
                                        <CalendarEventSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Recording Date */}
                        <FormField
                            control={form.control}
                            name="recordedDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recording Date</FormLabel>
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />

                        {/* Participants */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="interviewer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Interviewer(s)</FormLabel>
                                        <TagInput
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            placeholder="Add interviewer names..."
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="interviewee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Interviewee(s)</FormLabel>
                                        <TagInput
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            placeholder="Add interviewee names..."
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* AI Processing Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">AI Processing Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="auto-summary" defaultChecked />
                                    <Label htmlFor="auto-summary">
                                        Generate AI summary
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="extract-themes" defaultChecked />
                                    <Label htmlFor="extract-themes">
                                        Extract themes and topics
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="identify-problems" defaultChecked />
                                    <Label htmlFor="identify-problems">
                                        Identify problem statements
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="sentiment" />
                                    <Label htmlFor="sentiment">
                                        Sentiment analysis
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Upload & Process
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
