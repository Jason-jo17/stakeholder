"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, Target, ShieldCheck, Zap, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useJourneyStore } from "@/app/stores/journey-store"

export default function CofounderDashboard() {
  const { journey, setJourney } = useJourneyStore()
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [journeyRes, recsRes] = await Promise.all([
          fetch('/api/student/journey'),
          fetch('/api/student/recommendations')
        ])

        const journeyData = await journeyRes.json()
        const recsData = await recsRes.json()

        setJourney(journeyData)
        setRecommendations(recsData.recommendations || [])
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [setJourney])

  if (loading) return <div className="p-8 text-center">Loading Cofounder Module...</div>

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Co Innovator Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Accelerate your startup journey from Idea to Scale.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/student/dashboard">Back to Student Dashboard</Link>
          </Button>
          <Button>
            <Zap className="mr-2 h-4 w-4" /> AI Advisor
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TRL Level</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {journey?.trlLevel || 1}</div>
            <p className="text-xs text-muted-foreground">
              {journey?.stage || 'Idea'} Stage
            </p>
            <Progress value={(journey?.trlLevel || 1) * 11} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journey?.complianceScore || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Regulatory Adherence
            </p>
            <Progress value={journey?.complianceScore || 0} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pilot Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journey?.pilotReadiness || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Market Validation
            </p>
            <Progress value={journey?.pilotReadiness || 0} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experiments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journey?.metrics?.experiments_completed || 0}</div>
            <p className="text-xs text-muted-foreground">
              Validations Completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Areas */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-4 space-y-4">
          {/* Quick Actions / Navigation */}
          {/* Quick Actions / Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/student/cofounder/trl-tracker" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <Rocket className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">TRL Tracker</h3>
                  <p className="text-xs text-muted-foreground">Manage Technology Readiness</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/student/cofounder/roadmap" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                  <h3 className="font-semibold">Roadmap</h3>
                  <p className="text-xs text-muted-foreground">Plan Milestones & Events</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/student/cofounder/compliance" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <ShieldCheck className="h-8 w-8 text-emerald-600" />
                  <h3 className="font-semibold">Compliance</h3>
                  <p className="text-xs text-muted-foreground">Risk & Regulations</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/student/cofounder/experiments" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  <h3 className="font-semibold">Experiments</h3>
                  <p className="text-xs text-muted-foreground">Validate Hypotheses</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/student/cofounder/resources" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h3 className="font-semibold">Resources</h3>
                  <p className="text-xs text-muted-foreground">Labs, Funding & Experts</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/student/cofounder/industry" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <Target className="h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold">Industry</h3>
                  <p className="text-xs text-muted-foreground">Pilots & Partners</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/student/cofounder/api-directory" className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <Zap className="h-8 w-8 text-yellow-600" />
                  <h3 className="font-semibold">API Dir</h3>
                  <p className="text-xs text-muted-foreground">Sector APIs</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* AI Recommendations */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>AI Strategic Recommendations</CardTitle>
              <CardDescription>
                Customized advice based on your current TRL {journey?.trlLevel} status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className={`p-2 rounded-full ${rec.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recommendations available at this moment.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity / Status */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(journey as any)?.trlEvidences?.map((ev: any) => (
                  <div key={ev.id} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Submitted Evidence for TRL {ev.trlLevel}</p>
                      <p className="text-xs text-muted-foreground">{new Date(ev.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {(journey as any)?.experiments?.map((ex: any) => (
                  <div key={ex.id} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div>
                      <p className="text-sm font-medium">Completed Experiment: {ex.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(ex.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
