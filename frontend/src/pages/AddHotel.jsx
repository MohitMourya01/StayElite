import React from 'react'
import ManageHotelForm from '../components/Forms/ManageHotelForm.jsx';
import * as apiClient from '../api-client.js';
import toast from 'react-hot-toast';
import {useMutation} from 'react-query';
const AddHotel = () => {
  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
       toast.success('Hotel Saved!')
    },
    onError: () => {
      toast.error('Error Saving Hotel!')
    }
  })

  const handleSave = (hotelFormData) => {
    mutate(hotelFormData);
  }
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  )
}

export default AddHotel
