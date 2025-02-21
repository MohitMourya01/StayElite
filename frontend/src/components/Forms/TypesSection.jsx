import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../utils/hotel-options.js";
import React from 'react'

const TypesSection = () => {
  const {register, watch, formState: {errors}} = useFormContext();
  const typeWatch = watch("type")
  return (
    <div>
      <h2 className="text-2xl font-bold my-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((item) => (
           <label className= {
            typeWatch === item ? "cursor-pointer bg-blue-200 text-sm rounded-full px-4 py-2 font-semibold" : "cursor-pointer bg-slate-100 text-sm rounded-full px-4 py-2 font-semibold"
           }>
            <input type="radio" value={item} {...register("type", {
                required: "This field is required",
            })} className="hidden" />
           
            <span>{item}</span>
           </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      )}

      {/* facilities */}
    </div>
  )
}

export default TypesSection;
