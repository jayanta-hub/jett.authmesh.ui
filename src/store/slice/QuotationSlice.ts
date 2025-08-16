import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  destinationInfo: [] as { [key: string]: any[] }[],
};

const quotationSlice = createSlice({
  name: "quotationSlice",
  initialState,
  reducers: {
    updateQuotationData: (state, action: PayloadAction<{ [key: string]: any[] }>) => {

      if (Object.keys(action.payload).length === 0) {
        state.destinationInfo = [];
        return;
      }
      const incomingKey = Object.keys(action.payload)[0];

      // Check if key already exists
      const existingIndex = state.destinationInfo.findIndex(obj =>
        Object.prototype.hasOwnProperty.call(obj, incomingKey)
      );

      if (existingIndex !== -1) {
        // Replace the existing entry
        state.destinationInfo[existingIndex] = action.payload;
      } else {
        // Push new entry
        state.destinationInfo.push(action.payload);
      }
    },
    clearQuotationData: (state) => {
      state.destinationInfo = [];
    },
  },
});


export const { updateQuotationData, clearQuotationData } = quotationSlice.actions;
export default quotationSlice;