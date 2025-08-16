//FlightSelectSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightSelectApi } from "../musafirFlightSelectApi";

const initialState: any = {
    flightSelectAddData: {
    },
    flightSelectGetData: {
    },
};

export const flightSelectSlice = createSlice({
    name: "flightSelectSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirFlightSelectApi.endpoints.flightSelectAdd.matchPending, (state, { payload }) => {
                state.flightSelectAddData = payload;
            })
            .addMatcher(musafirFlightSelectApi.endpoints.flightSelectAdd.matchFulfilled, (state, { payload }) => {
                state.flightSelectAddData = payload;
            })
            .addMatcher(musafirFlightSelectApi.endpoints.flightSelectAdd.matchRejected, (state, { error }) => {
                state.flightSelectAddData = error;
            });

        builder
            .addMatcher(musafirFlightSelectApi.endpoints.flightSelectGet.matchPending, (state, { payload }) => {
                state.flightSelectGetData = payload;
            })
            .addMatcher(musafirFlightSelectApi.endpoints.flightSelectGet.matchFulfilled, (state, { payload }) => {
                state.flightSelectGetData = payload;
            })
            .addMatcher(musafirFlightSelectApi.endpoints.flightSelectGet.matchRejected, (state, { error }) => {
                state.flightSelectGetData = error;
            });
    },
});

export default flightSelectSlice.reducer;
