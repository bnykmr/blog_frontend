import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import Headers from './components/Headers';


import Login from './pages/auth_pages/Login';
import SignUp from './pages/auth_pages/SignUp';
import Home from './pages/Home';

import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './pages/auth_pages/RequireAuth';
import CrudForm from './components/crud';
import { useSelector } from 'react-redux';

const App = () => {

  const { user } = useSelector((store) => store.user);


  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={user === null ? < Login /> : <Navigate to='/' replace />} />
        <Route path='signUp' element={<SignUp />} />
        <Route element={<RequireAuth />} >
          <Route path='crud/:type' element={<CrudForm />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} position='top-right' />
    </>
  )
}

export default App
