import React from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useUserLoginMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/auth/userSlice';

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  // const p = ['function', {is:1, m:2}];
  // const [sim, {is, m}] = p;
  const [userLogin, { isLoading, isError, error }] = useUserLoginMutation();




  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        const response = await userLogin(val).unwrap();
        dispatch(addUser(response));
        toast.success('successfully login');
        nav('/', { replace: true });
      } catch (err) {
        toast.error(err.data.message);
      }


    },
    validationSchema: loginSchema
  });
  console.log(formik.values);


  return (
    <div className='max-w-xl mx-auto  mt-10'>
      <div className=' bg-white rounded-lg border border-primaryBorder shadow-xl py-12 px-16'>
        <h1 className='text-2xl font-medium text-primary mt-1 mb-7 text-center'>
          Log in to your account 🔐
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              type='email'
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id='email'
              name='email'
              placeholder='Your Email'
            />
            {formik.errors.email && formik.touched.email && <div className='text-pink-900'>{formik.errors.email}</div>}
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              type='password'
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id='password'
              name='password'
              placeholder='Your Password'
            />
            {formik.errors.password && formik.touched.password && <div className='text-pink-900'>{formik.errors.password}</div>}
          </div>

          <div className='flex justify-center items-center mt-6'>
            <button
              disabled={isLoading ? true : false}
              type='submit'
              className='bg-green-500 hover:bg-green-600 w-full py-1 text-white text-lg tracking-widest'
            >
              {isLoading ? <div
                className='mx-auto h-9 w-9 rounded-full border-2 border-t-black animate-spin border-white'
              ></div> : 'Login'}
            </button>


          </div>
          <div className='mt-4 flex space-x-4 justify-center'>
            <h1>Don't have an account ?</h1>
            <button onClick={() => nav('/signUp')} className='text-blue-500'>SignUp</button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;