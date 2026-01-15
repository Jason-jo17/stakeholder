import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxGroup({ options, value = [], onChange }: any) {
    const handleChange = (optionValue: string, checked: boolean) => {
        if (checked) {
            onChange([...value, optionValue])
        } else {
            onChange(value.filter((v: string) => v !== optionValue))
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {options.map((opt: any) => (
                <div key={opt.value} className="flex items-center space-x-2">
                    <Checkbox
                        id={opt.value}
                        checked={value.includes(opt.value)}
                        onCheckedChange={(c) => handleChange(opt.value, c as boolean)}
                    />
                    <Label htmlFor={opt.value}>{opt.label}</Label>
                </div>
            ))}
        </div>
    )
}
