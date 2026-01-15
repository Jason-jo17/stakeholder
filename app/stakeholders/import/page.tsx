"use client"

import { useState } from "react"
import { FileUploadStage } from "@/components/stakeholders/import/FileUploadStage"
import { FieldMappingStage } from "@/components/stakeholders/import/FieldMappingStage"
import { ValidationStage } from "@/components/stakeholders/import/ValidationStage"
import Papa from "papaparse"
import { useRouter } from "next/navigation"

export default function BulkImportPage() {
    const router = useRouter()
    const [step, setStep] = useState<'upload' | 'mapping' | 'validation' | 'importing'>('upload')
    const [file, setFile] = useState<File | null>(null)
    const [previewData, setPreviewData] = useState<any[]>([])
    const [headers, setHeaders] = useState<string[]>([])
    const [mapping, setMapping] = useState<Record<string, string>>({})
    const [validationResult, setValidationResult] = useState<any>(null)

    const handleUpload = (uploadedFile: File) => {
        setFile(uploadedFile)

        // Parse CSV/Excel here (Mocking CSV implementation with PapaParse)
        Papa.parse(uploadedFile, {
            header: true,
            preview: 5,
            skipEmptyLines: true,
            complete: (results: any) => {
                setHeaders(results.meta.fields || [])
                setPreviewData(results.data)
                setStep('mapping')
            },
            error: (error: any) => {
                console.error("Parse error:", error)
                // Handle error
            }
        })
    }

    const handleMapping = (fieldMapping: Record<string, string>) => {
        setMapping(fieldMapping)

        // Simulate validation
        const mockValidation = {
            valid: 12,
            invalid: 3,
            errors: [
                { row: 2, reason: "Missing email address" },
                { row: 5, reason: "Invalid district: 'New York'" },
                { row: 8, reason: "Duplicate entry detected" }
            ]
        }
        setValidationResult(mockValidation)
        setStep('validation')
    }

    const handleImport = async () => {
        setStep('importing')
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/stakeholders')
    }

    return (
        <div className="container py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Bulk Import Stakeholders</h1>
                <p className="text-muted-foreground">Upload a CSV or Excel file to add multiple stakeholders at once.</p>
            </div>

            {step === 'upload' && <FileUploadStage onUpload={handleUpload} />}

            {step === 'mapping' && (
                <FieldMappingStage
                    file={file}
                    previewData={previewData}
                    headers={headers}
                    onNext={handleMapping}
                    onBack={() => setStep('upload')}
                />
            )}

            {step === 'validation' && (
                <ValidationStage
                    validationResult={validationResult}
                    onImport={handleImport}
                    onBack={() => setStep('mapping')}
                />
            )}

            {step === 'importing' && (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold">Importing Records...</h2>
                    <p className="text-muted-foreground">Please wait while we process your data.</p>
                </div>
            )}
        </div>
    )
}
