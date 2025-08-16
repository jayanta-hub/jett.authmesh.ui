export interface FlightSortingMobileViewProps {
    onSort: (field: string, order: string) => void; // Function to handle sorting change
    sortOrder: 'asc' | 'desc'; // Sorting order (ascending or descending)
    handleSendQuotation: () => void;
  }