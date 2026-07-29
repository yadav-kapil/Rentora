import {
  NavLink,
  useLoaderData,
  useRevalidator,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaMapMarkerAlt, FaBookmark, FaRegBookmark } from "react-icons/fa";
import houseIllustration from "../../assets/house_illustration.png";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import LoadingModal from "../../components/public/common/LoadingModal";
import SuccessModal from "../../components/public/common/SuccessModal";
import ErrorModal from "../../components/public/common/ErrorModal";

const GuestHome = () => {
  const homes = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const { isLoggedin, user } = useAuth();

  const [wishlistIds, setWishlistIds] = useState([]);
  
  // Feedback Modal States
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isLoggedin && user?.role === "User") {
      fetchWishlistIds();
    }
  }, [isLoggedin, user]);

  const fetchWishlistIds = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/ids`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setWishlistIds(data.wishlistIds || []);
      }
    } catch {
      // ignore silent fetch failures
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ homeId }),
      });

      if (!res.ok) {
        throw new Error("Failed to update wishlist");
      }

      const data = await res.json();
      if (data.isWishlisted) {
        setWishlistIds((prev) => [...prev, homeId]);
        setSuccessMsg("Home saved to your wishlist successfully!");
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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
      {/* Premium Hero Banner */}
      <div className="bg-white dark:bg-slate-800/70 rounded-3xl p-6 sm:p-8 md:p-10 shadow-md shadow-gray-150/20 dark:shadow-black/40 flex flex-col md:flex-row justify-between items-center mb-10 overflow-hidden relative border-none dark:border dark:border-slate-700/60 min-h-[160px] md:min-h-[220px]">
        <div className="flex-1 text-center md:text-left space-y-2.5 md:pr-48 lg:pr-64">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-1 h-3.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
            <span className="text-xs font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
              Available Homes
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight leading-tight">
            Discover Stays
          </h1>
          <p className="text-gray-500 dark:text-slate-400 font-medium text-xs sm:text-sm max-w-sm md:max-w-md">
            Find the perfect place for your next adventure
          </p>
        </div>
        
        {/* Banner Illustration */}
        <div className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 flex-shrink-0 md:absolute md:right-8 md:-bottom-4 lg:-bottom-6 select-none mt-6 md:mt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-red-50/15 dark:bg-red-900/20 rounded-full filter blur-lg -z-10 transform scale-110"></div>
            <img 
              src={houseIllustration} 
              alt="Luxury modern villa" 
              className="w-full h-auto object-contain hover:scale-103 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Homes Grid with Staggered Entry */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-8"
      >
        {homes.map((home, index) => {
          const isWishlisted = wishlistIds.includes(home._id);

          return (
            <motion.div
              key={home._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-slate-800/70 rounded-2xl overflow-hidden shadow-sm shadow-gray-150/40 dark:shadow-black/30 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative border border-transparent dark:border-slate-700/60 group/card"
            >
              {/* Clickable Card */}
              <NavLink viewTransition to={`/guest/homes/${home._id}`} className="group flex-grow flex flex-col">
                {/* Image Container with Hover Save Bookmark Icon */}
                <div className="h-52 w-full overflow-hidden relative">
                  {/* Save Bookmark Button - always visible on mobile & tablet, hover on desktop */}
                  <button
                    type="button"
                    onClick={(e) => handleWishlistToggle(e, home._id)}
                    className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md cursor-pointer ${
                      isWishlisted
                        ? "bg-white/90 dark:bg-slate-900/90 text-red-500 opacity-100 scale-100"
                        : "bg-white/80 dark:bg-slate-900/80 text-gray-700 dark:text-slate-200 max-lg:opacity-100 lg:opacity-0 group-hover/card:opacity-100 hover:text-red-500 hover:scale-110"
                    }`}
                    title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    {isWishlisted ? (
                      <FaBookmark className="text-sm text-red-500" />
                    ) : (
                      <FaRegBookmark className="text-sm" />
                    )}
                  </button>

                  {/* Active Badge (on left for touch devices, right for desktop when not wishlisted) */}
                  {!isWishlisted && (
                    <div className="absolute top-3.5 left-3 lg:left-auto lg:right-4 bg-white dark:bg-slate-950/85 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 z-10 transition-opacity duration-300 lg:group-hover/card:opacity-0 pointer-events-none">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-bold text-gray-750 dark:text-slate-100 uppercase tracking-wider font-ubuntu">
                        Active
                      </span>
                    </div>
                  )}

                  <img
                    src={home.imageUrl}
                    alt={home.title}
                    className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-350"
                  />
                </div>

                {/* Content Box */}
                <div className="p-5 space-y-4 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-red-50/50 dark:bg-red-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FaHome className="text-red-650 text-lg" />
                        </div>
                        <div className="overflow-hidden">
                          <h2 className="font-bold font-outfit text-base text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-red-650 dark:group-hover:text-red-400 transition-colors">
                            {home.title}
                          </h2>
                          <p className="text-xs text-gray-400 dark:text-slate-500 font-medium truncate mt-0.5">
                            {home.description || "No description provided"}
                          </p>
                        </div>
                      </div>

                      <span className="flex items-center gap-1 bg-red-50/60 dark:bg-red-900/20 text-red-650 dark:text-red-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-ubuntu flex-shrink-0">
                        <FaMapMarkerAlt className="text-[9px]" />
                        {home.location}
                      </span>
                    </div>

                    <div className="pt-2 flex items-baseline">
                      <span className="text-red-650 font-extrabold text-lg font-outfit">
                        ₹ {home.price} <span className="text-xs font-normal text-gray-400 dark:text-slate-500 font-inter">/ night</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 w-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-bold py-2.5 rounded-xl text-center text-sm transition-colors shadow-sm">
                    Book Now
                  </div>
                </div>
              </NavLink>
            </motion.div>
          );
        })}
      </motion.div>

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

export default GuestHome;

export const getHomes = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error("Internal Server Error");
  }

  return res.json();
};
