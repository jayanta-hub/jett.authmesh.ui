import { createSlice } from "@reduxjs/toolkit";
import { musafirLookupApi } from "../musafirLookupApi";

const initialState: any = {
    countryData: {},
    industryData: {},
    loading: false
};

export const lookupSlice = createSlice({
    name: "lookupSlice",
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
            .addMatcher(musafirLookupApi.endpoints.fetchCountry.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirLookupApi.endpoints.fetchCountry.matchFulfilled, (state, { payload }) => {
                state.countryData = payload;
                state.loading = false;
            })
            .addMatcher(musafirLookupApi.endpoints.fetchCountry.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });


        builder
            .addMatcher(musafirLookupApi.endpoints.fetchIndustry.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirLookupApi.endpoints.fetchIndustry.matchFulfilled, (state, { payload }) => {
                state.industryData = payload;
                state.loading = false;
            })
            .addMatcher(musafirLookupApi.endpoints.fetchIndustry.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });


    },



});

export default lookupSlice.reducer;