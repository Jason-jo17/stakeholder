
/** Hexagonal navigation for Six Paths Framework */
"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import {
  Search,
  Users,
  Target,
  Box,
  Brain,
  Timer,
  Hexagon
} from 'lucide-react'

interface HexagonalNavProps {
  activeIndex: number;
  onPathClick: (index: number) => void;
}

const PATHS = [
  { id: 1, label: "Alternatives", icon: Search },
  { id: 2, label: "Strategic Groups", icon: Users },
  { id: 3, label: "Buyer Chain", icon: Target },
  { id: 4, label: "Complementary", icon: Box },
  { id: 5, label: "Emotional", icon: Brain },
  { id: 6, label: "Time/Trends", icon: Timer },
]

export function HexagonalNav({ activeIndex, onPathClick }: HexagonalNavProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border shadow-inner">
      {PATHS.map((path, i) => {
        const isActive = activeIndex === i
        const Icon = path.icon

        return (
          <button
            key={path.id}
            onClick={() => onPathClick(i)}
            className={cn(
              "relative group h-10 px-4 rounded-xl flex items-center gap-2 transition-all duration-300",
              isActive
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            <Icon className={cn("h-4 w-4 transition-transform", isActive && "scale-110")} />
            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest hidden lg:block",
              !isActive && "opacity-60"
            )}>
              {path.label}
            </span>
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-blue-600 rounded-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}
