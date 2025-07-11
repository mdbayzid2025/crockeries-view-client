
// features/auth/authService.js

import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    signOut: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
    getCurrentUser: builder.query({
      query: () => 'me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSignOutMutation ,
  useGetCurrentUserQuery,
} = authApi;

