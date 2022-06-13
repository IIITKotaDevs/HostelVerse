import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  low: '',
  high: '',
};

export const modal = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    updateLow: (state, action) => {
      state.low = action.payload;
    },
    updateHigh: (state, action) => {
      state.high = action.payload;
    }
  },
});

export const { updateLow, updateHigh } =
  modal.actions;