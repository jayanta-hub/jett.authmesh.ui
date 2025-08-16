import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectValueState {
  value: number;
}

const initialState: SelectValueState = {
  value: 0,
};

export const selectValueSlice = createSlice({
  name: 'selectValue',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    resetValue: () => initialState,
  },
});

export const { setValue, resetValue } = selectValueSlice.actions;
export default selectValueSlice.reducer;
