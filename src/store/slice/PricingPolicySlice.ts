import { createSlice } from "@reduxjs/toolkit";
import { musafirPricingPolicyApi } from "../musafirPricingPolicyApi";


const initialState: any = {
    supplierData: {},
};

export const pricingPolicySlice = createSlice({
    name: "pricingPolicySlice",
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
            .addMatcher(musafirPricingPolicyApi.endpoints.fetchSupplierData.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirPricingPolicyApi.endpoints.fetchSupplierData.matchFulfilled, (state, { payload }) => {
                state.supplierData = payload;
                state.loading = false;
            })
            .addMatcher(musafirPricingPolicyApi.endpoints.fetchSupplierData.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
    },



});

export default pricingPolicySlice.reducer;