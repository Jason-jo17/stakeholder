"use client"

import { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

interface ReviewStepProps {
    form: UseFormReturn<any>
}

export function ReviewStep({ form }: ReviewStepProps) {
    const values = form.getValues()

    return (
        <div className="space-y-6">
            <Alert className="bg-green-50 text-green-900 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Almost Done!</AlertTitle>
                <AlertDescription>
                    Please review the information below before adding this stakeholder to the directory.
                </AlertDescription>
            </Alert>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Basic Identity</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold block">Name</span>
                            {values.name}
                        </div>
                        <div>
                            <span className="font-semibold block">Designation</span>
                            {values.designation}
                        </div>
                        <div>
                            <span className="font-semibold block">Organization</span>
                            {values.organization} ({values.organizationType})
                        </div>
                        <div>
                            <span className="font-semibold block">District</span>
                            {values.district}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Professional Info</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <div>
                            <span className="font-semibold block mb-1">Expertise</span>
                            <div className="flex gap-2 flex-wrap">
                                {values.expertise?.map((e: string) => (
                                    <span key={e} className="bg-secondary px-2 py-1 rounded-md text-xs">{e}</span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold block">Email</span>
                            {values.email}
                        </div>
                        <div>
                            <span className="font-semibold block">Phone</span>
                            {values.phone}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
