
"use client"

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts'
import { ERRCItem, Competitor } from './types'

interface Props {
  items: ERRCItem[];
  competitors: Competitor[];
}

export function StrategyCanvasChart({ items, competitors }: Props) {
  const chartData = items.map(item => {
    const dataPoint: any = {
      name: item.name,
      industry: item.industryStandard,
      target: item.targetLevel,
    }

    competitors.forEach(comp => {
      dataPoint[comp.name] = comp.scores[item.id] || 0
    })

    return dataPoint
  })

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-xl border shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            interval={0} 
            height={60} 
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis 
            domain={[0, 10]} 
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" height={36}/>
          
          <Line
            type="monotone"
            dataKey="industry"
            name="Industry Standard"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
          />
          
          <Line
            type="monotone"
            dataKey="target"
            name="Our Strategy (Blue Ocean)"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{ r: 6, fill: '#2563eb' }}
            activeDot={{ r: 8 }}
          />

          {competitors.map(comp => (
            <Line
              key={comp.id}
              type="monotone"
              dataKey={comp.name}
              stroke={comp.color}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
