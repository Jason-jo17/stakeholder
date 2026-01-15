"use client"

import { useMyValuePropositions, useMyStakeholders } from "@/hooks/use-student" // Should fetch specific stakeholder
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ValuePropositionCanvas } from "@/components/student/ValuePropositionCanvas"
import { ArrowLeft, Plus, FileQuestion } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { StakeholderProfile } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FishboneAnalysis } from "@/components/student/FishboneAnalysis"

import { use } from "react"

export default function StakeholderValuePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    // In real app, fetch specific stakeholder by ID
    const { data: stakeholders } = useMyStakeholders()
    const stakeholder = stakeholders?.[0] as StakeholderProfile | undefined

    const { data: valueProps } = useMyValuePropositions()
    const [selectedVP, setSelectedVP] = useState<string | null>(null)

    const currentVP = valueProps?.find(vp => vp.id === selectedVP)

    const handleUpdate = (updates: any) => {
        console.log("Update VP:", updates)
    }

    return (
        <div className="container py-8">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/student/dashboard">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </Button>

                <h1 className="text-3xl font-bold">
                    Value Analysis: {stakeholder?.user?.name || "Loading..."}
                </h1>
                <p className="text-muted-foreground mt-2">
                    Understand and validate your value proposition
                </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left: Value Proposition Selection */}
                <div className="col-span-12 lg:col-span-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Value Propositions</CardTitle>
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                New
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[500px]">
                                <div className="space-y-2">
                                    {valueProps?.map(vp => (
                                        <Card
                                            key={vp.id}
                                            className={cn(
                                                "cursor-pointer transition-colors",
                                                selectedVP === vp.id && "border-primary bg-accent"
                                            )}
                                            onClick={() => setSelectedVP(vp.id)}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <Badge variant={vp.validationStatus === 'validated' ? 'default' : 'secondary'}>
                                                        {vp.validationStatus}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDistanceToNow(new Date(vp.createdAt))}
                                                    </span>
                                                </div>

                                                <div className="space-y-1 text-sm">
                                                    <div className="font-medium">
                                                        {vp.productsServices[0] || "Untitled"}
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        {vp.customerJobs.length} jobs • {vp.pains.length} pains
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Value Proposition Canvas */}
                <div className="col-span-12 lg:col-span-8">
                    {currentVP ? (
                        <div className="space-y-6">
                            <Tabs defaultValue="canvas" className="w-full">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="canvas">Value Proposition Canvas</TabsTrigger>
                                    <TabsTrigger value="fishbone">Fishbone Analysis</TabsTrigger>
                                </TabsList>
                                <TabsContent value="canvas">
                                    <div className="space-y-6">
                                        <ValuePropositionCanvas
                                            valueProposition={currentVP}
                                            onUpdate={handleUpdate}
                                        />

                                        {/* Validation Section */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Validation & Feedback</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <Label>Validation Status</Label>
                                                        <Select defaultValue={currentVP.validationStatus}>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="draft">Draft</SelectItem>
                                                                <SelectItem value="validated">Validated</SelectItem>
                                                                <SelectItem value="rejected">Needs Revision</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Label>Validation Notes</Label>
                                                    <Textarea
                                                        placeholder="Document stakeholder feedback, assumptions tested, and insights gained..."
                                                        rows={4}
                                                    />
                                                </div>

                                                <div className="mt-4 flex justify-end gap-2">
                                                    <Button variant="outline">Export Canvas</Button>
                                                    <Button>Save Changes</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="fishbone">
                                    <FishboneAnalysis />
                                </TabsContent>
                            </Tabs>
                        </div>
                    ) : (
                        <Card className="h-full flex items-center justify-center min-h-[400px]">
                            <CardContent className="text-center">
                                <FileQuestion className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">
                                    Select a value proposition or create a new one
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
