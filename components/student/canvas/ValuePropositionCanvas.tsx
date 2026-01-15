"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProblemStatements } from "@/lib/hooks/use-problems-list"

interface ValuePropositionCanvasProps {
    initialData?: any
    onSave?: (data: any) => void
    readOnly?: boolean
}

export function ValuePropositionCanvas({ initialData, onSave, readOnly = false }: ValuePropositionCanvasProps) {
    const { data: problems } = useProblemStatements()
    const [data, setData] = useState(initialData || {
        problemStatementId: "",
        customerJobs: "",
        pains: "",
        gains: "",
        productsServices: "",
        painRelievers: "",
        gainCreators: ""
    })

    const handleSave = () => {
        console.log("Saving canvas:", data)
        if (onSave) onSave(data)
    }

    const handleChange = (field: string, value: string) => {
        if (readOnly) return
        setData((prev: any) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Value Proposition Canvas</h2>
                        <p className="text-muted-foreground">Map your value proposition to customer needs</p>
                    </div>
                </div>

                {!readOnly && (
                    <div className="w-full max-w-md">
                        <label className="text-sm font-medium mb-2 block">Selected Problem Statement</label>
                        <Select
                            value={data.problemStatementId}
                            onValueChange={(val) => handleChange('problemStatementId', val)}
                            disabled={readOnly}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a problem to solve..." />
                            </SelectTrigger>
                            <SelectContent>
                                {problems?.map((p: any) => (
                                    <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {readOnly && data.problemStatementId && (
                    <div className="bg-muted p-3 rounded-md text-sm">
                        <span className="font-semibold">Addressing Problem: </span>
                        {problems?.find((p: any) => p.id === data.problemStatementId)?.title || "Unknown Problem"}
                    </div>
                )}

                <div className="flex justify-end">
                    {!readOnly && (
                        <Button onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Canvas
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Side (Square) */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle>Value Proposition (Product/Service)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-semibold text-sm">Products & Services</label>
                            <p className="text-xs text-muted-foreground">What products and services do you offer that help your customer get either a functional, social, or emotional job done?</p>
                            <Textarea
                                placeholder="List your products and services..."
                                rows={4}
                                value={data.productsServices}
                                onChange={(e) => handleChange('productsServices', e.target.value)}
                                disabled={readOnly}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-semibold text-sm">Gain Creators</label>
                                <p className="text-xs text-muted-foreground">How do you describe how your products and services create customer gains?</p>
                                <Textarea
                                    placeholder="Describe gain creators..."
                                    rows={4}
                                    value={data.gainCreators}
                                    onChange={(e) => handleChange('gainCreators', e.target.value)}
                                    disabled={readOnly}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-semibold text-sm">Pain Relievers</label>
                                <p className="text-xs text-muted-foreground">How do you describe how your products and services alleviate customer pains?</p>
                                <Textarea
                                    placeholder="Describe pain relievers..."
                                    rows={4}
                                    value={data.painRelievers}
                                    onChange={(e) => handleChange('painRelievers', e.target.value)}
                                    disabled={readOnly}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Side (Circle) */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                        <CardTitle>Customer Profile (Segment)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-semibold text-sm">Customer Jobs</label>
                            <p className="text-xs text-muted-foreground">What functional, social, emotional jobs is your customer trying to get done?</p>
                            <Textarea
                                placeholder="List customer jobs..."
                                rows={4}
                                value={data.customerJobs}
                                onChange={(e) => handleChange('customerJobs', e.target.value)}
                                disabled={readOnly}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-semibold text-sm">Gains</label>
                                <p className="text-xs text-muted-foreground">What are the benefits your customer expects, desires or would be surprised by?</p>
                                <Textarea
                                    placeholder="List gains..."
                                    rows={4}
                                    value={data.gains}
                                    onChange={(e) => handleChange('gains', e.target.value)}
                                    disabled={readOnly}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-semibold text-sm">Pains</label>
                                <p className="text-xs text-muted-foreground">What are the negative emotions, undesired costs and situations, and risks that your customer experiences?</p>
                                <Textarea
                                    placeholder="List pains..."
                                    rows={4}
                                    value={data.pains}
                                    onChange={(e) => handleChange('pains', e.target.value)}
                                    disabled={readOnly}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
