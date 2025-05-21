import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  credentials: "include", // send cookies with each request
});

export const apiSlice = createApi({
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      // Attempt to refresh token
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh-token",
          method: "GET",
        },
        api,
        extraOptions
      );

      if (refreshResult?.error) {
        api.dispatch(logout());
        return refreshResult;
      }

      // Retry the original request after refreshing the token
      result = await baseQuery(args, api, extraOptions);
    }

    return result;
  },
  endpoints: (builder) => ({}),
});
