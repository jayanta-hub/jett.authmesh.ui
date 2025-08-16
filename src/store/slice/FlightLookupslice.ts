import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightLookupApi } from "../musafirFlightLookupApi";


const initialState: any = {
    airportData: {},
    airlineData: {},
    cabinCLass: {},
    pax: {},
    metaData: {},
    loading: false
};

export const flightLookupSlice = createSlice({
    name: "flightLookupSlice",
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
            .addMatcher(musafirFlightLookupApi.endpoints.fetchAirports.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchAirports.matchFulfilled, (state, { payload }) => {
                state.airportData = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchAirports.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });

        builder
            .addMatcher(musafirFlightLookupApi.endpoints.fetchCabinClass.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchCabinClass.matchFulfilled, (state, { payload }) => {
                state.cabinCLass = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchCabinClass.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });

        builder
            .addMatcher(musafirFlightLookupApi.endpoints.fetchAirline.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchAirline.matchFulfilled, (state, { payload }) => {
                state.airlineData = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchAirline.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });

        builder
            .addMatcher(musafirFlightLookupApi.endpoints.fetchPax.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchPax.matchFulfilled, (state, { payload }) => {
                state.pax = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchPax.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
        builder
            .addMatcher(musafirFlightLookupApi.endpoints.fetchMetaData.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchMetaData.matchFulfilled, (state, { payload }) => {
                state.metaData = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchMetaData.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
        builder
            .addMatcher(musafirFlightLookupApi.endpoints.fetchflights.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchflights.matchFulfilled, (state, { payload }) => {
                state.metaData = payload;
                state.loading = false;
            })
            .addMatcher(musafirFlightLookupApi.endpoints.fetchflights.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });

    },



});

export default flightLookupSlice.reducer;