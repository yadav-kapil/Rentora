import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBookmark, FaHome, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import LoadingModal from "../../components/public/common/LoadingModal";
import SuccessModal from "../../components/public/common/SuccessModal";
import ErrorModal from "../../components/public/common/ErrorModal";

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

const Wishlist = () => {
  const [homes, setHomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to load wishlist");
      }
      const data = await res.json();
      setHomes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveWishlist = async (e, homeId) => {
    e.preventDefault();
    e.stopPropagation();

    setIsActionLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ homeId }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove home from wishlist");
      }

      setHomes((prev) => prev.filter((h) => h._id !== homeId));
      setSuccessMsg("Home removed from your wishlist successfully.");
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
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
            Saved Stays
          </span>
        </div>
        <h1 className="text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          My Wishlist
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium text-sm mt-1">
          Keep track of your saved properties and plan your future getaways
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-xl text-center font-bold mb-8">
          {error}
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : homes.length === 0 ? (
        /* Empty Wishlist State */
        <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-10 text-center shadow-sm border border-gray-100 dark:border-slate-700/60 flex flex-col items-center my-6">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mb-4">
            <FaBookmark className="text-2xl" />
          </div>
          <h2 className="text-xl font-bold font-outfit text-gray-800 dark:text-slate-100 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-sm text-sm">
            As you search, click the save icon on any property card to save your favorite stays here.
          </p>
          <Link
            to="/guest/home"
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm text-sm font-outfit"
          >
            Explore Homes
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-6">
          <AnimatePresence>
            {homes.map((home, index) => {
              const totalRating = home.reviews?.reduce((acc, rev) => acc + rev.rating, 0) || 0;
              const avgRating = home.reviews?.length
                ? (totalRating / home.reviews.length).toFixed(1)
                : 0;

              return (
                <motion.div
                  key={home._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="h-full"
                >
                  <div className="bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative border border-gray-50 dark:border-slate-800/80 group h-full">
                    <NavLink viewTransition to={`/guest/homes/${home._id}`} className="flex-grow flex flex-col">
                      {/* Image Container with Save Bookmark Icon */}
                      <div className="h-48 w-full overflow-hidden relative">
                        {/* Save / Remove Bookmark Button */}
                        <button
                          type="button"
                          onClick={(e) => handleRemoveWishlist(e, home._id)}
                          className="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center z-20 border border-transparent dark:border-slate-700/50 transition-transform active:scale-90 hover:scale-110 cursor-pointer text-red-500"
                          title="Remove from wishlist"
                        >
                          <FaBookmark className="text-sm text-red-500 drop-shadow-sm" />
                        </button>

                        <img
                          src={home.imageUrl}
                          alt={home.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-bold font-outfit text-base text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-red-650 transition-colors">
                            {home.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-1.5">
                            <FaMapMarkerAlt className="text-gray-400 dark:text-slate-500" />
                            <span className="truncate">{home.location}</span>
                          </p>
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <div className="font-outfit">
                            <span className="text-gray-900 dark:text-white font-extrabold text-lg">
                              ₹ {home.price}
                            </span>
                            <span className="text-xs font-medium text-gray-400 dark:text-slate-500 font-inter">
                              {" "}
                              / night
                            </span>
                          </div>

                          {avgRating > 0 && (
                            <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-slate-300">
                              <FaStar className="text-yellow-400 text-[10px]" />
                              <span>
                                {avgRating}{" "}
                                <span className="text-gray-400 dark:text-slate-500 font-normal">
                                  ({home.reviews.length})
                                </span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modals for Feedback */}
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

export default Wishlist;
