"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FieldMappingStageProps {
    file: File | null
    previewData: any[]
    headers: string[]
    onNext: (mapping: Record<string, string>) => void
    onBack: () => void
}

const REQUIRED_FIELDS = ['name', 'email', 'designation', 'district']
const AVAILABLE_FIELDS = [
    { value: 'name', label: 'Name (Required)' },
    { value: 'email', label: 'Email (Required)' },
    { value: 'designation', label: 'Designation (Required)' },
    { value: 'district', label: 'District (Required)' },
    { value: 'phone', label: 'Phone' },
    { value: 'organization', label: 'Organization' },
    { value: 'organizationType', label: 'Organization Type' },
    { value: 'expertise', label: 'Expertise' },
    // Add more...
]

export function FieldMappingStage({ file, previewData, headers, onNext, onBack }: FieldMappingStageProps) {
    const [mapping, setMapping] = useState<Record<string, string>>({})

    // Auto-map fields
    useEffect(() => {
        const newMapping: Record<string, string> = {}
        headers.forEach(header => {
            const normalized = header.toLowerCase().replace(/[^a-z0-9]/g, '')
            const match = AVAILABLE_FIELDS.find(f => f.value === normalized || f.label.toLowerCase().includes(normalized))
            if (match) {
                newMapping[header] = match.value
            }
        })
        setMapping(newMapping)
    }, [headers])

    const handleMapChange = (header: string, field: string) => {
        setMapping(prev => ({ ...prev, [header]: field }))
    }

    const missingFields = REQUIRED_FIELDS.filter(f => !Object.values(mapping).includes(f))

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Map Columns</h2>
                {missingFields.length > 0 ? (
                    <Badge variant="destructive">Missing required fields: {missingFields.join(', ')}</Badge>
                ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">All required fields mapped</Badge>
                )}
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30%]">File Column (Header)</TableHead>
                                <TableHead className="w-[30%]">Maps To Field</TableHead>
                                <TableHead className="w-[40%]">Preview (Row 1)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {headers.map((header, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{header}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={mapping[header] || ""}
                                            onValueChange={(val) => handleMapChange(header, val)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Ignore this column" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ignore">Ignore this column</SelectItem>
                                                {AVAILABLE_FIELDS.map(f => (
                                                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm truncate max-w-xs">
                                        {previewData[0]?.[header]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Change File</Button>
                <Button onClick={() => onNext(mapping)} disabled={missingFields.length > 0}>
                    Validate & Preview
                </Button>
            </div>
        </div>
    )
}
