//  FlightAncillariesSeatsSlice
import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightAncillariesSeatsApi } from "../musafirFlightAncillariesSeatsApi";

const initialState: any = {
    flightCheckoutReserveData: {
    },  
};

export const FlightAncillariesSeatsApiSlice = createSlice({
    name: "FlightAncillariesSeatsApiSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirFlightAncillariesSeatsApi.endpoints.flightAncillariesSeatsApi.matchPending, (state, { payload }) => {
                           state.flightCheckoutReserveData = payload;
                       })
          .addMatcher(musafirFlightAncillariesSeatsApi.endpoints.flightAncillariesSeatsApi.matchPending, (state, { payload }) => {
                         state.flightCheckoutReserveData = payload;
                     })
            .addMatcher(musafirFlightAncillariesSeatsApi.endpoints.flightAncillariesSeatsApi.matchRejected, (state, { error }) => {
                state.flightCheckoutReserveData = error;
            })
            
    },
});

export default FlightAncillariesSeatsApiSlice.reducer;