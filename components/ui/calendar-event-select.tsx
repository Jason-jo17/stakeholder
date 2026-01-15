import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CalendarEventSelect({ value, onChange }: any) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select calendar event..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">No Event</SelectItem>
                <SelectItem value="1">Interview with Alice (Today)</SelectItem>
                <SelectItem value="2">Meeting with Bob (Yesterday)</SelectItem>
            </SelectContent>
        </Select>
    )
}
