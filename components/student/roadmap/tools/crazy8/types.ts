
export interface SketchPanel {
  id: string;
  panelNumber: number;
  sketchData: string; // Base64 or serialized stroke data
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface Participant {
  userId: string;
  userName: string;
  panels: SketchPanel[];
}

export interface VotingResult {
  panelId: string;
  votes: number;
  comments: string[];
  selectedForRefinement: boolean;
}

export interface Crazy8Session {
  id: string;
  challengePrompt: string;
  context: string;
  constraints: string[];
  config: {
    durationPerPanel: number;
    totalPanels: number;
    mode: 'freestyle' | 'guided' | 'progressive' | 'remix';
    allowIterations: boolean;
  };
  participants: Participant[];
  votingResults: VotingResult[];
  status: 'setup' | 'sketching' | 'review' | 'voting' | 'completed';
  currentPanelIndex: number;
  timerExpiry?: string;
  version: number;
}
