// features/customers/customerService.js

import { apiSlice } from '../api/apiSlice';

export const customerApi =apiSlice.enhanceEndpoints({addTagTypes: ['Customer']}).injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => 'customers',
      providesTags: ['Customer'],
    }),
    getCustomerById: builder.query({
      query: (id) => `customers/${id}`,
      providesTags: ( id) => [{ type: 'Customer', id }],
    }),
    addCustomer: builder.mutation({
      query: (customerData) => ({
        url: 'customers',
        method: 'POST',
        body: customerData,
      }),
      invalidatesTags: ['Customer'],
    }),
    updateCustomer: builder.mutation({
      query: (customerData) => ({
        url: `customers/update`,
        method: 'PUT',
        body: customerData,
      }),
      invalidatesTags: ['Customer'],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer'],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;