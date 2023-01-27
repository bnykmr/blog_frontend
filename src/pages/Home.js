import React from 'react'
import { useGetAllBlogsQuery } from '../features/blog/blogapi'
import RequireAuth from './auth_pages/RequireAuth';

const Home = () => {
  const { isLoading, isError, error, data: blogs } = useGetAllBlogsQuery();
  if (isLoading) {
    return <h1>Loading...</h1>
  }


  return (
    <div className='px-[2%] py-[3%] grid grid-cols-3 gap-5'>

      {blogs && blogs.map((blog) => {
        return <div className='shadow-xl rounded-2xl ' key={blog._id}>
          <img src={blog.image} className='h-64 object-fill w-full rounded-t-2xl ' />
          <div className='p-2'>
            <h1 className='text-2xl font-semibold '>{blog.title}</h1>
            <p className='text-gray-700'>{blog.detail}</p>
          </div>

        </div>
      })}
    </div>
  )
}

export default Home
