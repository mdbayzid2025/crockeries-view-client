// features/customers/customerService.js

import { apiSlice } from "../api/apiSlice";

export const categoryApiSlice =apiSlice.enhanceEndpoints({addTagTypes: ['Category']}).injectEndpoints({
  endpoints: builder  => ({
    getCategories: builder.query({
      query: ()=> 'category',
      providesTags: ['Category']
    }),

    getSingleCategoryt: builder.query({
      query: (id)=> `/${id}`
    }),
    addCategory: builder.mutation({
      query: (data)=>({
        url: ``,
        method: "POST",
        body: data,
      })
    }),
    updateCategory: builder.mutation({
      query: ({id, ...rest})=>({
        url: `/${id}`,
        method: "PUT",
        body: rest,
      })
    }),
    deleteCategory: builder.mutation({
      query: (id)=>({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Category"]
    }),
    addBrand: builder.mutation({
      query: (body)=>({
        url: `products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"]
    }),
    deleteBrand: builder.mutation({
        query: ({id, ...rest})=>({
          url: `/${id}/delete-brand`,
          method: "DELETE",
          rest,
        }),
        invalidatesTags: ["Category"]
      }),
  })
})


export const {
  useGetCategoriesQuery,
  useGetSingleCategorytQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  useAddBrandMutation,
  useDeleteBrandMutation
} = categoryApiSlice;

export default categoryApiSlice.reducer;