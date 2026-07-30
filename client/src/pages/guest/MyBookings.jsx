import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import DangerModal from "../../components/public/common/DangerModal";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cancellation modal state
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleOpenCancelModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsDangerModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;

    setIsCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${selectedBookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      setBookings((prev) =>
        prev.map((b) => (b._id === selectedBookingId ? { ...b, status: "cancelled" } : b))
      );
      setIsDangerModalOpen(false);
      setSelectedBookingId(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-red-50 dark:bg-red-900/20 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-xl text-center font-bold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          My Bookings
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium mt-2">
          Manage and view all your upcoming and past trips
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-10 text-center shadow-sm border border-gray-100 dark:border-slate-700/60 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-slate-900/60 rounded-full flex items-center justify-center mb-4">
            <FaCalendarAlt className="text-2xl text-gray-400 dark:text-slate-500" />
          </div>
          <h2 className="text-xl font-bold font-outfit text-gray-800 dark:text-slate-100 mb-2">No bookings yet</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-sm">
            You haven't booked any homes yet. Start exploring to find your perfect stay.
          </p>
          <Link 
            to="/guest/home" 
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
          >
            Explore Homes
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const status = (booking.status || "pending").toLowerCase();

            return (
              <div key={booking._id} className="bg-white dark:bg-slate-800/70 rounded-2xl overflow-hidden shadow-sm shadow-gray-150/40 dark:shadow-black/30 border border-gray-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-stretch">
                <div className="w-full sm:w-44 md:w-48 aspect-square flex-shrink-0 relative bg-gray-100 dark:bg-slate-900 overflow-hidden">
                  <img 
                    src={booking.home?.imageUrl} 
                    alt={booking.home?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {/* Status Badge on Image */}
                  <div className="absolute top-3 left-3">
                    {status === "confirmed" || status === "confirm" ? (
                      <span className="px-2.5 py-1 bg-white/95 dark:bg-slate-950/85 backdrop-blur-sm text-emerald-700 dark:text-emerald-400 shadow-sm text-[10px] font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed
                      </span>
                    ) : status === "rejected" || status === "reject" ? (
                      <span className="px-2.5 py-1 bg-white/95 dark:bg-slate-950/85 backdrop-blur-sm text-red-700 dark:text-red-400 shadow-sm text-[10px] font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Rejected
                      </span>
                    ) : status === "cancelled" || status === "cancel" ? (
                      <span className="px-2.5 py-1 bg-white/95 dark:bg-slate-950/85 backdrop-blur-sm text-gray-700 dark:text-slate-300 shadow-sm text-[10px] font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Cancelled
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-white/95 dark:bg-slate-950/85 backdrop-blur-sm text-amber-700 dark:text-amber-400 shadow-sm text-[10px] font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider font-ubuntu">
                        <FaMapMarkerAlt className="text-red-500" />
                        {booking.home?.location}
                      </div>
                      <span className="text-[10px] bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-bold uppercase font-ubuntu">
                        {booking.paymentMethod || "Cash"}
                      </span>
                    </div>

                    <h3 className="font-bold font-outfit text-lg text-gray-900 dark:text-white leading-snug line-clamp-1 mb-3">
                      {booking.home?.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 font-medium bg-gray-50 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg w-fit border border-gray-100 dark:border-slate-700/60 font-ubuntu">
                        <FaCalendarAlt className="text-gray-400 dark:text-slate-500 text-xs" />
                        <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                        <span className="text-gray-400 dark:text-slate-500 mx-1">→</span>
                        <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-slate-700/60 gap-2">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-slate-500 font-medium mb-0.5">Total Amount</p>
                      <p className="font-extrabold font-outfit text-lg text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                        ₹ {booking.totalPrice}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {status !== "cancelled" && status !== "cancel" && status !== "rejected" && status !== "reject" && (
                        <button
                          onClick={() => handleOpenCancelModal(booking._id)}
                          className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      )}
                      <Link 
                        to={`/guest/homes/${booking.home?._id}`}
                        className="text-sm font-bold text-gray-600 dark:text-slate-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors"
                      >
                        View Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Danger Modal */}
      <DangerModal
        isOpen={isDangerModalOpen}
        onClose={() => {
          if (!isCancelling) {
            setIsDangerModalOpen(false);
            setSelectedBookingId(null);
          }
        }}
        onConfirm={handleConfirmCancel}
        title="Cancel Booking?"
        desc="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        isLoading={isCancelling}
      />
    </div>
  );
};

export default MyBookings;
