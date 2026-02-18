import { create } from 'zustand'

interface StudentJourney {
  id: string
  userId: string
  sector: string
  stage: string
  trlLevel: number
  complianceScore: number
  pilotReadiness: number
  metrics: {
    experiments_completed: number
    partners_engaged: number
    funding_raised: number
  }
  milestones: string[]
  blockers?: Array<{ blocker: string; impact: string; status: string }>
}

interface JourneyStore {
  journey: StudentJourney | null
  setJourney: (journey: StudentJourney | null) => void
  updateTRLLevel: (level: number) => void
  updateStage: (stage: string) => void
}

export const useJourneyStore = create<JourneyStore>((set) => ({
  journey: null,
  setJourney: (journey) => set({ journey }),
  updateTRLLevel: (level) =>
    set((state) => ({
      journey: state.journey ? { ...state.journey, trlLevel: level } : null,
    })),
  updateStage: (stage) =>
    set((state) => ({
      journey: state.journey ? { ...state.journey, stage } : null,
    })),
}))
