
"use client"

import React, { useState, useMemo, useEffect } from 'react'
import {
  Save,
  Plus,
  Sparkles,
  LineChart as ChartIcon,
  LayoutGrid,
  Info,
  ChevronRight,
  TrendingUp,
  Target,
  FileDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'sonner'
import { saveToolData } from '@/app/actions/roadmap'
import { cn } from "@/lib/utils"
import { useDebounce } from '@/lib/hooks/use-debounce'

import { ERRCData, ERRCItem, ERRCQuadrant, Competitor } from './types'
import { FactorCard } from './FactorCard'
import { StrategyCanvasChart } from './StrategyCanvasChart'

const INITIAL_DATA: ERRCData = {
  industryContext: "Standard Industry Factors",
  items: [
    { id: '1', name: 'Price', quadrant: 'reduce', impact: 4, industryStandard: 8, targetLevel: 5 },
    { id: '2', name: 'Brand Prestige', quadrant: 'reduce', impact: 3, industryStandard: 7, targetLevel: 3 },
    { id: '3', name: 'Product Complexity', quadrant: 'eliminate', impact: 5, industryStandard: 6, targetLevel: 0 },
    { id: '4', name: 'Ease of Use', quadrant: 'raise', impact: 5, industryStandard: 4, targetLevel: 9 },
    { id: '5', name: 'Mobile Accessibility', quadrant: 'raise', impact: 4, industryStandard: 3, targetLevel: 10 },
    { id: '6', name: 'Eco-Friendly Features', quadrant: 'create', impact: 5, industryStandard: 0, targetLevel: 8 },
  ],
  competitors: [
    {
      id: 'c1',
      name: 'Leader A',
      color: '#f43f5e',
      scores: { '1': 9, '2': 8, '3': 7, '4': 5, '5': 4, '6': 0 }
    }
  ],
  version: 1
}

interface Props {
  tool: any;
  progress: any;
  onDataSaved?: () => void;
}

export function ERRCCanvas({ tool, progress, onDataSaved }: Props) {
  const [data, setData] = useState<ERRCData>(progress?.data || INITIAL_DATA)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("grid")
  const [lastSavedData, setLastSavedData] = useState<string>(JSON.stringify(progress?.data || INITIAL_DATA))

  const debouncedData = useDebounce(data, 2000)

  const handleUpdateItem = (id: string, updates: Partial<ERRCItem>) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, ...updates } : item)
    }))
  }

  const handleRemoveItem = (id: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const handleAddItem = (quadrant: ERRCQuadrant) => {
    const newItem: ERRCItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: "New Factor",
      quadrant,
      impact: 3,
      industryStandard: quadrant === 'create' ? 0 : 5,
      targetLevel: quadrant === 'eliminate' ? 0 : (quadrant === 'reduce' ? 3 : 8),
    }
    setData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const handleSave = async (isAuto = false) => {
    const currentDataStr = JSON.stringify(data)
    if (isAuto && currentDataStr === lastSavedData) return

    setSaving(true)
    try {
      const res = await saveToolData(tool.toolId, data)
      if (res.error) {
        if (!isAuto) toast.error(res.error)
      } else {
        if (!isAuto) toast.success("ERRC Strategy Canvas saved!")
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

  const quadrants: ERRCQuadrant[] = ['eliminate', 'reduce', 'raise', 'create']

  const getQuadrantLabel = (q: ERRCQuadrant) => {
    switch (q) {
      case 'eliminate': return { title: "Eliminate", desc: "Factors industry takes for granted but lack value", color: "text-rose-600", bg: "bg-rose-50" }
      case 'reduce': return { title: "Reduce", desc: "Factors over-designed to beat competition", color: "text-orange-600", bg: "bg-orange-50" }
      case 'raise': return { title: "Raise", desc: "Factors that should be raised above standard", color: "text-emerald-600", bg: "bg-emerald-50" }
      case 'create': return { title: "Create", desc: "New factors industry never offered", color: "text-blue-600", bg: "bg-blue-50" }
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header Bar */}
      <div className="h-16 shrink-0 border-b bg-white flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">ERRC Strategy Canvas</h2>
          </div>
          <Badge variant="outline" className="bg-slate-50 text-slate-500 font-medium">
            Blue Ocean Innovation
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-9">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="grid" className="text-xs px-4">
                <LayoutGrid className="h-3.5 w-3.5 mr-2" />
                Planning Grid
              </TabsTrigger>
              <TabsTrigger value="canvas" className="text-xs px-4">
                <ChartIcon className="h-3.5 w-3.5 mr-2" />
                Value Curve
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="h-6 w-[1px] bg-slate-200 mx-1" />

          <Button size="sm" onClick={() => handleSave(false)} disabled={saving} className="bg-slate-900 shadow-sm">
            {saving ? <Sparkles className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Analysis
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="grid" className="space-y-6 mt-0">
            {/* Info Legend */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {quadrants.map(q => {
                const meta = getQuadrantLabel(q)
                return (
                  <div key={q} className={cn("p-3 rounded-xl border flex flex-col gap-1 shadow-sm", meta.bg)}>
                    <h4 className={cn("text-xs font-bold uppercase tracking-wider", meta.color)}>{meta.title}</h4>
                    <p className="text-[10px] text-slate-600 leading-tight">{meta.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* The 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {quadrants.map(q => {
                const meta = getQuadrantLabel(q)
                return (
                  <Card key={q} className="border-2 border-dashed flex flex-col min-h-[400px]">
                    <CardHeader className="py-4 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-[5]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-2 h-8 rounded-full", meta.bg.replace('/50', ''), meta.color.replace('text-', 'bg-'))} />
                          <CardTitle className="text-base font-bold">{meta.title}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleAddItem(q)} className="text-slate-500">
                          <Plus className="h-4 w-4 mr-2" /> Add Factor
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-1 space-y-4">
                      {data.items.filter(i => i.quadrant === q).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20 grayscale opacity-50">
                          <Plus className="h-12 w-12 mb-2 stroke-[1px]" />
                          <p className="text-sm font-medium">No {q} factors added yet</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {data.items.filter(i => i.quadrant === q).map(item => (
                            <FactorCard
                              key={item.id}
                              item={item}
                              onUpdate={handleUpdateItem}
                              onRemove={handleRemoveItem}
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="canvas" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between items-center px-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800">Strategy Canvas Layout</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <FileDown className="h-4 w-4 mr-2" /> Export
                    </Button>
                  </div>
                </div>

                <StrategyCanvasChart items={data.items} competitors={data.competitors} />

                <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg leading-tight mb-1">Differentiation Index: High</h4>
                    <p className="text-blue-100 text-sm">Your strategy curve shows significant divergence from the industry standard in 4 key factors.</p>
                  </div>
                  <Button className="bg-white text-blue-600 hover:bg-white/90">View Gap Analysis</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 px-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-slate-400" />
                  Innovation Insights
                </h3>

                <div className="space-y-3">
                  <Card className="border-none bg-emerald-50 shadow-none">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-emerald-800 text-sm mb-2">Cost-Value Optimization</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        By eliminating **Product Complexity** and reducing **Brand Prestige**, you could achieve a 30-40% reduction in operational overhead while focusing on high-value factors like **Ease of Use**.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-blue-50 shadow-none">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-blue-800 text-sm mb-2">Blue Ocean Potential</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Your **Eco-Friendly Features** create a new category that competitors aren't addressing. This is your primary "Leap in Value".
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-slate-200 shadow-sm">
                    <CardHeader className="py-3 px-4 border-b">
                      <CardTitle className="text-sm font-bold">Industry Factors</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500">Industry Context</p>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none px-3 py-1">
                          General Tech Services
                        </Badge>
                      </div>
                      <div className="pt-2 border-t text-[10px] text-slate-400 font-medium italic">
                        Select a different industry template to see common factors.
                      </div>
                      <Button variant="outline" className="w-full text-xs h-9 font-bold" disabled>
                        Browse Templates
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
