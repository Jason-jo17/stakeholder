
"use client"

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { 
  Pencil, 
  Eraser, 
  RotateCcw, 
  Trash2, 
  Circle, 
  Square, 
  Type,
  Palette
} from 'lucide-react'
import { cn } from "@/lib/utils"

interface SketchCanvasProps {
  initialData?: string;
  onSave: (data: string) => void;
  width?: number;
  height?: number;
  readOnly?: boolean;
}

export function SketchCanvas({ 
  initialData, 
  onSave, 
  width = 400, 
  height = 300,
  readOnly = false 
}: SketchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#000000")
  const [lineWidth, setLineWidth] = useState(3)
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rect' | 'circle'>('pen')
  const [history, setHistory] = useState<string[]>([])
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    // Fill white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Load initial data if provided
    if (initialData) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
      }
      img.src = initialData
    }
  }, [width, height, initialData])

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (readOnly) return
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    
    // Save history point before change
    setHistory(prev => [...prev.slice(-4), canvas.toDataURL()])
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || readOnly) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    
    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      onSave(canvas.toDataURL())
    }
  }

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    
    let clientX, clientY
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = (e as React.MouseEvent).clientX
      clientY = (e as React.MouseEvent).clientY
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    onSave(canvas.toDataURL())
  }

  const undo = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    const img = new Image()
    img.onload = () => {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      setHistory(prevHistory => prevHistory.slice(0, -1))
      onSave(canvas.toDataURL())
    }
    img.src = prev
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {!readOnly && (
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border shadow-sm self-start">
          <Button 
            variant={tool === 'pen' ? 'secondary' : 'ghost'} 
            size="icon" className="h-8 w-8"
            onClick={() => setTool('pen')}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant={tool === 'eraser' ? 'secondary' : 'ghost'} 
            size="icon" className="h-8 w-8"
            onClick={() => setTool('eraser')}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <div className="w-[1px] h-4 bg-slate-200 mx-1" />
          <div className="flex items-center gap-1">
            {["#000000", "#ef4444", "#3b82f6", "#22c55e", "#f59e0b"].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "w-4 h-4 rounded-full border border-slate-200",
                  color === c && "ring-2 ring-blue-500 ring-offset-1"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="w-[1px] h-4 bg-slate-200 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={undo} disabled={history.length === 0}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div 
        className={cn(
          "relative border-2 rounded-xl overflow-hidden cursor-crosshair touch-none bg-white",
          !readOnly && "hover:border-blue-400 transition-colors"
        )}
        style={{ width, height }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  )
}
