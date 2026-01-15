"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Loader2, Send, Bot, FileText, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    sources?: any[]
}

export function AIChatTab({ stakeholder }: { stakeholder: any }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stakeholderId: stakeholder.id,
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
                })
            })

            const data = await response.json()

            const aiMessage: Message = {
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
                sources: data.sources
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('AI chat error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>AI Assistant</CardTitle>
                        <CardDescription>
                            Ask questions about {stakeholder.user.name}&apos;s profile, interactions, and insights
                        </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Powered by RAG
                    </Badge>
                </div>
            </CardHeader>

            {/* Suggested Questions */}
            {messages.length === 0 && (
                <div className="p-4 border-b bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-3 font-medium">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "What are the main problem statements?",
                            "Summarize recent interactions",
                            "What solutions have been proposed?",
                            "Who are similar stakeholders?"
                        ].map(question => (
                            <Button
                                key={question}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setInput(question)
                                    // Optional: auto send
                                }}
                            >
                                {question}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={cn(
                            "flex gap-3",
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}>
                            {message.role === 'assistant' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            )}

                            <div className={cn(
                                "rounded-lg p-3 max-w-[80%] text-sm",
                                message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                            )}>
                                <p className="whitespace-pre-wrap">{message.content}</p>

                                {/* Citations from RAG */}
                                {message.sources && message.sources.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-border/50">
                                        <p className="text-xs opacity-70 mb-2">Sources:</p>
                                        <div className="space-y-1">
                                            {message.sources.map((source: any, idx: number) => (
                                                <div key={idx} className="flex items-center text-xs opacity-80 bg-background/10 p-1 rounded">
                                                    <FileText className="h-3 w-3 mr-2 flex-shrink-0" />
                                                    <span className="truncate">{source.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <p className="text-[10px] opacity-50 mt-1 text-right">
                                    {format(message.timestamp, 'p')}
                                </p>
                            </div>

                            {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex items-center gap-2 text-muted-foreground ml-12">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Analyzing interactions...</span>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <CardFooter className="border-t p-4">
                <div className="flex w-full gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about this stakeholder..."
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
