import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireAuth = () => {
  const location = useLocation();
  const { user } = useSelector((store) => store.user);

  return (
    user !== null ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />
  )
}

export default RequireAuth
