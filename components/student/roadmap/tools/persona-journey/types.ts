
export interface Persona {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  quote: string;
  demographics: {
    age: string;
    location: string;
    occupation: string;
    income: string;
    education: string;
  };
  psychographics: {
    goals: string[];
    frustrations: string[];
    motivations: string[];
  };
  behavioral: {
    techSavviness: number; // 1-5
    decisionDrivers: string[];
  };
}

export interface JourneyStage {
  id: string;
  name: string;
  duration: string;
  goals: string[];
  actions: string[];
  thoughts: string[];
  emotion: {
    valence: number; // -5 to +5
    intensity: number; // 1-5
  };
  touchpoints: {
    name: string;
    channel: string;
    satisfaction: number;
  }[];
  painPoints: string[];
  opportunities: string[];
}

export interface JourneyMap {
  id: string;
  personaId: string;
  scenario: string;
  stages: JourneyStage[];
}

export interface PersonaJourneyData {
  personas: Persona[];
  journeys: JourneyMap[];
}
