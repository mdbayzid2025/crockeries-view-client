// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("User")) : null,
  refreshToken: localStorage.getItem("accessToken") ? localStorage.getItem("acccessToken") : null,
  accessToken: localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : null,
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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(state?.user));
      localStorage.setItem("accessToken", state?.accessToken);
      localStorage.setItem("refreshToken", state?.refreshToken);
    },
    receivedToken: (state, action)=>{
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.refreshToken = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user", state?.accessToken);
      localStorage.removeItem("accessToken", state?.accessToken);
      localStorage.removeItem("refreshToken", state?.refreshToken);
    },
  },
});

export const { setCredentials, receivedToken, logout } = authSlice.actions;

export default authSlice.reducer;