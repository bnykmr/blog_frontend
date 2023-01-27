import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['Blogs']
    }),
    addBlog: builder.mutation({
      query: (val) => ({
        url: '/api/addBlog',
        method: 'POST',
        body: val.blog,
        headers: {
          'Authorization': `Bearer ${val.token}`
        }
      }),
      invalidatesTags: ['Blogs']
    }),

    updateBlog: builder.mutation({
      query: (val) => ({
        url: `/api/update/${val.id}`,
        method: 'PATCH',
        body: val.blog,
        headers: {
          'Authorization': `Bearer ${val.token}`
        }
      }),
      invalidatesTags: ['Blogs']
    }),


  })
});



export const { useGetAllBlogsQuery, useAddBlogMutation, useUpdateBlogMutation } = blogApi;