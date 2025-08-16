type TagItem = {
  TagId: string;
  TagName: string;
  ParentTagId?: string;
  ParentTagName?: string;
};


type BudgetFormValues = {
  Name?: string;
  Id: string;
  BudgetAmount: number | null;
  BudgetDuration?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "";
  AllowOverBudgetBooking: boolean;
  ShareBudget: boolean;
  CurrencyCode?: string;
  ApprovalWorkflow: {
    Enabled: boolean;
    ApprovalWorkflowId: string;
  };
  TagBudgets: Array<{
    TagId: string;
    BudgetAmount: number;
    ValueId: string;
  }>;
  ProductBudgets: Array<{
    ProductType: string;
    BudgetAmount: number;
  }>;
  IntentBudgets: Array<{
    TravelIntentId: string;
    BudgetAmount: number;
    TravelIntentName?: string;
  }>;
  BudgetRevalidation: {
    SearchResultPage: boolean;
    ReviewPage: boolean;
    ApprovalPage: boolean;
    PaymentPage: boolean;
  };
};

type productList = {
  ProductId: string,
  ProductName: string
}

type intentList = {
  TravelIntentId: string,
  TravelIntentName: string;
}
type BudgetEditProps = {
  name: string;
  initialValues: BudgetFormValues;
  handleModalClose: () => void;
  setSelectedTag: (value: string) => void;
  editTagData: Version[];
  setEditTagData: (value: editTagType) => void;
  budgetEdit: (values: BudgetFormValues) => void;
  setRefresh: (refresh: boolean) => void;
  refresh: boolean;
  productList: productList[];
  intentList: intentList[];
  parent: Array<{
    TagId: string;
    TagName: string;
    ParentTagId: string;
    ParentTagName: string;
  }>;
  workFlows: Array<{
    WorkflowId: string;
    Name: string;
    LevelCount: number;
    ApproverTypes: string[];
    IsDisabled: boolean;
    CreatedById: string;
    CreatedByName: string;
    CreatedAt: string;
    ModifiedById: string;
    ModifiedAt: string;
  }>;
  selectedTag: string;
  setLatestFormState: (value: BudgetFormValues) => void
};
export interface Workflow {
  ApproverTypes: string[];
  CreatedAt: string; // ISO date string
  CreatedById: string;
  CreatedByName: string;
  LevelCount: number;
  ModifiedAt: string; // ISO date string or placeholder
  ModifiedById: string;
  Name: string;
  Status: 'ACTIVE' | 'INACTIVE' | string; // Use union if limited options known
  WorkflowId: string;
}


type Version = {
  Id: string;
  Name: string;
  Approvers: approvers[];
};

interface budgetSetting {
  handleClose: () => void;
  initialValues: any;
  handleModalClose: any
  budgetEdit: (values: BudgetFormValues) => void;
}

type ToggleOption = {
  label: string;
  value: boolean;
};

type AllowDenyToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  options?: ToggleOption[];
  disabled?: boolean;
};
interface PriceInputProps {
  header: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  currency: string;
  disabled?: boolean
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type approvers = {
  Id: string;
  Name: string;
}

type editTagType = Array<{
  Id: string;
  Name: string;
  Approvers: approvers[];
  ParentTagValueId: string;
  ParentTagValueName: string;
}>;

interface TagBudget {
  TagId: string;
  ValueId: string;
  ValueName: string;
  BudgetAmount: number;
}

interface TagBudgetItemProps {
  item: any;
  index: number;
  currencyCode: string;
  switchStates: Record<string, boolean>;
  setSwitchStates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setFieldValue: (field: string, value: any) => void;
}

interface ProductBudgetItemProps {
  item: any;
  index: number;
  currencyCode: string;
  switchStates: Record<string, boolean>;
  setSwitchStates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setFieldValue: (field: string, value: any) => void;
  values: any;
  deleteIcon: string;
  showAlertDialog: (title: string, message: string) => Promise<boolean>;
  setProduct: React.Dispatch<React.SetStateAction<any[]>>;
}

interface IntentBudgetItemProps {
  item: any;
  index: number;
  currencyCode: string;
  switchStates: Record<string, boolean>;
  setSwitchStates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setFieldValue: (field: string, value: any) => void;
  values: any;
  deleteIcon: string;
  showAlertDialog: (title: string, message: string) => Promise<boolean>;
  setTravel: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Parent {
  TagId: string;
  TagName: string;
  TagTypes: string[];
  TagValueType: string;
}
interface IntentBudget {
  BudgetAmount: number;
  TravelIntentId: string;
  TravelIntentName: string;
}

interface ProductBudget {
  BudgetAmount: number;
  ProductType: string;
}