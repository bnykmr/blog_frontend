import React from 'react'
import { NavLink } from 'react-router-dom'

const Headers = () => {
  return (
    <div className='bg-pink-500 text-white px-10 py-3 flex justify-between items-center'>
      <h1 className='text-2xl'>Blog Post</h1>
      <nav className='space-x-5 text-lg'  >
        {/* <NavLink className='nav-links' to='/login'>Login</NavLink> */}
        <NavLink className='nav-links' to='crud/create'>Create Post</NavLink>
        <NavLink className='nav-links'>Profile</NavLink>
      </nav>
    </div>
  )
}

export default Headers
