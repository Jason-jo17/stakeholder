"use client"

import React, { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import {
    Plus,
    Layout,
    Presentation
} from 'lucide-react'
import {
    PitchDeckState,
    PitchDeck,
    Slide,
    PitchContext
} from './types'
import { cn } from "@/lib/utils"

// Sub-components
import { DeckEditor } from './DeckEditor'
import { TemplateSelector } from './TemplateSelector'
// import { PresenterMode } from './PresenterMode'
// import { DeckPreview } from './DeckPreview'

const INITIAL_DATA: PitchDeckState = {
    decks: [],
    currentDeckId: null,
    activeSlideId: null,
    view: 'dashboard',
    version: 1
}

interface PitchDeckBuilderProps {
    tool: any;
    progress: any;
}

export default function PitchDeckBuilder({ tool, progress }: PitchDeckBuilderProps) {
    const [state, setState] = useState<PitchDeckState>(() => {
        if (progress?.data) {
            try {
                return typeof progress.data === 'string'
                    ? JSON.parse(progress.data)
                    : progress.data
            } catch (e) {
                return INITIAL_DATA
            }
        }
        return INITIAL_DATA
    })

    // Auto-save logic
    useEffect(() => {
        const saveTimeout = setTimeout(() => {
            // In a real app, this would be a server-side save
            localStorage.setItem(`pitch_deck_${tool.id}`, JSON.stringify(state))
        }, 1000)
        return () => clearTimeout(saveTimeout)
    }, [state, tool.id])

    const handleUpdate = (newState: PitchDeckState) => {
        setState(newState)
    }

    const handleCreateDeck = (title: string) => {
        setState({ ...state, view: 'template_selection' })
    }

    const handleSelectTemplate = (context: PitchContext) => {
        const newDeck: PitchDeck = {
            pitchdeck_id: `deck-${Date.now()}`,
            deck_title: "Untitled Pitch",
            company_name: "Startup Name",
            pitch_context: context,
            slides: [
                {
                    slide_id: `slide-${Date.now()}-1`,
                    slide_number: 1,
                    slide_type: 'cover',
                    template_used: 'default',
                    content: {
                        headline: "Untitled Pitch",
                        body_text: "Tagline goes here...",
                        bullet_points: [],
                        images: [],
                        charts: [],
                        evidence_references: []
                    },
                    presenter_notes: "",
                    ai_suggestions: [],
                    review_comments: [],
                    design: { layout: 'centered', theme: 'professional' }
                }
            ],
            evidence_library: [],
            storytelling_structure: {
                hook: "",
                problem_story: "",
                solution_narrative: "",
                traction_proof: "",
                vision_statement: "",
                call_to_action: ""
            },
            funding_ask: {
                amount: 0,
                currency: 'USD',
                use_of_funds: [],
                milestones: []
            },
            versions: [],
            team_id: 'team-1'
        }

        setState({
            ...state,
            decks: [newDeck, ...state.decks],
            currentDeckId: newDeck.pitchdeck_id,
            view: 'editor'
        })
        toast.success(`${context.replace('_', ' ')} deck created!`)
    }

    const currentDeck = state.decks.find(d => d.pitchdeck_id === state.currentDeckId)

    return (
        <div className="h-full w-full bg-slate-50 overflow-hidden flex flex-col">
            {/* View Orchestration */}
            {state.view === 'dashboard' && (
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <header className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Pitch Deck Builder</h1>
                                <p className="text-slate-500 font-medium">Build investor-ready decks with evidence-based storytelling.</p>
                            </div>
                            <Button
                                onClick={() => handleCreateDeck("Untitled Pitch")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-6 font-bold shadow-xl shadow-indigo-100"
                            >
                                Create New Deck
                            </Button>
                        </header>

                        {/* List Decks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {state.decks.length === 0 ? (
                                <div
                                    onClick={() => handleCreateDeck("Seed Pitch Deck")}
                                    className="col-span-full p-20 flex flex-col items-center justify-center border-dashed border-4 border-slate-200 bg-white rounded-[40px] hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer transition-all group shrink-0"
                                >
                                    <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                                        <Plus className="h-8 w-8 text-slate-400 group-hover:text-indigo-600" />
                                    </div>
                                    <p className="text-slate-400 font-black uppercase tracking-widest group-hover:text-indigo-900 transition-colors">Start Your First Pitch</p>
                                </div>
                            ) : (
                                state.decks.map(deck => (
                                    <Card
                                        key={deck.pitchdeck_id}
                                        className="p-8 cursor-pointer border-2 border-slate-100 rounded-[32px] hover:border-indigo-500 hover:shadow-2xl transition-all duration-500 bg-white group flex flex-col"
                                        onClick={() => setState({ ...state, currentDeckId: deck.pitchdeck_id, view: 'editor' })}
                                    >
                                        <div className="aspect-video bg-slate-900 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        <div className="space-y-4 flex-1 flex flex-col">
                                            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-tight line-clamp-2">{deck.deck_title}</h3>

                                            <div className="flex items-center justify-between pt-auto">
                                                <Badge className="bg-indigo-50 text-indigo-600 border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest">{deck.pitch_context}</Badge>
                                                <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                    <Presentation size={12} />
                                                    {deck.slides.length} Slides
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {state.view === 'template_selection' && (
                <TemplateSelector
                    onSelect={handleSelectTemplate}
                    onBack={() => setState({ ...state, view: 'dashboard' })}
                />
            )}

            {state.view === 'editor' && currentDeck && (
                <DeckEditor
                    deck={currentDeck}
                    onUpdate={(updatedDeck) => setState({
                        ...state,
                        decks: state.decks.map(d => d.pitchdeck_id === updatedDeck.pitchdeck_id ? updatedDeck : d)
                    })}
                    onBack={() => setState({ ...state, view: 'dashboard' })}
                />
            )}
        </div>
    )
}
