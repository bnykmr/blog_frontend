import { configureStore } from "@reduxjs/toolkit";
import { authApi } from './auth/authApi';
import userReducer from './auth/userSlice';
import { blogApi } from "./blog/blogapi";







export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer
  },
  middleware: (getDefault) => getDefault().concat([
    authApi.middleware,
    blogApi.middleware
  ])
})