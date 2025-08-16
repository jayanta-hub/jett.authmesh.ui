import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightListApi } from "../musafirFlightListApi";


const initialState: any = {
    flightlistData: {},
    flightlistResult: {},
    loading: false
};

export const flightListSlice = createSlice({
    name: "flightListSlice",
    initialState,
    reducers: {},
    /**
     * Handles additional actions for the MarketSlice using matchers.
     * 
     * This function listens to various states of the fetchMarket API call:
     * - When the API call is pending, it sets the loading state to true and clears any previous errors.
     * - When the API call is fulfilled, it updates the marketData with the payload and sets loading to false.
     * - When the API call is rejected, it sets loading to false and updates the error state with the error information.
     * 
     * @param builder The builder object provided by Redux Toolkit for adding matchers.
     */
    extraReducers: (builder) => {
            builder
            .addMatcher(musafirFlightListApi.endpoints.fetchFlightList.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightListApi.endpoints.fetchFlightList.matchFulfilled, (state, { payload }) => {
                state.flightlistData = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightListApi.endpoints.fetchFlightList.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });


            builder
            .addMatcher(musafirFlightListApi.endpoints.fetchFlightListResult.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightListApi.endpoints.fetchFlightListResult.matchFulfilled, (state, { payload }) => {
                state.flightlistResult = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightListApi.endpoints.fetchFlightListResult.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
    },
    
});

export default flightListSlice.reducer;