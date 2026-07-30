import { useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaCalendarAlt, FaCheckCircle, FaUserCircle, FaBed, FaUserFriends, FaTags, FaWifi } from "react-icons/fa";
import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import ConfirmDeleteModal from "../../components/public/common/ConfirmDeleteModal";

// --- Skeleton Components ---
const SkeletonBlock = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-slate-700/80 rounded-xl animate-pulse ${className}`} />
);

const SkeletonView = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-inter">
    {/* Top action bar skeleton */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="space-y-2 w-full">
        <SkeletonBlock className="h-10 w-56" />
        <SkeletonBlock className="h-4 w-80" />
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <SkeletonBlock className="h-10 flex-1 sm:w-24 sm:flex-none" />
        <SkeletonBlock className="h-10 flex-1 sm:w-24 sm:flex-none" />
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-8">
        <SkeletonBlock className="w-full h-[300px] sm:h-[400px] rounded-3xl" />
        <div className="bg-white dark:bg-slate-800/70 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700/60 space-y-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1">
              <SkeletonBlock className="h-8 w-3/4" />
              <SkeletonBlock className="h-4 w-1/2" />
            </div>
            <SkeletonBlock className="h-16 w-28 rounded-2xl" />
          </div>
          <div className="flex gap-3 py-4 border-t border-b border-gray-100 dark:border-slate-700/60">
            <SkeletonBlock className="h-9 w-28 rounded-xl" />
            <SkeletonBlock className="h-9 w-28 rounded-xl" />
            <SkeletonBlock className="h-9 w-28 rounded-xl" />
          </div>
          <div className="space-y-2">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
            <SkeletonBlock className="h-4 w-4/6" />
          </div>
          <div className="space-y-2">
            <SkeletonBlock className="h-5 w-28" />
            <div className="flex gap-2 flex-wrap">
              <SkeletonBlock className="h-7 w-16 rounded-full" />
              <SkeletonBlock className="h-7 w-20 rounded-full" />
              <SkeletonBlock className="h-7 w-14 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        <SkeletonBlock className="h-48 rounded-3xl" />
        <div className="bg-white dark:bg-slate-800/70 rounded-3xl p-6 border border-gray-100 dark:border-slate-700/60 space-y-4">
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="h-20 rounded-2xl" />
          <SkeletonBlock className="h-20 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const HostHomeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [home, setHome] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [homeRes, bookingsRes] = await Promise.all([
        fetch(`/api/homes/${id}`),
        fetch(`/api/bookings/home/${id}`, {
          credentials: "include",
        }),
      ]);

      if (!homeRes.ok) throw new Error("Home not found");

      const homeData = await homeRes.json();
      const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];

      setHome(homeData);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = () => navigate(`/host/edit/${home._id}`);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/homes/${home._id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to delete home");
      navigate("/host/homes");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <SkeletonView />;

  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 dark:text-red-400 font-bold text-lg font-outfit">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-6 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-bold text-sm"
        >
          Retry
        </button>
      </div>
    );

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Normalize amenities — handle if it arrives as a comma string or array
  const amenitiesList = Array.isArray(home.amenities)
    ? home.amenities
    : typeof home.amenities === "string" && home.amenities.trim()
    ? home.amenities.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-inter">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            Listing Details
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium">
            Manage your property, view status, and track booking history.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleEdit}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg relative group"
          >
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/85 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 z-10">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-800 dark:text-slate-100 uppercase tracking-wider font-ubuntu">
                Active Listing
              </span>
            </div>
            <img
              src={home.imageUrl}
              alt={home.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </motion.div>

          {/* Details Card */}
          <div className="bg-white dark:bg-slate-800/70 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-700/60 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-gray-900 dark:text-white mb-2">
                  {home.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 font-medium">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{home.location}</span>
                </div>
              </div>
              <div className="text-left sm:text-right bg-gray-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/60">
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                  Nightly Rate
                </p>
                <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-outfit">
                  ₹ {home.price}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 border-t border-b border-gray-100 dark:border-slate-700/60 py-6">
              {home.category && (
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/60 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700/60">
                  <FaTags className="text-gray-400 dark:text-slate-500" />
                  <span className="font-bold text-sm text-gray-700 dark:text-slate-200">{home.category}</span>
                </div>
              )}
              {home.bedrooms && (
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/60 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700/60">
                  <FaBed className="text-gray-400 dark:text-slate-500" />
                  <span className="font-bold text-sm text-gray-700 dark:text-slate-200">
                    {home.bedrooms} Bedroom{home.bedrooms > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {home.guestNumbers && (
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/60 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700/60">
                  <FaUserFriends className="text-gray-400 dark:text-slate-500" />
                  <span className="font-bold text-sm text-gray-700 dark:text-slate-200">
                    Up to {home.guestNumbers} Guests
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold font-outfit text-gray-900 dark:text-white mb-3">
                About this space
              </h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                {home.description || "No description provided for this property."}
              </p>
            </div>

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold font-outfit text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaWifi className="text-red-500" /> Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold font-ubuntu tracking-wide"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Stats */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
            <h3 className="text-lg font-bold font-outfit mb-6 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" /> Listing Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-400 dark:text-slate-400 font-medium text-sm">Visibility</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                  Public
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-400 dark:text-slate-400 font-medium text-sm">Total Bookings</span>
                <span className="font-bold font-outfit text-xl">{totalBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 dark:text-slate-400 font-medium text-sm">Revenue (YTD)</span>
                <span className="font-bold font-outfit text-xl text-emerald-400">
                  ₹{totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-white dark:bg-slate-800/70 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-700/60">
            <h3 className="text-lg font-bold font-outfit text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" /> Recent Bookings
            </h3>

            {bookings.length > 0 ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700/60 hover:border-red-100 dark:hover:border-red-900/50 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <FaUserCircle className="text-gray-400 dark:text-slate-500 text-lg group-hover:text-red-400 transition-colors" />
                        <span className="font-bold text-sm text-gray-800 dark:text-slate-100">
                          {booking.user?.name || "Guest"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300">
                        Booked
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                        {new Date(booking.checkIn).toLocaleDateString()} –{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ₹{booking.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700/70">
                <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCalendarAlt className="text-gray-400 dark:text-slate-500 text-xl" />
                </div>
                <h4 className="font-bold text-gray-700 dark:text-slate-200 font-outfit">No bookings yet</h4>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                  When guests book your home, they will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message="Are you sure you want to permanently delete this listing? All associated bookings and reviews will be lost."
      />
    </div>
  );
};

export default HostHomeDetails;
