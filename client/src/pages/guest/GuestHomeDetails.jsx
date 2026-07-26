import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Review from "../../components/public/Review";

const GuestHomeDetails = () => {
  const home = useLoaderData();
  const navigate = useNavigate();
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  // Simple total calculation for display
  let calculatedTotal = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days > 0) {
      calculatedTotal = home.price * days;
    }
  }

  const handleBook = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (start >= end) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    
    setIsBooking(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          homeId: home._id,
          checkIn,
          checkOut,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to book home.");
      }

      navigate("/guest/bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-10">
      {/* Title Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            {home.title}
          </h1>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="inline-block bg-red-50 dark:bg-red-900/20 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-ubuntu">
              {home.location}
            </span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-64 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-sm">
        <img
          src={home.imageUrl}
          alt={home.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {/* Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-6 sm:p-8 shadow-md shadow-gray-150/30 dark:shadow-black/40 border border-transparent dark:border-slate-700/60">
            <h2 className="text-xl font-bold font-outfit text-gray-800 dark:text-white mb-4">
              About this space
            </h2>
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed font-inter text-sm sm:text-base whitespace-pre-line">
              {home.description}
            </p>
          </div>
          
          <Review id={home._id} reviews={home.reviews} />
        </div>

        {/* Price Card & Booking */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-6 shadow-lg shadow-gray-150/40 dark:shadow-black/40 h-fit sticky top-24 border border-transparent dark:border-slate-700/60">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-gray-500 dark:text-slate-400 text-sm font-semibold">Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                ₹ {home.price} <span className="text-xs font-normal text-gray-400 dark:text-slate-500 font-inter">/ night</span>
              </span>
            </div>
            
            <div className="h-px bg-gray-100 dark:bg-slate-700/60 my-4"></div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Check-In</label>
                <input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white dark:bg-slate-900/60 text-gray-800 dark:text-slate-100"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Check-Out</label>
                <input 
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white dark:bg-slate-900/60 text-gray-800 dark:text-slate-100"
                  min={checkIn || new Date().toISOString().split("T")[0]}
                />
              </div>
              
              {calculatedTotal > 0 && (
                <div className="flex justify-between items-center py-2 text-sm font-bold text-gray-800 dark:text-slate-100 border-t border-gray-100 dark:border-slate-700/60 mt-2">
                  <span>Total</span>
                  <span>₹ {calculatedTotal}</span>
                </div>
              )}

              {error && (
                <div className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg font-medium">
                  {error}
                </div>
              )}

              <button 
                onClick={handleBook}
                disabled={isBooking}
                className={`w-full ${isBooking ? "bg-red-400" : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"} cursor-pointer text-white py-3 rounded-xl font-semibold shadow-sm transition text-sm font-outfit mt-2`}
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </button>
              <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-3">You will be charged upon confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHomeDetails;

export const guestHomeLoader = async ({ params }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/homes/${params.id}`,
    {
      credentials : 'include'
    }
  );

  if (!res.ok) {
    throw new Error("Home Not Found");
  }

  return res.json();
};
