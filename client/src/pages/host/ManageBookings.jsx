import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaRupeeSign, 
  FaEllipsisV, 
  FaTimes, 
  FaFileAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaClock, 
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaSpinner,
  FaChevronDown,
  FaTimesCircle
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import DangerModal from "../../components/public/common/DangerModal";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Controls State
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Selected Booking Details Drawer Modal
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Action Menu State per row
  const [openMenuId, setOpenMenuId] = useState(null);

  // Reject / Cancel Danger Modal State
  const [rejectBookingId, setRejectBookingId] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchHostBookings();
  }, []);

  const fetchHostBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings/host", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load host bookings.");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error(`Failed to update status to ${newStatus}`);
      const updatedBooking = await res.json();

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );

      if (selectedBooking && selectedBooking._id === bookingId) {
        setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
      }
      setIsRejectModalOpen(false);
      setRejectBookingId(null);
      setOpenMenuId(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Status Filter Count calculations
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => (b.status || "pending").toLowerCase() === "pending").length;
  const confirmedCount = bookings.filter((b) => (b.status || "").toLowerCase() === "confirmed" || (b.status || "").toLowerCase() === "confirm").length;
  const cancelledCount = bookings.filter((b) => ["cancelled", "cancel", "rejected", "reject"].includes((b.status || "").toLowerCase())).length;

  const totalRevenue = bookings
    .filter((b) => ["confirmed", "confirm", "completed", "pending"].includes((b.status || "pending").toLowerCase()))
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Filtered & Sorted list
  const filteredBookings = bookings.filter((b) => {
    const s = (b.status || "pending").toLowerCase();
    
    // Tab filter
    if (activeTab === "Upcoming" && s !== "confirmed" && s !== "confirm" && s !== "pending") return false;
    if (activeTab === "Pending" && s !== "pending") return false;
    if (activeTab === "Confirmed" && s !== "confirmed" && s !== "confirm") return false;
    if (activeTab === "Cancelled" && s !== "cancelled" && s !== "cancel" && s !== "rejected" && s !== "reject") return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const homeTitle = (b.home?.title || "").toLowerCase();
      const guestName = (b.user?.name || b.user?.email || "").toLowerCase();
      const bookingId = b._id.toLowerCase();
      return homeTitle.includes(q) || guestName.includes(q) || bookingId.includes(q);
    }

    return true;
  });

  if (sortBy === "newest") {
    filteredBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === "amount-high") {
    filteredBookings.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0));
  }

  const renderStatusBadge = (statusStr) => {
    const s = (statusStr || "pending").toLowerCase();
    if (s === "confirmed" || s === "confirm") {
      return (
        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 text-xs font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed
        </span>
      );
    }
    if (s === "rejected" || s === "reject" || s === "cancelled" || s === "cancel") {
      return (
        <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/50 text-xs font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {s.includes("cancel") ? "Cancelled" : "Rejected"}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50 text-xs font-bold rounded-full uppercase tracking-wider font-ubuntu flex items-center gap-1.5 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 font-inter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          Bookings
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium mt-1">
          Manage all your property bookings and reservations.
        </p>
      </div>

      {/* Desktop Filter Tabs (hidden sm:flex) */}
      <div className="hidden sm:flex items-center gap-2 border-b border-gray-200 dark:border-slate-700/70 pb-1 mb-8 relative">
        {[
          { label: "All Bookings", value: "All", count: totalCount },
          { label: "Pending", value: "Pending", count: pendingCount },
          { label: "Confirmed", value: "Confirmed", count: confirmedCount },
          { label: "Cancelled", value: "Cancelled", count: cancelledCount },
        ].map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative px-5 py-3 text-sm font-bold font-ubuntu transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer select-none ${
                isActive ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-100"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
                isActive ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300" : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"
              }`}>
                {tab.count}
              </span>
              {isActive && (
                <motion.div
                  layoutId="desktopActiveTabIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/25 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xl flex-shrink-0">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-2xl font-extrabold font-outfit text-gray-900 dark:text-white mt-0.5">{totalCount}</h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">↑ 12% this month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/25 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xl flex-shrink-0">
            <FaClock />
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Pending Approval</p>
            <h3 className="text-2xl font-extrabold font-outfit text-gray-900 dark:text-white mt-0.5">{pendingCount}</h3>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Awaiting action</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/25 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xl flex-shrink-0">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Confirmed Stays</p>
            <h3 className="text-2xl font-extrabold font-outfit text-gray-900 dark:text-white mt-0.5">{confirmedCount}</h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">This month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/25 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xl flex-shrink-0">
            <FaRupeeSign />
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl font-extrabold font-outfit text-gray-900 dark:text-white mt-0.5">₹ {totalRevenue.toLocaleString()}</h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">↑ 18% this month</span>
          </div>
        </div>
      </div>

      {/* Mobile Animated 4-Option Tabbar (sm:hidden) */}
      <div className="sm:hidden mb-4 p-1.5 bg-gray-100/90 dark:bg-slate-800/80 border border-gray-200/60 dark:border-slate-700/70 rounded-2xl flex items-center gap-1.5 font-ubuntu overflow-hidden">
        {[
          { label: "All Bookings", value: "All", count: totalCount, icon: <FaCalendarAlt className="text-xs flex-shrink-0" /> },
          { label: "Pending", value: "Pending", count: pendingCount, icon: <FaClock className="text-xs flex-shrink-0" /> },
          { label: "Confirmed", value: "Confirmed", count: confirmedCount, icon: <FaCheckCircle className="text-xs flex-shrink-0" /> },
          { label: "Cancelled", value: "Cancelled", count: cancelledCount, icon: <FaTimesCircle className="text-xs flex-shrink-0" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ease-in-out cursor-pointer select-none ${
                isActive
                  ? "flex-auto text-white font-bold shadow-md shadow-red-200/60 dark:shadow-red-950/30"
                  : "flex-1 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white font-semibold bg-white/60 dark:bg-slate-900/60 border border-gray-200/40 dark:border-slate-700/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTabBackground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-bold font-outfit whitespace-nowrap"
                  >
                    {tab.label}
                  </motion.span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex-shrink-0 transition-colors ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-200/80 dark:bg-slate-700 text-gray-700 dark:text-slate-300"
                }`}>
                  {tab.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-800/70 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 dark:text-slate-500 text-sm" />
          <input 
            type="text"
            placeholder="Search by guest, property or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          />
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none cursor-pointer"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="amount-high">Sort by: Revenue High-Low</option>
          </select>
        </div>
      </div>

      {/* Table List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white dark:bg-slate-800/70 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm">
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl border border-red-100 dark:border-red-900/50 text-center font-bold">
          {error}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-slate-700/60 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-slate-900/60 rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-slate-500 text-2xl">
            <FaCalendarAlt />
          </div>
          <h3 className="text-xl font-bold font-outfit text-gray-800 dark:text-slate-100 mb-1">No bookings found</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm">No reservations match your current filters or search term.</p>
        </div>
      ) : (
        <>
          {/* Mobile Card List View (sm:hidden) */}
          <div className="sm:hidden space-y-4">
            {filteredBookings.map((b) => {
              const status = (b.status || "pending").toLowerCase();
              const start = new Date(b.checkIn);
              const end = new Date(b.checkOut);
              const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

              return (
                <div key={b._id} className="bg-white dark:bg-slate-800/70 rounded-2xl p-4 border border-gray-100 dark:border-slate-700/60 shadow-sm space-y-3">
                  {/* Top Row: Image, Title, Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={b.home?.imageUrl} 
                        alt={b.home?.title} 
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100 dark:border-slate-700 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-bold font-outfit text-gray-900 dark:text-white text-sm line-clamp-1">
                          {b.home?.title || "Property"}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt className="text-red-500" /> {b.home?.location || "India"}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 font-ubuntu mt-0.5">
                          ID: #{b._id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    {renderStatusBadge(b.status)}
                  </div>

                  {/* Guest & Payment Pill */}
                  <div className="bg-gray-50 dark:bg-slate-900/60 p-2.5 rounded-xl flex items-center justify-between text-xs font-ubuntu border border-gray-100 dark:border-slate-700/60">
                    <span className="font-bold text-gray-800 dark:text-slate-100">
                      Guest: {b.user?.name || b.user?.email?.split('@')[0] || "Guest"}
                    </span>
                    <span className="text-[10px] bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold border border-gray-100 dark:border-slate-700 uppercase">
                      {b.paymentMethod || "Cash"}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-ubuntu">
                    <div className="bg-gray-50 dark:bg-slate-900/60 p-2 rounded-xl border border-gray-100 dark:border-slate-700/60">
                      <p className="text-[9px] uppercase font-bold text-gray-400 dark:text-slate-500">Check-in</p>
                      <p className="font-bold text-gray-800 dark:text-slate-100">{start.toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-900/60 p-2 rounded-xl border border-gray-100 dark:border-slate-700/60">
                      <p className="text-[9px] uppercase font-bold text-gray-400 dark:text-slate-500">Check-out</p>
                      <p className="font-bold text-gray-800 dark:text-slate-100">{end.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Bottom Row: Amount & Actions */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-slate-700/60">
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Total Amount</p>
                      <p className="font-extrabold font-outfit text-sm text-gray-900 dark:text-white">
                        ₹ {b.totalPrice?.toLocaleString()} <span className="text-[10px] text-gray-400 dark:text-slate-500 font-normal">({nights} n)</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setIsDetailsOpen(true);
                        }}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      {status !== "confirmed" && status !== "confirm" && status !== "rejected" && status !== "reject" && status !== "cancelled" && status !== "cancel" && (
                        <button
                          onClick={() => handleUpdateStatus(b._id, "confirmed")}
                          className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}

                      {status !== "rejected" && status !== "reject" && status !== "cancelled" && status !== "cancel" && (
                        <button
                          onClick={() => {
                            setRejectBookingId(b._id);
                            setIsRejectModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View (hidden sm:block) */}
          <div className="hidden sm:block bg-white dark:bg-slate-800/70 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm">
            <div className="overflow-x-auto min-h-[300px] pb-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-slate-900/60 border-b border-gray-100 dark:border-slate-700/60 text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider font-ubuntu">
                  <th className="py-4 px-6">Property / Guest</th>
                  <th className="py-4 px-6">Check-in</th>
                  <th className="py-4 px-6">Check-out</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60 text-sm">
                {filteredBookings.map((b, index) => {
                  const status = (b.status || "pending").toLowerCase();
                  const start = new Date(b.checkIn);
                  const end = new Date(b.checkOut);
                  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
                  const isNearBottom = filteredBookings.length <= 2 || index >= filteredBookings.length - 2;

                  return (
                    <tr key={b._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      {/* Property & Guest */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={b.home?.imageUrl} 
                            alt={b.home?.title} 
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100 dark:border-slate-700"
                          />
                          <div>
                            <h4 className="font-bold font-outfit text-gray-900 dark:text-white text-base line-clamp-1">
                              {b.home?.title || "Property"}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
                              <FaMapMarkerAlt className="text-red-500" /> {b.home?.location || "India"}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 font-ubuntu">
                                ID: #{b._id.slice(-6).toUpperCase()}
                              </span>
                              <span className="text-[10px] bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 px-1.5 py-0.5 rounded font-bold">
                                {b.user?.name || b.user?.email?.split('@')[0] || "Guest"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Check In */}
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-800 dark:text-slate-100 text-xs">{start.toLocaleDateString()}</p>
                        <p className="text-[11px] text-gray-400 dark:text-slate-500">2:00 PM</p>
                      </td>

                      {/* Check Out */}
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-800 dark:text-slate-100 text-xs">{end.toLocaleDateString()}</p>
                        <p className="text-[11px] text-gray-400 dark:text-slate-500">11:00 AM</p>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6">
                        <p className="font-extrabold font-outfit text-gray-900 dark:text-white text-base">₹ {b.totalPrice?.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-400 dark:text-slate-500">{nights} {nights === 1 ? "night" : "nights"}</p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {renderStatusBadge(b.status)}
                      </td>

                      {/* Actions Dropdown */}
                      <td className="py-4 px-6 text-right relative">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setIsDetailsOpen(true);
                            }}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Details
                          </button>

                          <div className="relative">
                            <button 
                              onClick={() => setOpenMenuId(openMenuId === b._id ? null : b._id)}
                              className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                            >
                              <FaEllipsisV />
                            </button>

                            {openMenuId === b._id && (
                              <div className={`absolute right-0 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-2xl dark:shadow-black/60 border border-gray-100 dark:border-slate-700/80 py-1.5 z-50 text-left font-ubuntu text-xs animate-fade-in ${
                                isNearBottom ? 'bottom-full mb-1' : 'top-10'
                              }`}>
                                <button 
                                  onClick={() => {
                                    setSelectedBooking(b);
                                    setIsDetailsOpen(true);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold transition-colors"
                                >
                                  View Full Details
                                </button>
                                
                                {status !== "confirmed" && status !== "confirm" && status !== "rejected" && status !== "reject" && status !== "cancelled" && status !== "cancel" && (
                                  <button 
                                    onClick={() => handleUpdateStatus(b._id, "confirmed")}
                                    className="w-full px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold transition-colors"
                                  >
                                    Confirm Booking
                                  </button>
                                )}

                                {status !== "rejected" && status !== "reject" && status !== "cancelled" && status !== "cancel" && (
                                  <button 
                                    onClick={() => {
                                      setRejectBookingId(b._id);
                                      setIsRejectModalOpen(true);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-bold transition-colors"
                                  >
                                    Reject / Cancel
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
      )}

      {/* Booking Details Side Drawer Modal */}
      <AnimatePresence>
        {isDetailsOpen && selectedBooking && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md h-full relative z-10 shadow-2xl dark:shadow-black/70 overflow-y-auto flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-700/80 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">Booking Details</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-mono mt-0.5">Booking ID: #{selectedBooking._id.slice(-8).toUpperCase()}</p>
                </div>
                <button 
                  onClick={() => setIsDetailsOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-6 flex-1">
                {/* Status Indicator */}
                <div className="flex items-center justify-between">
                  {renderStatusBadge(selectedBooking.status)}
                  <span className="text-xs font-bold text-gray-500 dark:text-slate-400 font-ubuntu">
                    {selectedBooking.paymentMethod || "Cash"} Payment
                  </span>
                </div>

                {/* Property Card */}
                <div className="bg-gray-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/60 flex gap-4 items-center">
                  <img src={selectedBooking.home?.imageUrl} alt={selectedBooking.home?.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold font-outfit text-sm text-gray-900 dark:text-white">{selectedBooking.home?.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <FaMapMarkerAlt className="text-red-500" /> {selectedBooking.home?.location}
                    </p>
                  </div>
                </div>

                {/* Dates Split Box */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-800/70 p-3.5 rounded-2xl border border-gray-100 dark:border-slate-700/60">
                    <p className="text-[10px] font-bold uppercase text-gray-400 dark:text-slate-500 tracking-wider">Check-In</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1 font-outfit">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">2:00 PM</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/70 p-3.5 rounded-2xl border border-gray-100 dark:border-slate-700/60">
                    <p className="text-[10px] font-bold uppercase text-gray-400 dark:text-slate-500 tracking-wider">Check-Out</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1 font-outfit">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">11:00 AM</p>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 font-ubuntu">Guest Details</h4>
                  <div className="bg-gray-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-lg uppercase font-outfit">
                      {selectedBooking.user?.name?.charAt(0) || "G"}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gray-900 dark:text-white">{selectedBooking.user?.name || "Guest User"}</h5>
                      <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <FaEnvelope className="text-gray-400 dark:text-slate-500" /> {selectedBooking.user?.email || "guest@example.com"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <FaPhoneAlt className="text-gray-400 dark:text-slate-500" /> +1 234 567 8900
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 font-ubuntu">Booking Summary</h4>
                  <div className="bg-white dark:bg-slate-800/70 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/60 space-y-2 text-xs">
                    <div className="flex justify-between text-gray-600 dark:text-slate-300">
                      <span>Rate per night</span>
                      <span className="font-semibold text-gray-800 dark:text-slate-100">₹ {selectedBooking.home?.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 dark:text-white font-bold pt-2 border-t border-gray-100 dark:border-slate-700/60 font-outfit text-sm">
                      <span>Total Amount</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 text-base">
                        ₹ {selectedBooking.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-gray-100 dark:border-slate-700/80 bg-gray-50/60 dark:bg-slate-950/60 space-y-3 sticky bottom-0">
                {(selectedBooking.status || "pending").toLowerCase() !== "rejected" && (selectedBooking.status || "").toLowerCase() !== "cancelled" && (
                  <button
                    onClick={() => {
                      setRejectBookingId(selectedBooking._id);
                      setIsRejectModalOpen(true);
                    }}
                    className="w-full border-2 border-red-500 dark:border-red-500/80 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold py-3 rounded-xl transition-colors text-sm cursor-pointer"
                  >
                    Reject Booking
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reject / Cancel Confirmation Modal */}
      <DangerModal
        isOpen={isRejectModalOpen}
        onClose={() => {
          if (!isUpdatingStatus) {
            setIsRejectModalOpen(false);
            setRejectBookingId(null);
          }
        }}
        onConfirm={() => handleUpdateStatus(rejectBookingId, "rejected")}
        title="Reject Booking?"
        desc="Are you sure you want to reject this booking reservation? The guest will be notified."
        confirmText="Yes, Reject Booking"
        cancelText="Keep Reservation"
        isLoading={isUpdatingStatus}
      />
    </div>
  );
};

export default ManageBookings;
