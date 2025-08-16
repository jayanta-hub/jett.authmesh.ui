import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    seatsSelections: {
        selectedSeats: [],
        totalPrice: 0,
      },
      mealsSelections: {
        selectedMeals: [],
        totalPrice: 0,
      },
      baggagesSelections: {
        selectedBaggages: [],
        totalPrice: 0,
      },
};

export const ancillariesSelectionsSlice = createSlice({
    name: 'ancillariesSelectionsSlice',
    initialState,
    reducers: {
        // Seats
        setSeatsSelections: (state, action) => {
            state.seatsSelections = {
              selectedSeats: action.payload.selectedSeats,
              totalPrice: action.payload.totalPrice,
            };
          },
        addSeatsSelections: (state, action) => {
            state.seatsSelections.push(action.payload);
        },
        clearSeatsSelections: (state) => {
            state.seatsSelections = {
              selectedSeats: [],
              totalPrice: 0,
            };
          },
        // Meals
        setMealsSelections: (state, action) => {
            state.mealsSelections = {
              selectedMeals: action.payload.selectedMeals,
              totalPrice: action.payload.totalPrice,
            };
          },
        addMealsSelections: (state, action) => {
            state.mealsSelections.push(action.payload);
        },
        clearMealsSelections: (state) => {
            state.mealsSelections = {
              selectedMeals: [],
              totalPrice: 0,
            };
          },

        // Baggage
        setBaggagesSelections: (state, action) => {
            state.baggagesSelections = {
              selectedBaggages: action.payload.selectedBaggages,
              totalPrice: action.payload.totalPrice,
            };
          },
        addBaggagesSelections: (state, action) => {
            state.baggagesSelections.push(action.payload);
        }, 
        clearBaggagesSelections: (state) => {
            state.baggagesSelections = {
              selectedBaggages: [],
              totalPrice: 0,
            };
          },
    },
});

// Export actions
export const {
    setSeatsSelections,
    addSeatsSelections,
    clearSeatsSelections,
    setMealsSelections,
    addMealsSelections,
    clearMealsSelections,
    setBaggagesSelections,
    addBaggagesSelections,
    clearBaggagesSelections,
} = ancillariesSelectionsSlice.actions;

// ✅ Export reducer for store setup
export default ancillariesSelectionsSlice.reducer;
