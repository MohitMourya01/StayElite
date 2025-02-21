import React from 'react'
import { useFormContext } from 'react-hook-form'

const GustsSection = () => {
    const {
        register,
        formState: {errors} 
    } = useFormContext();
  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Guests</h2>
      <div className='grid grid-cols-2 gap-5 p-6 bg-slate-100'>

        <label className='text-gray-700 text-sm font-semibold'> Adults
            <input type="number" className='border rounded w-full py-2 px-3 font-normal'
            min={1}
              {...register("adultCount", {
                required: "This field is required",
              })}
             />
             {errors.adultCount && (
          <span className='text-red-500'>{errors.adultCount?.message}</span>
        )}
        </label>

        <label className='text-gray-700 text-sm font-semibold'> Children
            <input type="number" className='border rounded w-full py-2 px-3 font-normal'
            min={1}
              {...register("childCount", {
                required: "This field is required",
              })}
             />
             {errors.childCount && (
          <span className='text-red-500'>{errors.childCount?.message}</span>
        )}
        </label>
      </div>
    </div>
  )
}

export default GustsSection
