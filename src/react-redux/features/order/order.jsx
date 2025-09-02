import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("token");  // Modify this based on your token storage logic
};

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.eaconsultancy.info/api/v1/",
    prepareHeaders: (headers) => {
      const token = getAuthToken();  // Fetch the token
      if (token) {
        // If the token exists, add it to the headers
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["order"], // Define the tag type for invalidation and refetching
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],  // Invalidate the order tag after this mutation
    }),

    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],  // Invalidate the order tag after deletion
    }),

    updateOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order"],  // Invalidate the order tag after this mutation
    }),

    getAllOrder: build.query({
        query: () => ({
          url: '/order',
        }),
        providesTags: ["order"],
  
        refetchOnMountOrArgChange: true,
        pollingInterval: 1000,
      }),

    getOrderById: build.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["order"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getOrderTrackingById: build.query({
      query: (id) => ({
        url: `order/tracking/${id}`,
      }),
      providesTags: ["order"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
    
  }),
});

export const {
 useCreateOrderMutation,
 useDeleteOrderMutation,
 useUpdateOrderMutation,
 useGetAllOrderQuery,
 useGetOrderByIdQuery,
 useGetOrderTrackingByIdQuery
} = orderApi;