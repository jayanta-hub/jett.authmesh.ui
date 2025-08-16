export interface StopsFilterProps {
    onStopsSelection: (selectedStops: string[], filterType: string) => void;
    flightApiData: any
  }

export interface Flight {
    stops: {
      isDirect: boolean;
      isOneStop: boolean;
      isTwoStop: boolean;
    };
  }
  
export interface GroupedFlights {
    directFlights: Flight[];
    oneStopFlights: Flight[];
    twoStopFlights: Flight[];
  }
  