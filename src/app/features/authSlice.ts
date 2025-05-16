// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    receivedToken: (state, action)=>{
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, receivedToken, logout } = authSlice.actions;

export default authSlice.reducer;