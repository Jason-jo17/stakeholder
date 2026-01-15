"use client"

import { InteractionsList } from "@/components/interactions/InteractionsList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { InteractionDialog } from "@/components/interactions/InteractionDialog"
import { useState } from "react"

export function InteractionsTab({ stakeholder }: { stakeholder: any }) {
    const [open, setOpen] = useState(false)

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Interactions</CardTitle>
                <InteractionDialog
                    stakeholderId={stakeholder.id}
                    stakeholderName={stakeholder.user.name}
                    open={open}
                    onOpenChange={setOpen}
                    trigger={
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Log New
                        </Button>
                    }
                />
            </CardHeader>
            <CardContent>
                <InteractionsList interactions={stakeholder.interactions} />
            </CardContent>
        </Card>
    )
}
