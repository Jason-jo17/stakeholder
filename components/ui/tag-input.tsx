import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { X } from "lucide-react"

export function TagInput({ value = [], onChange, placeholder }: any) {
    const [input, setInput] = useState("")

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault()
            const newValue = [...value, input.trim()]
            onChange(newValue)
            setInput("")
        }
    }

    const removeTag = (idx: number) => {
        const newValue = [...value]
        newValue.splice(idx, 1)
        onChange(newValue)
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {value.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(idx)} />
                    </Badge>
                ))}
            </div>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || "Type and press Enter..."}
            />
        </div>
    )
}
