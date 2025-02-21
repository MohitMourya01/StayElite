import React, { useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext.jsx';
import {useQuery} from 'react-query';
import * as apiClient from '../api-client.js';
import SearchResultCard from '../components/SearchResultCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { StarRatingFilter } from '../components/StarRatingFilter.jsx';

import { HotelTypesFilter } from '../components/HotelTypesFilter.jsx';
import { FacilitiesFilter } from '../components/FacilitiesFilter.jsx';
import { PriceFilter } from '../components/PriceFilter.jsx';

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState([])

    const [selectedHotelType, setSelectedHotelType] = useState([]);

    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState();
    const [sortOption, setSortOption] = useState("");
    // const [sortOption, setSortOption] = useState("");
    const searchParams = {
      destination: search.destination,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      stars: selectedStars,
      types: selectedHotelType,
      facilities: selectedFacilities,
      maxPrice: selectedPrice?.toString(),
      sortOption,

    }
    const {data: hotelData} = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

    const handleStarsChange = (e) => {
      const starRating = e.target.value;
      setSelectedStars((prevStars) => 
        (e.target.checked)
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
      );
      
    }

    const handleHotelTypesChange = (e) => {
      const hotelType = e.target.value;
      setSelectedHotelType((prevTypes) => 
        (e.target.checked)
        ? [...prevTypes, hotelType]
        : prevTypes.filter((hType) => hType !== hotelType)
      );
      
    }

    const handleFacilityChange = (e) => {
      const facility = e.target.value;
      setSelectedFacilities((prev) => 
        (e.target.checked)
        ? [...prev, facility]
        : prev.filter((faci) => faci !== facility)
      );
      
    }
   
  return (
    <div className='grid grid-cols-2 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
          <div className=' space-y-5'>
            <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>Filter by:</h3>
            {/* TODO filters */}
            <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />

            <HotelTypesFilter selectedHotelTypes={selectedHotelType} onChange={handleHotelTypesChange}/>

            <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />

            <PriceFilter selectedPrice={selectedPrice} onChange={(value) => setSelectedPrice(value)} />
          </div>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
           <span className='text-xl font-bold'>
            {hotelData?.pagination.total} Hotels found {search.destination ? `in ${search.destination}` : ""}
           </span>

           {/* TODO sort options */}

           <select value={sortOption} onChange={(e) =>  setSortOption(e.target.value) 
           } className='p-2 border rounded-md'>
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
           </select>


        </div>

        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
        <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setPage(page)}/>
        </div>      
       </div>
    </div>
  )
}

export default Search;
