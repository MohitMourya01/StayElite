// import React from 'react'
import {Link} from 'react-router-dom';
import {logo} from '../assets/index.js'
import { useAppContext } from '../contexts/AppContext.jsx';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client.js'
import toast from 'react-hot-toast';
const Header = () => {
     const {isLoggedIn} = useAppContext();
     const queryClient = useQueryClient();
     const mutation = useMutation(apiClient.signOut, {
      onSuccess: async () => {
        await queryClient.invalidateQueries("validateToken");
        toast.success("User logout successfully!")
      },
      OnError: () => {
        toast.error("Error while logout.")
      }
     });

     const handleClick = () => {
          mutation.mutate();
     }
  return (
    <div className="bg-[#001F3F] py-6 px-20">
      <div className="container mx-auto flex justify-between">
        <span className="flex gap-2 text-3xl text-[#EFE9D5] font-white font-bold tracking-tight">
           <img src={logo} alt="" className='h-10 w-12 rounded-md' />
            <Link to = "/"> StayElite</Link>
            
        </span>
        <span className="space-x-2 ">
          {isLoggedIn ? 
            <div className='flex gap-3'>
               <Link to='/my-bookings' className='flex items-center bg-[#EFE9D5] rounded-sm text-[#001F3F] px-3 font-bold hover:bg-gray-100 '>My Bookings</Link>
               <Link to='/my-hotels' className='flex items-center bg-[#EFE9D5] rounded-sm text-[#001F3F] px-3 font-bold hover:bg-gray-100 '>My Hotels</Link>
               <button className='flex items-center bg-[#EFE9D5] text-[#001F3F] rounded-sm px-3 font-bold hover:bg-gray-100 ' onClick={handleClick}>Sign Out</button>
            </div> :  <Link to = "/login" className='flex items-center bg-[#EFE9D5] rounded-sm text-[#001F3F] px-3 font-bold hover:bg-gray-100 '>Sign In</Link>
          }
           
        </span>
      </div>
    </div>
  )
}

export default Header
