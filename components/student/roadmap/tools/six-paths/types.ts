
export interface Opportunity {
  id: string;
  description: string;
  valueProposition: string;
  feasibility: number; // 1-5
  sourcePath?: number;
}

export interface Path1_Alternatives {
  currentIndustry: string;
  alternativeIndustries: {
    industryName: string;
    whyCustomersChooseIt: string;
    keyFactors: string[];
    opportunities: Opportunity[];
  }[];
}

export interface StrategicGroup {
  groupName: string;
  characteristics: string[];
  competitiveFactors: string[];
  untappedOpportunities: string[];
}

export interface Path2_StrategicGroups {
  strategicGroupsInIndustry: StrategicGroup[];
  opportunities: Opportunity[];
}

export interface Buyer {
  buyerType: 'purchaser' | 'user' | 'influencer';
  unmetNeeds: string[];
  valueCriteria: string[];
  opportunities: Opportunity[];
}

export interface Path3_ChainOfBuyers {
  typicalBuyer: string;
  alternativeBuyers: Buyer[];
}

export interface JourneyStage {
  stage: string;
  painPoints: string[];
  complementaryOfferings: string[];
  opportunities: Opportunity[];
}

export interface Path4_ComplementaryOfferings {
  coreProductService: string;
  beforeDuringAfterJourney: JourneyStage[];
}

export interface FlipOpportunity {
  shift: string;
  rationale: string;
  valueCreated: string;
}

export interface Path5_FunctionalEmotional {
  currentOrientation: 'functional' | 'emotional';
  industryNorm: string;
  opportunitiesFromFlipping: FlipOpportunity[];
}

export interface Trend {
  trend: string;
  trajectory: string;
  implications: string[];
}

export interface Path6_TimeTrends {
  currentTrends: Trend[];
  futureOpportunities: {
    trendBasedOpportunity: string;
    timing: string;
    preparationNeeded: string[];
  }[];
}

export interface SynthesisOpportunity {
  id: string;
  title: string;
  sourcePaths: number[];
  description: string;
  valueInnovation: string;
  differentiation: string;
  costStructureImpact: string;
  priority: number; // 1-5
}

export interface SixPathsSession {
  id: string;
  industryContext: string;
  currentBusinessModel: string;
  paths: {
    path1: Path1_Alternatives;
    path2: Path2_StrategicGroups;
    path3: Path3_ChainOfBuyers;
    path4: Path4_ComplementaryOfferings;
    path5: Path5_FunctionalEmotional;
    path6: Path6_TimeTrends;
  };
  synthesis: {
    blueOceanOpportunities: SynthesisOpportunity[];
    recommendedFocus: string;
    nextSteps: string[];
  };
  status: 'setup' | 'exploration' | 'synthesis' | 'completed';
  currentPathIndex: number;
  version: number;
}
