"use client"

import * as React from "react"
import { Check, ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Step {
    title: string
    component: React.ReactNode
    description?: string
}

interface FormWizardProps {
    steps: Step[]
    currentStep: number
    onStepChange: (step: number) => void
    onSubmit: () => void
    isSubmitting?: boolean
    saveLabel?: string
}

export function FormWizard({
    steps,
    currentStep,
    onStepChange,
    onSubmit,
    isSubmitting = false,
    saveLabel = "Complete & Submit"
}: FormWizardProps) {
    const isLastStep = currentStep === steps.length - 1
    const currentStepData = steps[currentStep]

    const handleNext = () => {
        if (!isLastStep) {
            onStepChange(currentStep + 1)
        } else {
            onSubmit()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            onStepChange(currentStep - 1)
        }
    }

    return (
        <div className="flex flax-col lg:flex-row h-[calc(100vh-100px)] gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0 border-r pr-6 hidden lg:block">
                <div className="space-y-1">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep
                        const isCompleted = index < currentStep

                        return (
                            <button
                                key={step.title}
                                onClick={() => onStepChange(index)}
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted",
                                    isCompleted && "text-muted-foreground"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-6 w-6 items-center justify-center rounded-full border text-[10px]",
                                        isActive && "border-primary bg-primary text-primary-foreground",
                                        isCompleted && "border-primary bg-primary text-primary-foreground",
                                        !isActive && !isCompleted && "border-muted-foreground"
                                    )}
                                >
                                    {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                                </div>
                                <span className="truncate">{step.title}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Mobile Navigation (Horizontal) */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 mb-4 border-b">
                <div className="flex space-x-2">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex items-center space-x-2 whitespace-nowrap px-3 py-1 rounded-full text-sm",
                                index === currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}
                        >
                            <span>{index + 1}. {step.title}</span>
                        </div>
                    ))}
                </div>
            </div>


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">{currentStepData.title}</h2>
                    {currentStepData.description && (
                        <p className="text-muted-foreground">{currentStepData.description}</p>
                    )}
                </div>

                <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="pb-10">
                        {currentStepData.component}
                    </div>
                </ScrollArea>

                {/* Footer / Actions */}
                <div className="flex items-center justify-between pt-6 border-t mt-auto bg-background z-10">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0 || isSubmitting}
                    >
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLastStep ? saveLabel : (
                            <>
                                Next Step <ChevronRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
