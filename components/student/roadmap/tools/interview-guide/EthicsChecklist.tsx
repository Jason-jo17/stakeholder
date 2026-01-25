
"use client"

import { InterviewGuideData } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react"

interface Props {
    data: InterviewGuideData
    setData: (data: InterviewGuideData) => void
    readOnly?: boolean
}

export function EthicsChecklist({ data, setData, readOnly }: Props) {
    const updateEthics = (field: keyof typeof data.ethics, value: any) => {
        if (readOnly) return
        setData({
            ...data,
            ethics: { ...data.ethics, [field]: value }
        })
    }

    // Calculate score
    const checks = [
        data.ethics.informedConsent,
        data.ethics.privacyProtection,
        data.ethics.nonHarmPrinciple,
        data.ethics.recordingPermission
    ]
    const score = checks.filter(Boolean).length
    const total = checks.length
    const percent = Math.round((score / total) * 100)

    return (
        <div className="space-y-6">
            <Alert variant={percent === 100 ? "default" : "destructive"} className={percent === 100 ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}>
                {percent === 100 ? <ShieldCheck className="h-4 w-4 text-green-600" /> : <ShieldAlert className="h-4 w-4 text-orange-600" />}
                <AlertTitle className={percent === 100 ? "text-green-800" : "text-orange-800"}>
                    Compliance Score: {percent}%
                </AlertTitle>
                <AlertDescription className={percent === 100 ? "text-green-700" : "text-orange-700"}>
                    {percent === 100
                        ? "Great job! Your study plan meets core ethical standards."
                        : "Please address the missing ethical safeguards before conducting interviews."}
                </AlertDescription>
            </Alert>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            Core Safeguards
                        </CardTitle>
                        <CardDescription>Must-haves for ethical research.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Informed Consent</Label>
                                <p className="text-xs text-muted-foreground">Will you explain the purpose and get permission?</p>
                            </div>
                            <Switch
                                checked={data.ethics.informedConsent}
                                onCheckedChange={(c: boolean) => updateEthics("informedConsent", c)}
                                disabled={readOnly}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Privacy Protection</Label>
                                <p className="text-xs text-muted-foreground">Will PII be kept private and secure?</p>
                            </div>
                            <Switch
                                checked={data.ethics.privacyProtection}
                                onCheckedChange={(c: boolean) => updateEthics("privacyProtection", c)}
                                disabled={readOnly}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Non-Harm Principle</Label>
                                <p className="text-xs text-muted-foreground">Confirm no physical/psychological harm risks.</p>
                            </div>
                            <Switch
                                checked={data.ethics.nonHarmPrinciple}
                                onCheckedChange={(c: boolean) => updateEthics("nonHarmPrinciple", c)}
                                disabled={readOnly}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Recording Permission</Label>
                                <p className="text-xs text-muted-foreground">Explicit consent before analyzing audio/video.</p>
                            </div>
                            <Switch
                                checked={data.ethics.recordingPermission}
                                onCheckedChange={(c: boolean) => updateEthics("recordingPermission", c)}
                                disabled={readOnly}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Data Management</CardTitle>
                        <CardDescription>How you handle the data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Anonymization Plan</Label>
                            <Textarea
                                value={data.ethics.anonymizationPlan}
                                onChange={e => updateEthics("anonymizationPlan", e.target.value)}
                                className="h-24 text-sm"
                                disabled={readOnly}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Data Retention Policy</Label>
                            <Textarea
                                value={data.ethics.dataRetention}
                                onChange={e => updateEthics("dataRetention", e.target.value)}
                                className="h-24 text-sm"
                                disabled={readOnly}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
