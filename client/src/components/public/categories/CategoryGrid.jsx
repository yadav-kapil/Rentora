import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaRegHeart, FaThLarge, FaList, FaSearch, FaFilter } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";
import { motion } from "motion/react";

const SkeletonCard = ({ viewMode }) => (
  <div className={`bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden shadow-sm flex animate-pulse border border-gray-100 dark:border-slate-800/80 ${viewMode === 'list' ? 'flex-row h-52' : 'flex-col justify-between h-[360px]'}`}>
    <div className={`${viewMode === 'list' ? 'w-1/3 h-full' : 'h-52 w-full'} bg-gray-200 dark:bg-slate-800/60 flex-shrink-0`}></div>
    <div className="p-4 space-y-4 flex-grow flex flex-col justify-between">
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 w-20 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
      </div>
    </div>
  </div>
);

const CategoryGrid = ({ homes, loading, onOpenFilters }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const location = useLocation();
  const isGuest = location.pathname.startsWith("/guest");
  // Helper to generate a random badge for mockup visual appeal
  const getBadge = (index) => {
    const badges = [
      { text: "POPULAR", color: "bg-red-500", dot: "bg-white", textCol: "text-red-500 dark:text-red-400" },
      { text: "BEST PRICE", color: "bg-green-500", dot: "bg-white", textCol: "text-green-600 dark:text-green-400" },
      { text: "NEW", color: "bg-purple-500", dot: "bg-white", textCol: "text-purple-600 dark:text-purple-400" },
      { text: "TRENDING", color: "bg-orange-500", dot: "bg-white", textCol: "text-orange-500 dark:text-orange-400" },
    ];
    return badges[index % badges.length];
  };

  return (
    <div className="flex-1 w-full">
      {/* Grid Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-slate-800/80 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={onOpenFilters}
            className="lg:hidden flex items-center gap-2 font-bold text-gray-800 dark:text-white bg-white dark:bg-[#0e1422] border border-gray-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <FaFilter className="text-sm text-gray-500 dark:text-slate-400" /> More Filters
          </button>
          
          <div className="font-medium text-sm text-gray-700 dark:text-slate-400 ml-auto sm:ml-0">
            <span className="font-bold text-gray-900 dark:text-white">{homes.length}+</span> homes found
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-slate-400 font-medium">Sort by:</span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none font-bold text-gray-800 dark:text-white bg-white dark:bg-[#0e1422] border border-gray-200 dark:border-slate-800/80 rounded-lg pl-3 pr-8 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
              <HiOutlineChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-slate-400" />
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-1 border border-gray-200 dark:border-slate-800/80 rounded-lg p-1 bg-white dark:bg-[#0e1422]">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
            >
              <FaThLarge />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Grid / List */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
        {loading ? (
          // Skeletons
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} viewMode={viewMode} />)}
          </>
        ) : homes.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-400 dark:text-slate-500 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-xl mb-2">No homes found</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Try adjusting your filters to find more results.</p>
          </div>
        ) : (
          [...homes].sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating-desc') {
              const aRating = a.reviews?.length ? a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length : 0;
              const bRating = b.reviews?.length ? b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length : 0;
              return bRating - aRating;
            }
            return 0; // recommended
          }).map((home, index) => {
            const avgRating = home.reviews?.length 
              ? (home.reviews.reduce((acc, rev) => acc + rev.rating, 0) / home.reviews.length).toFixed(1) 
              : 0;
            const badge = getBadge(index);

            return (
              <motion.div
                key={home._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className={`bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/80 hover:-translate-y-1 transition-all duration-300 flex ${viewMode === 'list' ? 'flex-row h-52' : 'flex-col justify-between'} relative border border-gray-50 dark:border-slate-800/80 group`}
              >
                <NavLink viewTransition to={isGuest ? `/guest/homes/${home._id}` : `/homes/${home._id}`} className={`flex-grow flex ${viewMode === 'list' ? 'flex-row w-full' : 'flex-col'}`}>
                  {/* Image Container with Badge */}
                  <div className={`${viewMode === 'list' ? 'w-2/5 sm:w-1/3 h-full' : 'h-52 w-full'} overflow-hidden relative flex-shrink-0`}>
                    {/* Dynamic Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-sm px-2.5 py-1.5 rounded-md shadow-sm flex items-center gap-1.5 z-10 border border-transparent dark:border-slate-700/50">
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${badge.color}`}></span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider font-ubuntu ${badge.textCol} hidden sm:inline`}>
                        {badge.text}
                      </span>
                    </div>
                    
                    <img
                      src={home.imageUrl}
                      alt={home.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Box */}
                  <div className={`p-4 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-between' : ''}`}>
                    <div>
                      <h3 className={`font-bold font-outfit text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-red-650 transition-colors ${viewMode === 'list' ? 'text-lg sm:text-xl' : 'text-base'}`}>
                        {home.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-1.5 mb-2">
                        <FaMapMarkerAlt className="text-gray-400 dark:text-slate-500" />
                        <span className="truncate">{home.location}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-gray-500 dark:text-slate-400 font-inter mt-1">
                        <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800/60 rounded text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700/50">{home.category}</span>
                        <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800/60 rounded text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700/50">{home.bedrooms} {home.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                        {viewMode === 'list' && home.amenities?.slice(0,2).map(am => (
                          <span key={am} className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800/60 rounded text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700/50 hidden sm:inline-block">{am}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="font-outfit">
                        <span className={`text-gray-900 dark:text-white font-extrabold ${viewMode === 'list' ? 'text-xl sm:text-2xl' : 'text-lg'}`}>₹ {home.price}</span>
                        <span className="text-xs font-medium text-gray-400 dark:text-slate-500 font-inter"> / night</span>
                      </div>
                      
                      {avgRating > 0 && (
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-slate-300">
                          <FaStar className="text-yellow-400 text-[10px]" />
                          <span>{avgRating} <span className="text-gray-400 dark:text-slate-500 font-normal">({home.reviews.length})</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
