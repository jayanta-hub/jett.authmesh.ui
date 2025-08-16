import { createSlice } from "@reduxjs/toolkit";
import { musafirBudgetsApi } from "../MusafirBudgetsApi";

const initialState: any = {
    fetchBudgetData: [],    
   editLoading: false,
   editData: {},
};

export const budgetSlice = createSlice({
    name: "budgetSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        
            .addMatcher(musafirBudgetsApi?.endpoints.fetchBudget.matchPending, (state) => {
                state.fetchLoading = true;
                state.fetchError = null;  
            })
            .addMatcher(musafirBudgetsApi?.endpoints.fetchBudget.matchFulfilled, (state, { payload }) => {
                state.fetchBudgetData = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirBudgetsApi?.endpoints.fetchBudget.matchRejected, (state, { error }) => {
                state.fetchLoading = false;
                state.fetchError = error;  
            })
          
              .addMatcher(musafirBudgetsApi?.endpoints.editBudget.matchPending, (state) => {
                state.editLoading = true;
                state.fetchError = null;  
            })
            .addMatcher(musafirBudgetsApi?.endpoints.editBudget.matchFulfilled, (state, { payload }) => {
                state.editData = payload; 
                state.editLoading = false;       
            })
            .addMatcher(musafirBudgetsApi?.endpoints.editBudget.matchRejected, (state, { error }) => {
                state.editLoading = false;
                state.fetchError = error;  
            })

    },
});

export default budgetSlice.reducer;
