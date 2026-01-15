import { Input } from "@/components/ui/input"

export function DateTimePicker({ value, onChange }: { value: Date, onChange: (date: Date) => void }) {
    // Convert Date to string strictly for input
    const val = value ? new Date(value).toISOString().slice(0, 16) : ''

    return (
        <Input
            type="datetime-local"
            value={val}
            onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : new Date())}
        />
    )
}
