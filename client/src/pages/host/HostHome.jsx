import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaEdit, FaTrash, FaPlusSquare, FaBed, FaUserFriends, FaChartBar, FaCalendarCheck } from "react-icons/fa";
import houseIllustration from "../../assets/house_illustration.png";
import { motion, AnimatePresence } from "motion/react";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect, useCallback } from "react";
import ConfirmDeleteModal from "../../components/public/common/ConfirmDeleteModal";
import SuccessModal from "../../components/public/common/SuccessModal";

// --- Skeleton ---
const SkeletonBlock = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-slate-700/80 rounded-xl animate-pulse ${className}`} />
);

const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col">
    <SkeletonBlock className="h-52 w-full rounded-none" />
    <div className="p-5 space-y-3 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-4 w-3/4" />
          <SkeletonBlock className="h-3 w-full" />
        </div>
        <SkeletonBlock className="h-6 w-16 rounded-full flex-shrink-0" />
      </div>
      <div className="flex gap-2">
        <SkeletonBlock className="h-6 w-20 rounded-lg" />
        <SkeletonBlock className="h-6 w-20 rounded-lg" />
      </div>
      <SkeletonBlock className="h-5 w-24" />
    </div>
    <div className="flex gap-3 px-5 pb-5 pt-1">
      <SkeletonBlock className="h-9 flex-1 rounded-xl" />
      <SkeletonBlock className="h-9 flex-1 rounded-xl" />
    </div>
  </div>
);

// --- Stat Pill ---
const StatPill = ({ icon: Icon, label, value, onClick, accent }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 bg-white dark:bg-slate-800/70 border ${accent === "red" ? "border-red-100 dark:border-red-900/30" : "border-gray-100 dark:border-slate-700/60"} rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200 cursor-pointer`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${accent === "red" ? "bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-sm shadow-red-200/50 dark:shadow-red-900/30" : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300"}`}>
      <Icon className="text-sm" />
    </div>
    <div className="text-left">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 font-ubuntu">{label}</p>
      <p className={`text-lg font-extrabold font-outfit leading-tight ${accent === "red" ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-800 dark:text-white"}`}>{value}</p>
    </div>
  </motion.button>
);

