import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to get the auth token
const getAuthToken = () => {
    return localStorage.getItem('token'); // Modify this based on your token storage logic
};

export const subCategoryItemApi = createApi({
    reducerPath: 'subCategoryItemApi',
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

    tagTypes: ['subCategoryItem'], // Define the tag type for invalidation and refetching
    endpoints: (build) => ({
        createSubCategoryItem: build.mutation({
            query: (data) => ({
                url: '/subCategoryItem/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['subCategoryItem'], // Invalidate the Category tag after this mutation
        }),

        deleteSubCategoryItem: build.mutation({
            query: (id) => ({
                url: `/subCategoryItem/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['subCategoryItem'], // Invalidate the Category tag after deletion
        }),

        updateSubCategoryItem: build.mutation({
            query: ({ id, data }) => ({
                url: `/subCategoryItem/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['subCategoryItem'], // Invalidate the Category tag after this mutation
        }),

        getAllSubCategoryItem: build.query({
            query: ({ category_id, subCategoryItemId }) => ({
                url: '/subCategoryItem',
                params: { category_id, subCategoryItemId }, // Pass the page and limit as query params
            }),
            providesTags: ['subCategoryItem'],
            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),

        getSubCategoryItemDataById: build.query({
            query: (id) => ({
                url: `subCategoryItem/${id}`,
            }),
            providesTags: ['subCategoryItem'],

            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),
    }),
});

export const {
    useCreateSubCategoryItemMutation,
    useGetAllSubCategoryItemQuery,
    useUpdateSubCategoryItemMutation,
    useDeleteSubCategoryItemMutation,
    useGetSubCategoryItemDataByIdQuery,
} = subCategoryItemApi;
