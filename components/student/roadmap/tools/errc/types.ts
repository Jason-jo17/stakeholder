
export type ERRCQuadrant = 'eliminate' | 'reduce' | 'raise' | 'create';

export interface ERRCItem {
  id: string;
  name: string;
  description?: string;
  quadrant: ERRCQuadrant;
  impact: number; // 1-5
  industryStandard: number; // 1-10
  targetLevel: number; // 1-10
  rationale?: string;
}

export interface Competitor {
  id: string;
  name: string;
  color: string;
  scores: Record<string, number>; // factor_id -> score (1-10)
}

export interface ERRCData {
  industryContext: string;
  items: ERRCItem[];
  competitors: Competitor[];
  version: number;
}
