"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Rocket, ShieldCheck, Target, Zap, ChevronRight, AlertCircle, Map, LayoutDashboard, Users } from "lucide-react"
import Link from "next/link"

interface Props {
  sector?: string;
  solution?: string;
  problemId?: string | null;
}

export function CofounderRecommendations({ sector, solution, problemId }: Props) {
  const { data: journey, isLoading: isLoadingJourney } = useQuery({
    queryKey: ['journey'],
    queryFn: async () => {
      const res = await fetch('/api/student/journey')
      return res.json()
    },
  })

  const { data: recommendations, isLoading: isLoadingRecs } = useQuery({
    queryKey: ['cofounder-recommendations', sector, solution, problemId],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (sector) params.append('sector', sector)
      if (solution) params.append('solution', solution)
      if (problemId) params.append('problemId', problemId)
      const res = await fetch(`/api/student/recommendations?${params.toString()}`)
      return res.json()
    },
  })

  if (isLoadingJourney || isLoadingRecs) {
    return (
      <Card className="animate-pulse h-full border-primary/20">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-24 w-full bg-muted rounded"></div>
          <div className="h-24 w-full bg-muted rounded"></div>
        </CardContent>
      </Card>
    )
  }

  const recs = recommendations?.recommendations || []
  const strategicPath = recommendations?.strategicPath

  // Custom grouping logic: only show top 3 priority recs in the strategist panel
  const prioritizedRecs = [...recs].sort((a, b) => {
    const priority = { high: 0, medium: 1, low: 2 }
    return priority[a.priority as keyof typeof priority] - priority[b.priority as keyof typeof priority]
  }).slice(0, 3)

  return (
    <Card className="border-primary/20 bg-primary/5 h-full shadow-lg overflow-hidden flex flex-col">
      <CardHeader className="pb-3 border-b bg-white/40">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Zap className="h-5 w-5 text-primary fill-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Strategist</CardTitle>
            <CardDescription className="text-[11px] leading-tight flex flex-wrap gap-x-2">
              <span className="font-semibold text-primary/80">{sector}</span>
              <span className="text-muted-foreground">•</span>
              <span>{solution}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4 pt-4 scrollbar-thin">
        {strategicPath && (
          <div className="bg-gradient-to-br from-primary/10 to-indigo-50/50 p-3 rounded-xl border border-primary/20 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1 px-1.5 bg-primary text-white text-[9px] font-bold rounded uppercase tracking-wider">
                Next Strategic Stage
              </div>
              <span className="text-xs font-bold text-primary">{strategicPath.nextStage}</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic leading-relaxed">
              "{strategicPath.reasoning}"
            </p>
          </div>
        )}

        {prioritizedRecs.length > 0 ? (
          prioritizedRecs.map((rec: any, i: number) => (
            <div key={i} className="group relative flex items-start gap-3 p-3 rounded-xl border bg-card hover:border-primary/30 transition-all shadow-sm">
              <div className={`mt-0.5 p-1.5 rounded-md ${rec.priority === 'high' ? 'bg-red-50 text-red-600' :
                  rec.priority === 'medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                }`}>
                {rec.priority === 'high' ? <AlertCircle className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />}
              </div>
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-[11px] truncate">{rec.title}</h4>
                  <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'} className="text-[9px] h-3.5 px-1 py-0 capitalize">
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2">
                  {rec.description}
                </p>
                <div className="pt-1">
                  <Button variant="link" size="sm" className="h-5 p-0 text-[10px] text-primary font-bold hover:no-underline" asChild>
                    <Link href={`/student/cofounder/${rec.category === 'trl' ? 'trl-tracker' : rec.category === 'api' ? 'api-directory' : rec.category}`}>
                      Take Action <ChevronRight className="ml-0.5 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground text-[11px] border border-dashed rounded-lg bg-white/50">
            No specific recommendations for this filter.
          </div>
        )}

        <div className="pt-2 border-t mt-auto">
          <div className="flex justify-between text-[9px] font-bold text-muted-foreground mb-1 uppercase tracking-tighter">
            <span>Progress to TRL {journey?.trlLevel + 1}</span>
            <span>{Math.round(((journey?.trlLevel || 1) / 9) * 100)}%</span>
          </div>
          <Progress value={((journey?.trlLevel || 1) / 9) * 100} className="h-1" />
        </div>
      </CardContent>
    </Card>
  )
}
