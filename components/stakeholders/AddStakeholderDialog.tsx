"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, UserPlus } from "lucide-react"
import { useState } from "react"

interface AddStakeholderDialogProps {
    mode: 'admin' | 'student'
    trigger?: React.ReactNode
}

export function AddStakeholderDialog({ mode, trigger }: AddStakeholderDialogProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        role: "",
        notes: ""
    })

    const handleSubmit = () => {
        // Simulate API call
        if (mode === 'admin') {
            console.log("Admin creating verified stakeholder:", formData)
            // Call API to create verified
        } else {
            console.log("Student proposing stakeholder:", formData)
            // Call API to create proposal
        }
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button variant={mode === 'admin' ? "default" : "outline"}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        {mode === 'admin' ? "Add Verified Stakeholder" : "Propose Stakeholder"}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === 'admin' ? "Add New Stakeholder" : "Propose New Stakeholder"}</DialogTitle>
                    <DialogDescription>
                        {mode === 'admin'
                            ? "Add a verified stakeholder directly to the directory."
                            : "Submit a stakeholder for verification by the admin team."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                placeholder="Dr. Name Surname"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                placeholder="email@org.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Organization</Label>
                        <Input
                            placeholder="Organization Name"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Role / Designation</Label>
                        <Input
                            placeholder="e.g. Director, Field Officer"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>

                    {mode === 'student' && (
                        <div className="space-y-2">
                            <Label>Context / Notes</Label>
                            <Input
                                placeholder="How did you meet? Why verify them?"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>
                    )}

                    <Button className="w-full" onClick={handleSubmit}>
                        {mode === 'admin' ? "Create Stakeholder" : "Submit Proposal"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
