
export type PitchContext = 'seed' | 'angel' | 'accelerator' | 'series_a' | 'grant';
export type SlideType =
  | 'cover'
  | 'problem'
  | 'solution'
  | 'product_demo'
  | 'market_opportunity'
  | 'business_model'
  | 'traction'
  | 'competition'
  | 'go_to_market'
  | 'team'
  | 'financials'
  | 'ask';

export interface EvidenceItem {
  evidence_id: string;
  type: 'customer_quote' | 'metric' | 'data_point' | 'media';
  content: any;
  source: string;
  linked_slides: number[];
}

export interface Slide {
  slide_id: string;
  slide_number: number;
  slide_type: SlideType;
  template_used: string;
  content: {
    headline: string;
    body_text: string;
    bullet_points: string[];
    images: { url: string; caption: string; source: string; }[];
    charts: { type: string; data: any; caption: string; }[];
    evidence_references: string[];
  };
  presenter_notes: string;
  ai_suggestions: string[];
  review_comments: { id: string; user: string; text: string; date: string; }[];
  design: {
    layout: string;
    theme: string;
    custom_css?: string;
  };
}

export interface FundraisingMilestone {
  milestone: string;
  timeline: string;
  success_metrics: string[];
}

export interface UseOfFunds {
  category: string;
  amount: number;
  rationale: string;
}

export interface FundingAsk {
  amount: number;
  currency: string;
  use_of_funds: UseOfFunds[];
  milestones: FundraisingMilestone[];
}

export interface PitchDeckVersion {
  version_id: string;
  version_name: string;
  created_at: string;
  changes: string;
  feedback_received: string[];
}

export interface PitchDeck {
  pitchdeck_id: string;
  deck_title: string;
  company_name: string;
  pitch_context: PitchContext;
  slides: Slide[];
  evidence_library: EvidenceItem[];
  storytelling_structure: {
    hook: string;
    problem_story: string;
    solution_narrative: string;
    traction_proof: string;
    vision_statement: string;
    call_to_action: string;
  };
  funding_ask: FundingAsk;
  versions: PitchDeckVersion[];
  team_id: string;
}

export interface PitchDeckState {
  decks: PitchDeck[];
  currentDeckId: string | null;
  activeSlideId: string | null;
  view: 'dashboard' | 'editor' | 'presenter' | 'preview' | 'template_selection';
  version: number;
}
