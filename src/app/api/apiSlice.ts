import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        
        token = localStorage.getItem("refreshToken");
        let result = await baseQuery(args, api, extraOptions);

        if(result?.error?.status === 401){
            token = localStorage.getItem("refreshToken");

            const refreshToken = await baseQuery({
                url: "auth/refresh-token",
                method: "GET",
            }, api, extraOptions);

            console.log("refresh token", refreshToken);

            if(refreshToken?.data){
                api.dispatch(receivedToken(refreshToken?.data?.accessToken))

                result = await baseQuery(args, api, extraOptions);
            }else{
                api.dispatch(logout());
            }             
        }
        return result;
    },
    endpoints: builder => ({})
})