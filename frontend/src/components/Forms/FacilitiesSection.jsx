import React from 'react';
import { hotelFacilities } from '../../utils/hotel-options.js';
import { useFormContext } from 'react-hook-form';

const FacilitiesSection = () => {
    const {register, watch, formState: {errors}} = useFormContext();
  return (
    <div>
       <h2 className='text-2xl font-bold my-3'> Facilities</h2>
       <div className='grid grid-cols-5 gap-3'> 
          {/* {console.log(hotelFacilities)} */}
          {hotelFacilities.map((facility) => (
            <label className='text-sm flex gap-1 text-gray-700 ml-1 sm:items-center font-semibold'>
                <input type="checkbox" value={facility} {...register("facilities", {
                    validate: (facilities) => {
                        if(facilities && facilities.length > 0) {
                            return true;
                        } else {
                            return "At least one facility is required";
                        }
                    }
                })} />
                {facility}
            </label>
          ))}
       </div>
       {errors.facilities && (
        <span className="text-red-500 text-sm font-bold"> {errors.facilities.message}</span>
       )}
    </div>
  )
}

export default FacilitiesSection;
