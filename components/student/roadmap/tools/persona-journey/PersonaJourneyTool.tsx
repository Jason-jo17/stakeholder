
"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonaJourneyData, Persona, JourneyMap } from './types'
import { PersonaBuilder } from './PersonaBuilder'
import { JourneyMapper } from './JourneyMapper'
import { saveToolData } from '@/app/actions/roadmap'
import { toast } from 'sonner'
import { useDebounce } from '@/lib/hooks/use-debounce'
import {
  Users,
  Map as MapIcon,
  Save,
  Sparkles,
  Info,
  ChevronRight,
  UserCheck
} from 'lucide-react'
import { cn } from "@/lib/utils"

const INITIAL_DATA: PersonaJourneyData = {
  personas: [
    {
      id: 'p1',
      name: 'Alex the Innovator',
      role: 'Startup Founder',
      quote: "I need a tool that helps me visualize my strategy without getting bogged down in complexity.",
      demographics: { age: "28", location: "San Francisco", occupation: "Founder", income: "$80k", education: "MBA" },
      psychographics: {
        goals: ["Launch MVP in 3 months", "Secure seed funding", "Solve real problems"],
        frustrations: ["Fragmented tools", "Too much data, too little insight", "Time pressure"],
        motivations: ["Making an impact", "Financial independence", "Learning constantly"]
      },
      behavioral: { techSavviness: 5, decisionDrivers: ["Speed", "Scalability", "Design Quality"] }
    }
  ],
  journeys: [
    {
      id: 'j1',
      personaId: 'p1',
      scenario: "First time strategy session",
      stages: [
        {
          id: 's1',
          name: "Awareness",
          duration: "1 hour",
          goals: ["Find a tool"],
          actions: ["Searches for VPC builders", "Finds this platform"],
          thoughts: ["Will this actually save me time?"],
          emotion: { valence: 1, intensity: 3 },
          touchpoints: [{ name: "Google", channel: "Web", satisfaction: 4 }],
          painPoints: ["Too many options"],
          opportunities: ["Clear landing page"]
        },
        {
          id: 's2',
          name: "Onboarding",
          duration: "10 mins",
          goals: ["Understand the flow"],
          actions: ["Goes through tutorial", "Sets up first tool"],
          thoughts: ["This seems intuitive enough."],
          emotion: { valence: 2, intensity: 4 },
          touchpoints: [{ name: "In-app tutorial", channel: "Platform", satisfaction: 5 }],
          painPoints: [],
          opportunities: ["Interactive tooltips"]
        },
        {
          id: 's3',
          name: "Implementation",
          duration: "2 hours",
          goals: ["Complete VPC"],
          actions: ["Fills out segments", "Analyzes fit"],
          thoughts: ["Wow, the scoring is really helpful."],
          emotion: { valence: 4, intensity: 5 },
          touchpoints: [{ name: "VPC Tool", channel: "Platform", satisfaction: 5 }],
          painPoints: ["Linking items is manual"],
          opportunities: ["Auto-linking items"]
        }
      ]
    }
  ]
}

interface Props {
  tool: any;
  progress: any;
  onDataSaved?: () => void;
}

export function PersonaJourneyTool({ tool, progress, onDataSaved }: Props) {
  const [data, setData] = useState<PersonaJourneyData>(progress?.data || INITIAL_DATA)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("personas")
  const [activePersonaId, setActivePersonaId] = useState<string>(data.personas[0]?.id || '')
  const [lastSavedData, setLastSavedData] = useState<string>(JSON.stringify(progress?.data || INITIAL_DATA))

  const debouncedData = useDebounce(data, 2000)

  const handleSave = async (isAuto = false) => {
    const currentDataStr = JSON.stringify(data)
    if (isAuto && currentDataStr === lastSavedData) return

    setSaving(true)
    try {
      const res = await saveToolData(tool.toolId, data)
      if (res.error) {
        if (!isAuto) toast.error(res.error)
      } else {
        if (!isAuto) toast.success("Persona & Journey Maps saved!")
        setLastSavedData(currentDataStr)
        if (onDataSaved) onDataSaved()
      }
    } catch (e) {
      if (!isAuto) toast.error("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  // Auto-save effect
  useEffect(() => {
    if (JSON.stringify(debouncedData) !== lastSavedData) {
      handleSave(true)
    }
  }, [debouncedData])

  const activeJourney = data.journeys.find(j => j.personaId === activePersonaId)
  const activePersona = data.personas.find(p => p.id === activePersonaId)

  const updatePersonas = (personas: Persona[]) => {
    setData(prev => ({ ...prev, personas }))
    if (!personas.find(p => p.id === activePersonaId) && personas.length > 0) {
      setActivePersonaId(personas[0].id)
    }
  }

  const updateJourney = (journey: JourneyMap) => {
    setData(prev => ({
      ...prev,
      journeys: prev.journeys.map(j => j.personaId === journey.personaId ? journey : j)
    }))
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Tool Header */}
      <div className="h-16 shrink-0 border-b bg-white flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Persona & Journey Mapping</h2>
          </div>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[400px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mr-2">Target:</span>
            {data.personas.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePersonaId(p.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all",
                  activePersonaId === p.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-9">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="personas" className="text-xs px-4">
                <Users className="h-3.5 w-3.5 mr-2" />
                Personas
              </TabsTrigger>
              <TabsTrigger value="journey" className="text-xs px-4">
                <MapIcon className="h-3.5 w-3.5 mr-2" />
                Journey Map
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="h-6 w-[1px] bg-slate-200 mx-1" />

          <Button size="sm" onClick={() => handleSave(false)} disabled={saving} className="bg-slate-900">
            {saving ? <Sparkles className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Data
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="personas" className="mt-0">
            <PersonaBuilder personas={data.personas} onUpdate={updatePersonas} />
          </TabsContent>
          <TabsContent value="journey" className="mt-0">
            {activeJourney ? (
              <JourneyMapper
                journey={activeJourney}
                persona={activePersona}
                onChange={updateJourney}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed text-slate-400">
                <MapIcon size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">No journey map found for {activePersona?.name || "this persona"}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    const newJourney: JourneyMap = {
                      id: `journey-${Date.now()}`,
                      personaId: activePersonaId,
                      scenario: "Standard Use Case",
                      stages: []
                    }
                    setData(prev => ({ ...prev, journeys: [...prev.journeys, newJourney] }))
                  }}
                >
                  Create Journey Map
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
