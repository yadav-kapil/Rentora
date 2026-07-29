import { HiOutlineChevronDown } from "react-icons/hi";

const FilterSidebar = ({ allHomes, setDisplayedHomes, filters, setFilters }) => {

  const applyFilters = (newFilters) => {
    let result = [...allHomes];
    if (newFilters.categories.length > 0) result = result.filter(h => newFilters.categories.includes(h.category));
    if (newFilters.amenities.length > 0) result = result.filter(h => newFilters.amenities.every(a => h.amenities?.includes(a)));
    if (newFilters.bedrooms) result = result.filter(h => newFilters.bedrooms === "5+" ? h.bedrooms >= 5 : h.bedrooms === parseInt(newFilters.bedrooms));
    result = result.filter(h => h.price <= newFilters.maxPrice);
    setDisplayedHomes(result);
  };

  const updateFilter = (type, value) => {
    const newFilters = { ...filters };
    if (type === 'bedrooms') {
      newFilters.bedrooms = filters.bedrooms === value ? null : value;
    } else if (type === 'maxPrice') {
      newFilters.maxPrice = value;
    } else if (Array.isArray(filters[type])) {
      if (filters[type].includes(value)) {
        newFilters[type] = filters[type].filter(item => item !== value);
      } else {
        newFilters[type] = [...filters[type], value];
      }
    }
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const clearAll = () => {
    const defaultFilters = { categories: [], bedrooms: null, amenities: [], maxPrice: 50000 };
    setFilters(defaultFilters);
    setDisplayedHomes(allHomes);
  };

  return (
    <div className="w-full bg-white dark:bg-[#0e1422] rounded-3xl p-6 border border-gray-100 dark:border-slate-800/80 shadow-sm dark:shadow-black/60 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg">Filters</h3>
        <button onClick={clearAll} className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-bold text-xs hover:text-red-700 transition-colors">
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-sm text-gray-800 dark:text-slate-200">Max Price</h4>
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
            Up to {filters.maxPrice >= 50000 ? "₹50,000+" : `₹${filters.maxPrice?.toLocaleString()}`}
          </span>
        </div>
        <div className="relative w-full h-2 bg-gray-100 dark:bg-slate-800/80 rounded-full mb-4">
          <div 
            className="absolute h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-l-full"
            style={{ 
              left: '0%', 
              right: `${100 - ((filters.maxPrice || 50000) / 50000) * 100}%` 
            }}
          ></div>
          <input 
            type="range" 
            min="0" 
            max="50000" 
            step="500" 
            value={filters.maxPrice || 50000} 
            onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            className="absolute w-full -top-1 h-4 opacity-0 cursor-pointer pointer-events-auto"
            style={{ zIndex: 4 }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-[#161e30] border-2 border-red-600 dark:border-red-500 rounded-full shadow pointer-events-none" 
            style={{ left: `calc(${((filters.maxPrice || 50000) / 50000) * 100}% - 8px)` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs font-medium text-gray-400 dark:text-slate-500 mt-2">
          <span>₹0</span>
          <span>₹25,000</span>
          <span>₹50,000+</span>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-slate-800/80 mb-6" />

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-bold text-sm text-gray-800 dark:text-slate-200 mb-4">Categories</h4>
        <div className="space-y-2.5">
          {["Beachfront", "Apartment", "Villa", "Cabin", "Farmhouse"].map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.categories.includes(type)}
                onChange={() => updateFilter('categories', type)}
                className="w-4.5 h-4.5 rounded border-gray-300 dark:border-slate-700 text-red-600 focus:ring-red-500/20 focus:ring-offset-0 transition-colors duration-150 cursor-pointer accent-red-600" 
              />
              <span className="text-sm font-medium text-gray-655 dark:text-slate-350 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-150">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-slate-800/80 mb-6" />

      {/* Bedrooms */}
      <div className="mb-8">
        <h4 className="font-bold text-sm text-gray-800 dark:text-slate-200 mb-4">Bedrooms</h4>
        <div className="flex gap-2">
          {["1", "2", "3", "4", "5+"].map((num) => {
            const isActive = filters.bedrooms === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => updateFilter('bedrooms', num)}
                className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                  isActive 
                    ? "bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 border-red-300 dark:border-red-900/50 shadow-sm font-extrabold" 
                    : "bg-white dark:bg-[#141b2d] text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700/60 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800/60"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-slate-800/80 mb-6" />

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-bold text-sm text-gray-800 dark:text-slate-200 mb-4">Amenities</h4>
        <div className="space-y-2.5">
          {[
            { value: "WiFi", label: "Wi-Fi" },
            { value: "Swimming Pool", label: "Swimming Pool" },
            { value: "Kitchen", label: "Kitchen" },
            { value: "Free Parking", label: "Free Parking" },
            { value: "Air Conditioning", label: "Air Conditioning" },
            { value: "Pet Friendly", label: "Pet Friendly" },
            { value: "TV", label: "TV" },
            { value: "Balcony", label: "Balcony" },
            { value: "Gym", label: "Gym" },
            { value: "Washing Machine", label: "Laundry" }
          ].map((amenity) => (
            <label key={amenity.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.amenities.includes(amenity.value)}
                onChange={() => updateFilter('amenities', amenity.value)}
                className="w-4.5 h-4.5 rounded border-gray-300 dark:border-slate-700 text-red-600 focus:ring-red-500/20 focus:ring-offset-0 transition-colors duration-150 cursor-pointer accent-red-600" 
              />
              <span className="text-sm font-medium text-gray-655 dark:text-slate-350 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-150">{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
