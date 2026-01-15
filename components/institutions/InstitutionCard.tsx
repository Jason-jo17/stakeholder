import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Globe, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export function InstitutionCard({ institution }: { institution: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{institution.name}</CardTitle>
                            <div className="text-sm text-muted-foreground">{institution.type}</div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {institution.description}
                </p>

                <div className="space-y-2 text-sm">
                    {institution.districts && institution.districts.length > 0 && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{institution.districts.slice(0, 3).join(', ')}{institution.districts.length > 3 && ` +${institution.districts.length - 3}`}</span>
                        </div>
                    )}
                    {institution.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a href={institution.website.startsWith('http') ? institution.website : `https://${institution.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                                Website
                            </a>
                        </div>
                    )}
                </div>

                {institution.resourcesOffered && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {institution.resourcesOffered.slice(0, 3).map((s: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardFooter>
                <Button className="w-full" variant="ghost" asChild>
                    <Link href={`/institutions/${institution.id}`}>
                        View Profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
