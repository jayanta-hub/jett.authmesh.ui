interface Option {
    label: string;
    value: string | number;
  }
  
  interface ListItemProps {
    name: string;
    isActive?: boolean;
    roleName?: string;
  }
  
  export interface ListItemViewProps {
    items?: ListItemProps[];
    rowsPerPageOptions?: number[];
    tabLabelExtractor: (item: ListItemProps) => string;
    itemDetailsRenderer: (item: ListItemProps) => JSX.Element;
    rowsPerPageLabel?: string;
    noItemsMessage?: string;
  }
  