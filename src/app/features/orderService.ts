// features/orders/orderService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/orders' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '',
      providesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: orderData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
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
  useDeleteOrderMutation,
} = orderApi;