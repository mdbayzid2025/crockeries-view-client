// features/customers/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { setSelectedCustomer, clearSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;