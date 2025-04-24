// features/customers/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCustomers: [],
  selectedCustomer: null,
  customerCache: {},
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

    // Action to update all customers
    setAllCustomers: (state, action) => {
      state.allCustomers = action.payload;
    },
 // Action to update a single customer in cache
 cacheCustomer: (state, action) => {
  const customer = action.payload;
  state.customerCache[customer?.id] = customer;
},
// Clear cache if needed
clearCustomerCache: (state) => {
  state.customerCache = {};
},
  },
});

export const { setAllCustomers, setSelectedCustomer, clearCustomerCache, cacheCustomer } = customerSlice.actions;


// Selectors
export const selectAllCustomers = (state:any) => state.customers.allCustomers;
export const selectCachedCustomer = (id:any) => (state:any) => state.customers.customerCache[id];

export default customerSlice.reducer;