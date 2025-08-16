import { createSlice } from "@reduxjs/toolkit";
import { musafirMarketApi } from "../musafirMarketApi";

const initialState: any = {
    marketData: {},
    loading:false
};

export const marketSlice = createSlice({
    name: "marketSlice",
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
            .addMatcher(musafirMarketApi.endpoints.fetchMarket.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirMarketApi.endpoints.fetchMarket.matchFulfilled, (state, { payload }) => {
                state.marketData = payload?.Response;
                state.loading = false;
            })
            .addMatcher(musafirMarketApi.endpoints.fetchMarket.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
    },
});

export default marketSlice.reducer;