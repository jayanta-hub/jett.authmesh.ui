export interface PayloadContext {
    UserAgent: string;
    TrackingId: string;
    TransactionId: string;
    CountryCode: string;
    IpAddress: string;
}

export interface ResponseContext {
    StatusCode: number;
    TrackingId: string;
    Message: string;
    TransactionId: string;
}

export interface KeyValuePair {
    Key: string;
    Value: string;
}

export interface CodeNamePair {
    Code: string;
    Name: string;
    DisplayName:string;
}

export interface Column {
    id: string;
    label: string;
    align?: 'right' | 'left' | 'center';
    format?: (value: string, row?: unknown) => React.ReactNode;
    isSortable?: boolean;
}

export interface CustomSwitchProps extends SwitchProps {
    checked: boolean;
    row: { [key: string]: string };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    size?: 'small' | 'medium';
}

export interface ErrorType {
    [key: string]: string | undefined;
    fareType?: string;
    markupType?: string;
    percentageValue?: string;
    amountValue?: string;
    applicableOn?: string;
    taxes?: string;
    refundable?: string;
    maxLimitValue?: string;
}
export interface TouchedType {
    [key: string]: boolean | undefined;
    fareType?: boolean;
    markupType?: boolean;
    percentageValue?: boolean;
    amountValue?: boolean;
    applicableOn?: boolean;
    taxes?: boolean;
    refundable?: boolean;
    maxLimitValue?: boolean;
}

export interface onConflictProps {
    message: string;
    existingPolicy: { PricingPolicyId: string[]; };
    editingPolicy: {
        OrgId: string,
        OrgEntityId: string,
        PricingPolicyId: string[];
        PricingPolicyName: string;
        Status?: string;
        Components: {
            JourneyTypes: string[];
            Sectors: string[];
            Suppliers: string[];
            Airlines: string[];
            Classes: string[];
            FareTypes: string;
        };
        MarkupSetting: {
            MarkupType: string;
            MarkupValue: number;
            Taxes: string;
            ApplicableOn: string;
            RefundOnCancellation: string;
        };
    }
}
export interface PPListPayload {
    Context: PayloadContext;
    Request: {
        Pagination: {
            PageNumber: number,
            PageSize: number
        },
        SearchText?: string;
    }
}

export interface PolicyDetails {
    PricingPolicyId: string;
    PricingPolicyName: string;
    Components: {
        JourneyTypes: string[];
        Sectors: string[];
        Suppliers: string[];
        Airlines: string[];
        Classes: string[];
        FareTypes: string;
        Status: string;
    };
    Tracking: {
        CreatedById: string;
        CreatedByName: string;
        CreatedDateTime: string;
        ModifiedById: string;
        ModifiedByName: string;
        ModifiedDateTime: string;
    };
}

export interface PPListResponse {
    Context: ResponseContext;
    Response: {
        Pagination: {
            Total: number;
            PageNumber: number;
            PageSize: number;
        };
        Data: PolicyDetails[];
    };
}

export interface GetPricingPolicyByIdPayload {
    Context: PayloadContext;
    Request: { PricingPolicyId: string; }
}

export interface GetPricingPolicyByIdResponse {
    Context: ResponseContext;
    Response: {
        PricingPolicyId: string;
        PricingPolicyName: string;
        Status: string;
        Components: {
            JourneyTypes: KeyValuePair[];
            Sectors: KeyValuePair[];
            Suppliers: KeyValuePair[];
            Airlines: KeyValuePair[];
            Classes: CodeNamePair[];
            FareTypes: string;
        };
        MarkupSetting: {
            MarkupType: string;
            MarkupValue: number;
            MarkupMaxLimit: number;
            Taxes: string;
            ApplicableOn: string;
            RefundOnCancellation: string;
        };
        Tracking: {
            CreatedById: string;
            CreatedByName: string;
            CreatedDateTime: string;
            ModifiedDateTime: string;
        };
    };
}

export interface FetchAirlinePayload {
    Context: PayloadContext;
    Request: {
        Language: string;
        SearchText?: string;
    };
}

export interface FetchAirlineResponse {
    Context: ResponseContext;
    Response: CodeNamePair[];
}

export type FetchCCPayload = FetchAirlinePayload;
export type FetchCCResponse = FetchAirlineResponse;

export interface FetchMetaDataResponse {
    Context: ResponseContext;
    Response: {
        JourneyTypes: KeyValuePair[];
        Sectors: KeyValuePair[];
        Suppliers?: KeyValuePair[];
        Airlines?: CodeNamePair[];
        Classes?: CodeNamePair[];
        FareTypes?: string;
    }
}

export interface FetchSupplierDataResponse {
    Context: ResponseContext;
    Response: CodeNamePair[];
}

export interface StatusUpdatePayload {
    Context: PayloadContext;
    Request: {
        PricingPolicyIds: string[];
        Status: string;
    }
}

export interface StatusUpdateReponse {
    Context: ResponseContext;
    Response: {
        PricingPolicyIds: string[];
    }
}

export interface PolicyExportPayload {
    Context: PayloadContext;
    Request: {
        OrganizationId: string;
        OrganizationEntityId: string;
        SearchText?: string;
    }
}
export interface PolicyExportReponse {
    Context: ResponseContext;
    Response: {
        Data: {
            PricingPolicyId: string;
            PricingPolicyName: string;
            Components: {
                JourneyTypes: string[];
                Sectors: string[];
                Suppliers: string[];
                Airlines: string[];
                Classes: string[];
                FareTypes: string;
                Status: "ACTIVE" | "INACTIVE";
            };
            Tracking: {
                CreatedById: string;
                CreatedByName: string;
                CreatedDateTime: string;
                ModifiedBy: string;
                ModifiedByName: string;
                ModifiedDateTime: string;
            };
        }[];
    };
}