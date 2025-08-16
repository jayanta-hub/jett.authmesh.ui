import { string } from "yup";

export interface Flight {
  stops?: any;
  equipmentDetails?: any;
  stops?: any;
  fareFamilyDetails?: any;
  fareFamily?: any;
  totalDuration : string;
  departureDateForDetails?: ReactNode;
  flightEquipmentDetails: any;
  cabinBaggages: Record<string, string>; 
  checkinBaggages: Record<string, string>; 
  flight: string;
  fareOptions: any[];
  airlineName: any[];
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
  flightImage: any[];
  totalTax: number;
  hasStop?: boolean;
  totalPrice: number;
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
 
export interface SignatureData {
  BookingId: string;
  TicketId: string;
  EmailId: string;
  Currency: string;
  Amount: number;
}