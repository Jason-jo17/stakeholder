"use client"

import { useInstitution } from "@/lib/hooks/use-institutions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, Globe, Phone, Mail, CheckCircle, Target, Briefcase, IndianRupee } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function InstitutionDetailPage() {
    const params = useParams()
    const { data: institution, isLoading } = useInstitution(params.id as string)

    if (isLoading || !institution) {
        return <div className="container py-8">Loading...</div>
    }

    return (
        <div className="container py-8 space-y-8">
            {/* Header */}
            <div>
                <Button variant="ghost" className="mb-4 pl-0" asChild>
                    <Link href="/institutions"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory</Link>
                </Button>
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline">{institution.type}</Badge>
                    {institution.shortName && <Badge variant="secondary">{institution.shortName}</Badge>}
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold mb-2">{institution.name}</h1>
                    {institution.verificationStatus === 'Verified' && <CheckCircle className="h-6 w-6 text-green-600" />}
                </div>
                <p className="text-xl text-muted-foreground">{institution.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{institution.missionStatement || "Mission statement not available."}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Resources & Services</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="font-semibold mb-2">Resources Offered</div>
                                <div className="flex flex-wrap gap-2">
                                    {institution.resourcesOffered?.map((res: string) => (
                                        <Badge key={res} variant="secondary">{res}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold mb-2">Focus Sectors</div>
                                <div className="flex flex-wrap gap-2">
                                    {institution.sectors?.map((sec: string) => (
                                        <Badge key={sec} variant="outline" className="border-primary text-primary">{sec}</Badge>
                                    ))}
                                </div>
                            </div>
                            {institution.districts && (
                                <div>
                                    <div className="font-semibold mb-2">Geographic Reach</div>
                                    <p className="text-sm text-muted-foreground">{institution.districts.join(', ')}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact & Location</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {institution.headquarters && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                    <div>
                                        <div className="font-medium">Headquarters</div>
                                        <div className="text-sm text-muted-foreground">{institution.headquarters}</div>
                                    </div>
                                </div>
                            )}
                            {institution.website && (
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <a href={institution.website.startsWith('http') ? institution.website : `https://${institution.website}`} className="text-blue-600 hover:underline">{institution.website}</a>
                                </div>
                            )}
                            {institution.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{institution.phone}</span>
                                </div>
                            )}
                            {institution.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{institution.email}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {(institution.fundingType || institution.fundingRange) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Support</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {institution.fundingRange && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Range</span>
                                        <span className="font-bold">{institution.fundingRange}</span>
                                    </div>
                                )}
                                {institution.fundingType && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {institution.fundingType.map((f: string) => (
                                            <Badge key={f} className="bg-green-100 text-green-800">{f}</Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
