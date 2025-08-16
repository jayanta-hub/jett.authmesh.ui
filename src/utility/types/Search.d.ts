export interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  filter: object;
  setFilter: (value: object) => void;
  sort: string;
  setSort: (value: string) => void;
  add: boolean;
  setAdd: (value: boolean) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
  editIcon: boolean;
  setEditIcon: (value: boolean) => void;
  deleteUser: boolean;
  setDeleteUser: (value: boolean) => void;
  showScreen: boolean;
  setShowScreen: (value: boolean) => void;
  formResetKey: number;
  setFormResetkey: (value: number) => void;
  showMap: boolean;
  setShowMap: (value: boolean) => void;
  coordinates: string[];
  setCoordinates: (value: string[]) => void;
  quotation: any[];
  setQuotation: (value: any[]) => void;
    airports:string[];
  setAirports: (value: string[]) => void;
   resetSearchState: () => void; 
}