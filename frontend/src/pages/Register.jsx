import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import * as apiClient from '../api-client.js';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Register = () => {
    const queryClient = useQueryClient();
   // const {showToast} = useAppContext();
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            // showToast({message: "Registration Success!", type: "SUCCESS"});
            toast.success("Registration successful.")
            console.log("Registration successful.");
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
        },
        onError: (error) => {
            // showToast({message: error.message, type: "ERROR"});
            toast.error(error.message)
           // console.log(error.message);
        }
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        mutation.mutate(data)
    })
    return (
        
        <form action="" className='flex flex-col gap-5' onSubmit={onSubmit}>
           
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label htmlFor="firstName" className='text-gray-700 text-sm font-bold flex-1'>First Name
                    <input type="text" {...register("firstName", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />

                    {errors.firstName && (
                        <span className='text-red-500'>{errors.firstName.message}</span>
                    )}
                </label>
                <label htmlFor="lastName" className='text-gray-700 text-sm font-bold flex-1' >Last Name
                    <input type="text" {...register("lastName", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
                    {errors.lastName && (
                        <span className='text-red-500'>{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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
            <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1'> Confirm Password
                <input type="password" {...register("confirmPassword", {
                    validate: (val) => {
                        if (!val) {
                            return "This field is required";
                        }
                        else if (watch("password") != val) {
                            return "Your Password do not match";
                        }
                    }
                })} autoComplete="new-password" className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
                {errors.confirmPassword && (
                        <span className='text-red-500'>{errors.confirmPassword.message}</span>
                    )}
            </label>

            <span>
                <button type="submit" className='bg-[#001F3F] text-white rounded-sm p-2 font-bold hover:bg-[#0b4680]'> Create Account</button>
            </span>
        </form>
    )
}

export default Register;
