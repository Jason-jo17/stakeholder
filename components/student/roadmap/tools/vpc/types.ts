
export interface VPCItem {
    id: string;
    text: string;
    type?: string; 
    importance: number; // 1-5
    evidence?: string[];
    source?: string;
    linkedId?: string; // Link between Value Map and Customer Profile
}

export interface CustomerProfile {
    jobs: VPCItem[];
    pains: VPCItem[];
    gains: VPCItem[];
}

export interface ValueMap {
    productsServices: {
        id: string;
        name: string;
        description: string;
        mvpStatus: boolean;
    }[];
    painRelievers: VPCItem[];
    gainCreators: VPCItem[];
}

export interface FitAssessment {
    overallFit: number;
    painFit: number;
    gainFit: number;
    jobFit: number;
    validationStatus: string;
    nextTests: string[];
}

export interface VPCData {
    customerSegment: {
        name: string;
        description: string;
    };
    customerProfile: CustomerProfile;
    valueMap: ValueMap;
    fitAssessment: FitAssessment;
    version: number;
}
