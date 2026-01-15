"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"

interface AddToProjectDialogProps {
    stakeholderName: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (reason: string) => void
}

export function AddToProjectDialog({ stakeholderName, isOpen, onOpenChange, onConfirm }: AddToProjectDialogProps) {
    const [reason, setReason] = useState("")

    const handleConfirm = () => {
        onConfirm(reason)
        setReason("")
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add {stakeholderName} to Project</DialogTitle>
                    <DialogDescription>
                        Why is this stakeholder relevant to your problem statement?
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason for Inclusion</Label>
                        <Textarea
                            id="reason"
                            placeholder="e.g., They are the primary decision maker for budget..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={!reason.trim()}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Stakeholder
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
