type TagType = {
  Key: string;
  Value: string;
};

type TagValueType = {
  Key: string;
  Value: string;
};

type Module = {
  Key: string;
  Value: string;
};
type TagType = 'Organization' | 'Trip' | 'Traveller' | 'Product';
type TagValueType = 'ListSingleSelect' | 'ListMultiSelect' | 'CheckBox' | 'Date' | 'Location' | 'FreeText' | 'User ID';
type Module = 'Ticket' | 'Reports' | 'Statements' | 'Approval Workflow' | 'Invoice' | 'Review';

type TagSettings = {
  selectAll: boolean;
  tagTypeSwitch: boolean;
  tagValueTypeSwitch: boolean;
  moduleSwitch: boolean;
  parentSwitch: boolean;
  tagTypes: TagType[];
  tagValueTypes: TagValueType[];
  modules: Module[];
  parentTag: boolean;
};

type TagValueApprover = {
  id?: string;
  Id?: string;
  Name?: string;
};

type ValuesType = {
  Id?: string;
  Name?: string;
  Approvers?: TagValueApprover[];
  ParentTagValueId?: string;
  ParentTagValueName?: string;
};
type Tag = {
  GroupName: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  TaasId: string;
  TmcId: string;
  OrgId: string;
  TagId: string;
  TagName: string;
  Category: string;
  TagTypes: TagType[];
  TagValueType: TagValueType[];
  Modules: Module[];
  ParentTagId: string;
  ParentTagName: string;
  IsDraft: boolean;
  IsDisabled: boolean;
  CreatedBy: string;
  CreatedByName: string;
  CreatedDate: string;
  ModifiedByName: string;
};

type Pagination = {
  PageNumber?: number;
  PageSize?: number;
  Total?: number;
};

type ApiResponse = {
  Pagination: Pagination;
  Data: Tag[];
};
interface Approver {
  Id: number;
  Name: string;
}

interface TagValue {
  Id?: number;
  Name?: string;
  Approvers?: Approver[];
  ParentTagValueId?: string;
  ParentTagValueName?: string;
  id?: number;
  ApproverIds?: string[];
}


interface FetchTagsByIdResponse {
  Response?: {
    Values?: TagValue[];
  };
  Context?: {
    Message?: string;
  };
}
interface basicInfoType {
  setMoveToTableComponent: (open: number) => void;
  setGroupSelected: (group: string) => void;
  editTagData?: string;
}
interface TagResponse {
  Context?: {
    StatusCode: number;
  };
  Response?: any;
}
interface TagCreationModalProps {
  open: boolean;
  handleModalClose: () => void;
  metaResponse: any;
  parentTags: any;
  setCreateSuccessfullFlag: (flag: boolean) => void
  editTagData?: editTagType;
  value: number;
  setValue: (value: number) => void
}
type tabSelectorType = {
  setValue: (value: number) => void;
  value: number
  tabs: string[]
  setPage: (page: number) => void
};
interface basicInfoType {
  setMoveToTableComponent: (open: number) => void;
  editTagData?: string;
}
interface basicInfoType {
  setMoveToTableComponent: (open: number) => void
  setValueCount: (value: number) => void;
  editTagData?: string;
}
type Tag = {
    TagId: number;
    TagName: string;
    Modules: { Value: string }[];
    GroupName: string;
    ParentTagName?: string;
    Category: string;
    IsDisabled: boolean;
    IsDraft: boolean;
    Rank: string
};

type AllTagsProps = {
    setModalOpen: (open: boolean) => void;
    handleEditClick: (Id: string) => void;
    tagsList: { TagId: string; }[];
    value: number;
    setToggleButtonClicked: any
    pagination: Pagination;
   onChange:  (id: number, currentStatus: boolean) => void,
    onArchive: (id: number, currentStatus: boolean) => void;
    rankChange: (id: number, rank: number) => void,
    handleStatusChange: (id: number, currentStatus: string) => void
};
