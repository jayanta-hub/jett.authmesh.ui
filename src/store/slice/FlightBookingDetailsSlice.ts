import { createSlice } from "@reduxjs/toolkit";
import { musafirFlightBookingDetailsApi } from "../musafirFlightBookingDetailsApi";
 
const initialState: any = {
FlightBookingDetailsData: {
},
FlightBookingAncillariesDetailsData: {},
};
 
export const FlightBookingDetailsSlice = createSlice({
name: "FlightBookingDetailsSlice",
initialState,
reducers: {
},
extraReducers: (builder) => {
builder
.addMatcher(musafirFlightBookingDetailsApi.endpoints.flightBookingDetails.matchPending, (state, { payload }) => {
state.FlightBookingDetailsData = payload;
})
.addMatcher(musafirFlightBookingDetailsApi.endpoints.flightBookingDetails.matchFulfilled, (state, { payload }) => {
state.FlightBookingDetailsData = payload;
})
.addMatcher(musafirFlightBookingDetailsApi.endpoints.flightBookingDetails.matchRejected, (state, { error }) => {
state.FlightBookingDetailsData = error;
});
builder
.addMatcher(musafirFlightBookingDetailsApi.endpoints.flightAncillariesBookingDetails.matchPending, (state, { payload }) => {
state.FlightBookingAncillariesDetailsData = payload;
})
.addMatcher(musafirFlightBookingDetailsApi.endpoints.flightAncillariesBookingDetails.matchFulfilled, (state, { payload }) => {
state.FlightBookingAncillariesDetailsData = payload;
})
.addMatcher(musafirFlightBookingDetailsApi.endpoints.flightAncillariesBookingDetails.matchRejected, (state, { error }) => {
state.FlightBookingAncillariesDetailsData = error;
});
},
});
 
export default FlightBookingDetailsSlice.reducer;