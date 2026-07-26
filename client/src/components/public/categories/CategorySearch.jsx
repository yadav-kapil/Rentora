import { useState } from "react";
import { FaSearch, FaRegCalendarAlt, FaUserFriends, FaTags } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineChevronDown } from "react-icons/hi";

const CategorySearch = ({ allHomes, setDisplayedHomes, filters }) => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    let result = [...allHomes];
    
    // Search fields
    if (location) result = result.filter(h => h.location.toLowerCase().includes(location.toLowerCase()));
    if (guests) result = result.filter(h => h.guestNumbers >= parseInt(guests));
    
    // Existing global filters (if they exist)
    if (filters) {
      if (filters.categories.length > 0) result = result.filter(h => filters.categories.includes(h.category));
      if (filters.amenities.length > 0) result = result.filter(h => filters.amenities.every(a => h.amenities?.includes(a)));
      if (filters.bedrooms) result = result.filter(h => filters.bedrooms === "5+" ? h.bedrooms >= 5 : h.bedrooms === parseInt(filters.bedrooms));
      if (filters.maxPrice) result = result.filter(h => h.price <= filters.maxPrice);
    }
    
    setDisplayedHomes(result);
  };

  return (
    <div className="bg-white dark:bg-[#0e1422] p-2 rounded-2xl shadow-sm dark:shadow-black/60 border border-gray-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center mb-8 w-full z-20">
      <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800/80">
        <FaLocationDot className="text-gray-400 dark:text-slate-500 text-lg flex-shrink-0" />
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where are you going?" 
          className="w-full focus:outline-none text-sm font-medium text-gray-700 dark:text-slate-100 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
        />
      </div>
      
      <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800/80">
        <FaRegCalendarAlt className="text-gray-400 dark:text-slate-500 text-lg flex-shrink-0" />
        <div className="flex w-full items-center gap-2">
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full focus:outline-none text-sm font-medium text-gray-700 dark:text-slate-100 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
          />
          <span className="text-gray-400 dark:text-slate-500 text-sm">-</span>
          <input 
            type="date" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full focus:outline-none text-sm font-medium text-gray-700 dark:text-slate-100 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
          />
        </div>
      </div>
      
      <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800/80">
        <FaUserFriends className="text-gray-400 dark:text-slate-500 text-lg flex-shrink-0" />
        <input 
          type="number" 
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Rooms Available" 
          className="w-full focus:outline-none text-sm font-medium text-gray-700 dark:text-slate-100 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
        />
      </div>

      <button onClick={handleSearch} className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors w-full md:w-auto mt-2 md:mt-0 justify-center shadow-md shadow-red-200 dark:shadow-black/60 ml-2">
        <FaSearch /> Search
      </button>
    </div>
  );
};

export default CategorySearch;
