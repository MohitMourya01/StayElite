import React from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as apiClient from "../api-client.js";
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const QueryClient = useQueryClient();
  const { register, watch, handleSubmit, formState: {errors} } = useForm();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      toast.success("User login successful");
      await QueryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

     const onSubmit = handleSubmit((data) => {
         mutation.mutate(data);
     })
  return (
    <form action="" onSubmit={onSubmit} className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'> Sign In</h2>
      <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1' > Email
      <input type="email" {...register("email", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1' >Password
      <input type="password" {...register("password", {
          required: "This field is required!",
          minLength: {
            value: 6,
            message: "Password must be at least 6 character"
          }
        })} autoComplete="new-password" className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
      <span className='text-sm'>Not registerd? <Link to='/register' className='underline'>Create an account here</Link></span>
      <button type="submit" className='bg-[#001F3F] text-white rounded-sm px-3 py-1 font-bold hover:bg-[#0b4680]'>Login</button>
      </span>

    </form>
  )
}

export default Login
