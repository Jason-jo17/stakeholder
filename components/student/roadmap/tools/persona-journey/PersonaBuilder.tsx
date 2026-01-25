
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Persona } from './types'
import { Plus, Trash2, User, Quote, Target, AlertCircle, Zap } from 'lucide-react'

interface Props {
  personas: Persona[];
  onUpdate: (personas: Persona[]) => void;
}

export function PersonaBuilder({ personas, onUpdate }: Props) {
  const addPersona = () => {
    const newPersona: Persona = {
      id: `persona-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: "New Persona",
      role: "Target User",
      quote: "What defines this user's typical mindset?",
      demographics: { age: "25-35", location: "Global", occupation: "Professional", income: "$50k+", education: "Bachelor's" },
      psychographics: { goals: [], frustrations: [], motivations: [] },
      behavioral: { techSavviness: 3, decisionDrivers: [] }
    }
    onUpdate([...personas, newPersona])
  }

  const updatePersona = (id: string, updates: Partial<Persona>) => {
    onUpdate(personas.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const removePersona = (id: string) => {
    onUpdate(personas.filter(p => p.id !== id))
  }

  const addListItem = (id: string, field: keyof Persona['psychographics'], value: string) => {
    if (!value) return
    const persona = personas.find(p => p.id === id)
    if (!persona) return
    updatePersona(id, {
      psychographics: {
        ...persona.psychographics,
        [field]: [...persona.psychographics[field], value]
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">User Personas</h3>
        <Button onClick={addPersona} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Persona
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {personas.map(persona => (
          <Card key={persona.id} className="border-2 shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={24} />
                </div>
                <div>
                  <Input
                    value={persona.name}
                    onChange={(e) => updatePersona(persona.id, { name: e.target.value })}
                    className="h-7 font-bold text-lg bg-transparent border-none p-0 focus-visible:ring-0"
                  />
                  <Input
                    value={persona.role}
                    onChange={(e) => updatePersona(persona.id, { role: e.target.value })}
                    className="h-5 text-sm text-slate-500 bg-transparent border-none p-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removePersona(persona.id)} className="text-slate-400 hover:text-red-500">
                <Trash2 size={18} />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Quote Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-dashed relative">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-blue-200 fill-current" />
                <Textarea
                  value={persona.quote}
                  onChange={(e) => updatePersona(persona.id, { quote: e.target.value })}
                  className="bg-transparent border-none resize-none italic text-slate-600 focus-visible:ring-0 min-h-[60px] p-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Demographics */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                    <Target size={16} className="text-blue-500" />
                    Demographics
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(persona.demographics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 capitalize">{key}</span>
                        <Input
                          value={value}
                          onChange={(e) => updatePersona(persona.id, { demographics: { ...persona.demographics, [key]: e.target.value } })}
                          className="h-8 w-2/3 text-right bg-transparent border-none p-0 focus-visible:ring-0 font-medium"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Psychographics */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                    <Zap size={16} className="text-emerald-500" />
                    Goals & Motivations
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-slate-400 font-bold">Goals</Label>
                      <div className="flex flex-wrap gap-1">
                        {persona.psychographics.goals.map((g, i) => (
                          <Badge key={i} variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none">
                            {g}
                            <button onClick={() => updatePersona(persona.id, {
                              psychographics: { ...persona.psychographics, goals: persona.psychographics.goals.filter((_, idx) => idx !== i) }
                            })} className="ml-1 hover:text-emerald-900">×</button>
                          </Badge>
                        ))}
                        <Input
                          placeholder="+ Add goal..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addListItem(persona.id, 'goals', e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                          className="h-6 w-24 text-[10px] bg-slate-50 border-none focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-slate-400 font-bold">Frustrations</Label>
                      <div className="flex flex-wrap gap-1">
                        {persona.psychographics.frustrations.map((f, i) => (
                          <Badge key={i} variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100 border-none">
                            {f}
                            <button onClick={() => updatePersona(persona.id, {
                              psychographics: { ...persona.psychographics, frustrations: persona.psychographics.frustrations.filter((_, idx) => idx !== i) }
                            })} className="ml-1 hover:text-rose-900">×</button>
                          </Badge>
                        ))}
                        <Input
                          placeholder="+ Add pain..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addListItem(persona.id, 'frustrations', e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                          className="h-6 w-24 text-[10px] bg-slate-50 border-none focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
