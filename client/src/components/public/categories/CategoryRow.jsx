import { FaBuilding, FaTree, FaUmbrellaBeach, FaSeedling, FaHome } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";

const categories = [
  { id: "Beachfront", name: "Beachfront", icon: FaUmbrellaBeach, count: "6 Stays" },
  { id: "Apartment", name: "Apartments", icon: FaBuilding, count: "6 Stays" },
  { id: "Villa", name: "Villas", icon: MdOutlineVilla, count: "6 Stays" },
  { id: "Cabin", name: "Cabins", icon: FaTree, count: "6 Stays" },
  { id: "Farmhouse", name: "Farmhouses", icon: FaSeedling, count: "6 Stays" },
];

const CategoryRow = ({ allHomes, setDisplayedHomes, filters, setFilters }) => {
  const activeCategories = filters?.categories || [];

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
    if (newFilters.categories.includes(value)) {
      newFilters.categories = newFilters.categories.filter(item => item !== value);
    } else {
      newFilters.categories = [...newFilters.categories, value];
    }
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const clearCategories = () => {
    const newFilters = { ...filters, categories: [] };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-6 relative">
      <button
        onClick={clearCategories}
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-200 min-w-max ${
          activeCategories.length === 0 
            ? "border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 shadow-sm" 
            : "border-gray-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1422] text-gray-700 dark:text-slate-300 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:shadow-sm"
        }`}
      >
        <div className={`text-xl ${activeCategories.length === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-500 dark:text-slate-400"}`}>
          <FaHome />
        </div>
        <div className="flex flex-col items-start text-left">
          <span className={`text-sm font-bold font-outfit ${activeCategories.length === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-900 dark:text-white"}`}>
            All Homes
          </span>
          <span className={`text-[10px] font-medium font-ubuntu ${activeCategories.length === 0 ? "text-red-400" : "text-gray-400 dark:text-slate-500"}`}>
            30 Stays
          </span>
        </div>
      </button>

      {categories.map((cat) => {
        const isActive = activeCategories.includes(cat.id);
        const Icon = cat.icon;
        
        return (
          <button
            key={cat.id}
            onClick={() => updateFilter('categories', cat.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-200 min-w-max ${
              isActive 
                ? "border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 shadow-sm" 
                : "border-gray-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1422] text-gray-700 dark:text-slate-300 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:shadow-sm"
            }`}
          >
            <div className={`text-xl ${isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-500 dark:text-slate-400"}`}>
              <Icon />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className={`text-sm font-bold font-outfit ${isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-900 dark:text-white"}`}>
                {cat.name}
              </span>
              <span className={`text-[10px] font-medium font-ubuntu ${isActive ? "text-red-400" : "text-gray-400 dark:text-slate-500"}`}>
                {cat.count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryRow;
