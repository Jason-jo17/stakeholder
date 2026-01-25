
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save, Loader2, Users, Network, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"

// Absolute imports
import { Stakeholder, Relationship, ValueDimension, StakeholderMapData } from "@/components/student/roadmap/tools/stakeholder-mapping/types"
import { StakeholderProfileDialog } from "@/components/student/roadmap/tools/stakeholder-mapping/StakeholderProfileDialog"
import { PowerInterestMatrix } from "@/components/student/roadmap/tools/stakeholder-mapping/PowerInterestMatrix"
import { StakeholderNetwork } from "@/components/student/roadmap/tools/stakeholder-mapping/StakeholderNetwork"

const INITIAL_DATA: StakeholderMapData = {
    stakeholders: [],
    relationships: [],
    valueDimensions: [
        { id: "financial", name: "Financial Return" },
        { id: "social", name: "Social Impact" },
        { id: "operational", name: "Operational Efficiency" },
        { id: "reputation", name: "Brand / Reputation" }
    ]
}

interface Props {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function StakeholderMapping({ tool, progress, onDataSaved, readOnly = false }: Props) {
    const [data, setData] = useState<StakeholderMapData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingStakeholder, setEditingStakeholder] = useState<Stakeholder | undefined>(undefined)
    const [globalStakeholders, setGlobalStakeholders] = useState<Stakeholder[]>([])

    // Fetch global DB stakeholders
    useEffect(() => {
        import("@/app/actions/roadmap").then(mod => {
            mod.getAllStakeholders().then(res => {
                if (Array.isArray(res)) {
                    // @ts-ignore
                    setGlobalStakeholders(res)
                }
            })
        })
    }, [])

    // Ensure structure
    useEffect(() => {
        if (!data.stakeholders) setData(prev => ({ ...prev, stakeholders: [] }))
        if (!data.relationships) setData(prev => ({ ...prev, relationships: [] }))
        if (!data.valueDimensions) setData(prev => ({ ...prev, valueDimensions: INITIAL_DATA.valueDimensions }))
    }, [])

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Stakeholder map saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const handleSaveStakeholder = (input: Stakeholder | Stakeholder[]) => {
        const stakeholdersToAdd = Array.isArray(input) ? input : [input]

        setData(prev => {
            let newStakeholders = [...prev.stakeholders]

            stakeholdersToAdd.forEach(stakeholder => {
                const index = newStakeholders.findIndex(s => s.id === stakeholder.id)
                if (index >= 0) {
                    newStakeholders[index] = stakeholder
                } else {
                    newStakeholders.push(stakeholder)
                }
            })

            return {
                ...prev,
                stakeholders: newStakeholders
            }
        })
        setEditingStakeholder(undefined)
        toast.success(stakeholdersToAdd.length > 1 ? `${stakeholdersToAdd.length} stakeholders added` : "Stakeholder saved")
    }

    const handleEditStakeholder = (s: Stakeholder) => {
        if (readOnly) return
        setEditingStakeholder(s)
        setDialogOpen(true)
    }

    const handleAddRelationship = (sourceId: string, targetId: string) => {
        if (readOnly) return
        // Check if exists
        const exists = data.relationships.some(r =>
            (r.sourceId === sourceId && r.targetId === targetId) ||
            (r.sourceId === targetId && r.targetId === sourceId)
        )

        if (exists) {
            toast.info("Relationship already exists")
            return
        }

        const newRel: Relationship = {
            id: crypto.randomUUID(),
            sourceId,
            targetId,
            type: "collaboration",
            strength: 1
        }

        setData(prev => ({
            ...prev,
            relationships: [...prev.relationships, newRel]
        }))
        toast.success("Connection added")
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Stakeholder Analysis
                        <span className="text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                            {data.stakeholders.length} Stakeholders
                        </span>
                    </h2>
                    <p className="text-muted-foreground">Map influence, expectations, and value flows.</p>
                </div>
                <div className="flex gap-2">
                    {!readOnly && (
                        <>
                            <Button onClick={() => { setEditingStakeholder(undefined); setDialogOpen(true) }} variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Add Stakeholder
                            </Button>
                            <Button onClick={handleSave} disabled={saving} className="bg-primary shadow-sm">
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Map
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <Tabs defaultValue="matrix">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                    <TabsTrigger value="matrix"><TrendingUp className="h-4 w-4 mr-2" /> Power/Interest Matrix</TabsTrigger>
                    <TabsTrigger value="network"><Network className="h-4 w-4 mr-2" /> Network Graph</TabsTrigger>
                </TabsList>

                <TabsContent value="matrix" className="mt-6 space-y-6">
                    <PowerInterestMatrix
                        stakeholders={data.stakeholders}
                        onSelectStakeholder={handleEditStakeholder}
                    />

                    {/* List View Below Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.stakeholders.map(s => (
                            <Card key={s.id} onClick={() => handleEditStakeholder(s)} className="cursor-pointer hover:border-primary transition-colors">
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-base flex justify-between">
                                        {s.name}
                                        <div className={`w-3 h-3 rounded-full ${s.attitude === 'supporter' ? 'bg-green-500' : s.attitude === 'blocker' ? 'bg-red-500' : 'bg-slate-300'}`} />
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground">{s.role} • {s.organization}</p>
                                </CardHeader>
                                <CardContent className="p-4 pt-2 text-xs">
                                    <div className="flex justify-between mb-1">
                                        <span>Power: <b>{s.power}</b></span>
                                        <span>Interest: <b>{s.interest}</b></span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {s.valuedDimensions.map((vd, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">
                                                {data.valueDimensions.find(d => d.id === vd.dimensionId)?.name?.split(' ')[0]}
                                                {vd.gap > 0 ? ` +${vd.gap}` : vd.gap}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="network" className="mt-6">
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                        <div className="mb-4 text-sm text-muted-foreground flex gap-4">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Blocker</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Supporter</span>
                            <span className="ml-auto italic">Drag to connect nodes</span>
                        </div>
                        <StakeholderNetwork
                            stakeholders={data.stakeholders}
                            relationships={data.relationships}
                            onConnect={handleAddRelationship}
                            height={600}
                        />
                    </div>
                </TabsContent>
            </Tabs>

            <StakeholderProfileDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={handleSaveStakeholder}
                initialData={editingStakeholder}
                valueDimensions={data.valueDimensions}
                existingStakeholders={editingStakeholder ? data.stakeholders : [...data.stakeholders, ...globalStakeholders].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)} // Merge unique
            />
        </div>
    )
}
