
"use client"

import { Stakeholder } from "./types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface Props {
    stakeholders: Stakeholder[]
    onSelectStakeholder: (s: Stakeholder) => void
}

export function PowerInterestMatrix({ stakeholders, onSelectStakeholder }: Props) {
    // 0-10 scale for both axes
    // Convert to percentage for CSS placement (10 = 100%, 0 = 0%)
    
    // Quadrants:
    // Top-Right: Manage Closely (High Power, High Interest)
    // Top-Left: Keep Satisfied (High Power, Low Interest)
    // Bottom-Right: Keep Informed (Low Power, High Interest)
    // Bottom-Left: Monitor (Low Power, Low Interest)

    return (
        <div className="relative w-full aspect-square md:aspect-[16/10] bg-white border rounded-xl overflow-hidden shadow-sm">
            
            {/* --- Grid Lines & Labels --- */}
            <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 flex border-b border-black/10">
                    <div className="flex-1 border-r border-black/10 bg-orange-50/30 p-4 relative group">
                        <span className="absolute top-2 left-2 font-bold text-orange-800/20 text-4xl group-hover:text-orange-800/40 transition-colors pointer-events-none uppercase">Keep Satisfied</span>
                    </div>
                    <div className="flex-1 bg-red-50/30 p-4 relative group">
                        <span className="absolute top-2 right-2 font-bold text-red-800/20 text-4xl group-hover:text-red-800/40 transition-colors pointer-events-none uppercase text-right">Manage Closely</span>
                    </div>
                </div>
                <div className="flex-1 flex">
                    <div className="flex-1 border-r border-black/10 bg-slate-50/30 p-4 relative group">
                         <span className="absolute bottom-2 left-2 font-bold text-slate-800/20 text-4xl group-hover:text-slate-800/40 transition-colors pointer-events-none uppercase">Monitor</span>
                    </div>
                    <div className="flex-1 bg-blue-50/30 p-4 relative group">
                         <span className="absolute bottom-2 right-2 font-bold text-blue-800/20 text-4xl group-hover:text-blue-800/40 transition-colors pointer-events-none uppercase text-right">Keep Informed</span>
                    </div>
                </div>
            </div>

            {/* --- Axis Labels --- */}
            <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-sm tracking-widest text-slate-500">INTEREST →</div>
            <div className="absolute left-4 bottom-0 top-0 flex items-center">
                <div className="font-bold text-sm tracking-widest text-slate-500 -rotate-90 origin-center whitespace-nowrap">POWER →</div>
            </div>

            {/* --- Plot Area --- */}
            <div className="absolute inset-[40px] z-10">
                {stakeholders.map(s => {
                    // Map 1-10 to 0-100%
                    // We need to invert Y because CSS top 0 is top
                    const x = ((s.interest - 1) / 9) * 100
                    const y = 100 - ((s.power - 1) / 9) * 100

                    return (
                        <div 
                            key={s.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 hover:z-50"
                            style={{ left: `${x}%`, top: `${y}%` }}
                            onClick={() => onSelectStakeholder(s)}
                        >
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className={`
                                            h-4 w-4 md:h-8 md:w-8 rounded-full border-2 border-white shadow-md flex items-center justify-center
                                            ${s.attitude === 'supporter' ? 'bg-green-500' : s.attitude === 'blocker' ? 'bg-red-500' : 'bg-slate-500'}
                                        `}>
                                            <span className="text-[8px] md:text-xs text-white font-bold">{s.name.charAt(0)}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="text-xs">
                                            <p className="font-bold">{s.name}</p>
                                            <p>{s.role}</p>
                                            <p className="text-[10px] text-muted-foreground mt-1">P:{s.power} I:{s.interest}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-medium bg-white/80 px-1 rounded whitespace-nowrap hidden md:block backdrop-blur-sm">
                                {s.name}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
