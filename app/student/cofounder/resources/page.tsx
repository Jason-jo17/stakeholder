'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FlaskConical,
  Wrench,
  DollarSign,
  Calendar,
  Building2,
  GraduationCap,
  Landmark,
  MapPin,
  ExternalLink,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

const TABS = [
  { value: 'labs', label: 'Testing Labs', icon: FlaskConical },
  { value: 'makerspaces', label: 'Makerspaces', icon: Wrench },
  { value: 'funding', label: 'Funding', icon: DollarSign },
  { value: 'events', label: 'Events', icon: Calendar },
  { value: 'incubators', label: 'Incubators', icon: Building2 },
  { value: 'experts', label: 'Experts', icon: GraduationCap },
  { value: 'schemes', label: 'Schemes', icon: Landmark },
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('labs')
  const [filters, setFilters] = useState({ state: '', availability: '', sector: '', status: '', type: '' })

  const { data: testingLabs, isLoading: loadingLabs } = useQuery({
    queryKey: ['testing-labs', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/testing-labs?${params}`)
      return res.json()
    },
    enabled: activeTab === 'labs',
  })

  // Queries for other tabs
  const { data: makerspaces, isLoading: loadingMakerspaces } = useQuery({
    queryKey: ['makerspaces', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/makerspaces?${params}`)
      return res.json()
    },
    enabled: activeTab === 'makerspaces',
  })

  const { data: funding, isLoading: loadingFunding } = useQuery({
    queryKey: ['funding', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/funding?${params}`)
      return res.json()
    },
    enabled: activeTab === 'funding',
  })

  const { data: events, isLoading: loadingEvents } = useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/events?${params}`)
      return res.json()
    },
    enabled: activeTab === 'events',
  })

  const { data: incubators, isLoading: loadingIncubators } = useQuery({
    queryKey: ['incubators', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/incubators?${params}`)
      return res.json()
    },
    enabled: activeTab === 'incubators',
  })

  const { data: experts, isLoading: loadingExperts } = useQuery({
    queryKey: ['experts', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/experts?${params}`)
      return res.json()
    },
    enabled: activeTab === 'experts',
  })

  const { data: schemes, isLoading: loadingSchemes } = useQuery({
    queryKey: ['schemes', filters],
    queryFn: async () => {
      const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v))
      const res = await fetch(`/api/resources/schemes?${params}`)
      return res.json()
    },
    enabled: activeTab === 'schemes',
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
          <h1 className="text-3xl font-bold">Resource Network</h1>
          <p className="text-muted-foreground">
            Discover labs, funding, experts, and more to accelerate your journey
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col md:flex-row gap-2 h-auto py-2">
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Testing Labs Tab */}
        <TabsContent value="labs" className="space-y-4">
          <div className="flex gap-4">
            <Select value={filters.state} onValueChange={(v) => setFilters({ ...filters, state: v })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.availability} onValueChange={(v) => setFilters({ ...filters, availability: v })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingLabs && <div>Loading...</div>}
            {testingLabs?.labs?.map((lab: any) => (
              <Card key={lab.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{lab.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {lab.location}, {lab.state}
                      </CardDescription>
                    </div>
                    <Badge variant={lab.availability === 'available' ? 'default' : 'secondary'}>
                      {lab.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{lab.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-1">Equipment:</p>
                    <div className="flex flex-wrap gap-1">
                      {lab.equipment?.slice(0, 3).map((eq: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {lab.website && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={lab.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    <Button size="sm" className="flex-1">Request Access</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Makerspaces Tab */}
        <TabsContent value="makerspaces" className="space-y-4">
          {/* Similar filters and layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingMakerspaces && <div>Loading...</div>}
            {makerspaces?.makerspaces?.length === 0 && <div>No makerspaces found.</div>}
            {makerspaces?.makerspaces?.map((space: any) => (
              <Card key={space.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{space.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {space.location}, {space.state}
                      </CardDescription>
                    </div>
                    <Badge variant={space.availability === 'available' ? 'default' : 'secondary'}>
                      {space.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{space.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-1">Equipment:</p>
                    <div className="flex flex-wrap gap-1">
                      {space.equipment?.slice(0, 3).map((eq: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">{eq}</Badge>
                      ))}
                    </div>
                  </div>
                  {space.hourlyRate && <p className="text-sm"><span className="font-semibold">Rate:</span> ${space.hourlyRate}/hr</p>}
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="w-full">Book Slot</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Funding Tab */}
        <TabsContent value="funding" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loadingFunding && <div>Loading...</div>}
            {funding?.funding?.map((fund: any) => (
              <Card key={fund.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{fund.title}</CardTitle>
                      <CardDescription>{fund.organizationName}</CardDescription>
                    </div>
                    <Badge>{fund.type.replace('_', ' ')}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{fund.description}</p>
                  <div className="flex justify-between text-sm">
                    <span><span className="font-semibold">Size:</span> {fund.fundingSize}</span>
                    {fund.applicationDeadline && (
                      <span><span className="font-semibold">Deadline:</span> {new Date(fund.applicationDeadline).toLocaleDateString()}</span>
                    )}
                  </div>
                  <Button className="w-full mt-2" asChild>
                    <a href={fund.applicationUrl || '#'} target="_blank" rel="noreferrer">Apply Now</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loadingEvents && <div>Loading...</div>}
            {events?.events?.map((event: any) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(event.eventDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{event.type.replace('_', ' ')}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="text-sm"><span className="font-semibold">Location:</span> {event.location}</p>
                  <Button className="w-full mt-2" asChild>
                    <a href={event.registrationUrl || '#'} target="_blank" rel="noreferrer">Register</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Incubators Tab */}
        <TabsContent value="incubators" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingIncubators && <div>Loading...</div>}
            {incubators?.incubators?.map((inc: any) => (
              <Card key={inc.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{inc.name}</CardTitle>
                      <CardDescription>{inc.location}</CardDescription>
                    </div>
                    <Badge>{inc.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{inc.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {inc.sectorFocus?.map((s: string, i: number) => <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>)}
                  </div>
                  <Button className="w-full mt-2" variant="outline" asChild>
                    <a href={inc.applicationUrl || '#'} target="_blank" rel="noreferrer">View Details</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Experts Tab */}
        <TabsContent value="experts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingExperts && <div>Loading...</div>}
            {experts?.experts?.map((exp: any) => (
              <Card key={exp.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{exp.name}</CardTitle>
                      <CardDescription>{exp.specialization}</CardDescription>
                    </div>
                    <Badge variant={exp.availability === 'available' ? 'default' : 'secondary'}>{exp.availability}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    {exp.domain?.map((d: string, i: number) => <Badge key={i} variant="outline" className="text-xs">{d}</Badge>)}
                  </div>
                  <p className="text-sm"><span className="font-semibold">Rate:</span> ${exp.hourlyRate}/hr</p>
                  <Button className="w-full mt-2">Book Session</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schemes Tab */}
        <TabsContent value="schemes" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {loadingSchemes && <div>Loading...</div>}
            {schemes?.schemes?.map((scheme: any) => (
              <Card key={scheme.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{scheme.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{scheme.type.replace('_', ' ')}</Badge>
                    </div>
                    <Badge variant={scheme.status === 'active' ? 'default' : 'secondary'}>{scheme.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{scheme.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold">Benefit:</span> {scheme.benefitAmount}</div>
                    {scheme.deadline && <div><span className="font-semibold">Deadline:</span> {new Date(scheme.deadline).toLocaleDateString()}</div>}
                  </div>
                  <Button className="w-full mt-2" asChild>
                    <a href={scheme.applicationUrl || '#'} target="_blank" rel="noreferrer">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
