
export interface Tag {
    id: string;
    type: 'user' | 'predefined' | 'predefined-value' | 'custom' | 'custom-value';
    name: string;
    category: string;
    avatar?: string;
    valueId?: string;
    values?: TagValue[];
    parentTagId?: string;
    originalValue?: any;
}

export interface TagValue {
    Id: string;
    Name: string;
}

export interface Sequence {
    id: number;
    text?: string;
    searchTerm?: string;
    approvalRequired?: boolean | string;
    userInputRequired?: boolean;
    selectedTags?: Tag[];
    appliedFilters?: boolean;
    filterData?: any;
    costCenter?: {
        admin: boolean;
        value1: boolean;
        value2: boolean;
    };
    gender?: {
        male: boolean,
        female: boolean,
        another: boolean
    },
    level?: {
        level1: boolean,
        level2: boolean,
        level3: boolean
    },
    designation?: { manager: boolean; director: boolean; vp: boolean },
    inclusion?: {
        anyone: boolean;
        everyone: boolean;
    }
}

export interface Level {
    id: number;
    expanded: boolean;
    sequences: Sequence[];
    overrideProduct?: boolean;
    minApprovalsRequired?: number;
}

export interface GroupedOptions {
    category: string;
    items: Tag[];
}

export interface CreateApprovalWorkflowProps {
    setIsLevelDrawerOpen: (isOpen: boolean) => void;
    isLevelDrawerOpen: boolean;
    isEditMode: boolean;
    setIsCreated: (isCreated: boolean) => void;
    setIsEditMode: (isEditMode: boolean) => void;
    setRefresh?: (refresh: boolean) => void;
    refresh?: boolean;
    setApprovalWorkflowCreated?: (workflowId: string) => void
}
