import React, { useEffect, useState } from 'react';
import {useQuery} from 'react-query';
import * as apiClient from '../api-client.js';
import BookingForm from '../components/Forms/BookingForm.jsx';
import { useSearchContext } from '../contexts/SearchContext.jsx';
import { useParams } from 'react-router-dom';

import {Elements} from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext.jsx';
const Booking = () => {
    const {stripePromise} = useAppContext();
    const search = useSearchContext();
    const { hotelId } = useParams();
    const [numberOfNights, setNumberOfNights] = useState(0);
    useEffect(() => {
        if(search.checkIn && search.checkOut) {
            const nights = Math.abs((search.checkIn.getTime() - search.checkOut.getTime()) / (1000 * 60 * 60 * 24));
            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);

    const {data: paymentIntentData} = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId, numberOfNights.toString()),
    {
       enabled: !!hotelId && numberOfNights > 0,
    })

    const {data: hotel} = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId || ""),
    {
        enabled: !!hotelId
    });

    const {data: currentUser} = useQuery(
        "getCurrentUser",
        apiClient.getCurrentUser
    );

    if(!hotel) {
        return <></>;
    }
  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <div className='grid gap-4 rounded-lg border border-slate-300 p-5 h-fit'>
         <h2 className='text-xl font-bold'>Your Booking Details</h2>
         <div className='border-b py-2'>
            Location: 
            <div className='font-bold'>{`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}</div>
         </div>
         <div className='flex justify-between '>
            <div>
                Check-in
                <div className='font-bold'>{search.checkIn.toDateString()}
                </div>
            </div>
            <div>
               Check-out
                <div className='font-bold'>{search.checkOut.toDateString()}
                </div>
            </div>
         </div>
         <div className='border-t border-b py-2'>
            Total length of stay:
            <div className='font-bold'>
                {numberOfNights} nights
            </div>
         </div>

         <div>
            Guests <div className='font-bold'>
                {search.adultCount} adults & {search.childCount} children
            </div>
         </div>
      </div>
      
      {currentUser && paymentIntentData && (
        <Elements stripe={stripePromise}
         options={{
            clientSecret: paymentIntentData?.clientSecret,
         }}
        >
        <BookingForm currentUser = {currentUser} paymentIntent={paymentIntentData} />
        </Elements>
        ) }
    </div>
  )
}

export default Booking;
