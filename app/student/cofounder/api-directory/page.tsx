'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ExternalLink, CheckCircle, XCircle, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const SECTORS = [
    { value: 'healthtech', label: 'HealthTech' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'agritech', label: 'AgriTech' },
    { value: 'energy', label: 'Energy' },
    { value: 'smartcities', label: 'Smart Cities' },
    { value: 'deeptech', label: 'DeepTech' },
]

export default function APIDirectoryPage() {
    const [selectedSector, setSelectedSector] = useState('healthtech')
    const [searchQuery, setSearchQuery] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: ['sector-apis', selectedSector],
        queryFn: async () => {
            const res = await fetch(`/api/sector-apis?sector=${selectedSector}`)
            return res.json()
        },
    })

    const filteredAPIs = data?.apis?.filter((api: any) =>
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Group by category
    const groupedAPIs = filteredAPIs?.reduce((acc: any, api: any) => {
        if (!acc[api.category]) acc[api.category] = []
        acc[api.category].push(api)
        return acc
    }, {})

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/student/cofounder">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">API Directory</h1>
                    <p className="text-muted-foreground">
                        Discover and integrate sector-specific APIs for rapid prototyping
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search APIs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Sector Tabs */}
            <Tabs value={selectedSector} onValueChange={setSelectedSector}>
                <TabsList className="grid w-full grid-cols-6">
                    {SECTORS.map((sector) => (
                        <TabsTrigger key={sector.value} value={sector.value}>
                            {sector.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {SECTORS.map((sector) => (
                    <TabsContent key={sector.value} value={sector.value} className="space-y-6">
                        {isLoading && (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                            </div>
                        )}

                        {Object.entries(groupedAPIs || {}).map(([category, apis]: [string, any]) => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold mb-3">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {apis.map((api: any) => (
                                        <Card key={api.id}>
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <CardTitle className="text-base">{api.name}</CardTitle>
                                                        <CardDescription className="mt-1">{api.description}</CardDescription>
                                                    </div>
                                                    <div className="ml-2">
                                                        {api.sandboxReady ? (
                                                            <Badge variant="default" className="bg-green-500">
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                Sandbox
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="secondary">
                                                                <XCircle className="w-3 h-3 mr-1" />
                                                                Docs Only
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Type:</span>
                                                        <Badge variant="outline">{api.apiType}</Badge>
                                                    </div>
                                                    {api.authRequired && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Auth:</span>
                                                            <Badge variant="outline">Required</Badge>
                                                        </div>
                                                    )}
                                                    {api.rateLimits && (
                                                        <div className="text-xs text-muted-foreground">
                                                            Rate Limits: {api.rateLimits.requests_per_minute} req/min
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2 mt-4">
                                                        <Button variant="outline" size="sm" asChild className="flex-1">
                                                            <a href={api.documentationUrl} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                                Docs
                                                            </a>
                                                        </Button>
                                                        {api.sandboxUrl && (
                                                            <Button size="sm" asChild className="flex-1">
                                                                <a href={api.sandboxUrl} target="_blank" rel="noopener noreferrer">
                                                                    Try Sandbox
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
