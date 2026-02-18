'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Building2, Rocket, FileText, CheckCircle, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function IndustryConnectPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    partnerName: '',
    partnerType: 'corporate',
    title: '',
    description: '',
    duration: ''
  })

  const queryClient = useQueryClient()

  const { data: pilots, isLoading } = useQuery({
    queryKey: ['pilots'],
    queryFn: async () => {
      const res = await fetch('/api/student/pilots')
      return res.json()
    },
  })

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch('/api/resources/events')
      return res.json()
    },
  })

  const { data: funding, isLoading: isLoadingFunding } = useQuery({
    queryKey: ['funding'],
    queryFn: async () => {
      const res = await fetch('/api/resources/funding')
      return res.json()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/student/pilots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pilots'] })
      setIsDialogOpen(false)
      toast.success('Pilot application submitted!')
      setFormData({ partnerName: '', partnerType: 'corporate', title: '', description: '', duration: '' })
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
          <h1 className="text-3xl font-bold">Industry Connect & Pilot Zone</h1>
          <p className="text-muted-foreground">
            Apply for pilots, track progress, and connect with industry partners.
          </p>
        </div>
      </div>

      <Tabs defaultValue="pilots">
        <TabsList>
          <TabsTrigger value="pilots">Pilot Tracking</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="pilots" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Rocket className="w-4 h-4 mr-2" />
                  New Pilot Application
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply for Pilot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Partner Name</label>
                    <Input
                      value={formData.partnerName}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      placeholder="e.g. Tata Motors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Partner Type</label>
                    <Select value={formData.partnerType} onValueChange={(v) => setFormData({ ...formData, partnerType: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="institution">Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pilot Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="EV Battery Efficiency Test"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration (Days)</label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <Button onClick={() => createMutation.mutate(formData)} className="w-full">Submit Application</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {isLoading && <div className="text-center py-8">Loading applications...</div>}
            {pilots?.pilots?.map((pilot: any) => (
              <Card key={pilot.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{pilot.title}</CardTitle>
                      <CardDescription>{pilot.partnerName} ({pilot.partnerType})</CardDescription>
                    </div>
                    <Badge variant="outline">{pilot.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{pilot.description}</p>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pilot.duration} Days</div>
                    <div className="flex items-center gap-1"><FileText className="w-4 h-4" /> Applied: {new Date(pilot.createdAt).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pilots?.pilots?.length === 0 && <div className="text-center py-8 text-muted-foreground">No pilot applications yet.</div>}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Events & Demo Days */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold">Upcoming Demo Days</h2>
              </div>

              {isLoadingEvents && <div className="py-4">Loading events...</div>}
              {events?.events?.length === 0 && (
                <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                  No upcoming events found.
                </div>
              )}
              {events?.events?.map((event: any) => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge>{event.type.replace('_', ' ')}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(event.eventDate).toLocaleDateString()} • {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <Button size="sm" className="w-full" asChild>
                      <a href={event.registrationUrl || '#'} target="_blank" rel="noreferrer">Register Now</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Column: Funding & Challenges */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-bold">Active Challenges</h2>
              </div>

              {isLoadingFunding && <div className="py-4">Loading opportunities...</div>}
              {funding?.funding?.length === 0 && (
                <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                  No active challenges found.
                </div>
              )}
              {funding?.funding?.map((fund: any) => (
                <Card key={fund.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{fund.title}</CardTitle>
                      <Badge variant="secondary">{fund.fundingSize}</Badge>
                    </div>
                    <CardDescription>{fund.organizationName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{fund.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Eligibility: {typeof fund.trlEligibility === 'string' ? fund.trlEligibility : fund.trlEligibility?.join(', ')}</span>
                      {fund.applicationDeadline && (
                        <span>Deadline: {new Date(fund.applicationDeadline).toLocaleDateString()}</span>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <a href={fund.applicationUrl || '#'} target="_blank" rel="noreferrer">View Challenge</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
