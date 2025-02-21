import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import DetailsSection from './DetailsSection.jsx';
import TypesSection from './TypesSection.jsx';
import FacilitiesSection from './FacilitiesSection.jsx';
import GustsSection from './GustsSection.jsx';
import ImageSection from './imageSection.jsx';
const ManageHotelForm = ({onSave, isLoading, hotel}) => {
    const formMethods = useForm();
    const {handleSubmit, reset} = formMethods;

    useEffect(() => {
      reset(hotel);

    }, [hotel, reset]);
    const onSubmit = handleSubmit((formDataJson) => {
      // create new FormData object and call our API
      const formData = new FormData();

      if(hotel) {
        formData.append("hotelId", hotel._id);
      }
      formData.append("name", formDataJson.name);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("description", formDataJson.description);
      formData.append("type", formDataJson.type);
      formData.append("pricePerNight", formDataJson.pricePerNight);
      formData.append("starRating", formDataJson.starRating);
      formData.append("adultCount", formDataJson.adultCount);
      formData.append("childCount", formDataJson.childCount);

      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      })
      // user update in backend [img.jpg, img1.jpg, img2.jpg]
      // imageUrls = [img.jpg]
      if(formDataJson.imageUrls) {
        formDataJson.imageUrls.forEach((url, index) => {
            formData.append(`imageUrls[${index}]`, url);
        });
      }

      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      })

      onSave(formData);
      
     // reset();

    });
  return (
    
    <FormProvider {...formMethods}>
        <form className='flex flex-col gap-10' onSubmit={onSubmit}>
            <DetailsSection />
            <TypesSection />
            <FacilitiesSection />
            <GustsSection />
            <ImageSection />
            <span className='flex justify-end mt-3'>
              <button disabled={isLoading} type='submit' className=' bg-[#001F3F] text-white p-2 font-bold rounded-sm px-4 py-1.5 hover:bg-[#073563] text-xl disabled:bg-gray-500'> {isLoading ? "Saving..." : "Save"} </button>
            </span>
        </form>
    </FormProvider>
    
  )
}

export default ManageHotelForm
