import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import {useSearchContext} from '../../contexts/SearchContext.jsx';
import {useAppContext} from '../../contexts/AppContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
const GuestInfo = ({hotelId, pricePerNight}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: {errors},        
    } = useForm({
        defaultValues: {
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount,
        },

    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data) => {
        search.saveSearchValues("", 
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount,
        );
        navigate("/login", {state: {from : location}})
    }

    const onSubmit = (data) => {
        search.saveSearchValues("", 
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount,
        );
        navigate(`/hotels/${hotelId}/bookings`, {state: {from : location}})
    }
  return (
    <div className='flex flex-col p-4 bg-[#eee8d4] gap-4'>
      <h3 className='text-md font-bold'>₹{pricePerNight}</h3>

      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className='grid grid-cols-1 gap-4'>
            <div>
                <DatePicker required selected={checkIn} onChange={(date) => setValue("checkIn",date)} selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText='Check-in Date'
                        className='min-w-full bg-white p-2 focus:outline-none'
                        wrapperClassName='min-w-full'
                    />
                
            </div>

            <div>
                <DatePicker required selected={checkOut} onChange={(date) => setValue("checkOut",date)} selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText='Check-in Date'
                        className='min-w-full bg-white p-2 focus:outline-none'
                        wrapperClassName='min-w-full'
                    />
                
            </div>

            <div className='flex justify-between bg-white px-2 py-1 gap2'>
        <label className='items-center flex'>
            Adults:
            <input className='w-full p-1 focus:outline-none font-bold' type='number' min={1} max={20} 
            
            {...register("adultCount", {
                required: "This field is required",
            min: {
                value: 1,
                message: "There must be at least one adult"
            },
            valueAsNumber: true,
            })}
            />
        </label>
        <label className='items-center flex'>
            Children:
            <input className='w-full p-1 focus:outline-none font-bold' type='number' min={0} max={20} 
            {...register("childCount", {
                required: "This field is required",
            valueAsNumber: true,
            })}
            />
        </label>

        {errors.adultCount && (
            <span className='text-red-500 font-semibold text-sm'> {errors.adultCount.message}</span>
        )}
    </div>
    {isLoggedIn ? (<button className='w-full bg-[#001F3F] text-white h-full px-2 py-1.5 font-bold text-xl hover:bg-[#014263] rounded-sm'>Book Now</button>) : (<button className='w-full bg-[#001F3F] text-white h-full px-2 py-1.5 font-bold text-xl hover:bg-[#014263] rounded-sm'>Sign in to Book</button>)}
    </div>       
      </form>
    </div>
  )
}

export default GuestInfo;
