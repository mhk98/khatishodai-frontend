import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/', // Adjust the base URL as needed
    }),
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (user) => ({
                url: 'user/login', // Endpoint for login
                method: 'POST',
                body: user, // Request body
            }),
        }),
    }),
});

export const { useCreateUserMutation } = userApi;
