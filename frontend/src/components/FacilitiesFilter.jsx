import {hotelFacilities} from '../utils/hotel-options.js';

export const FacilitiesFilter = ({selectedFacilities, onChange}) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Facilities</h4>
            {hotelFacilities.map((facility) => (
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" value={facility} checked={selectedFacilities.includes(facility)}
                onChange={onChange} />
                <span>{facility}</span>
              </label>  
            ))}
        </div>
    );
  }