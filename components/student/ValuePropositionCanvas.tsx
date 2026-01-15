"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
// We map these to standard Lucide icons which are available
import {
    Plus,
    X,
    Bell,
    CheckCircle,
    ChevronDown,
    HelpCircle,
    History,
    MoreHorizontal,
    Navigation,
    Package,
    User,
    Users,
    ZoomIn,
    Hand,
    FileText,
    Download
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ValueProposition {
    id?: string
    customerJobs: string[]
    pains: string[]
    gains: string[]
    painRelievers: string[]
    gainCreators: string[]
    productsServices: string[]
    validationStatus?: string
}

interface ValuePropositionCanvasProps {
    valueProposition: ValueProposition
    onUpdate: (vp: Partial<ValueProposition>) => void
    readOnly?: boolean
}

const MOCK_STAKEHOLDERS = [
    { id: 'ec', name: 'Eco-Commuter', type: 'Primary' },
    { id: 'mot', name: 'Ministry of Transport', type: 'Strategic' },
    { id: 'dap', name: 'Data Analytics Provider', type: 'Partner' },
    { id: 'bus', name: 'Bus Operators Association', type: 'Operational' }
];

export function ValuePropositionCanvas({
    valueProposition,
    onUpdate,
    readOnly = false
}: ValuePropositionCanvasProps) {
    const [currentStakeholder, setCurrentStakeholder] = useState(MOCK_STAKEHOLDERS[0])
    const [zoomLevel, setZoomLevel] = useState(100)
    const [toolData, setToolData] = useState({ mode: 'select' })

    // Define sections explicitly mapping to data
    const sections = {
        productsServices: { title: "Products & Services", color: "bg-blue-50 border-blue-500", data: valueProposition.productsServices },
        gainCreators: { title: "Gain Creators", color: "bg-green-50 border-green-500", data: valueProposition.gainCreators },
        painRelievers: { title: "Pain Relievers", color: "bg-red-50 border-red-500", data: valueProposition.painRelievers },
        gains: { title: "Gains", color: "bg-green-50 border-green-500", data: valueProposition.gains },
        pains: { title: "Pains", color: "bg-red-50 border-red-500", data: valueProposition.pains },
        customerJobs: { title: "Customer Jobs", color: "bg-purple-50 border-purple-500", data: valueProposition.customerJobs }
    }

    const handleUpdate = (key: keyof ValueProposition, newTags: string[]) => {
        onUpdate({ [key]: newTags })
    }

    const handleToolClick = (mode: string) => {
        setToolData({ mode })
        // Simulation of tool switch
    }

    const handleZoom = () => {
        setZoomLevel(prev => Math.min(prev + 10, 150))
    }

    return (
        <div className="w-full bg-page-bg font-display text-text-heading min-h-screen">
            {/* Custom Header for the Canvas Tool */}
            <div className="flex items-center justify-between whitespace-nowrap border-b border-stroke/20 bg-white px-8 py-3 sticky top-0 z-40 mb-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 text-primary">
                    <div className="size-6 bg-primary/10 rounded p-1 flex items-center justify-center">
                        <FileText className="w-full h-full text-primary" />
                    </div>
                    <h2 className="text-text-heading text-lg font-bold leading-tight tracking-[-0.015em]">Value Canvas Tool</h2>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex gap-3">
                        <button
                            onClick={() => alert('Canvas successfully saved saved to backend!')}
                            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:opacity-90 transition-all gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            <span>Save Canvas</span>
                        </button>
                        <button
                            onClick={() => alert('Canavas Exported as PDF!')}
                            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-secondary text-text-heading text-sm font-bold hover:bg-muted transition-all border border-border gap-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export PDF</span>
                        </button>
                        <button
                            onClick={() => alert('Notifications: No new alerts.')}
                            className="flex items-center justify-center rounded-lg h-9 w-9 bg-secondary text-text-heading hover:bg-muted border border-border"
                        >
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto">
                {/* Intro Section */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-foreground tracking-tight text-3xl font-bold leading-tight">Student Project: Sustainable Urban Mobility</h1>
                        <p className="text-muted-foreground text-sm font-normal">Mapping the value proposition for the <span className="font-bold text-primary">"{currentStakeholder.name}"</span> stakeholder segment.</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex bg-white border border-border rounded-lg p-1 shadow-sm">
                            <button
                                onClick={() => handleToolClick('nav')}
                                className={cn("p-2 rounded-md transition-all", toolData.mode === 'nav' ? "bg-primary text-white" : "text-muted-foreground hover:text-primary")}
                                title="Navigation Mode"
                            >
                                <Navigation className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleToolClick('hand')}
                                className={cn("p-2 rounded-md transition-all", toolData.mode === 'hand' ? "bg-primary text-white" : "text-muted-foreground hover:text-primary")}
                                title="Pan Mode"
                            >
                                <Hand className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleZoom}
                                className="p-2 text-muted-foreground hover:text-primary rounded-md active:bg-muted"
                                title={`Zoom In (${zoomLevel}%)`}
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-center rounded-lg h-11 bg-primary text-white gap-2 text-sm font-bold px-5 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                                    <span className="truncate">Switch Stakeholder: {currentStakeholder.name}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[240px]">
                                <DropdownMenuLabel>Mapped Stakeholders</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {MOCK_STAKEHOLDERS.map(s => (
                                    <DropdownMenuItem
                                        key={s.id}
                                        onClick={() => setCurrentStakeholder(s)}
                                        className="flex flex-col items-start gap-1 cursor-pointer"
                                    >
                                        <span className={cn("font-bold", currentStakeholder.id === s.id ? "text-primary" : "")}>{s.name}</span>
                                        <span className="text-[10px] uppercase text-muted-foreground border px-1 rounded">{s.type}</span>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-primary font-bold cursor-pointer">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add New Stakeholder
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Canvas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 canvas-grid" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
                    {/* Value Map Container */}
                    <div className="bg-white rounded-xl border border-border p-8 flex flex-col gap-6 relative overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                                <Package className="text-primary w-6 h-6" />
                                Value Map
                            </h3>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">Value Creation</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="col-span-1 row-span-2 rounded-lg border border-dashed border-border min-h-[200px] p-4 bg-muted/30 flex flex-col gap-3">
                                <StickyNoteSection
                                    title="Products & Services"
                                    items={valueProposition.productsServices}
                                    onUpdate={(tags) => handleUpdate('productsServices', tags)}
                                    color="bg-blue-50 border-l-4 border-l-blue-500 text-blue-900"
                                />
                            </div>
                            <div className="rounded-lg border border-dashed border-border min-h-[200px] p-4 bg-muted/30 flex flex-col gap-3">
                                <StickyNoteSection
                                    title="Gain Creators"
                                    items={valueProposition.gainCreators}
                                    onUpdate={(tags) => handleUpdate('gainCreators', tags)}
                                    color="bg-green-50 border-l-4 border-l-green-500 text-green-900"
                                />
                            </div>
                            <div className="rounded-lg border border-dashed border-border min-h-[200px] p-4 bg-muted/30 flex flex-col gap-3">
                                <StickyNoteSection
                                    title="Pain Relievers"
                                    items={valueProposition.painRelievers}
                                    onUpdate={(tags) => handleUpdate('painRelievers', tags)}
                                    color="bg-red-50 border-l-4 border-l-red-500 text-red-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stakeholder Profile Circle */}
                    <div className="bg-white rounded-[2rem] border border-border p-12 flex flex-col gap-6 relative aspect-square items-center justify-center shadow-sm">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                            <User className="w-[300px] h-[300px]" />
                        </div>
                        <div className="z-10 w-full h-full relative">
                            <div className="absolute top-0 right-0 left-0 flex justify-center mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                                    <Users className="text-primary w-6 h-6" />
                                    Stakeholder Profile
                                </h3>
                            </div>

                            {/* Gains (Top) */}
                            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 rounded-lg border border-dashed border-border p-3 bg-white/80 flex flex-col gap-2">
                                <StickyNoteSection
                                    title="Gains"
                                    items={valueProposition.gains}
                                    onUpdate={(tags) => handleUpdate('gains', tags)}
                                    color="bg-green-50 text-green-900 text-[11px]"
                                    compact
                                />
                            </div>

                            {/* Pains (Bottom) */}
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-48 rounded-lg border border-dashed border-border p-3 bg-white/80 flex flex-col gap-2">
                                <StickyNoteSection
                                    title="Pains"
                                    items={valueProposition.pains}
                                    onUpdate={(tags) => handleUpdate('pains', tags)}
                                    color="bg-red-50 text-red-900 text-[11px]"
                                    compact
                                />
                            </div>

                            {/* Customer Jobs (Right) */}
                            <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-48 rounded-lg border border-dashed border-border p-3 bg-white/80 flex flex-col gap-2">
                                <StickyNoteSection
                                    title="Customer Jobs"
                                    items={valueProposition.customerJobs}
                                    onUpdate={(tags) => handleUpdate('customerJobs', tags)}
                                    color="bg-purple-50 text-purple-900 text-[11px]"
                                    compact
                                />
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full border border-primary text-primary font-bold text-xs shadow-lg uppercase tracking-wider">
                                {currentStakeholder.name}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collaborators Footer */}
                <div className="mt-12 flex flex-col gap-4 pb-12">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Canvas Collaborators</h4>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3 overflow-hidden">
                            <div className="h-10 w-10 rounded-full ring-2 ring-white bg-blue-100 flex items-center justify-center font-bold text-blue-600">SJ</div>
                            <div className="h-10 w-10 rounded-full ring-2 ring-white bg-green-100 flex items-center justify-center font-bold text-green-600">MK</div>
                            <div className="h-10 w-10 rounded-full ring-2 ring-white bg-purple-100 flex items-center justify-center font-bold text-purple-600">AD</div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 ring-2 ring-white text-xs font-medium text-foreground">+4</div>
                        </div>
                        <button className="text-primary text-sm font-semibold hover:underline">Invite others to edit</button>
                        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                            <History className="w-4 h-4" />
                            <span>Last edited 3 minutes ago by Sarah J.</span>
                        </div>
                    </div>
                </div>

                {/* Methodology Tip */}
                <div className="fixed bottom-8 right-8 bg-white shadow-2xl rounded-lg p-4 border border-border max-w-xs transition-all hover:scale-105 z-[60]">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded p-1 flex">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-sm mb-1 text-foreground">Methodology Tip</p>
                            <p className="text-xs text-muted-foreground">Remember to match your <span className="font-bold text-primary">Pain Relievers</span> directly with the <span className="font-bold text-primary">Pains</span> identified in the stakeholder profile.</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .sticky-note {
                    transition: transform 0.2s ease;
                }
                .sticky-note:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    )
}

function StickyNoteSection({
    title,
    items,
    onUpdate,
    color,
    compact = false
}: {
    title: string,
    items: string[],
    onUpdate: (items: string[]) => void,
    color: string,
    compact?: boolean
}) {
    const [isAdding, setIsAdding] = useState(false)
    const [newItem, setNewItem] = useState("")

    const handleAdd = () => {
        if (newItem.trim()) {
            onUpdate([...items, newItem])
            setNewItem("")
            setIsAdding(false)
        }
    }

    const handleDelete = (index: number) => {
        onUpdate(items.filter((_, i) => i !== index))
    }

    return (
        <>
            <div className="flex justify-between items-center mb-1">
                <h4 className={`font-bold text-foreground ${compact ? 'text-xs uppercase' : 'text-sm'}`} style={compact && title === 'Gains' ? { color: '#1EC075' } : compact && title === 'Pains' ? { color: '#DC143C' } : compact ? { color: '#786BF9' } : {}}>{title}</h4>
                <button
                    onClick={() => setIsAdding(true)}
                    className="text-primary hover:bg-primary/10 p-1 rounded-full flex items-center justify-center"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {items.map((item, idx) => (
                <div key={idx} className={cn("sticky-note p-2 shadow-sm rounded relative group hover:shadow-md cursor-default", color)}>
                    <span className="block pr-4">{item}</span>
                    <button
                        onClick={() => handleDelete(idx)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-60 hover:!opacity-100"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            ))}

            {isAdding && (
                <div className="animate-in fade-in zoom-in-95">
                    <input
                        autoFocus
                        className={cn("w-full p-2 text-sm border rounded shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none", color)}
                        placeholder="Type..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onBlur={() => !newItem && setIsAdding(false)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                </div>
            )}
        </>
    )
}
