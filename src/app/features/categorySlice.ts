// features/customers/customerService.js

import { apiSlice } from "../api/apiSlice";

export const categoryApiSlice =apiSlice.enhanceEndpoints({addTagTypes: ['Category', 'Brand']}).injectEndpoints({
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
        url: `category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation({
      query: ({id, ...rest})=>({
        url: `category/${id}/update`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Category", "Brand"]
    }),
    deleteCategory: builder.mutation({
      query: (id)=>({
        url: `category/${id}/delete-category`,
        method: "DELETE"
      }),
      invalidatesTags: ["Category"]
    }),
    addBrand: builder.mutation({
      query: ({id, ...rest})=>({
        url: `category/${id}/new-brand`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["Category", "Brand"]
    }),
    deleteBrand: builder.mutation({
        query: ({id, brand})=>({
          url: `category/${id}/delete-brand?brand=${encodeURIComponent(brand)}`,
          method: "DELETE",          
        }),
        invalidatesTags: ["Category", "Brand"]
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