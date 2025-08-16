export interface FlightDetails {
    departureCity: string;
    departureAirport: string;
    arrivalCity: string;
    arrivalAirport: string;
}

export interface MobileTable {
    columns: string[];
    data: string[][];
}

export interface TempState {
    mobileTables: MobileTable[];
    flightDetails: FlightDetails;
    isReturnFlight: boolean;
    rows: string[][]
    columns : any[]
}