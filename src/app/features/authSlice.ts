// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user data that will be stored in state and localStorage
interface User {
  accessToken?: string; // Assuming an accessToken might be part of the user object
  // Add other user properties here if they exist
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any; // Type error as any
}

const getInitialUser = (): User | null => {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      // It's safer to use 'user' key consistently. Corrected from "User" to "user".
      return JSON.parse(userString) as User; 
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  isAuthenticated: !!localStorage.getItem("user"), // Check for 'user' key consistency
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<any>) => { // Type state and action payload as any
      state.user = action.payload.user;      
      state.isAuthenticated = true;

      // Ensure that 'user' is stored consistently and correctly
      localStorage.setItem("user", JSON.stringify(state.user));
    },      
    logout: (state: AuthState) => { // Type state as AuthState
      state.user = null;      
      state.isAuthenticated = false;

      localStorage.removeItem("user");

    },
  },
});

// Removed 'receivedToken' as it's not defined in the reducers.
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
