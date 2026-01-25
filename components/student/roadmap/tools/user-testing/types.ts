
export type SessionType = 'usability' | 'desirability' | 'feasibility' | 'concept';
export type ObservationType = 'action' | 'quote' | 'emotion' | 'confusion' | 'success';
export type Severity = 1 | 2 | 3 | 4 | 5;

export interface Observation {
  id: string;
  timestamp: number; // seconds from start
  type: ObservationType;
  description: string;
  severity: Severity;
  videoTimestamp?: number;
  screenshotUrl?: string;
}

export interface TaskPerformance {
  taskId: string;
  taskDescription: string;
  success: boolean;
  timeTaken: number; // seconds
  errorsCount: number;
  difficultyRating: Severity;
  helpNeeded: boolean;
  notes: string;
}

export interface FeedbackRubrics {
  usability: {
    easeOfUse: Severity;
    learnability: Severity;
    efficiency: Severity;
    errorTolerance: Severity;
    satisfaction: Severity;
  };
  desirability: {
    problemRelevance: Severity;
    solutionFit: Severity;
    likelihoodToUse: Severity;
    recommendationScore: number; // 0-10 NPS
    emotionalResponse: string;
  };
  valueProposition: {
    uniqueness: Severity;
    improvementOverCurrent: Severity;
    willingnessToPay: string;
    switchingCostAcceptable: boolean;
  };
}

export interface TestParticipant {
  id: string;
  name: string;
  personaMatch: string; // uuid reference
  demographics: Record<string, any>;
  preTestQuestionnaire: Record<string, any>;
  observations: Observation[];
  taskPerformance: TaskPerformance[];
  rubrics: FeedbackRubrics;
  postTestInterview: {
    likes: string[];
    dislikes: string[];
    confusions: string[];
    suggestions: string[];
    openFeedback: string;
  };
  recordingUrls?: {
    video?: string;
    audio?: string;
    screen?: string;
    transcript?: string;
  };
}

export interface SessionInsight {
  id: string;
  issue: string;
  severity: 'critical' | 'major' | 'minor';
  frequency: number;
  userQuotes: string[];
  recommendation: string;
}

export interface TestingSession {
  id: string;
  prototypeVersionId: string;
  metadata: {
    date: string;
    type: SessionType;
    location: string;
    duration: number; // minutes
    facilitators: string[];
    observers: string[];
    researchGoal?: string;
    recruitmentCriteria?: string;
    discussionGuideUrl?: string;
    tasks: string[];
  };
  participants: TestParticipant[];
  insights: {
    criticalIssues: SessionInsight[];
    positiveFindings: string[];
    usabilityScore: number;
    npsScore: number;
    keyLearnings: string[];
    iterationPriorities: string[];
  };
  status: 'scheduled' | 'live' | 'completed' | 'analyzed';
  teamId: string;
}

export interface UserTestingState {
  sessions: TestingSession[];
  currentSessionId: string | null;
  activeParticipantId: string | null;
  view: 'dashboard' | 'session_detail' | 'live_capture' | 'analytics';
  version: number;
}
