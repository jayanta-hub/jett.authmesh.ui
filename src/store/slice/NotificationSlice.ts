import { createSlice } from "@reduxjs/toolkit";
import { musafirNotificationApi } from "../musafirNotificationApi";
const initialState: any = {
    createTemplateData: null,   
    fetchTemplateData: [],    
    createLoading: false,      
    fetchLoading: false,      
    createError: null,         
    fetchError: null,        
};

export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirNotificationApi?.endpoints.createEmailTemplate.matchPending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addMatcher(musafirNotificationApi?.endpoints.createEmailTemplate.matchFulfilled, (state, { payload }) => {
                state.createTemplateData = payload;
                state.createLoading = false;
            })
            .addMatcher(musafirNotificationApi?.endpoints.createEmailTemplate.matchRejected, (state, { error }) => {
                state.createLoading = false;
                state.createError = error;
            })

            .addMatcher(musafirNotificationApi?.endpoints.fetchEmailTemplates.matchPending, (state) => {
                state.fetchLoading = true;
                state.fetchError = null;  
            })
            .addMatcher(musafirNotificationApi?.endpoints.fetchEmailTemplates.matchFulfilled, (state, { payload }) => {
                state.fetchTemplateData = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirNotificationApi?.endpoints.fetchEmailTemplates.matchRejected, (state, { error }) => {
                state.fetchLoading = false;
                state.fetchError = error;  
            });
    },
});

export default notificationSlice.reducer;