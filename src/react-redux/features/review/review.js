import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to get the auth token
const getAuthToken = () => {
    return localStorage.getItem('token'); // Modify this based on your token storage logic
};

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
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

    tagTypes: ['review'], // Define the tag type for invalidation and refetching
    endpoints: (build) => ({
        createReview: build.mutation({
            query: (data) => ({
                url: '/review/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['review'], // Invalidate the Review tag after this mutation
        }),

        deleteReview: build.mutation({
            query: (id) => ({
                url: `/review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['review'], // Invalidate the Review tag after deletion
        }),

        updateReview: build.mutation({
            query: ({ id, data }) => ({
                url: `/review/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['review'], // Invalidate the Review tag after this mutation
        }),

        getAllReviews: build.query({
            query: () => ({
                url: '/review',
            }),
            providesTags: ['review'],

            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),

        getReviewDataById: build.query({
            query: (id) => ({
                url: `review/${id}`,
            }),
            providesTags: ['review'],

            refetchOnMountOrArgChange: true,
            pollingInterval: 1000,
        }),
    }),
});

export const {
    useCreateReviewMutation,
    useGetAllReviewsQuery,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
    useGetReviewDataByIdQuery,
} = reviewApi;
