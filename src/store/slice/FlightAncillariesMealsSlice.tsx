//  FlightAncillariesMealsSlice

import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightAncillariesMealsApi } from "../musafirFlightAncillariesMealsApi";

const initialState: any = {
    flightCheckoutReserveData: {
    },  
};

export const FlightAncillariesMealsApiSlice = createSlice({
    name: "FlightAncillariesMealsApiSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirFlightAncillariesMealsApi.endpoints.flightAncillariesMealsApi.matchPending, (state, { payload }) => {
                           state.flightCheckoutReserveData = payload;
                       })
          .addMatcher(musafirFlightAncillariesMealsApi.endpoints.flightAncillariesMealsApi.matchPending, (state, { payload }) => {
                         state.flightCheckoutReserveData = payload;
                     })
            .addMatcher(musafirFlightAncillariesMealsApi.endpoints.flightAncillariesMealsApi.matchRejected, (state, { error }) => {
                state.flightCheckoutReserveData = error;
            })
            
    },
});

export default FlightAncillariesMealsApiSlice.reducer;

