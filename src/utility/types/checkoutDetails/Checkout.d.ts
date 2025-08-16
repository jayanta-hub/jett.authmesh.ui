export default interface get_Flight_Data_is {
    Response: {
      BookFlightRefKey: any;
      PriceDetails: any;
      Pax: any;
      Flights: Flight[];
    };
  }

  // Define the Flight interface
  export interface Flight {
    TripType: any;
    Itineraries: Itinerary[];
    FareOptions: FareOption[];
  }

  // Define the Itinerary interface
  export interface Itinerary {
    Baggages: any;
    DepartureAirportCode: any;
    ArrivalAirportCode: any;
    Segments: Segment[];
  }

  export interface Fare {
    CurrencyCode: string;
    // Add other properties as needed
  }

  // Define the Segment interface
  export interface Segment {
    ArrivalAirport: string;
    ArrivalAirportCityNames: string;
    baggage: string;
    DepartureAirport: string;
    DepartureAirportCityNames: string;
    AircraftName: string;
    MarketingIcon: string | null;
    MarketingAirlineIcon: string;
    OperatingAirlineIcon: string;
    DepartureAirportCityName: string;
    ArrivalAirportCityName: any;
    TripType: string;
    OperatingIcon: string | null;
    FlightNumber: string;
    DepartureAirportName: string | null;
    ArrivalAirportName: string | null;
    DepartureDate: string;
    DepartureTime: string;
    ArrivalDate: string;
    ArrivalTime: string;
    CabinCode: string;
    DepartureAirportCode: string;
    ArrivalAirportCode: string;
    FareTypeCode: string;
    Equipment: Equipment;
    Duration: number;
    DepartureTerminal: string | null;
    ArrivalTerminal: string | null;
    MarketingAirline: string;
    OperatingAirline: string;
    OperatingAirlineName: string | null;
  }

  // Define the Equipment interface
  export interface Equipment {
    AircraftCode: string;
    Name: string;
  }

  // Define the FareOption interface
  export interface FareOption {
    PassengerCount: string;
    PassengerType: string;
    PriceInfo: PriceInfo;
    CurrencyCode: string;
  }

  // Define the PriceInfo interface
  export interface PriceInfo {
    Tax: number;
    CurrencyCode: string;
    TotalPrice: number;
    BasePrice: number;
    TotalTax: number;
    AppliedDeal: number;
  }
  export interface priceSummary {
    forEach(arg0: (item: any) => void): unknown;
    CurrencyCode: string;
    TotalPrice: number;
    BasePrice: number;
    TotalTax: number;
    AppliedDeal: number;
    Tax: number;
  }