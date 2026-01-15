"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, PieChart, AlertCircle, Lightbulb, ArrowRight, ArrowLeft, Info, CheckCircle, Loader2, Sparkles } from "lucide-react"
import { useForm, UseFormReturn } from "react-hook-form"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "sonner"

import { TagInput } from "@/components/ui/tag-input"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { MultiSelect } from "@/components/ui/multi-select"
import { DAKSHINA_KARNATAKA_DISTRICTS } from "@/lib/constants"
import { useSectors, useProblemStatements, useDataSourceStats, generateResearchReport } from "@/lib/hooks/use-research"

interface StepProps {
    form: UseFormReturn<any>
    onNext?: () => void
    onBack?: () => void
}

function formatDateRange(range: any) {
    if (!range?.from) return 'Not selected'
    return `${format(range.from, 'PP')} - ${range.to ? format(range.to, 'PP') : '...'}`
}

export default function GenerateResearchPage() {
    const [step, setStep] = useState(1)
    const form = useForm({
        defaultValues: {
            reportType: 'Stakeholder Analysis',
            title: '',
            researchQuestions: [],
            districts: [],
            sectors: [],
            timeFrame: undefined
        }
    })
    const router = useRouter()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="container py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Generate Research Report</h1>
            <p className="text-muted-foreground mb-8">
                AI-powered deep research reports from your stakeholder data
            </p>

            <Card>
                <CardHeader>
                    <Progress value={(step / 4) * 100} className="mb-4" />
                    <CardTitle>Step {step} of 4</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step === 1 && (
                                <Step1ReportType form={form} onNext={() => setStep(2)} />
                            )}
                            {step === 2 && (
                                <Step2Scope form={form} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                            )}
                            {step === 3 && (
                                <Step3DataSources form={form} onNext={() => setStep(4)} onBack={() => setStep(2)} />
                            )}
                            {step === 4 && (
                                <Step4ReviewGenerate form={form} onBack={() => setStep(3)} />
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

function Step1ReportType({ form, onNext }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Report Type</FormLabel>
                        <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-2 gap-4"
                        >
                            <Card className={`cursor-pointer border-2 ${field.value === 'Stakeholder Analysis' ? 'border-primary' : 'border-transparent'}`}>
                                <label htmlFor="stakeholder-analysis" className="cursor-pointer block h-full">
                                    <CardContent className="p-6">
                                        <RadioGroupItem value="Stakeholder Analysis" id="stakeholder-analysis" className="sr-only" />
                                        <Users className="h-8 w-8 mb-3 text-primary" />
                                        <div className="font-semibold mb-2">Stakeholder Analysis</div>
                                        <p className="text-sm text-muted-foreground">
                                            Deep dive into specific stakeholder profiles, their challenges, and engagement patterns
                                        </p>
                                    </CardContent>
                                </label>
                            </Card>

                            <Card className={`cursor-pointer border-2 ${field.value === 'Sector Analysis' ? 'border-primary' : 'border-transparent'}`}>
                                <label htmlFor="sector-analysis" className="cursor-pointer block h-full">
                                    <CardContent className="p-6">
                                        <RadioGroupItem value="Sector Analysis" id="sector-analysis" className="sr-only" />
                                        <PieChart className="h-8 w-8 mb-3 text-primary" />
                                        <div className="font-semibold mb-2">Sector Analysis</div>
                                        <p className="text-sm text-muted-foreground">
                                            Comprehensive overview of a specific sector's challenges, stakeholders, and solutions
                                        </p>
                                    </CardContent>
                                </label>
                            </Card>

                            <Card className={`cursor-pointer border-2 ${field.value === 'Problem Analysis' ? 'border-primary' : 'border-transparent'}`}>
                                <label htmlFor="problem-analysis" className="cursor-pointer block h-full">
                                    <CardContent className="p-6">
                                        <RadioGroupItem value="Problem Analysis" id="problem-analysis" className="sr-only" />
                                        <AlertCircle className="h-8 w-8 mb-3 text-primary" />
                                        <div className="font-semibold mb-2">Problem Analysis</div>
                                        <p className="text-sm text-muted-foreground">
                                            In-depth examination of a problem statement with root causes and potential solutions
                                        </p>
                                    </CardContent>
                                </label>
                            </Card>

                            <Card className={`cursor-pointer border-2 ${field.value === 'Solution Feasibility' ? 'border-primary' : 'border-transparent'}`}>
                                <label htmlFor="solution-feasibility" className="cursor-pointer block h-full">
                                    <CardContent className="p-6">
                                        <RadioGroupItem value="Solution Feasibility" id="solution-feasibility" className="sr-only" />
                                        <Lightbulb className="h-8 w-8 mb-3 text-primary" />
                                        <div className="font-semibold mb-2">Solution Feasibility</div>
                                        <p className="text-sm text-muted-foreground">
                                            Evaluate proposed solutions with implementation pathways and resource requirements
                                        </p>
                                    </CardContent>
                                </label>
                            </Card>
                        </RadioGroup>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Report Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter a title for your report..." {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="researchQuestions"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Research Questions</FormLabel>
                        <FormDescription>
                            What specific questions should this report answer?
                        </FormDescription>
                        <TagInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Add research questions..."
                        />
                    </FormItem>
                )}
            />

            <Button onClick={onNext} className="w-full">
                Continue to Scope
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}

