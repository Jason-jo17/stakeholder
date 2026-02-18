
"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Check, X } from "lucide-react"
import { requestConnection } from "@/actions/stakeholder"
import { useState, useTransition } from "react"
import { toast } from "sonner"

export function ConnectButton({ stakeholderId }: { stakeholderId: string }) {
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')

    const handleConnect = () => {
        startTransition(async () => {
            const result = await requestConnection(stakeholderId)
            if (result.success) {
                setStatus('sent')
                toast.success("Request Sent", {
                    description: "Your connection request has been sent successfully.",
                })
            } else {
                setStatus('error')
                toast.error("Error", {
                    description: result.error || "Failed to send request.",
                })
            }
        })
    }

    if (status === 'sent') {
        return (
            <Button disabled className="bg-green-600 text-white font-bold h-11 px-8 rounded-lg">
                <Check className="mr-2 h-4.5 w-4.5" />
                Request Sent
            </Button>
        )
    }

    return (
        <Button
            onClick={handleConnect}
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-lg shadow-lg shadow-primary/20"
        >
            {isPending ? (
                <span>Sending...</span>
            ) : (
                <>
                    <MessageSquare className="mr-2 h-4.5 w-4.5" />
                    Connect
                </>
            )}
        </Button>
    )
}
