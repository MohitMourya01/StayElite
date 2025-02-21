import React from 'react';
import {useParams} from 'react-router-dom';
import * as apiClient from '../api-client.js';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import ManageHotelForm from '../components/Forms/ManageHotelForm.jsx';
const EditHotel = () => {
    const {hotelId} = useParams();

    const {data: hotel} = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelsById(hotelId || ''), {
        enabled: !!hotelId,
    });

    const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
      onSuccess: () => {
        toast.success("Hotel Updated Successfully!");
      },
      onError: () => {
        toast.error("Error while Updating.");
      }
    });

    const handleSave = (hotelFormData) => {
      mutate(hotelFormData);
    }
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel
