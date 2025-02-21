import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client.js';
import toast from 'react-hot-toast';
import { MdLocationCity, MdTypeSpecimen } from "react-icons/md";
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { GiFamilyTree } from "react-icons/gi";
const MyHotels = () => {

    const {data: hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onSuccess: () => {
            toast.success("Hotels fetched succesfully!");
        },
        onError: () => {
            toast.error("Failed to fetch hotels.");
        }
    })
    console.log(hotelData,"hotel")
  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <Link to='/add-hotel' className='flex bg-[#001F3F] text-white text-lg font-bold px-2 py-1.5 rounded-sm hover:bg-[#03396f]'>Add Hotel</Link>
      </span>

      <div className='grid grid-cols-1 gap-8'>
        {hotelData?.map((hotel) => (
            
            <div className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'>
               <h2 className='text-2xl font-bold'>{hotel.name}</h2>
               <div className=' whitespace-pre-line'>{hotel.description}</div>
               <div className='grid grid-cols-5 gap-2'>
                 <div className='border border-slate-400 rounded-sm p-3 flex items-center bg-slate-100'>
                    <MdLocationCity className='mr-1 size-8' />
                    {hotel.city}, {hotel.country}
                 </div>
                 <div className='border border-slate-400 rounded-sm p-3 flex items-center bg-slate-100'>
                    <MdTypeSpecimen className='mr-1 size-6' />
                    {hotel.type}
                 </div>
                 <div className='border border-slate-400 rounded-sm p-3 flex items-center bg-slate-100'>
                    <FaRupeeSign className='mr-1 size-6' />
                    {hotel.pricePerNight}/night
                 </div>
                 <div className='border border-slate-400 sm:text-sm sm:p-1 rounded-sm p-3 flex items-center bg-slate-100'>
                    <GiFamilyTree  className='mr-1 size-9' />
                    {hotel.adultCount} adults, {hotel.childCount} children
                 </div>
                 <div className='border border-slate-400 rounded-sm p-3 flex items-center bg-slate-100'>
                    <FaStar className='mr-1 size-8' />
                    {hotel.starRating} Star Rating
                 </div>
               </div>

               <span className='flex justify-end'> 
                <Link to={`/edit-hotel/${hotel._id}`}className='flex bg-[#001F3F] text-white text-md font-bold px-2 py-1.5 rounded-sm hover:bg-[#03396f]' > View Details & Edit</Link>
               </span>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyHotels;
