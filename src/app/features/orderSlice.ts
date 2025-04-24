// features/orders/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
});

export const { setSelectedOrder, clearSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;