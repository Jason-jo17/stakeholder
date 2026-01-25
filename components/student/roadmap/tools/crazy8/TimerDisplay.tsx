
"use client"

import React, { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Timer, Bell } from 'lucide-react'
import { cn } from "@/lib/utils"

interface TimerProps {
  duration: number; // total duration in seconds
  onInterval: (minute: number) => void;
  onComplete: () => void;
  isActive: boolean;
}

export function TimerDisplay({ duration, onInterval, onComplete, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [lastInterval, setLastInterval] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalId)
          onComplete()
          return 0
        }
        
        const currentMinute = Math.floor((duration - prev + 1) / 60)
        if (currentMinute > lastInterval) {
          setLastInterval(currentMinute)
          onInterval(currentMinute)
        }
        
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isActive, duration, lastInterval, onInterval, onComplete])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className="flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24" cy="24" r="20"
            className="stroke-slate-700 fill-none"
            strokeWidth="4"
          />
          <circle
            cx="24" cy="24" r="20"
            className={cn(
               "stroke-blue-500 fill-none transition-all duration-1000",
               timeLeft < 10 && "stroke-rose-500"
            )}
            strokeWidth="4"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Timer className={cn("h-5 w-5", timeLeft < 10 ? "text-rose-500 animate-pulse" : "text-blue-400")} />
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-black font-mono tracking-tighter w-20">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
          {isActive ? "Ideation Active" : "Session Paused"}
        </span>
      </div>

      {isActive && timeLeft % 60 === 0 && timeLeft !== duration && (
        <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
          <Bell className="h-3 w-3" />
          Next Panel!
        </div>
      )}
    </div>
  )
}
