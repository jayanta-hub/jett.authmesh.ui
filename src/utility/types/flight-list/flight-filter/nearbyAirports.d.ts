export interface NearbyAirportFilterProps {
    onNearbyAirportChange: (selectedNearbyAirports: string[], filterType: string) => void;
    nearbyAirportsDetails: nearbyAirport[];
    resetIndividualFilter: (filterType: string) => void
  }