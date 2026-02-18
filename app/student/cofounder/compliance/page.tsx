'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { AlertTriangle, CheckCircle2, Clock, XCircle, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const RISK_COLORS: Record<string, string> = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
}

const STATUS_ICONS: Record<string, any> = {
    not_started: Clock,
    in_progress: Clock,
    completed: CheckCircle2,
    expired: XCircle,
}

const CATEGORIES = [
    { value: 'regulatory', label: 'Regulatory' },
    { value: 'data_privacy', label: 'Data Privacy' },
    { value: 'safety', label: 'Safety' },
    { value: 'environmental', label: 'Environmental' },
    { value: 'financial', label: 'Financial' },
    { value: 'legal', label: 'Legal' },
    { value: 'sector_specific', label: 'Sector Specific' },
]

export default function CompliancePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [showGaps, setShowGaps] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        category: 'regulatory',
        riskLevel: 'medium',
        description: '',
        regulatoryBody: '',
        dueDate: '',
    })

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['compliance-tasks'],
        queryFn: async () => {
            const res = await fetch('/api/student/compliance')
            return res.json()
        },
    })

    const { data: gaps, isLoading: gapsLoading } = useQuery({
        queryKey: ['compliance-gaps'],
        queryFn: async () => {
            const res = await fetch('/api/student/compliance/gaps', { method: 'POST' })
            return res.json()
        },
        enabled: showGaps,
    })

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch('/api/student/compliance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['compliance-tasks'] })
            setIsDialogOpen(false)
            toast.success('Compliance task created!')
            setFormData({
                title: '',
                category: 'regulatory',
                riskLevel: 'medium',
                description: '',
                regulatoryBody: '',
                dueDate: '',
            })
        },
    })

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/student/cofounder">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Compliance Hub</h1>
                        <p className="text-muted-foreground">Track and manage regulatory requirements</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowGaps(!showGaps)}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Find Gaps
                    </Button>
                    <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>
                </div>
            </div>

            {/* Risk Heatmap */}
            {data?.riskCounts && (
                <Card>
                    <CardHeader>
                        <CardTitle>Risk Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                            {Object.entries(data.riskCounts).map(([risk, count]: [string, any]) => (
                                <div key={risk} className={`p-4 rounded-lg border-2 ${RISK_COLORS[risk] || RISK_COLORS.medium}`}>
                                    <div className="text-2xl font-bold">{count}</div>
                                    <div className="text-sm capitalize">{risk}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AI-Detected Gaps */}
            {showGaps && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            AI-Detected Compliance Gaps
                        </CardTitle>
                        <CardDescription>Missing requirements based on your sector and TRL level</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {gapsLoading && <div className="text-center py-4">Analyzing...</div>}
                        {gaps?.gaps?.length === 0 && <p className="text-sm text-muted-foreground">No gaps detected!</p>}
                        <div className="space-y-3">
                            {gaps?.gaps?.map((gap: any, idx: number) => (
                                <div key={idx} className="p-4 border rounded-lg bg-yellow-50">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium">{gap.title}</h4>
                                        <Badge variant="outline">{gap.category}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{gap.description}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge className={RISK_COLORS[gap.riskLevel] || RISK_COLORS.medium}>
                                            {gap.riskLevel}
                                        </Badge>
                                        {gap.regulatoryBody && (
                                            <Badge variant="outline">{gap.regulatoryBody}</Badge>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="ml-auto"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    title: gap.title,
                                                    category: gap.category,
                                                    riskLevel: gap.riskLevel,
                                                    description: gap.description,
                                                    regulatoryBody: gap.regulatoryBody || ''
                                                })
                                                setIsDialogOpen(true)
                                            }}
                                        >
                                            Add to Tasks
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tasks List */}
            <div className="space-y-4">
                {CATEGORIES.map((category) => {
                    const categoryTasks = data?.tasks?.filter((t: any) => t.category === category.value)
                    if (!categoryTasks?.length) return null

                    return (
                        <Card key={category.value}>
                            <CardHeader>
                                <CardTitle className="text-lg">{category.label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {categoryTasks.map((task: any) => {
                                        const StatusIcon = STATUS_ICONS[task.certificationStatus] || Clock
                                        return (
                                            <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                                <StatusIcon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <h4 className="font-medium">{task.title}</h4>
                                                        <Badge className={RISK_COLORS[task.riskLevel] || RISK_COLORS.medium}>
                                                            {task.riskLevel}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {task.regulatoryBody && (
                                                            <Badge variant="outline">{task.regulatoryBody}</Badge>
                                                        )}
                                                        <Badge variant="secondary">{task.certificationStatus}</Badge>
                                                        {task.dueDate && (
                                                            <span className="text-xs text-muted-foreground">
                                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Create Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Compliance Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="FDA 510(k) Submission"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Category</label>
                                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Risk Level</label>
                                <Select value={formData.riskLevel} onValueChange={(v) => setFormData({ ...formData, riskLevel: v })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="critical">Critical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Regulatory Body</label>
                            <Input
                                value={formData.regulatoryBody}
                                onChange={(e) => setFormData({ ...formData, regulatoryBody: e.target.value })}
                                placeholder="FDA, SEBI, RBI, CDSCO..."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Requirements and next steps..."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Due Date</label>
                            <Input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                        <Button
                            onClick={() => createMutation.mutate(formData)}
                            disabled={createMutation.isPending}
                            className="w-full"
                        >
                            Create Task
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
