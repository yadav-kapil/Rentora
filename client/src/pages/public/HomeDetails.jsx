import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Review from "../../components/public/Review";
import BookingModal from "../../components/app/guest/BookingModal";
import useAuth from "../../hooks/useAuth";
import { FaMapMarkerAlt, FaStar, FaUserFriends, FaBed, FaHome, FaCheckCircle, FaUserCircle, FaShieldAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

const HomeDetailsSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12 animate-pulse">
    {/* Title Skeleton */}
    <div className="mb-8">
      <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-800/60 rounded-lg mb-4"></div>
      <div className="flex gap-4">
        <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
      </div>
    </div>

    {/* Image Skeleton */}
    <div className="w-full h-64 sm:h-96 md:h-[500px] bg-gray-200 dark:bg-slate-800/60 rounded-3xl mb-12"></div>

    {/* Details Split Skeleton */}
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-10">
        <div className="pb-8 border-b border-gray-200 dark:border-slate-800/80 flex justify-between">
          <div className="space-y-4 w-full">
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
          </div>
          <div className="w-14 h-14 bg-gray-200 dark:bg-slate-800/60 rounded-full flex-shrink-0"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 dark:bg-slate-800/60 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-slate-800/60 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800/60 rounded"></div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-[#0e1422] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800/80 h-96 shadow-xl dark:shadow-black/70">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-slate-800/60 rounded mb-6"></div>
          <div className="h-32 w-full bg-gray-200 dark:bg-slate-800/60 rounded-xl mb-4"></div>
          <div className="h-12 w-full bg-gray-200 dark:bg-slate-800/60 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedin } = useAuth();

  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchHome = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes/${id}`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error("Home Not Found");
        const data = await res.json();
        setHome(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHome();
  }, [id]);

  const images = home?.imageUrls && home.imageUrls.length > 0 ? home.imageUrls : (home?.imageUrl ? [home.imageUrl] : []);

  const handleNext = () => {
    if (images.length <= 1) return;
    setDirection(1);
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setDirection(-1);
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const handleKeyDown = (e) => {
      if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, currentImgIndex]);

  const handleBookClick = () => {
    if (!isLoggedin) {
      navigate("/login");
      return;
    }
    setIsBookingModalOpen(true);
  };

  if (loading) return <HomeDetailsSkeleton />;
  if (error) return <div className="text-center py-20 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-bold text-xl">{error}</div>;
  if (!home) return null;

  const totalRating = home?.reviews?.reduce((acc, rev) => acc + rev.rating, 0) || 0;
  const avgRating = home?.reviews?.length ? (totalRating / home.reviews.length).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight mb-4">
          {home.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700 dark:text-slate-300">
          {/* Rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-1.5 font-bold">
              <FaStar className="text-yellow-400 text-lg" />
              <span className="text-gray-900 dark:text-white">{avgRating}</span>
              <span className="text-gray-500 dark:text-slate-400 underline decoration-gray-300 dark:decoration-slate-700">({home.reviews.length} reviews)</span>
            </div>
          )}
          
          {avgRating > 0 && <span className="text-gray-300 dark:text-slate-700">•</span>}
          
          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-slate-300">
            <FaMapMarkerAlt className="text-gray-400 dark:text-slate-500" />
            <span className="underline decoration-gray-300 dark:decoration-slate-700">{home.location}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery Slider */}
      <div className="w-full h-64 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-sm border border-gray-100 dark:border-slate-800/80 bg-gray-100 dark:bg-slate-800/40 relative group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentImgIndex}
            src={images[currentImgIndex]}
            custom={direction}
            variants={{
              enter: (dir) => ({
                x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
                opacity: 0
              }),
              center: {
                x: 0,
                opacity: 1
              },
              exit: (dir) => ({
                x: dir < 0 ? "100%" : dir > 0 ? "-100%" : 0,
                opacity: 0
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`${home.title} view ${currentImgIndex + 1}`}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-white flex items-center justify-center backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-900 transition active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-white flex items-center justify-center backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-900 transition active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}

        {/* Slide Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full select-none">
            {currentImgIndex + 1} / {images.length}
          </div>
        )}

        {/* Slide Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentImgIndex ? 1 : -1);
                  setCurrentImgIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentImgIndex
                    ? "bg-white scale-120 shadow-md w-5"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Split */}
      <div className="grid lg:grid-cols-3 gap-12 relative">
        
        {/* Left Content Column */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Basic Stats Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-slate-800/80">
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-slate-300 text-sm font-inter">
              <span className="flex items-center gap-1.5"><FaUserFriends className="text-gray-400 dark:text-slate-500"/> Rooms Available : {home.guestNumbers} seater</span>
              <span className="text-gray-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><FaBed className="text-gray-400 dark:text-slate-500"/> {home.bedrooms} {home.bedrooms > 1 ? "bedrooms" : "bedroom"}</span>
              <span className="text-gray-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><FaHome className="text-gray-400 dark:text-slate-500"/> {home.category}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white mb-4">About this space</h3>
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed font-inter text-base whitespace-pre-line">
              {home.description}
            </p>
          </div>

          <hr className="border-gray-200 dark:border-slate-800/80" />

          {/* Amenities Grid */}
          {home.amenities && home.amenities.length > 0 && (
            <div>
              <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {home.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 text-gray-700 dark:text-slate-200 font-medium">
                    <FaCheckCircle className="text-red-500 dark:text-red-400 text-lg flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className="border-gray-200 dark:border-slate-800/80" />

          {/* Detailed Host Card */}
          <div className="bg-gray-50 dark:bg-[#0e1422] rounded-3xl p-8 border border-gray-100 dark:border-slate-800/80 flex gap-6 items-start">
            <div className="w-16 h-16 bg-white dark:bg-[#161e30] rounded-full flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-slate-400 text-4xl shadow-sm overflow-hidden border border-gray-200 dark:border-slate-700/60">
               {home.host?.dp ? (
                 <img src={home.host.dp} alt={home.host.name} className="w-full h-full object-cover" />
               ) : home.host?.name ? (
                 <span className="text-gray-400 dark:text-slate-300 text-2xl font-bold uppercase font-outfit">{home.host.name.charAt(0)}</span>
               ) : (
                 <FaUserCircle />
               )}
            </div>
            <div>
              <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">Hosted by {home.host?.name || "Anonymous"}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-4">{home.host?.email}</p>
              <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed max-w-md">
                Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
              </p>
              <button className="mt-4 px-6 py-2 border border-gray-900 dark:border-slate-700 rounded-lg font-bold text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-colors">
                Contact Host
              </button>
            </div>
          </div>

        </div>

        {/* Right Sticky Booking Widget */}
        <div className="lg:col-span-1 relative">
          <div className="bg-white dark:bg-[#0e1422] rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/60 dark:shadow-black/70 border border-gray-100 dark:border-slate-800/80 sticky top-28 space-y-6">
            <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-slate-800/80 pb-4">
              <div>
                <span className="text-3xl font-extrabold font-outfit text-gray-900 dark:text-white">
                  ₹ {home.price}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400 font-inter"> / night</span>
              </div>
              {avgRating > 0 && (
                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-slate-200 font-outfit">
                  <FaStar className="text-yellow-400" /> {avgRating}
                </div>
              )}
            </div>

            <div className="space-y-3 text-xs text-gray-600 dark:text-slate-300 font-medium font-inter">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-sm" /> Free cancellation before check-in
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-red-500 dark:text-red-400 text-sm" /> Verified property & host
              </div>
            </div>

            <button 
              onClick={handleBookClick}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 cursor-pointer text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-black/60 hover:shadow-xl transition-all active:scale-95 text-base font-outfit text-center"
            >
              Book Now
            </button>
            
            <p className="text-center text-xs text-gray-400 dark:text-slate-500 font-medium">Clicking Book Now opens stay selection & options</p>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        home={home} 
      />

      <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-800/80">
        <Review id={home._id} reviews={home.reviews} />
      </div>

    </div>
  );
};

export default Home;
