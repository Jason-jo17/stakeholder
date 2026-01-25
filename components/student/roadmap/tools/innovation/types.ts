
export interface InnovationIdea {
  id: string;
  description: string;
  feasibility: number; // 1-5
  novelty: number; // 1-5
  desirability?: number; // 1-5
  viability?: number; // 1-5
  evidence: string[];
  technique: string; // The specific TRIZ principle or SCAMPER technique
  framework: 'TRIZ' | 'SCAMPER';
}

export interface Contradiction {
  improvingParameter: string;
  worseningParameter: string;
  suggestedPrinciples: number[];
}

export interface TRIZData {
  contradictions: Contradiction[];
  principlesExplored: {
    principleNumber: number;
    howApplied: string;
    ideas: InnovationIdea[];
  }[];
}

export interface SCAMPERTechniqueData {
  ideas: InnovationIdea[];
  activePrompts: string[];
}

export interface SCAMPERData {
  substitute: SCAMPERTechniqueData;
  combine: SCAMPERTechniqueData;
  adapt: SCAMPERTechniqueData;
  modify: SCAMPERTechniqueData;
  putToOtherUses: SCAMPERTechniqueData;
  eliminate: SCAMPERTechniqueData;
  reverse: SCAMPERTechniqueData;
}

export interface SelectedIdea extends InnovationIdea {
  sketchUrl?: string;
  nextSteps: string;
}

export interface InnovationSession {
  id: string;
  framework: 'TRIZ' | 'SCAMPER' | 'Hybrid';
  problemStatement: string;
  context: string;
  triz: TRIZData;
  scamper: SCAMPERData;
  selectedIdeas: SelectedIdea[];
  status: 'setup' | 'ideation' | 'evaluation' | 'completed';
  version: number;
}
