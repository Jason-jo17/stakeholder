"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { FormWizard } from "@/components/ui/form-wizard"
import { Form } from "@/components/ui/form"
import { stakeholderFormSchema } from "@/components/stakeholders/forms/schema"

import { BasicInfoStep } from "@/components/stakeholders/forms/BasicInfoStep"
import { ProfessionalStep } from "@/components/stakeholders/forms/ProfessionalStep"
import { LocationStep } from "@/components/stakeholders/forms/LocationStep"
import { ReviewStep } from "@/components/stakeholders/forms/ReviewStep"

export default function AddStakeholderPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    type StakeholderFormValues = z.infer<typeof stakeholderFormSchema>

    const form = useForm<StakeholderFormValues>({
        resolver: zodResolver(stakeholderFormSchema) as any,
        defaultValues: {
            name: "",
            designation: "",
            email: "",
            phone: "",
            expertise: [],
            district: undefined
        }
    })

    const onSubmit = async (data: StakeholderFormValues) => {
        setIsSubmitting(true)
        try {
            console.log("Submitting Stakeholder Data:", data)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Redirect to directory
            router.push('/stakeholders')
        } catch (error) {
            console.error("Failed to add stakeholder", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const steps = [
        {
            title: "Basic Information",
            description: "Essential details about the stakeholder.",
            component: <BasicInfoStep form={form} />
        },
        {
            title: "Professional Profile",
            description: "Expertise, experience, and domains.",
            component: <ProfessionalStep form={form} />
        },
        {
            title: "Location & Contact",
            description: "Where they operate and how to reach them.",
            component: <LocationStep form={form} />
        },
        // We can add more steps like Categorization, Impact, etc. later
        {
            title: "Review & Submit",
            description: "Verify the details before creating.",
            component: <ReviewStep form={form} />
        },
    ]

    return (
        <div className="container py-6 max-w-5xl">
            <h1 className="text-3xl font-bold mb-2">Add New Stakeholder</h1>
            <p className="text-muted-foreground mb-8">
                Create a comprehensive profile for a new partner in the ecosystem.
            </p>

            <Form {...form}>
                <FormWizard
                    steps={steps}
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                    onSubmit={form.handleSubmit(onSubmit)}
                    isSubmitting={isSubmitting}
                />
            </Form>
        </div>
    )
}
