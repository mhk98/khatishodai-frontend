import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to get the auth token
const getAuthToken = () => {
    return localStorage.getItem('token'); // Modify this based on your token storage logic
};

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://backend.eaconsultancy.info/api/v1/',
        prepareHeaders: (headers) => {
            const token = getAuthToken(); // Fetch the token
            if (token) {
                // If the token exists, add it to the headers
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['cart'], // Define the tag type for invalidation and refetching
    endpoints: (build) => ({
        createCart: build.mutation({
            query: (data) => ({
                url: '/cart/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['cart'], // Invalidate the Cart tag after this mutation
        }),

        deleteCart: build.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart'], // Invalidate the Cart tag after deletion
        }),

        updateCart: build.mutation({
            query: ({ id, data }) => ({
                url: `/cart/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['cart'], // Invalidate the Cart tag after this mutation
        }),

        getAllCart: build.query({
            query: () => ({
                url: '/cart',
            }),
            providesTags: ['cart'],

            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),

        getCartDataById: build.query({
            query: (id) => ({
                url: `cart/${id}`,
            }),
            providesTags: ['cart'],

            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),
    }),
});

export const {
    useCreateCartMutation,
    useGetAllCartQuery,
    useDeleteCartMutation,
    useUpdateCartMutation,
    useGetCartDataByIdQuery,
} = cartApi;
