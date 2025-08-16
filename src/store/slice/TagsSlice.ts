import { createSlice } from "@reduxjs/toolkit";
import { musafirTagsApi } from "../musafirTagsApi";
const initialState: any = {
    createTemplateData: null,   
    fetchTagsData: [],    
    createLoading: false,      
    fetchLoading: false,      
    createError: null,         
    fetchError: null,   
    fetchTagsMetaData: {}, 
    fetchMetaLoading:false,
    fetchParentTags:{},
    basicCreationId:{},
    groupData:{},
    tagsInfoLoading:false,
    tagsInfo:{},
    tagsStatus:{}
};

export const tagsSlice = createSlice({
    name: "tagsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addMatcher(musafirNotificationApi?.endpoints.createEmailTemplate.matchPending, (state) => {
            //     state.createLoading = true;
            //     state.createError = null;
            // })
            // .addMatcher(musafirNotificationApi?.endpoints.createEmailTemplate.matchFulfilled, (state, { payload }) => {
            //     state.createTemplateData = payload;
            //     state.createLoading = false;
            // })
            // .addMatcher(musafirNotificationApi?.endpoints.createEmailTemplate.matchRejected, (state, { error }) => {
            //     state.createLoading = false;
            //     state.createError = error;
            // })

            .addMatcher(musafirTagsApi?.endpoints.fetchTags.matchPending, (state) => {
                state.fetchLoading = true;
                state.fetchError = null;  
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchTags.matchFulfilled, (state, { payload }) => {
                state.fetchTagsData = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchTags.matchRejected, (state, { error }) => {
                state.fetchLoading = false;
                state.fetchError = error;  
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchTagsMeta.matchPending, (state) => {
                state.fetchMetaLoading = true;
                state.fetchError = null;  
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchTagsMeta.matchFulfilled, (state, { payload }) => {
                state.fetchTagsMetaData = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchTagsMeta.matchRejected, (state, { error }) => {
                state.fetchMetaLoading = false;
                state.fetchError = error;  
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchParentTags.matchPending, (state) => {
                state.fetchLoading = true;
                state.fetchError = null;  
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchParentTags.matchFulfilled, (state, { payload }) => {
                state.fetchParentTags = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchParentTags.matchRejected, (state, { error }) => {
                state.fetchLoading = false;
                state.fetchError = error;  
            })
            .addMatcher(musafirTagsApi?.endpoints.basicCreation.matchFulfilled, (state, { payload }) => {
                state.basicCreationId = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchGroup.matchFulfilled, (state, { payload }) => {
                state.groupData = payload; 
                state.fetchLoading = false;       
            })
            .addMatcher(musafirTagsApi?.endpoints.fetchTagsById.matchFulfilled, (state, { payload }) => {
                state.tagsInfo = payload; 
                state.tagsInfoLoading = false;       
            })
            .addMatcher(musafirTagsApi?.endpoints.tagsStatus.matchFulfilled, (state, { payload }) => {
                state.tagsStatus = payload; 
                state.tagsInfoLoading = false;       
            })

    },
});

export default tagsSlice.reducer;