"use client"

import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { Card, CardContent } from "@/components/ui/card"

interface ProfessionalStepProps {
    form: UseFormReturn<any>
}

export function ProfessionalStep({ form }: ProfessionalStepProps) {
    const expertiseOptions = [
        { label: "Agriculture", value: "Agriculture" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Education", value: "Education" },
        { label: "Technology", value: "Technology" },
        { label: "Environment", value: "Environment" },
        { label: "Rural Development", value: "Rural Development" },
        // Add more options as needed
    ]

    return (
        <Card>
            <CardContent className="pt-6 space-y-4">
                <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Areas of Expertise <span className="text-red-500">*</span></FormLabel>
                            <FormDescription>Select the primary domains this stakeholder operates in.</FormDescription>
                            <FormControl>
                                <MultiSelect
                                    options={expertiseOptions}
                                    selected={field.value || []}
                                    onChange={field.onChange}
                                    placeholder="Select expertise..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="yearsExperience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g. 15" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Add more fields like Education, Specializations as needed */}
                </div>
            </CardContent>
        </Card>
    )
}
