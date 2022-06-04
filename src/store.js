import { configureStore } from '@reduxjs/toolkit';
import { modal } from './student/slices/modalSlice';

const Store = configureStore({
  reducer: {
    [modal.name]: modal.reducer,
  },
});

export default Store;
