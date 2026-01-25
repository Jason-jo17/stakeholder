
"use client"

import React from 'react'
import { ERRCItem, ERRCQuadrant } from './types'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Trash2, TrendingUp, TrendingDown, Minus, MoveHorizontal } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Props {
  item: ERRCItem;
  onUpdate: (id: string, updates: Partial<ERRCItem>) => void;
  onRemove: (id: string) => void;
}

export function FactorCard({ item, onUpdate, onRemove }: Props) {
  const getQuadrantIcon = () => {
    switch (item.quadrant) {
      case 'eliminate': return <Trash2 className="h-4 w-4 text-rose-500" />;
      case 'reduce': return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case 'raise': return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'create': return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  const getQuadrantColor = () => {
    switch (item.quadrant) {
      case 'eliminate': return "border-rose-100 bg-rose-50/50";
      case 'reduce': return "border-orange-100 bg-orange-50/50";
      case 'raise': return "border-emerald-100 bg-emerald-50/50";
      case 'create': return "border-blue-100 bg-blue-50/50";
    }
  };

  return (
    <Card className={cn("group transition-all duration-200 border shadow-none", getQuadrantColor())}>
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            {getQuadrantIcon()}
            <Input
              value={item.name}
              onChange={(e) => onUpdate(item.id, { name: e.target.value })}
              className="bg-transparent border-none p-0 h-auto font-semibold focus-visible:ring-0 text-sm"
              placeholder="Factor name..."
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            <span>Target Level</span>
            <span>{item.targetLevel}/10</span>
          </div>
          <Slider
            value={[item.targetLevel]}
            max={10}
            step={1}
            onValueChange={([val]) => onUpdate(item.id, { targetLevel: val })}
            className="h-1"
          />
        </div>

        {item.quadrant !== 'create' && (
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Industry: {item.industryStandard}</span>
            <span className={cn(
              "font-bold",
              item.targetLevel > item.industryStandard ? "text-emerald-600" : 
              item.targetLevel < item.industryStandard ? "text-rose-600" : "text-slate-400"
            )}>
              {item.targetLevel > item.industryStandard ? `+${item.targetLevel - item.industryStandard}` : 
               item.targetLevel < item.industryStandard ? `${item.targetLevel - item.industryStandard}` : 'Match'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