// --- Main Component ---
const HostHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name || user?.email?.split("@")[0] || "Host";

  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const fetchHomes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes/my`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setHomes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomes();
  }, [fetchHomes]);

  const handleEdit = (id) => navigate(`/host/edit/${id}`);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/homes/${itemToDelete}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to delete home");
      setItemToDelete(null);
      setIsSuccessModalOpen(true);
      fetchHomes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 space-y-8">

      {/* ── Hero Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-slate-800/70 rounded-3xl p-7 sm:p-9 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-center overflow-hidden relative min-h-[180px] md:min-h-[220px]"
      >
        {/* Subtle gradient ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-gradient-to-br from-red-500/8 to-orange-400/6 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 left-1/3 w-36 h-36 bg-gradient-to-tr from-orange-400/6 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-3 md:pr-52 lg:pr-72 relative z-10">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-red-600 to-orange-500 rounded-full" />
            <span className="text-[10px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
              Host Dashboard
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight leading-tight">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              {displayName}
            </span>
          </h1>

          <p className="text-gray-500 dark:text-slate-400 font-medium text-sm max-w-sm md:max-w-md leading-relaxed">
            Manage your listings, track bookings, and grow your rental business.
          </p>

          <div className="flex flex-wrap gap-3 pt-1 justify-center md:justify-start">
            <NavLink
              to="/host/add"
              viewTransition
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-red-200/40 dark:shadow-red-900/30 cursor-pointer hover:-translate-y-0.5 active:scale-95"
            >
              <FaPlusSquare className="text-xs" /> Add New Listing
            </NavLink>
            <button
              onClick={() => navigate("/host/bookings")}
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-700/80 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
            >
              <FaCalendarCheck className="text-xs" /> Manage Bookings
            </button>
          </div>
        </div>

        <div className="w-36 sm:w-44 md:w-52 lg:w-60 xl:w-68 flex-shrink-0 md:absolute md:right-6 md:-bottom-4 lg:-bottom-6 select-none mt-6 md:mt-0 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/10 rounded-full filter blur-2xl transform scale-110" />
            <img
              src={houseIllustration}
              alt="Property illustration"
              className="w-full h-auto object-contain drop-shadow-lg hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Quick Stats Row ── */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
          >
            <StatPill
              icon={FaHome}
              label="Total Listings"
              value={homes.length}
              accent="red"
            />
            <StatPill
              icon={FaChartBar}
              label="Avg. Price"
              value={homes.length ? `₹${Math.round(homes.reduce((s, h) => s + (h.price || 0), 0) / homes.length).toLocaleString()}` : "—"}
              onClick={() => {}}
            />
            <StatPill
              icon={FaCalendarCheck}
              label="Bookings"
              value="View →"
              onClick={() => navigate("/host/bookings")}
              accent=""
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Listings Section ── */}
      <div>
        {/* Section header */}
        {!loading && homes.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
                Your Listings
              </h2>
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 text-red-600 dark:text-orange-400 text-xs font-bold rounded-full border border-red-100 dark:border-red-900/40 font-ubuntu">
                {homes.length} {homes.length === 1 ? "Property" : "Properties"}
              </span>
            </div>
            <NavLink
              to="/host/add"
              viewTransition
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              <FaPlusSquare /> Add more
            </NavLink>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : homes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-800/60 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700/60"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <FaHome className="text-red-400 dark:text-red-500 text-3xl" />
            </div>
            <h3 className="font-extrabold text-gray-800 dark:text-slate-100 font-outfit text-2xl mb-2">No listings yet</h3>
            <p className="text-gray-400 dark:text-slate-500 text-sm mb-7 max-w-xs mx-auto">
              Start hosting by adding your first property to Rentora.
            </p>
            <NavLink
              to="/host/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-red-200/40 dark:shadow-red-900/30 hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
            >
              <FaPlusSquare /> Add Your First Listing
            </NavLink>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {homes.map((home, index) => (
              <motion.div
                key={home._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white dark:bg-slate-800/70 rounded-2xl overflow-hidden border border-gray-100/80 dark:border-slate-700/50 hover:border-red-100 dark:hover:border-slate-600 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <NavLink viewTransition to={`/host/homes/${home._id}`} className="block flex-shrink-0">
                  <div className="h-52 w-full overflow-hidden relative">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* Listed badge */}
                    <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-20">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-gray-700 dark:text-slate-200 uppercase tracking-wider font-ubuntu">
                        Listed
                      </span>
                    </div>

                    {/* Price overlay on hover */}
                    <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <span className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm text-red-600 dark:text-orange-400 font-extrabold text-sm font-outfit px-3 py-1 rounded-full shadow-sm">
                        ₹{home.price?.toLocaleString()} / night
                      </span>
                    </div>

                    <img
                      src={home.imageUrl}
                      alt={home.title}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />
                  </div>
                </NavLink>

                {/* Card Body */}
                <NavLink viewTransition to={`/host/homes/${home._id}`} className="flex-1 flex flex-col">
                  <div className="p-5 flex-1 space-y-3">
                    {/* Title + Location */}
                    <div>
                      <h2 className="font-bold font-outfit text-[15px] text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {home.title}
                      </h2>
                      <p className="text-xs text-gray-400 dark:text-slate-500 font-medium truncate mt-0.5">
                        {home.description || "No description"}
                      </p>
                    </div>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2">
                      {home.location && (
                        <span className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg text-[11px] font-bold font-ubuntu">
                          <FaMapMarkerAlt className="text-[9px]" /> {home.location}
                        </span>
                      )}
                      {home.bedrooms && (
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700/60 text-gray-600 dark:text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-bold font-ubuntu">
                          <FaBed className="text-[9px]" /> {home.bedrooms} bed
                        </span>
                      )}
                      {home.guestNumbers && (
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700/60 text-gray-600 dark:text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-bold font-ubuntu">
                          <FaUserFriends className="text-[9px]" /> {home.guestNumbers} guests
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-red-600 dark:text-orange-400 font-extrabold text-xl font-outfit">
                        ₹{home.price?.toLocaleString()}
                      </span>
                      <span className="text-xs font-medium text-gray-400 dark:text-slate-500 font-inter">/ night</span>
                    </div>
                  </div>
                </NavLink>

                {/* Action Buttons */}
                <div className="flex gap-2.5 px-5 pb-5 pt-0">
                  <button
                    onClick={() => handleEdit(home._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl bg-gray-50 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600/80 text-gray-600 dark:text-slate-300 hover:bg-gray-900 dark:hover:bg-slate-700 hover:text-white dark:hover:text-white hover:border-gray-900 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer"
                  >
                    <FaEdit size={11} /> Edit
                  </button>
                  <button
                    onClick={() => setItemToDelete(home._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-700 hover:text-white hover:border-red-600 dark:hover:border-red-700 transition-all duration-200 cursor-pointer"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message="Are you sure you want to permanently delete this listing? All associated bookings and reviews will be lost."
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Listing Deleted"
        desc="The listing has been permanently removed from your dashboard."
      />
    </div>
  );
};

export default HostHome;

export const getHostHomes = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Internal Server Error");
  return res.json();
};
