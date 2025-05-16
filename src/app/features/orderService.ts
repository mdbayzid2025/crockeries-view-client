// features/orders/orderService.js

import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.enhanceEndpoints({addTagTypes: ['Order', 'ShopInfo']}).injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (status) => ({
        url: '/orders',
        params: { status }, // Pass status as query parameter
      }),
      providesTags: ['Order'],
    }),   

    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: 'orders/create',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => ({
        url: `orders/${id}`,
        method: 'PUT',
        body: orderData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: 'PUT',
        body: {status},
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
     createShopInfo: builder.mutation({
      query: (shopData) => ({
        url: 'settings',
        method: 'POST',
        body: shopData,
      }),
      invalidatesTags: ['Order', 'ShopInfo'],
    }),

    getShopInfo: builder.query({
       query: () => `settings`,
       providesTags: ["ShopInfo"]
    }),

     updateShopInfo: builder.mutation({
      query: (shopData) => ({
        url: 'settings',
        method: 'POST',
        body: shopData,
      }),
       invalidatesTags: ['Order', 'ShopInfo'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  
  useCreateShopInfoMutation,
  useUpdateShopInfoMutation,
  useGetShopInfoQuery,

  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;