"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useStakeholders } from "@/lib/hooks/use-stakeholders"
import { useSolutions } from "@/lib/hooks/use-solutions"
import { useState } from "react"

export function RecordValueDialog() {
    const { data: stakeholdersData } = useStakeholders()
    const { data: solutions } = useSolutions()
    const stakeholders = stakeholdersData?.stakeholders || []

    const [form, setForm] = useState({
        stakeholderId: "",
        solutionId: "",
        feedback: "",
        sentiment: "positive"
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Record Perception
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Record Stakeholder Feedback</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Stakeholder</Label>
                        <Select onValueChange={(v) => setForm({ ...form, stakeholderId: v })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Stakeholder" />
                            </SelectTrigger>
                            <SelectContent>
                                {stakeholders?.map((s: any) => (
                                    <SelectItem key={s.id} value={s.id}>{s.user.name} ({s.organization})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Solution / Value Proposition</Label>
                        <Select onValueChange={(v) => setForm({ ...form, solutionId: v })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Solution" />
                            </SelectTrigger>
                            <SelectContent>
                                {solutions?.map((s: any) => (
                                    <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Feedback / Perceived Value</Label>
                        <Textarea
                            placeholder="What value did they perceive? e.g. 'Saved 20% on labor costs'"
                            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                        />
                    </div>

                    <Button className="w-full" onClick={() => console.log("Saved feedback:", form)}>
                        Save Feedback
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
