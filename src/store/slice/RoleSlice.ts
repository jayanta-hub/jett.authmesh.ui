/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { musafirRolesApi } from "../musafirRolesApi";

const initialState: any = {
    roleinfo: {},
};

export const rolesSlice = createSlice({
    name: "rolesSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(musafirRolesApi.endpoints.roles.matchRejected, (state, { payload }) => {
            state.roleinfo = payload;
        });
        builder.addMatcher(musafirRolesApi.endpoints.roles.matchFulfilled, (state, { payload }) => {
            state.roleinfo = payload;
        });
    },
});
export default rolesSlice.reducer;