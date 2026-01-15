"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface InteractionDialogProps {
    stakeholderId: string
    stakeholderName: string
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function InteractionDialog({
    stakeholderId,
    stakeholderName,
    trigger,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange
}: InteractionDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const onOpenChange = isControlled ? controlledOnOpenChange : setInternalOpen

    const [formData, setFormData] = useState({
        type: "Meeting",
        subject: "",
        notes: "",
        outcome: ""
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await fetch('/api/interactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stakeholderId,
                    ...data,
                    occurredAt: new Date().toISOString() // Assuming 'now' for simplicity
                }),
            })
            if (!res.ok) throw new Error('Failed to log interaction')
            return res.json()
        },
        onSuccess: () => {
            toast.success("Interaction logged successfully")
            onOpenChange?.(false)
            setFormData({ type: "Meeting", subject: "", notes: "", outcome: "" })
            queryClient.invalidateQueries({ queryKey: ['stakeholder', stakeholderId] })
            queryClient.invalidateQueries({ queryKey: ['timeline', stakeholderId] })
        },
        onError: () => {
            toast.error("Failed to log interaction")
        }
    })

    const handleSubmit = () => {
        if (!formData.subject) {
            toast.error("Subject is required")
            return
        }
        mutation.mutate(formData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Log Interaction</DialogTitle>
                    <DialogDescription>
                        Record a new interaction with {stakeholderName}. AI will summarize this later.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select
                            value={formData.type}
                            onValueChange={(val) => setFormData({ ...formData, type: val })}
                        >
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Meeting">Meeting</SelectItem>
                                <SelectItem value="Call">Call</SelectItem>
                                <SelectItem value="Email">Email</SelectItem>
                                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                                <SelectItem value="Event">Event</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                            Subject
                        </Label>
                        <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="col-span-3"
                            placeholder="Brief topic..."
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="notes" className="text-right pt-2">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="col-span-3 min-h-[100px]"
                            placeholder="Details about the interaction..."
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="outcome" className="text-right pt-2">
                            Outcome
                        </Label>
                        <Textarea
                            id="outcome"
                            value={formData.outcome}
                            onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                            className="col-span-3"
                            placeholder="Result or next steps..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange?.(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={mutation.isPending}>
                        {mutation.isPending ? "Logging..." : "Save Interaction"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
