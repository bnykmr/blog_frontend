import React from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useUserSignUpMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [userSignUp, { isLoading, isError, error }] = useUserSignUpMutation();


  const nav = useNavigate();
  const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
    username: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: ''
    },
    onSubmit: async (val) => {
      try {
        const response = await userSignUp(val).unwrap();
        toast.success('successfully signUp');
        nav(-1);
      } catch (err) {
        toast.error(err.data.message);
      }

    },
    validationSchema: registerSchema
  });

  console.log(formik.values);
  return (
    <div className='max-w-xl mx-auto  mt-10'>
      <div className=' bg-white rounded-lg border border-primaryBorder shadow-xl py-12 px-16'>
        <h1 className='text-2xl font-medium text-primary mt-1 mb-7 text-center'>
          Register account 🔐
        </h1>

        <form onSubmit={formik.handleSubmit}>

          <div>
            <label htmlFor='username'>Username</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.username}
              type='text'
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id='username'
              name='username'
              placeholder='Your Username'
            />
            {formik.errors.username && <div className='text-pink-900'>{formik.errors.email}</div>}
          </div>

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
            {formik.errors.email && <div className='text-pink-900'>{formik.errors.email}</div>}
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
          </div>

          <div className='flex justify-center items-center mt-6'>
            <button
              disabled={isLoading ? true : false}
              type='submit'
              className='bg-green-500 hover:bg-green-600 w-full py-1 text-white text-lg tracking-widest'
            >
              {isLoading ? <div
                className='mx-auto h-9 w-9 rounded-full border-2 border-t-black animate-spin border-white'
              ></div> : 'SignUp'}
            </button>


          </div>
          <div className='mt-4 flex space-x-4 justify-center'>
            <h1>Already have an account ?</h1>
            <button onClick={() => nav(-1)} className='text-blue-500'>Login</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;