export interface LayoverFilterProps {
  onLayoverAirportChange: (selectedLayovers: string[], filterType: string) => void;
  layoverAirports: LayoverAirport[];
}