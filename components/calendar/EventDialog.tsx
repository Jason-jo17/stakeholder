import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { addHours } from "date-fns"
import { StakeholderCombobox } from "@/components/ui/stakeholder-combobox"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { TagInput } from "@/components/ui/tag-input"
import { ReminderSelector } from "@/components/ui/reminder-selector"
import { useStakeholders } from "@/lib/hooks/use-calendar"

// Zod Schema
const calendarEventSchema = z.object({
    type: z.string(),
    title: z.string().min(1, "Title is required"),
    stakeholderId: z.string().optional(),
    startTime: z.date(),
    endTime: z.date(),
    locationType: z.enum(["In-person", "Virtual", "Phone"]),
    venue: z.string().optional(),
    virtualLink: z.string().optional(),
    interviewGuide: z.array(z.string()).optional(),
    objectives: z.array(z.string()).optional(),
    description: z.string().optional(),
    reminders: z.string().optional(),
})

type CalendarEventInput = z.infer<typeof calendarEventSchema>

interface EventDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    event?: any
    initialDate?: Date | null
}

export function EventDialog({ open, onOpenChange, event, initialDate }: EventDialogProps) {
    const form = useForm<CalendarEventInput>({
        resolver: zodResolver(calendarEventSchema),
        defaultValues: event || {
            title: '',
            type: 'Interview',
            startTime: initialDate || new Date(),
            endTime: addHours(initialDate || new Date(), 1),
            locationType: 'In-person'
        }
    })

    const { data: stakeholders } = useStakeholders()

    const onSubmit = (data: CalendarEventInput) => {
        console.log("Submitting event:", data)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {event ? 'Edit Event' : 'Schedule Interview'}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Event Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Interview">Interview</SelectItem>
                                            <SelectItem value="Meeting">Meeting</SelectItem>
                                            <SelectItem value="Workshop">Workshop</SelectItem>
                                            <SelectItem value="Follow-up">Follow-up</SelectItem>
                                            <SelectItem value="Site Visit">Site Visit</SelectItem>
                                            <SelectItem value="Focus Group">Focus Group</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {/* Title */}
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

                        {/* Stakeholder Selection */}
                        <FormField
                            control={form.control}
                            name="stakeholderId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stakeholder</FormLabel>
                                    <StakeholderCombobox
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={(stakeholders || []).map((s: any) => ({
                                            value: s.id || (s as any).userId, // Handle potential ID mismatch
                                            label: s.user?.name || s.name || "Unknown",
                                            role: s.designation || s.role
                                        }))}
                                    />
                                </FormItem>
                            )}
                        />

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date & Time</FormLabel>
                                        <DateTimePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date & Time</FormLabel>
                                        <DateTimePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Location Type */}
                        <FormField
                            control={form.control}
                            name="locationType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location Type</FormLabel>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="In-person" id="in-person" />
                                            <Label htmlFor="in-person">In-person</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Virtual" id="virtual" />
                                            <Label htmlFor="virtual">Virtual</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Phone" id="phone" />
                                            <Label htmlFor="phone">Phone</Label>
                                        </div>
                                    </RadioGroup>
                                </FormItem>
                            )}
                        />

                        {/* Conditional Location Fields */}
                        {form.watch('locationType') === 'In-person' && (
                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Venue</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter the physical address..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}

                        {form.watch('locationType') === 'Virtual' && (
                            <FormField
                                control={form.control}
                                name="virtualLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meeting Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Zoom/Google Meet link..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Interview Guide */}
                        {form.watch('type') === 'Interview' && (
                            <FormField
                                control={form.control}
                                name="interviewGuide"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Interview Questions</FormLabel>
                                        <TagInput
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            placeholder="Add interview questions..."
                                        />
                                        <FormDescription>
                                            Prepare key questions to ask during the interview
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Objectives */}
                        <FormField
                            control={form.control}
                            name="objectives"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meeting Objectives</FormLabel>
                                    <TagInput
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        placeholder="What do you want to achieve..."
                                    />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Additional details..."
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Reminders */}
                        <FormField
                            control={form.control}
                            name="reminders"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reminders</FormLabel>
                                    <ReminderSelector
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {event ? 'Update Event' : 'Schedule Interview'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
