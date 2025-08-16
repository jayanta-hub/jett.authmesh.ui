export interface Option {
    label: string;
    value: string;
}

export interface ListItemViewProps {
    items: any[]; // Required
    sortFieldOptions?: Option[]; // Optional
    sortDirectionOptions?: Option[]; // Optional
    filterActiveOptions?: Option[]; // Optional
    rowsPerPageOptions?: number[]; // Optional
    tabLabelExtractor: (item: any) => string; // Required
    itemDetailsRenderer: (item: any) => JSX.Element; // Required
    filterLabel?: string; // Optional
    sortLabel?: string; // Optional
    rowsPerPageLabel?: string; // Optional
    noItemsMessage?: string; // Optional
  }