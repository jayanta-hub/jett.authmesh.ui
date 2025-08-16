//FlightCheckoutReserveSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightCheckoutReserveApi } from "../musafirFlightCheckoutReserveApi";

const initialState: any = {
    flightCheckoutReserveData: {
    },
    flightAncillaryReserveData:{}   
};

export const flightCheckoutReserveSlice = createSlice({
    name: "flightCheckoutReserveSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirFlightCheckoutReserveApi.endpoints.flightCheckoutReserve.matchPending, (state, { payload }) => {
                state.flightCheckoutReserveData = payload;
            })
            .addMatcher(musafirFlightCheckoutReserveApi.endpoints.flightCheckoutReserve.matchFulfilled, (state, { payload }) => {
                state.flightCheckoutReserveData = payload;
            })
            .addMatcher(musafirFlightCheckoutReserveApi.endpoints.flightCheckoutReserve.matchRejected, (state, { error }) => {
                state.flightCheckoutReserveData = error;
            });
            builder
            .addMatcher(musafirFlightCheckoutReserveApi.endpoints.flightAncillaryReserve.matchPending, (state, { payload }) => {
                state.flightAncillaryReserveData = payload;
            })
            .addMatcher(musafirFlightCheckoutReserveApi.endpoints.flightAncillaryReserve.matchFulfilled, (state, { payload }) => {
                state.flightAncillaryReserveData = payload;
            })
            .addMatcher(musafirFlightCheckoutReserveApi.endpoints.flightAncillaryReserve.matchRejected, (state, { error }) => {
                state.flightAncillaryReserveData = error;
            });
    },
});

export default flightCheckoutReserveSlice.reducer;
