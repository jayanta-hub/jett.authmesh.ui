import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectValuesState {
  view(view: any): unknown;
  isMandatory: boolean;
  tagType: string;
  valueType: string;
  showInModules: string[];
  assignParent: string;
  tagName: string;
}

const initialState: SelectValuesState = {
  isMandatory: false,
  tagType: '',
  valueType: '',
  showInModules: [],
  assignParent: '',
  tagName: '',
  view: 0,
};

export const tagCreationDataSlice = createSlice({
  name: 'tagCreationDataSlice',
  initialState,
  reducers: {
    setSelectValues: (state, action: PayloadAction<Omit<SelectValuesState, 'view'>>) => {
      return { ...state, ...action.payload }; 
    },
    setView: (state, action: PayloadAction<number>) => {
      state.view = action.payload;
    },
    resetSelectValues: (state) => {
      const view = state.view; 
      return {
        ...initialState,
        view,
      };
    },
  },
});

export const { setSelectValues ,setView,resetSelectValues} = tagCreationDataSlice.actions;
export default tagCreationDataSlice.reducer;
