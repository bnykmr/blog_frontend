import React from 'react'

import { replace, useFormik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { toast } from 'react-toastify';
import { useAddBlogMutation } from '../features/blog/blogapi';


const CrudForm = () => {

  const { user } = useSelector((store) => store.user);
  const [addBlog, { isLoading }] = useAddBlogMutation();
  const nav = useNavigate();
  const { type } = useParams();

  const blogSchema = Yup.object().shape({
    title: Yup.string().min(10, 'Too short').max(200, 'Too Long').required('title is required'),
    detail: Yup.string().min(10, 'Too short').max(2000, 'Too Long').required('detail is required'),
  });


  const formik = useFormik({
    initialValues: {
      title: '',
      detail: '',
      image: null,
      imageUrl: ''

    },
    onSubmit: async (val, { resetForm }) => {

      let formData = new FormData();
      formData.append('title', val.title);
      formData.append('detail', val.detail);
      formData.append('image', val.image);

      try {

        if (type === 'create') {
          const data = {
            blog: formData,
            token: user.token
          };
          const response = await addBlog(data).unwrap();

          toast.success('successfully blog added');
          nav(-1, { replace: true });
        } else {

        }
      } catch (err) {
        toast.error(err.data.message);
      }




    },
    validationSchema: blogSchema
  });


  return (
    <div>


      <form onSubmit={formik.handleSubmit} className='flex justify-center mt-3 items-center max-h-2xl '>
        <div className='w-[40%] shadow-2xl bg-white p-4 space-y-4 lg:w-[90%] xl:w-[90%]'>

          <div className='flex justify-between'>
            <h1 className='text-2xl '>Add Some Blog</h1>

          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="title">Title</label>
            <input onChange={formik.handleChange} value={formik.values.title}
              className='border border-gray-500 outline-none px-2 py-1' type="text" id='title' name='title' />
            {formik.errors.title && formik.touched.title ? <h1 className='text-pink-700'>{formik.errors.title}</h1> : ''}
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="detail">Detail</label>
            <textarea
              className='border border-gray-500 outline-none px-2 py-1'
              onChange={formik.handleChange} value={formik.values.detail} name="detail" id="detail" cols="30" rows="5"></textarea>
            {formik.errors.detail && formik.touched.detail ? <h1 className='text-pink-700'>{formik.errors.detail}</h1> : ''}
          </div>


          {formik.values.imageUrl && <img className='h-14 w-14' src={formik.values.imageUrl} alt="" />}


          <div className='flex flex-col space-y-2'>
            <label htmlFor="image">{type === 'create' ? 'Select an Image' : 'Change an image'}</label>
            <input onChange={(e) => {

              const file = e.currentTarget.files[0];

              formik.setFieldValue('image', file);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.addEventListener('load', () => {
                formik.setFieldValue('imageUrl', reader.result);
              })

            }} className='border border-gray-500 outline-none px-2 py-1' type="file" id='image' name='image' />
          </div>


          <div>
            <button
              disabled={isLoading ? true : false}
              type='submit'
              className='bg-green-500 hover:bg-green-600 w-[200px] py-1 text-white text-lg tracking-widest'
            >
              {isLoading ? <div
                className='mx-auto h-9 w-9 rounded-full border-2 border-t-black animate-spin border-white'
              ></div> : 'Submit'}
            </button>
          </div>


        </div>


      </form>

    </div>
  )
}

export default CrudForm