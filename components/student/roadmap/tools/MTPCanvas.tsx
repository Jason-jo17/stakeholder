"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2 } from "lucide-react"

interface MTPCanvasProps {
    tool: any
    progress: any
    onDataSaved?: () => void
}

export function MTPCanvas({ tool, progress, onDataSaved }: MTPCanvasProps) {
    const initialData = progress?.data || {
        love: "",
        goodAt: "",
        needs: "",
        paidFor: "",
        mtp: ""
    }

    const [data, setData] = useState(initialData)
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Progress saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 border p-4 rounded-lg bg-red-50/30 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
                    <Label className="text-red-600 dark:text-red-400 font-bold uppercase text-xs">What you LOVE</Label>
                    <Textarea
                        placeholder="Passion, mission..."
                        value={data.love}
                        onChange={(e) => setData({ ...data, love: e.target.value })}
                        className="min-h-[100px] bg-background"
                    />
                </div>
                <div className="space-y-2 border p-4 rounded-lg bg-blue-50/30 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                    <Label className="text-blue-600 dark:text-blue-400 font-bold uppercase text-xs">What you are GOOD AT</Label>
                    <Textarea
                        placeholder="Profession, vocation..."
                        value={data.goodAt}
                        onChange={(e) => setData({ ...data, goodAt: e.target.value })}
                        className="min-h-[100px] bg-background"
                    />
                </div>
                <div className="space-y-2 border p-4 rounded-lg bg-green-50/30 dark:bg-green-900/10 border-green-100 dark:border-green-900/30">
                    <Label className="text-green-600 dark:text-green-400 font-bold uppercase text-xs">What the world NEEDS</Label>
                    <Textarea
                        placeholder="Mission, vocation..."
                        value={data.needs}
                        onChange={(e) => setData({ ...data, needs: e.target.value })}
                        className="min-h-[100px] bg-background"
                    />
                </div>
                <div className="space-y-2 border p-4 rounded-lg bg-yellow-50/30 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30">
                    <Label className="text-yellow-600 dark:text-yellow-400 font-bold uppercase text-xs">What you can be PAID FOR</Label>
                    <Textarea
                        placeholder="Profession, work..."
                        value={data.paidFor}
                        onChange={(e) => setData({ ...data, paidFor: e.target.value })}
                        className="min-h-[100px] bg-background"
                    />
                </div>
            </div>

            <div className="space-y-2 border-2 border-primary/20 p-6 rounded-xl bg-primary/5">
                <Label className="text-primary font-bold uppercase text-sm">Your Massive Transformative Purpose (MTP)</Label>
                <p className="text-xs text-muted-foreground mb-4">
                    Synthesize the circles above into a single, compelling statement that describes your higher purpose.
                </p>
                <Textarea
                    placeholder="My purpose is to..."
                    value={data.mtp}
                    onChange={(e) => setData({ ...data, mtp: e.target.value })}
                    className="min-h-[120px] text-lg font-medium bg-background"
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Progress
                </Button>
            </div>
        </div>
    )
}
