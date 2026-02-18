"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CoInnovatorBot() {
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! I am your Co Innovator Bot. How can I help you scale your project today?' }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        // Mock response for now, can be connected to an API later
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                role: 'bot', 
                content: `That's a great question about "${input}". To give you the best advice, make sure your Problem Statement and TRL level are updated in the dashboard.` 
            }])
            setIsLoading(false)
        }, 1000)
    }

    return (
        <Card className="h-full border-primary/10 shadow-sm flex flex-col overflow-hidden bg-primary/5">
            <CardHeader className="py-4 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-bold">Co Innovator Bot</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-[250px] p-4">
                    <div className="space-y-4">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${
                                    m.role === 'user' ? 'bg-primary text-white' : 'bg-muted'
                                }`}>
                                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                                    m.role === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none' 
                                    : 'bg-white border text-muted-foreground rounded-tl-none'
                                } shadow-sm`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="p-2 rounded-full h-8 w-8 bg-muted flex items-center justify-center shrink-0">
                                    <Bot className="h-4 w-4 animate-pulse" />
                                </div>
                                <div className="p-3 bg-white border text-muted-foreground rounded-2xl rounded-tl-none text-xs animate-pulse italic">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 bg-white border-t">
                <div className="flex w-full items-center space-x-2">
                    <Input 
                        placeholder="Ask me anything..." 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="text-xs h-9 border-none bg-muted focus-visible:ring-1"
                    />
                    <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSendMessage} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
