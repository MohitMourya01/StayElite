import React from 'react'
import { useFormContext } from 'react-hook-form'

const DetailsSection = () => {
    const {register, watch, formState: {errors} } = useFormContext();
  return (
    <div className="flex flex-col gap-4"> 
      <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>
      <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1' > Name
      <input type="text" {...register("name", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
        {errors.name && (
          <span className='text-red-500'>{errors.name.message}</span>
        )}
      </label>

      <div className='flex gap-4'>
      <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1' > City
      <input type="text" {...register("city", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
        {errors.city && (
          <span className='text-red-500'>{errors.city.message}</span>
        )}
      </label>
      <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1' > Country
      <input type="text" {...register("country", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
        {errors.country && (
          <span className='text-red-500'>{errors.country.message}</span>
        )}
      </label>
      </div>

      <label htmlFor="" className='text-gray-700 text-sm font-bold flex-1' > Description
      <textarea rows={8} {...register("description", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100'> </textarea>
        {errors.description && (
          <span className='text-red-500'>{errors.description.message}</span>
        )}
      </label>
      <label htmlFor="" className='text-gray-700 text-sm font-bold max-w-[50%]' > Price Per Night
      <input type="number" min={1} {...register("pricePerNight", { required: "This field is required!" })} className='border rounded w-full py-1 px-2 font-normal bg-slate-100' />
        {errors.pricePerNight && (
          <span className='text-red-500'>{errors.pricePerNight.message}</span>
        )}
      </label>
      <label htmlFor="" className='text-gray-700 text-sm font-bold max-w-[50%]' > Star Rating
        <select name="" id="" {...register("starRating", {required: "This field is required"})} className='border rounded w-full p-2 text-gray-700 bg-slate-100'>
            <option value="" className='text-sm font-bold'>Select as Rating</option>
            {[1,2,3,4,5].map((num) => (
                <option value={num}> {num} </option>
            ))}
        </select>
        {errors.starRating && (
          <span className='text-red-500'>{errors.starRating.message}</span>
        )}
      </label>
    </div>
  )
}

export default DetailsSection
