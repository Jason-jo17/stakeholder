
export interface AffinityNote {
    id: string;
    text: string;
    source?: string;
    stakeholderId?: string;
    timestamp?: string;
    tags: string[];
    color: string;
    clusterId?: string;
    position: { x: number; y: number };
}

export interface AffinityCluster {
    id: string;
    label: string;
    description: string;
    noteIds: string[];
    themeId?: string;
    position: { x: number; y: number };
    color?: string;
}

export interface AffinityTheme {
    id: string;
    name: string;
    description: string;
    clusterIds: string[];
    insights: string;
    priority: number;
    evidenceCount: number;
}

export interface AffinityRelationship {
    fromId: string;
    toId: string;
    type: string;
    description: string;
}

export interface AffinityMapData {
    notes: AffinityNote[];
    clusters: AffinityCluster[];
    themes: AffinityTheme[];
    relationships: AffinityRelationship[];
    projectContext?: string;
}
