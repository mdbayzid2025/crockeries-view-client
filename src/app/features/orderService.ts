// features/orders/orderService.js

import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.enhanceEndpoints({addTagTypes: ['Order']}).injectEndpoints({
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
      query: ({ id, ...status }) => ({
        url: `orders/${id}/status`,
        method: 'PUT',
        body: status,
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
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;