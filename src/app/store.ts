import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

import { apiSlice } from "./api/apiSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,   
  },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:  true,
})

// ✅ Export RootState
export type RootState = ReturnType<typeof store.getState>;