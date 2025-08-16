
export interface FilterContextProps {
    initialState: any;
    priceFilter: any;
    flexibleTravel: any;
    airlines: any;
    flightDuration: any;
    departureReturnTime:any,
    arrivalReturnTime:any,
    arrivalTime: any;
    departureTime: any;
    currencyCode:any;
    setInitialState: Dispatch<SetStateAction<any>>;
    setPriceFilter: Dispatch<SetStateAction<any>>;
    setFlexibleTravel: Dispatch<SetStateAction<any>>;
    setAirlines: Dispatch<SetStateAction<any>>;
    setFlightDuration: Dispatch<SetStateAction<any>>;
    setArrivalTime: Dispatch<SetStateAction<any>>;
    setDepartureTime: Dispatch<SetStateAction<any>>;
    setCurrencyCode:Dispatch<SetStateAction<any>>;
    resetAll: () => void;
    cancelFilters:() => void;
    isFilterActive: () => boolean;
    selectedNearbyAirports: any;
    setSelectedNearbyAirports: Dispatch<SetStateAction<any>>;
    selectedLayoverAirports: any;
    setSelectedLayoverAirports: Dispatch<SetStateAction<any>>;
    selectedStops: any;
    setSelectedStops: Dispatch<SetStateAction<any>>;
    returnFlightDuration: any;
    setReturnFlightDuration: Dispatch<SetStateAction<any>>;
    setArrivalReturnTime: Dispatch<SetStateAction<any>>;
    setDepartureReturnTime: Dispatch<SetStateAction<any>>;
  }
  