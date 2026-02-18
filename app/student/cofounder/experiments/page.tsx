'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { FlaskConical, Play, CheckCircle, XCircle, BarChart3, RotateCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ExperimentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'digital_simulation',
    hypothesis: '',
    methodology: ''
  })

  const queryClient = useQueryClient()

  const { data: experiments, isLoading } = useQuery({
    queryKey: ['experiments'],
    queryFn: async () => {
      const res = await fetch('/api/student/experiments')
      return res.json()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/student/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiments'] })
      setIsDialogOpen(false)
      toast.success('Experiment created!')
      setFormData({ title: '', type: 'digital_simulation', hypothesis: '', methodology: '' })
    },
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/student/cofounder">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Experiments & Sector Sandbox</h1>
          <p className="text-muted-foreground">
            Design, run, and track experiments to validate your hypotheses.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FlaskConical className="w-4 h-4 mr-2" />
              New Experiment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Design New Experiment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. A/B Testing Landing Page"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital_simulation">Digital Simulation</SelectItem>
                    <SelectItem value="hardware_stress_test">Hardware Stress Test</SelectItem>
                    <SelectItem value="market_validation">Market Validation</SelectItem>
                    <SelectItem value="field_trial">Field Trial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Hypothesis</label>
                <Textarea
                  value={formData.hypothesis}
                  onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                  placeholder="If we do X, then Y will happen because Z..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Methodology</label>
                <Textarea
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                  placeholder="Steps to conduct the experiment..."
                />
              </div>
              <Button onClick={() => createMutation.mutate(formData)} className="w-full">Create Experiment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading && <div>Loading experiments...</div>}
        {experiments?.experiments?.map((exp: any) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{exp.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{exp.type.replace('_', ' ')}</Badge>
                  </CardDescription>
                </div>
                <Badge className={
                  exp.status === 'completed' ? 'bg-green-100 text-green-800' :
                    exp.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                }>
                  {exp.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Hypothesis</h4>
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{exp.hypothesis}</p>
              </div>
              <div className="flex gap-2">
                {exp.status === 'planned' && (
                  <Button size="sm" variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" /> Start Run
                  </Button>
                )}
                {exp.status === 'in_progress' && (
                  <Button size="sm" variant="secondary" className="w-full">
                    <RotateCw className="w-4 h-4 mr-2 animate-spin" /> Running
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="w-full">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {experiments?.experiments?.length === 0 && (
          <div className="col-span-2 text-center py-12 border-2 border-dashed rounded-lg">
            <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No Experiments Yet</h3>
            <p className="text-muted-foreground">Start by designing your first validation experiment.</p>
          </div>
        )}
      </div>

      {/* Placeholder for Sandbox Tools */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Sector Sandbox Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-50 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Digital Twin Sim</CardTitle>
              <CardDescription>Simulate product behavior in virtual environment</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Regulatory Checker</CardTitle>
              <CardDescription>Automated compliance validation tool</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
