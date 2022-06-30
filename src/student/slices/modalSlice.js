import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  low: '',
  high: '',
};

export const modal = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateLow: (state, action) => {
      state.low = action.payload;
    },
    updateHigh: (state, action) => {
      state.high = action.payload;
    }
  },
});

export const { updateName, updateLow, updateHigh } =
  modal.actions;
