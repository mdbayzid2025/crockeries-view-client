import { apiSlice } from "../api/apiSlice";

export const productApiSlice = apiSlice.enhanceEndpoints({addTagTypes: ['Products']}).injectEndpoints({
  endpoints: builder  => ({
    getProducts: builder.query({
      query: ()=> 'products',
      providesTags: ['Products']
    }),
    
    getSingleProduct: builder.query({
      query: (id)=> `product/${id}`
    }),
    updateProduct: builder.mutation({
      query: ({id, ...rest})=>({
        url: `products/${id}`,
        method: "PUT",
        body: rest,
      })
    }),
    deleteProduct: builder.mutation({
      query: (id)=>({
        url: `products/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Products"]
    }),
    addProduct: builder.mutation({
      query: (body)=>({
        url: `products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"]
    })
  })
})


export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductMutation
} = productApiSlice;

export default productApiSlice.reducer;