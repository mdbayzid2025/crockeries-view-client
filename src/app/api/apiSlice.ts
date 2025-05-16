import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, receivedToken } from "../features/authSlice";

let token : any;

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders:(header)=>{
        if(token){
            header.set("Authorization", `Bearer ${token}`)
        }

        return header;
    }
})


export const apiSlice = createApi({
    baseQuery: async (args, api, extraOptions) =>{
        
        token = localStorage.getItem("accessToken");
        let result = await baseQuery(args, api, extraOptions);

       if (result?.error?.status === 401) {
  token = localStorage.getItem("refreshToken");

  const refreshResult = await baseQuery({
    url: "auth/refresh-token",
    method: "GET",
  }, api, extraOptions);

  if (refreshResult?.data) {
    api.dispatch(receivedToken(refreshResult.data.accessToken));
    localStorage.setItem("accessToken", refreshResult.data.accessToken);

    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
  }
}
        return result;
    },
    endpoints: builder => ({})
})