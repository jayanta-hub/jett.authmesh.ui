import { string } from "yup";

interface cabin {
  label:string,
  value:string,
  ADULT:string
}
export interface Flight {
  airports: any;
  mode: string;
  totalDuration: number;
  Layovers:[{City:string,Duration:string}];
  returnFlight: any;
  tripType: string;
  segmentData: any;
  segments: any;
  stops: any;
  equipmentDetails: any;
  fareFamilyDetails: any;
  fareFamily: any;
  departureDateForDetails: ReactNode;
  flightEquipmentDetails: any;
  cabinBaggages: cabin []; 
  checkinBaggages: any;
  flight: string;
  fareOptions: any[];
  airlineName: any;
  departureAirportDetails: any;
  arrivalAirportDetails: any;
  departureTime: string;
  arrivalTime: string;
  flightName: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  flightImage: string;
  hasStop?: boolean;
  totalPrice: number;
  tripDirection?: string;
  layover?: boolean;
  flightDuration: string;
  noOfStop: string;
  arrivalDate: string;
  arrivalTerminal: string;
  cabinClass: string;
  departureDate: string;
  departureTerminal: string;
  flightName?: string;
  duration?: string;
  flightImage?: string;
  searchKey: string;
  arrivalAirportName?: string;
  departureAirportName?: string;
  similarFlights?: Flight[]; // Optional similar flights
  similarCount?: number;
  newArrivalDate?: string;
  newDepartureDate?: string;
  flightRefKey : string;
  IsFreeBaggage : boolean;
  return?: {
    departureTime: string;
    arrivalTime: string;
    flightName: string;
    flightNumber: string;
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    duration: string;
    flightImage: string;
    hasStop?: boolean;
    totalPrice:number;
    layover?: boolean;
    flightDuration: string;
    noOfStop: string;
    arrivalDate: string;
    arrivalTerminal: string;
    cabinClass: string;
    departureDate: string;
    departureTerminal: string;
    flightName?: string;
    duration?: string;
    flightImage?: string;
    searchKey: string;
    newArrivalDate?: string;
  newDepartureDate?: string;
  flight: string;
  };
}
