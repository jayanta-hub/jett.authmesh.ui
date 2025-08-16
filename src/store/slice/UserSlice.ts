import { createSlice } from "@reduxjs/toolkit";
import { musafirUserApi } from "../musafirUserApi";

const initialState: any = {
    userData: {},
      loading: false,
      error: null,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(musafirUserApi?.endpoints.fetchUsers.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(musafirUserApi?.endpoints.fetchUsers.matchFulfilled, (state, { payload }) => {
                state.userData = payload;
                state.loading = false;
            })
            .addMatcher(musafirUserApi?.endpoints.fetchUsers.matchRejected, (state, { error }) => {
                state.loading = false;
                state.error = error;
            });
    },
});

export default userSlice.reducer;