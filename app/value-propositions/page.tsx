"use client"

import { useValuePropositions } from "@/lib/hooks/use-value-propositions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Plus, ArrowRight, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function ValuePropositionsPage() {
    const { data: vps } = useValuePropositions()

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Value Proposition Canvas</h1>
                    <p className="text-muted-foreground mt-2">Manage your business model validations</p>
                </div>
                <Button asChild>
                    <Link href="/value-propositions/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Canvas
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vps?.map((vp: any) => (
                    <Card key={vp.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{vp.title}</CardTitle>
                                <Badge variant={vp.status === 'Validated' ? 'secondary' : 'outline'} className={vp.status === 'Validated' ? 'bg-green-100 text-green-800' : ''}>
                                    {vp.status}
                                </Badge>
                            </div>
                            <CardDescription>
                                Last updated {format(new Date(vp.updatedAt), 'MMM d, yyyy')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Target Jobs</span>
                                    <span className="font-medium">{vp.customerJobs.length}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Pains Identified</span>
                                    <span className="font-medium">{vp.pains.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Solutions Mapped</span>
                                    <span className="font-medium">{vp.productsServices.length}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href={`/value-propositions/${vp.id}`}>
                                    Open Canvas <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
