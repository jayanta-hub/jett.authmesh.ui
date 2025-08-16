import { TableColumn } from "../table/Table";
export interface PolicyListingProps {
  id: string;
  policyName: string;
  dateOfCreation: string;
  createdBy: string;
  updatedBy: string;
  journeyType: string;
  sector: string;
  supplier: string;
  airline: string;
  class: string;
  fareType: string;
  status: string;
  isSelected: boolean;
  sectorSelections: string[];
  airlineSelections: string[];
  supplierSelections: string[];
  journeyTypeSelections: string[];
  classSelections: string[];
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

export interface Policy {
  policyName?: string;
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
}

export interface SelectionModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  items: string[];
  isMobileView?: boolean;
}

export interface MultiSelectionCellProps {
  value: string;
  selections?: string[];
  fieldName: string;
  isMobileView?: boolean;
}

export interface SearchSectionProps {
  selectedRows?: Array<{ id?: string; status?: string; isSelected?: boolean }>;
  onEdit?: () => void;
  onDeactivate?: () => void;
  onArchive?: () => void;
  searchText?: string;
  onSearchChange?: (value: string) => void;
}

interface PricingPolicyTableProps {
  data: PolicyListingProps[];
  columns: TableColumn[];
  onRowClick?: (row: PolicyListingProps) => void;
  onRowCheckboxChange?: (row: PolicyListingProps, type: "all" | "single") => void;
  onPageChange?: (page: number) => void;
  onEdit?: (row: PolicyListingProps) => void;
  onDelete?: (row: PolicyListingProps) => void;
  onMenuEdit?: (policy: PolicyListingProps) => void;
  isSortable?: boolean;
  rowsPerPage?: number;
  totalCount?: number;
  currentPage?: number;
  searchText?: string;
  onStatusChange?: () => void;
  onNewPolicyClick?: () => void;
  setIsEditMode?: (value: boolean) => void;
  setSelectedPolicyId?: (id: string) => void;
  setCreateStep?: (step: number) => void;
  setOpenCreate?: (open: boolean) => void;
}

export interface SearchSectionProps {
  selectedRows?: Policy[];
  onEdit?: () => void;
  onDeactivate?: () => void;
  onArchive?: () => void;
  onActivate?: () => void;
  searchText?: string;
  onSearchChange?: (value: string) => void;
  onPolicyCreated?: () => void;
  triggerEdit?: boolean;
  onTriggerEditReset?: () => void;
  menuEditPolicyId?: string;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  selectedPolicyId: string;
  setSelectedPolicyId: (value: string) => void;
  createStep: number;
  setCreateStep: (value: number) => void;
  openCreate: boolean;
  setOpenCreate: (value: boolean) => void;
  setPolicyCreated?: (value: boolean) => void;
}

export interface FieldRowProps{
  label: string;
  desc: string;
  value: string;
  items?: string[];
  onInfoClick?: () => void;
}

