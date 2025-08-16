import { createSlice } from "@reduxjs/toolkit";
import { musafirOrgApi } from "../musafirOrgApi";

const initialState: any = {
    addOrgData: {},
    addfinaceManagerData: {},
    addtravelManagerData: {},
    organizationState: {},
    financeManagerState: {},
    travelManagerData: {},
    loading: false
};

export const orgSlice = createSlice({
    name: "orgSlice",
    initialState,
    reducers: {
        // Reducer to update formData
        setOrganizationData: (state, action) => {
            state.organizationState = { ...state.organizationState, ...action.payload }; // Merge new data into formData
        },
        setFinanceManagerData: (state, action) => {
            state.financeManagerState = { ...state.financeManagerState, ...action.payload }; // Merge new data into formData
        },
        setTravelManagerData: (state, action) => {
            state.travelManagerData = { ...state.travelManagerData, ...action.payload }; // Merge new data into formData
        },
        clearData: (state) => {
            state.organizationState = {};
            state.financeManagerState = {};
            state.travelManagerData = {};
        }
    },
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
            .addMatcher(musafirOrgApi.endpoints.postOrg.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirOrgApi.endpoints.postOrg.matchFulfilled, (state, { payload }) => {
                state.addOrgData = payload;
                state.loading = false;
            })
            .addMatcher(musafirOrgApi.endpoints.postOrg.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
        builder
            .addMatcher(musafirOrgApi.endpoints.postFinanceMangerDetails.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirOrgApi.endpoints.postFinanceMangerDetails.matchFulfilled, (state, { payload }) => {
                state.addfinaceManagerData = payload;
                state.loading = false;
            })
            .addMatcher(musafirOrgApi.endpoints.postFinanceMangerDetails.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });

        builder
            .addMatcher(musafirOrgApi.endpoints.postTravelMangerDetails.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirOrgApi.endpoints.postTravelMangerDetails.matchFulfilled, (state, { payload }) => {
                state.addtravelManagerData = payload;
                state.loading = false;
            })
            .addMatcher(musafirOrgApi.endpoints.postTravelMangerDetails.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });

    },
});

export const { setOrganizationData, setFinanceManagerData, setTravelManagerData, clearData } = orgSlice.actions;

export default orgSlice.reducer;