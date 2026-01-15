"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileSpreadsheet, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FileUploadStageProps {
    onUpload: (file: File) => void
}

export function FileUploadStage({ onUpload }: FileUploadStageProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onUpload(acceptedFiles[0])
        }
    }, [onUpload])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024 // 10MB
    })

    return (
        <Card className="border-dashed border-2">
            <CardContent className="pt-6">
                <div
                    {...getRootProps()}
                    className={`
                        flex flex-col items-center justify-center h-64 cursor-pointer rounded-lg transition-colors
                        ${isDragActive ? 'bg-primary/5' : 'hover:bg-muted/50'}
                    `}
                >
                    <input {...getInputProps()} />
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                        {isDragActive ? "Drop the file here" : "Drag & drop your file here"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        Supports CSV, Excel (.xlsx, .xls) up to 10MB
                    </p>
                    <Button variant="outline" onClick={(e) => e.stopPropagation()}>
                        Browse Files
                    </Button>
                </div>

                <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span>Download Template:</span>
                    </div>
                    <a href="/templates/stakeholders_template.csv" className="text-primary hover:underline" download>CSV</a>
                    <span className="text-border">|</span>
                    <a href="/templates/stakeholders_template.xlsx" className="text-primary hover:underline" download>Excel</a>
                </div>
            </CardContent>
        </Card>
    )
}
