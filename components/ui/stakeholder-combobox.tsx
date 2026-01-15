import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StakeholderCombobox({ value, onChange, stakeholders }: any) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select stakeholder..." />
            </SelectTrigger>
            <SelectContent>
                {stakeholders?.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                        {s.user.name}
                    </SelectItem>
                )) || <SelectItem value="loading" disabled>Loading...</SelectItem>}
                {!stakeholders?.length && <SelectItem value="none" disabled>No stakeholders found</SelectItem>}
            </SelectContent>
        </Select>
    )
}
