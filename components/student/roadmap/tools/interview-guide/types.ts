
export type QuestionType = "opening" | "context" | "problem" | "behavior" | "aspiration" | "closing"

export interface Question {
    id: string
    text: string
    type: QuestionType
    rationale?: string
    timeEstimate: number // in minutes
    biasWarning?: string
}

export interface EthicsConfig {
    informedConsent: boolean
    privacyProtection: boolean
    nonHarmPrinciple: boolean
    anonymizationPlan: string
    recordingPermission: boolean
    dataRetention: string
}

export interface InterviewGuideData {
    title: string
    purpose: string
    targetStakeholder: string
    ethics: EthicsConfig
    questions: Question[]
    introductionScript: string
    closingScript: string
}

export const DEFAULT_GUIDE: InterviewGuideData = {
    title: "",
    purpose: "",
    targetStakeholder: "",
    ethics: {
        informedConsent: false,
        privacyProtection: false,
        nonHarmPrinciple: false,
        anonymizationPlan: "Names will be replaced with pseudonyms. Data stored securely.",
        recordingPermission: false,
        dataRetention: "Data deleted after 1 year."
    },
    questions: [],
    introductionScript: "Thank you for taking the time to speak with me. I'm researching [TOPIC] to better understand [GOAL]. This interview will take approximately [TIME] minutes.",
    closingScript: "That concludes my questions. Is there anything else you think I should know? Thank you again for your valuable insights."
}
