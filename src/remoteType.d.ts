/// <reference types="react" />
declare module "mainpage/musafirFlight" {
    const musafirFlight: React.ComponentType;
    export default musafirFlight;
}

declare module "mainpage/store" {
    import { Reducer } from '@reduxjs/toolkit';

    export function getReducers(): Record<string, Reducer>;
    export function getMiddleware(): any[];
    export const store: any;
    export const persistor: any;

    // Slices
    export const flightSelectSlice: any;
    export const lookupSlice: any;
    export const flightLookupSlice: any;
    export const flightSearchSlice: any;
    export const flightListSlice: any;
    export const flightCheckoutReserveSlice: any;
    export const ancillariesSelectionsSlice: any;
    export const quotationSlice: any;
}
declare module "mainpage/flightSearchMicroFrontend" {
    const flightSearchMicroFrontend: React.ComponentType;
    export default flightSearchMicroFrontend;

}
declare module "mainpage/FilterProviderMicro" {
    import { ReactNode } from "react";
    interface Props {
        children: ReactNode;
    }
    const FilterProviderMicro: React.FC<Props>;
    export default FilterProviderMicro;
}
declare module "mainpage/SearchProviderMicro" {
    import { ReactNode } from "react";
    interface Props {
        children: ReactNode;
    }

    const SearchProviderMicro: React.FC<Props>;
    export default SearchProviderMicro;
}

