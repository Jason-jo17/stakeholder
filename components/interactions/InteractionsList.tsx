"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Calendar, Phone, Mail } from "lucide-react"

export function InteractionsList({ interactions, compact = false }: { interactions: any[], compact?: boolean }) {
    if (!interactions?.length) {
        return <div className="text-muted-foreground p-4 text-center">No interactions logged yet.</div>
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'Meeting': return <Calendar className="h-4 w-4" />
            case 'Call': return <Phone className="h-4 w-4" />
            case 'Email': return <Mail className="h-4 w-4" />
            default: return <MessageSquare className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-4">
            {interactions.map(interaction => (
                <Card key={interaction.id} className={compact ? "shadow-none border-0 bg-transparent" : ""}>
                    <CardContent className={compact ? "p-0 py-2 border-b last:border-0" : "p-4"}>
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="mt-1 bg-muted p-2 rounded-full h-fit">
                                    {getIcon(interaction.type)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">{interaction.subject}</h4>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        {new Date(interaction.occurredAt).toLocaleDateString()} • {interaction.initiator?.name || "Unknown"}
                                    </p>
                                    {!compact && <p className="text-sm mt-2">{interaction.notes}</p>}
                                    {!compact && interaction.outcome && (
                                        <div className="mt-2 bg-green-50 p-2 rounded text-xs text-green-800 border border-green-200">
                                            Outcome: {interaction.outcome}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Badge variant="outline">{interaction.type}</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
