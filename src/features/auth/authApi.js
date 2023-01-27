import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({



    userLogin: builder.mutation({
      query: (user) => ({
        url: '/api/userLogin',
        body: user,
        method: 'POST'
      })
    }),
    userSignUp: builder.mutation({
      query: (user) => ({
        url: '/api/userSignUp',
        body: user,
        method: 'POST'
      })
    })



  })
});



export const { useUserLoginMutation, useUserSignUpMutation } = authApi;