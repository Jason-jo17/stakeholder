export type PrototypeType = 'web_app' | 'mobile_app' | 'hardware' | 'automation' | 'service';

export interface ToolIntegration {
  toolName: 'n8n' | 'tinkercad' | 'bubble' | 'mit_app_inventor' | 'figma' | 'github';
  projectUrl: string;
  purpose: string;
  integrationStatus: 'connected' | 'pending' | 'error';
  lastSyncedAt?: string;
}

export interface Artifact {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  toolSource: string;
}

export interface PrototypeVersion {
  id: string;
  versionNumber: string;
  createdAt: string;
  createdBy: string;
  changes: string;
  trlLevel: number; // 1-4
  artifacts: Artifact[];
  testingResults: string[];
}

export interface PrototypeProject {
  id: string;
  name: string;
  type: PrototypeType;
  description: string;
  userPersonas: string[];
  problemSolving: string;
  tools: ToolIntegration[];
  versions: PrototypeVersion[];
  currentStatus: {
    trlLevel: number;
    completionPercentage: number;
    blockers: string[];
    nextMilestones: string[];
  };
  teamMembers: {
    userId: string;
    role: string;
    toolsAssigned: string[];
  }[];
  teamId: string;
}

export interface PrototypingSession {
  projects: PrototypeProject[];
  currentProjectId: string | null;
  status: 'dashboard' | 'project_detail' | 'setup';
  version: number;
}
