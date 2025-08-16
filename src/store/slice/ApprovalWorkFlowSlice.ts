import { createSlice } from "@reduxjs/toolkit";
import { musafirApprovalApi } from "../musafirAprrovalWorkFlow";


const initialState: any = {
    createApprovalData: {},
    workflowListData: [],
    workflowListById: {},
    editWorkflowById: {},
    deleteWorkflowById: {},
    tagCount: {},
    loading: false
};

export const approvalWorkFlowSlice = createSlice({
    name: "approvalWorkFlowSlice",
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
            .addMatcher(musafirApprovalApi.endpoints.createApprovalWorkflow.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirApprovalApi.endpoints.createApprovalWorkflow.matchFulfilled, (state, { payload }) => {
                state.createApprovalData = payload;
                state.loading = false;
            })
            .addMatcher(musafirApprovalApi.endpoints.createApprovalWorkflow.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
            builder
            .addMatcher(musafirApprovalApi.endpoints.fetchWorkflowList.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirApprovalApi.endpoints.fetchWorkflowList.matchFulfilled, (state, { payload }) => {
                state.workflowListData = payload;
                state.loading = false;
            })
            .addMatcher(musafirApprovalApi.endpoints.fetchWorkflowList.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
            builder
            .addMatcher(musafirApprovalApi.endpoints.fetchWorkflowListById.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirApprovalApi.endpoints.fetchWorkflowListById.matchFulfilled, (state, { payload }) => {
                state.workflowListById = payload;
                state.loading = false;
            })
            .addMatcher(musafirApprovalApi.endpoints.fetchWorkflowListById.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
            builder
            .addMatcher(musafirApprovalApi.endpoints.editWorkflowListById.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirApprovalApi.endpoints.editWorkflowListById.matchFulfilled, (state, { payload }) => {
                state.editWorkflowById = payload;
                state.loading = false;
            })
            .addMatcher(musafirApprovalApi.endpoints.editWorkflowListById.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
            builder
            .addMatcher(musafirApprovalApi.endpoints.tagCountApi.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirApprovalApi.endpoints.tagCountApi.matchFulfilled, (state, { payload }) => {
                state.tagCount = payload;
                state.loading = false;
            })
            .addMatcher(musafirApprovalApi.endpoints.tagCountApi.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
    },



});

export default approvalWorkFlowSlice.reducer;