
import { createSlice } from "@reduxjs/toolkit";
import { musafirAncillariesBaggageApi } from '../musafirAncillariesBaggageApi';

const initialState: any = {
    flightCheckoutReserveData: {
    },   
};

export const FlightAncillariesBaggageApiSlice = createSlice({
    name: "FlightAncillariesBaggageApiSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirAncillariesBaggageApi.endpoints.flightAncillariesBaggageApi.matchPending, (state, { payload }) => {
                state.flightCheckoutReserveData = payload;
            })
            .addMatcher(musafirAncillariesBaggageApi.endpoints.flightAncillariesBaggageApi.matchFulfilled, (state, { payload }) => {
                state.flightCheckoutReserveData = payload;
            })
            .addMatcher(musafirAncillariesBaggageApi.endpoints.flightAncillariesBaggageApi.matchRejected, (state, { error }) => {
                state.flightCheckoutReserveData = error;
            });
    },
});

export default FlightAncillariesBaggageApiSlice.reducer;
