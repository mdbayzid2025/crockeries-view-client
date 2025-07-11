import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
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

console.log("refreshResult", refreshResult)
      if (refreshResult?.error) {
        await baseQuery({url: "auth/logout",method: "GET",},api,extraOptions)
        api.dispatch(logout());
        return refreshResult;
      }

      // Retry the original request after refreshing the token
      result = await baseQuery(args, api, extraOptions);
    }

    return result;
  },
  endpoints: () => ({}),
});
