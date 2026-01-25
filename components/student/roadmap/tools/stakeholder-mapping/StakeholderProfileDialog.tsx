
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Search, Info } from "lucide-react"
import { StakeholderCombobox } from "@/components/ui/stakeholder-combobox"
import { Stakeholder, ValueDimension } from "./types"
import { EngagementTimeline } from "./EngagementTimeline"
import { ValueGapAnalysis } from "./ValueGapAnalysis"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (s: Stakeholder | Stakeholder[]) => void
    initialData?: Stakeholder
    valueDimensions: ValueDimension[]
    existingStakeholders: Stakeholder[]
}

const DEFAULT_STAKEHOLDER: Stakeholder = {
    id: "",
    name: "",
    role: "",
    organization: "",
    category: "other",
    power: 5,
    interest: 5,
    attitude: "neutral",
    painPoints: [],
    gainOpportunities: [],
    valuedDimensions: [],
    interactions: []
}

export function StakeholderProfileDialog({ open, onOpenChange, onSave, initialData, valueDimensions, existingStakeholders }: Props) {
    const [formData, setFormData] = useState<Stakeholder>(DEFAULT_STAKEHOLDER)
    const [selectMode, setSelectMode] = useState(false)

    // Multi-select state
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")

    useEffect(() => {
        if (open) {
            setFormData(initialData ? { ...initialData } : { ...DEFAULT_STAKEHOLDER, id: crypto.randomUUID() })
            if (initialData) {
                setSelectMode(false)
            } else {
                setSelectMode(existingStakeholders.length > 0)
            }
            setSelectedIds([])
            setSearchTerm("")
        }
    }, [open, initialData, existingStakeholders.length])

    const handleSave = () => {
        if (selectMode && !initialData) {
            // Bulk add
            const selectedStakeholders = existingStakeholders
                .filter(s => selectedIds.includes(s.id))
                .map(s => ({
                    ...DEFAULT_STAKEHOLDER, // Defaults for map-specific fields
                    ...s, // Override with existing profile data
                    id: s.id // Keep same ID
                }))

            onSave(selectedStakeholders)
        } else {
            // Single add/edit
            onSave(formData)
        }
        onOpenChange(false)
    }

    // Filter stakeholders
    const uniqueRoles = Array.from(new Set(existingStakeholders.map(s => s.role || "Unknown")))
    const filteredStakeholders = existingStakeholders.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.role && s.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (s.organization && s.organization.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesRole = filterRole === "all" || s.role === filterRole
        return matchesSearch && matchesRole
    })

    const toggleSelection = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id])
        } else {
            setSelectedIds(prev => prev.filter(x => x !== id))
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Stakeholder' : 'Add Stakeholder'}</DialogTitle>
                    <DialogDescription>
                        {selectMode ? "Select from your database or switch to create new." : "Define influence, interests, and engagement strategy."}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-6 mt-2">
                    {/* LEFT COLUMN */}
                    <div className="w-full md:w-1/3 space-y-6">

                        {/* MODE TOGGLE */}
                        {!initialData && (
                            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
                                <Label className="cursor-pointer text-sm font-medium">Select Existing</Label>
                                <Switch
                                    checked={selectMode}
                                    onChange={(e) => setSelectMode(e.target.checked)}
                                />
                            </div>
                        )}

                        {selectMode && !initialData ? (
                            // BULK SELECTION UI
                            <div className="space-y-4 border rounded-lg p-4 bg-slate-50 h-[500px] flex flex-col">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search name, role..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Select value={filterRole} onValueChange={setFilterRole}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            {uniqueRoles.map(r => (
                                                <SelectItem key={r} value={r}>{r}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex-1 border rounded-md bg-white">
                                    <ScrollArea className="h-[350px]">
                                        <div className="p-2 space-y-1">
                                            {filteredStakeholders.length === 0 ? (
                                                <div className="text-center py-8 text-sm text-muted-foreground">No matches found</div>
                                            ) : (
                                                filteredStakeholders.map(s => (
                                                    <div key={s.id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded group">
                                                        <Checkbox
                                                            id={s.id}
                                                            checked={selectedIds.includes(s.id)}
                                                            onCheckedChange={(c) => toggleSelection(s.id, c as boolean)}
                                                        />
                                                        <div className="flex-1 grid gap-0.5 cursor-pointer" onClick={() => toggleSelection(s.id, !selectedIds.includes(s.id))}>
                                                            <Label htmlFor={s.id} className="cursor-pointer font-medium">{s.name}</Label>
                                                            <span className="text-xs text-muted-foreground">{s.role}</span>
                                                        </div>

                                                        <HoverCard>
                                                            <HoverCardTrigger>
                                                                <Info className="h-4 w-4 text-slate-300 hover:text-slate-500" />
                                                            </HoverCardTrigger>
                                                            <HoverCardContent align="end" className="w-64">
                                                                <div className="space-y-2">
                                                                    <h4 className="text-sm font-semibold">{s.name}</h4>
                                                                    <p className="text-xs text-muted-foreground">{s.organization}</p>
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {s.category && <Badge variant="secondary" className="text-[10px]">{s.category}</Badge>}
                                                                    </div>
                                                                    {s.contactInfo?.email && <div className="text-xs text-slate-500 pt-2 border-t mt-2">{s.contactInfo.email}</div>}
                                                                </div>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </ScrollArea>
                                </div>
                                <div className="text-xs text-right text-muted-foreground">
                                    {selectedIds.length} selected
                                </div>
                            </div>
                        ) : (
                            // SINGLE EDIT UI
                            <div className="space-y-6">
                                <div className="space-y-4 p-4 border rounded-lg bg-slate-50/50">
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <Label className="text-xs text-slate-500">Name</Label>
                                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-slate-500">Role</Label>
                                            <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-slate-500">Organization</Label>
                                            <Input value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} className="h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-slate-500">Category</Label>
                                            <Select value={formData.category} onValueChange={(v: any) => setFormData({ ...formData, category: v })}>
                                                <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="customer">Customer</SelectItem>
                                                    <SelectItem value="investor">Investor</SelectItem>
                                                    <SelectItem value="partner">Partner</SelectItem>
                                                    <SelectItem value="regulator">Regulator</SelectItem>
                                                    <SelectItem value="team">Team Member</SelectItem>
                                                    <SelectItem value="competitor">Competitor</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* MATRIX POSITIONING */}
                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h4 className="font-semibold text-sm">Matrix Position</h4>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-xs">Power ({formData.power})</Label>
                                            <Slider value={[formData.power]} min={1} max={10} step={1} onValueChange={([v]) => setFormData({ ...formData, power: v })} className="w-32" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Label className="text-xs">Interest ({formData.interest})</Label>
                                            <Slider value={[formData.interest]} min={1} max={10} step={1} onValueChange={([v]) => setFormData({ ...formData, interest: v })} className="w-32" />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Label className="text-xs mb-2 block">Attitude</Label>
                                        <div className="flex gap-1 flex-wrap">
                                            {['supporter', 'neutral', 'blocker'].map((att) => (
                                                <Badge
                                                    key={att}
                                                    variant={formData.attitude === att ? "default" : "outline"}
                                                    className="cursor-pointer capitalize text-[10px]"
                                                    onClick={() => setFormData({ ...formData, attitude: att as any })}
                                                >
                                                    {att}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: DEEP DIVE TABS - Only show if NOT in bulk select mode */}
                    <div className="w-full md:w-2/3">
                        {selectMode && !initialData ? (
                            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg bg-slate-50 text-slate-400">
                                <div className="text-center">
                                    <p>Select stakeholders to add them to your map.</p>
                                    <p className="text-sm">You can refine their details individually later.</p>
                                </div>
                            </div>
                        ) : (
                            <Tabs defaultValue="profile" className="w-full h-full flex flex-col">
                                <TabsList className="w-full grid grid-cols-3 mb-4">
                                    <TabsTrigger value="profile">Profile & Needs</TabsTrigger>
                                    <TabsTrigger value="value">Value Analysis</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>

                                <div className="flex-1 overflow-y-auto pr-1">
                                    <TabsContent value="profile" className="space-y-4 m-0">
                                        <div className="space-y-2">
                                            <Label>Engagement Strategy</Label>
                                            <Textarea
                                                value={formData.engagementStrategy || ""}
                                                onChange={e => setFormData({ ...formData, engagementStrategy: e.target.value })}
                                                placeholder="How do we best engage this person?"
                                                className="h-20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Background / Notes</Label>
                                            <Textarea
                                                value={formData.background || ""}
                                                onChange={e => setFormData({ ...formData, background: e.target.value })}
                                                placeholder="Professional context, personal motivations..."
                                                className="h-24"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Pain Points (One per line)</Label>
                                                <Textarea
                                                    value={formData.painPoints.join('\n')}
                                                    onChange={e => setFormData({ ...formData, painPoints: e.target.value.split('\n') })}
                                                    className="h-32 text-xs"
                                                    placeholder="- Budget constraints&#10;- Lack of time"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Gain Opportunities</Label>
                                                <Textarea
                                                    value={formData.gainOpportunities.join('\n')}
                                                    onChange={e => setFormData({ ...formData, gainOpportunities: e.target.value.split('\n') })}
                                                    className="h-32 text-xs"
                                                    placeholder="- Public recognition&#10;- Efficiency gains"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <h4 className="font-semibold text-sm mb-2">Contact Info</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input
                                                    placeholder="Email"
                                                    value={formData.contactInfo?.email || ""}
                                                    onChange={e => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, email: e.target.value } })}
                                                    className="h-8 text-sm"
                                                />
                                                <Input
                                                    placeholder="LinkedIn / Phone"
                                                    value={formData.contactInfo?.linkedin || ""}
                                                    onChange={e => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, linkedin: e.target.value } })}
                                                    className="h-8 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="value" className="m-0">
                                        <ValueGapAnalysis
                                            stakeholder={formData}
                                            dimensions={valueDimensions}
                                            onUpdate={setFormData}
                                        />
                                    </TabsContent>

                                    <TabsContent value="history" className="m-0 h-[400px]">
                                        <EngagementTimeline
                                            stakeholder={formData}
                                            onUpdate={setFormData}
                                        />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        )}
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!selectMode && !formData.name}>
                        {selectMode && !initialData ? `Add Selected (${selectedIds.length})` : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
