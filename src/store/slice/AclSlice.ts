import { createSlice } from "@reduxjs/toolkit";
import { musafirAclApi } from "../musafirAclApi";

const initialState: any = {
    aclData: {},
    loading: false,
};

export const aclSlice = createSlice({
    name: "aclSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirAclApi.endpoints.fetchACL.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirAclApi.endpoints.fetchACL.matchFulfilled, (state, { payload }) => {
                state.aclData = payload;
                state.loading = false;
            })
            .addMatcher(musafirAclApi.endpoints.fetchACL.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
    },
});

export default aclSlice.reducer;