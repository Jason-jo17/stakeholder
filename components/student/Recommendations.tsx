
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Lightbulb, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock Data Types
interface Recommendation {
    id: string
    type: 'stakeholder' | 'project'
    title: string
    description: string
    matchScore: number
    tags: string[]
    actionLabel: string
    actionUrl: string
}

export function RecommendationsList({ profile }: { profile: any }) {
    // In a real app, this would fetch from an API based on profile data
    // For now, we mock it based on profile context
    
    const [recommendations, setRecommendations] = useState<Recommendation[]>([
        {
            id: 'rec_1',
            type: 'stakeholder',
            title: 'Dr. R. Balasubramaniam (SVYM)',
            description: 'Expert in Tribal Healthcare. Your focus on "Healthcare Access" aligns with their work.',
            matchScore: 95,
            tags: ['Healthcare', 'Tribal Development', 'NGO'],
            actionLabel: 'Connect',
            actionUrl: '/stakeholders/STK_022' 
        },
        {
            id: 'rec_2',
            type: 'project',
            title: 'Solar-Powered Digital Classrooms',
            description: 'Help implement PS_3.1 in rural schools. Needs technical expertise.',
            matchScore: 88,
            tags: ['Education', 'Technology', 'Infrastructure'],
            actionLabel: 'View Project',
            actionUrl: '/problems/PS_3.1'
        },
        {
            id: 'rec_3',
            type: 'stakeholder',
            title: 'District Administration, Udupi',
            description: 'Looking for solutions for "Waste Management" in coastal areas.',
            matchScore: 82,
            tags: ['Government', 'Waste Management', 'Coastal'],
            actionLabel: 'Connect',
            actionUrl: '/stakeholders/STK_004'
        }
    ])

    const [feedback, setFeedback] = useState<Record<string, 'helpful' | 'not-helpful' | null>>({})

    const handleFeedback = (id: string, type: 'helpful' | 'not-helpful') => {
        setFeedback(prev => ({ ...prev, [id]: type }))
        // In real app, send to server
        console.log(`Recommendation ${id} marked as ${type}`)
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Recommended for You
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map(rec => (
                    <Card key={rec.id} className="relative overflow-hidden border-l-4 border-l-primary/50">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="secondary" className="mb-2 text-[10px] uppercase">
                                    {rec.matchScore}% Match
                                </Badge>
                                <div className="flex gap-1">
                                    {rec.type === 'stakeholder' ? <Users className="w-4 h-4 text-muted-foreground" /> : <Briefcase className="w-4 h-4 text-muted-foreground" />}
                                </div>
                            </div>
                            <CardTitle className="text-base line-clamp-1">{rec.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground mb-3 min-h-[40px]">
                                {rec.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {rec.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <Button size="sm" variant="default" className="w-full text-xs h-8" asChild>
                                    <Link href={rec.actionUrl}>{rec.actionLabel}</Link>
                                </Button>
                            </div>

                            {/* Feedback Section */}
                            <div className="mt-3 pt-3 border-t flex justify-between items-center text-[10px] text-muted-foreground">
                                <span>Was this helpful?</span>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => handleFeedback(rec.id, 'helpful')}
                                        className={`hover:bg-green-100 p-1 rounded transition-colors ${feedback[rec.id] === 'helpful' ? 'text-green-600 font-bold' : ''}`}
                                    >
                                        Yes
                                    </button>
                                    <button 
                                        onClick={() => handleFeedback(rec.id, 'not-helpful')}
                                        className={`hover:bg-red-100 p-1 rounded transition-colors ${feedback[rec.id] === 'not-helpful' ? 'text-red-600 font-bold' : ''}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
