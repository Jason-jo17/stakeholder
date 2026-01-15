"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

interface ValidationStageProps {
    validationResult: {
        valid: number
        invalid: number
        errors: { row: number; reason: string }[]
    }
    onImport: () => void
    onBack: () => void
}

export function ValidationStage({ validationResult, onImport, onBack }: ValidationStageProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-2">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-700">{validationResult.valid}</div>
                        <div className="text-sm text-green-600">Valid Records</div>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-2">
                            <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <div className="text-2xl font-bold text-red-700">{validationResult.invalid}</div>
                        <div className="text-sm text-red-600">Invalid Records</div>
                    </CardContent>
                </Card>
            </div>

            {validationResult.errors.length > 0 && (
                <Card>
                    <CardContent className="p-0">
                        <div className="p-4 border-b font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            Validation Issues
                        </div>
                        <ScrollArea className="h-64">
                            <div className="divide-y">
                                {validationResult.errors.map((err, idx) => (
                                    <div key={idx} className="p-4 hover:bg-muted/50 text-sm flex gap-4">
                                        <span className="font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">Row {err.row}</span>
                                        <span className="text-red-600">{err.reason}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Back to Mapping</Button>
                <Button onClick={onImport} disabled={validationResult.valid === 0}>
                    Import {validationResult.valid} Records
                </Button>
            </div>
        </div>
    )
}