function Step2Scope({ form, onNext, onBack }: StepProps) {
    const { data: sectors } = useSectors()
    // const { data: problemStatements } = useProblemStatements()

    return (
        <div className="space-y-6">
            {/* Geographic Scope */}
            <FormField
                control={form.control}
                name="districts"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Geographic Scope</FormLabel>
                        <FormDescription>
                            Select districts to include in the report
                        </FormDescription>
                        <CheckboxGroup
                            options={DAKSHINA_KARNATAKA_DISTRICTS}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    </FormItem>
                )}
            />

            {/* Sector Scope */}
            <FormField
                control={form.control}
                name="sectors"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sectors</FormLabel>
                        <MultiSelect
                            options={sectors?.map((s: any) => ({ label: s.name, value: s.id })) || []}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Select sectors..."
                        />
                    </FormItem>
                )}
            />

            {/* Time Frame */}
            <FormField
                control={form.control}
                name="timeFrame"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Time Frame</FormLabel>
                        <FormDescription>
                            What period should the report cover?
                        </FormDescription>
                        <DateRangePicker
                            value={field.value}
                            onChange={field.onChange}
                        />
                    </FormItem>
                )}
            />

            <div className="flex gap-2">
                <Button variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button onClick={onNext} className="flex-1">
                    Continue to Data Sources
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

function Step3DataSources({ form, onNext, onBack }: StepProps) {
    const { data: stats } = useDataSourceStats(form.watch())

    return (
        <div className="space-y-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Data Sources</AlertTitle>
                <AlertDescription>
                    The AI will analyze the following data sources based on your scope:
                </AlertDescription>
            </Alert>

            {/* Available Data Preview */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Stakeholders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stakeholders}</div>
                        <p className="text-sm text-muted-foreground">
                            matching your criteria
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Transcripts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.transcripts}</div>
                        <p className="text-sm text-muted-foreground">
                            interviews available
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Interactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.interactions}</div>
                        <p className="text-sm text-muted-foreground">
                            logged interactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Problem Statements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.problemStatements}</div>
                        <p className="text-sm text-muted-foreground">
                            identified problems
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Data Quality Check */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Data Quality Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Stakeholder profiles completeness</span>
                        <div className="flex items-center gap-2">
                            <Progress value={stats?.stakeholderCompleteness} className="w-24" />
                            <span className="text-sm font-medium">{stats?.stakeholderCompleteness}%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Transcript quality scores</span>
                        <div className="flex items-center gap-2">
                            <Progress value={stats?.transcriptQuality} className="w-24" />
                            <span className="text-sm font-medium">{stats?.transcriptQuality}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-2">
                <Button variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button onClick={onNext} className="flex-1">
                    Review & Generate
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

function Step4ReviewGenerate({ form, onBack }: StepProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)
    const router = useRouter()

    const handleGenerate = async () => {
        setIsGenerating(true)

        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90))
        }, 1000)

        try {
            const result = await generateResearchReport(form.getValues())
            clearInterval(interval)
            setProgress(100)

            // Redirect to report page (Mock)
            toast.success("Report generated successfully!")
            router.push(`/research`)
        } catch (error) {
            clearInterval(interval)
            setIsGenerating(false)
            toast.error('Failed to generate report')
        }
    }

    return (
        <div className="space-y-6">
            {!isGenerating ? (
                <>
                    <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Ready to Generate</AlertTitle>
                        <AlertDescription>
                            Review your settings below. The AI will analyze your data and generate a comprehensive report.
                        </AlertDescription>
                    </Alert>

                    {/* Review Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Report Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <span className="font-medium">Type:</span> {form.watch('reportType')}
                            </div>
                            <div>
                                <span className="font-medium">Title:</span> {form.watch('title')}
                            </div>
                            <div>
                                <span className="font-medium">Districts:</span> {form.watch('districts')?.join(', ')}
                            </div>
                            <div>
                                <span className="font-medium">Sectors:</span> {form.watch('sectors')?.length} selected
                            </div>
                            <div>
                                <span className="font-medium">Time Frame:</span> {formatDateRange(form.watch('timeFrame'))}
                            </div>
                            <div>
                                <span className="font-medium">Research Questions:</span> {form.watch('researchQuestions')?.length}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onBack} className="flex-1">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <Button onClick={handleGenerate} className="flex-1">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Report
                        </Button>
                    </div>
                </>
            ) : (
                <div className="space-y-6">
                    <Alert>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <AlertTitle>Generating Report...</AlertTitle>
                        <AlertDescription>
                            The AI is analyzing your data and writing the report. This may take 2-5 minutes.
                        </AlertDescription>
                    </Alert>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">{progress}%</span>
                            </div>
                            <Progress value={progress} />

                            <div className="space-y-2 text-sm text-muted-foreground">
                                {progress >= 10 && <div>✓ Collecting stakeholder data...</div>}
                                {progress >= 30 && <div>✓ Analyzing transcripts...</div>}
                                {progress >= 50 && <div>✓ Processing interactions...</div>}
                                {progress >= 70 && <div>✓ Synthesizing findings...</div>}
                                {progress >= 90 && <div>✓ Generating report sections...</div>}
                                {progress === 100 && <div>✓ Finalizing report...</div>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
