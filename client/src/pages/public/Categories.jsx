import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import CategoryHeader from "../../components/public/categories/CategoryHeader";
import CategoryRow from "../../components/public/categories/CategoryRow";
import CategorySearch from "../../components/public/categories/CategorySearch";
import FilterSidebar from "../../components/public/categories/FilterSidebar";
import CategoryGrid from "../../components/public/categories/CategoryGrid";

const Categories = () => {
  const [allHomes, setAllHomes] = useState([]);
  const [displayedHomes, setDisplayedHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    categories: [],
    bedrooms: null,
    amenities: [],
    maxPrice: 50000
  });
  
  const [searchParams, setSearchParams] = useState({ checkIn: "", checkOut: "", guests: "" });

  const fetchHomes = async () => {
    setLoading(true);
    try {
      let url = "/api/homes";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch homes");
      const data = await res.json();
      setAllHomes(data);
      setDisplayedHomes(data);
    } catch (err) {
      console.error("Error fetching homes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      bedrooms: null,
      amenities: [],
      maxPrice: 50000
    });
    setDisplayedHomes(allHomes);
  };



  const dialogRef = useRef(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 min-h-screen relative">
      <CategoryHeader />
      <CategoryRow 
        allHomes={allHomes}
        setDisplayedHomes={setDisplayedHomes}
        filters={filters}
        setFilters={setFilters}
      />
      <CategorySearch 
        allHomes={allHomes} 
        setDisplayedHomes={setDisplayedHomes}
        filters={filters}
      />
      
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-full lg:w-1/4 flex-shrink-0">
          <FilterSidebar 
            allHomes={allHomes}
            setDisplayedHomes={setDisplayedHomes}
            filters={filters} 
            setFilters={setFilters} 
            clearAll={clearAllFilters} 
          />
        </div>
        
        <CategoryGrid homes={displayedHomes} loading={loading} onOpenFilters={() => dialogRef.current?.showModal()} />
      </div>

      {/* Mobile Filter Dialog */}
      <dialog 
        ref={dialogRef}
        className="fixed inset-0 m-auto p-0 rounded-t-3xl sm:rounded-3xl shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm max-h-[90vh] w-full max-w-md bg-white dark:bg-[#0e1422] dark:border dark:border-slate-800/80 overflow-hidden self-end sm:self-center transition-[display,overlay] duration-300 starting:backdrop:opacity-0 starting:translate-y-full starting:sm:scale-95 text-gray-900 dark:text-white"
      >
        <div className="flex flex-col h-full max-h-[90vh]">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800/80">
            <button 
              onClick={() => dialogRef.current?.close()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800/60 rounded-full transition-colors font-bold text-lg text-gray-900 dark:text-white"
            >
              <FaTimes className="text-sm" />
            </button>
            <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg">Filters</h3>
            <button onClick={clearAllFilters} className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-bold text-sm hover:text-red-700 transition-colors">
              Clear
            </button>
          </div>
          
          <div className="overflow-y-auto p-4 flex-1">
            <FilterSidebar 
              allHomes={allHomes}
              setDisplayedHomes={setDisplayedHomes}
              filters={filters} 
              setFilters={setFilters} 
              clearAll={clearAllFilters} 
            />
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-slate-800/80 bg-white dark:bg-[#0e1422]">
            <button 
              onClick={() => dialogRef.current?.close()}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white py-3 rounded-xl font-bold transition-colors shadow-md shadow-red-200 dark:shadow-black/60"
            >
              Show homes
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Categories;
