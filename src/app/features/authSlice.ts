// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("User")) : null,  
  isAuthenticated: !!localStorage.getItem("user"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;    
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(state?.user));      
    },    
    logout: (state) => {
      state.user = null;      
      state.isAuthenticated = false;
      localStorage.removeItem("user", state?.accessToken);
      
    },
  },
});

export const { setCredentials, receivedToken, logout } = authSlice.actions;

export default authSlice.reducer;