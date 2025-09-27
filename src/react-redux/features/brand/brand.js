import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to get the auth token
const getAuthToken = () => {
    return localStorage.getItem('token'); // Modify this based on your token storage logic
};

export const brandApi = createApi({
    reducerPath: 'brandApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
        prepareHeaders: (headers) => {
            const token = getAuthToken(); // Fetch the token
            if (token) {
                // If the token exists, add it to the headers
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['brand'], // Define the tag type for invalidation and refetching
    endpoints: (build) => ({
        createBrand: build.mutation({
            query: (data) => ({
                url: '/brand/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['brand'], // Invalidate the Brand tag after this mutation
        }),

        deleteBrand: build.mutation({
            query: (id) => ({
                url: `/brand/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['brand'], // Invalidate the Brand tag after deletion
        }),

        updateBrand: build.mutation({
            query: ({ id, data }) => ({
                url: `/brand/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['brand'], // Invalidate the Brand tag after this mutation
        }),

        getAllBrand: build.query({
            query: ({ page, limit, category_id, subCategoryItem_id }) => ({
                url: '/brand',
                params: { page, limit, category_id, subCategoryItem_id }, // Pass the page and limit as query params
            }),
            providesTags: ['brand'],
            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),

        getAllBrandWithoutQuery: build.query({
            query: () => ({
                url: '/brand/all',
            }),
            providesTags: ['brand'],

            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),
    }),
});

export const {
    useCreateBrandMutation,
    useGetAllBrandQuery,
    useDeleteBrandMutation,
    useUpdateBrandMutation,
    useGetAllBrandWithoutQueryQuery,
} = brandApi;
