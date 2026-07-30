import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaStar, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import LoadingModal from "../common/LoadingModal";
import SuccessModal from "../common/SuccessModal";
import ErrorModal from "../common/ErrorModal";

const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-[340px] animate-pulse border border-gray-100 dark:border-slate-800/80">
    <div className="h-48 w-full bg-gray-200 dark:bg-slate-800/60"></div>
    <div className="p-4 space-y-4 flex-grow">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-grow">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
        </div>
      </div>
      <div className="pt-2 flex justify-between items-center">
        <div className="h-5 w-20 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
      </div>
    </div>
  </div>
);

const PopularStays = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedin, user } = useAuth();

  const isGuest = location.pathname.startsWith("/guest");

  const [wishlistIds, setWishlistIds] = useState([]);

  // Feedback Modal States
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await fetch("/api/homes");
        if (!res.ok) {
          throw new Error("Failed to fetch homes");
        }
        const data = await res.json();
        setHomes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomes();
  }, []);

  useEffect(() => {
    if (isLoggedin && user?.role === "User") {
      fetchWishlistIds();
    }
  }, [isLoggedin, user]);

  const fetchWishlistIds = async () => {
    try {
      const res = await fetch("/api/wishlist/ids", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setWishlistIds(data.wishlistIds || []);
      }
    } catch {
      // ignore
    }
  };

  const handleWishlistToggle = async (e, homeId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    setIsActionLoading(true);
    try {
      const res = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ homeId }),
      });

      if (!res.ok) throw new Error("Failed to update wishlist");

      const data = await res.json();
      if (data.isWishlisted) {
        setWishlistIds((prev) => [...prev, homeId]);
        setSuccessMsg("Home saved to your wishlist!");
      } else {
        setWishlistIds((prev) => prev.filter((id) => id !== homeId));
        setSuccessMsg("Home removed from your wishlist.");
      }
      setIsSuccessOpen(true);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong");
      setIsErrorOpen(true);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="mb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-end mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
            <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
              POPULAR STAYS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            Handpicked Homes <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">for You</span>
          </h2>
        </div>
        <button 
          onClick={() => navigate(isGuest ? "/guest/categories" : "/categories")}
          className="hidden sm:flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#0e1422] border border-gray-200 dark:border-slate-800/80 rounded-full font-bold text-sm text-gray-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          View all homes <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-xl text-center font-bold mb-8">
          {error}
        </div>
      )}

      {/* Homes Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-6">
        {loading ? (
          // Skeleton Loaders
          <>
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </>
        ) : (
          homes.slice(0, 4).map((home, index) => {
            const totalRating = home.reviews?.reduce((acc, rev) => acc + rev.rating, 0) || 0;
            const avgRating = home.reviews?.length ? (totalRating / home.reviews.length).toFixed(1) : 0;
            const isWishlisted = wishlistIds.includes(home._id);

            return (
              <motion.div
                key={home._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <div className="bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative border border-gray-50 dark:border-slate-800/80 group/card h-full">
                  <NavLink viewTransition to={isGuest ? `/guest/homes/${home._id}` : `/homes/${home._id}`} className="flex-grow flex flex-col">
                    {/* Image Container with Badge & Hover Bookmark */}
                    <div className="h-48 w-full overflow-hidden relative">
                      {/* Bookmark Save Button - always visible on mobile & tablet, hover on desktop */}
                      <button
                        type="button"
                        onClick={(e) => handleWishlistToggle(e, home._id)}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md cursor-pointer ${
                          isWishlisted
                            ? "bg-white/90 dark:bg-slate-900/90 text-red-500 opacity-100 scale-100"
                            : "bg-white/80 dark:bg-slate-900/80 text-gray-700 dark:text-slate-200 max-lg:opacity-100 lg:opacity-0 group-hover/card:opacity-100 hover:text-red-500 hover:scale-110"
                        }`}
                        title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                      >
                        {isWishlisted ? (
                          <FaBookmark className="text-xs text-red-500" />
                        ) : (
                          <FaRegBookmark className="text-xs" />
                        )}
                      </button>

                      {/* Active Badge (on left for touch devices, right for desktop when not wishlisted) */}
                      {!isWishlisted && (
                        <div className="absolute top-3 left-3 lg:left-auto lg:right-3 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10 border border-transparent dark:border-slate-700/50 transition-opacity duration-300 lg:group-hover/card:opacity-0 pointer-events-none">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                          <span className="text-[9px] font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider font-ubuntu">
                            Active
                          </span>
                        </div>
                      )}
                      
                      <img
                        src={home.imageUrl}
                        alt={home.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Box */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold font-outfit text-base text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover/card:text-red-650 transition-colors">
                        {home.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-1.5">
                        <FaMapMarkerAlt className="text-gray-400 dark:text-slate-500" />
                        <span className="truncate">{home.location}</span>
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="font-outfit">
                          <span className="text-gray-900 dark:text-white font-extrabold text-lg">₹ {home.price}</span>
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
                </div>
              </motion.div>
            )
          })
        )}
      </div>
      
      <button 
        onClick={() => navigate(isGuest ? "/guest/categories" : "/categories")}
        className="w-full sm:hidden mt-8 py-4 text-center border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-700 dark:text-slate-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-800/40 hover:text-red-600 dark:hover:text-red-400 transition-colors shadow-sm cursor-pointer"
      >
        View all homes
      </button>

      {/* Feedback Modals */}
      <LoadingModal isOpen={isActionLoading} text="Updating your wishlist..." />
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        title="Wishlist Updated" 
        desc={successMsg} 
        autoCloseTime={2000}
      />
      <ErrorModal 
        isOpen={isErrorOpen} 
        onClose={() => setIsErrorOpen(false)} 
        title="Error" 
        desc={errorMsg} 
      />
    </div>
  );
};

export default PopularStays;
