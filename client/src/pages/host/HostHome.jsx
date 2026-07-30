import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome, FaMapMarkerAlt, FaEdit, FaTrash, FaPlusSquare,
  FaBed, FaUserFriends, FaCalendarCheck, FaRupeeSign,
  FaSearch, FaChevronLeft, FaChevronRight,
} from "react-icons/fa";
import houseIllustration from "../../assets/house_illustration.png";
import { motion, AnimatePresence } from "motion/react";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect, useCallback } from "react";
import ConfirmDeleteModal from "../../components/public/common/ConfirmDeleteModal";
import SuccessModal from "../../components/public/common/SuccessModal";

// ─── Skeleton ────────────────────────────────────────────────────────────────
const SkeletonBlock = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-slate-700/60 rounded-xl animate-pulse ${className}`} />
);

const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col">
    <SkeletonBlock className="h-48 w-full rounded-none" />
    <div className="p-4 space-y-3 flex-1">
      <SkeletonBlock className="h-4 w-3/4" />
      <SkeletonBlock className="h-3 w-full" />
      <div className="flex gap-2">
        <SkeletonBlock className="h-5 w-20 rounded-lg" />
        <SkeletonBlock className="h-5 w-20 rounded-lg" />
      </div>
      <SkeletonBlock className="h-5 w-24" />
    </div>
    <div className="flex gap-2 px-4 pb-4">
      <SkeletonBlock className="h-9 flex-1 rounded-xl" />
      <SkeletonBlock className="h-9 flex-1 rounded-xl" />
    </div>
  </div>
);

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, onClick, color }) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center gap-3 w-full bg-white dark:bg-[#0e1422] rounded-2xl px-5 py-4 border border-gray-100 dark:border-slate-800/80 shadow-sm hover:shadow-md dark:hover:shadow-black/40 transition-all duration-200 cursor-pointer text-left"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
      color === "red"   ? "bg-gradient-to-br from-rose-500   to-orange-400" :
      color === "green" ? "bg-gradient-to-br from-emerald-500 to-teal-400"  :
                          "bg-gradient-to-br from-slate-500   to-slate-600 dark:from-slate-600 dark:to-slate-700"
    }`}>
      <Icon className="text-sm" />
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">{label}</p>
      <p className="text-base font-extrabold font-outfit text-gray-900 dark:text-white leading-tight">{value}</p>
    </div>
  </motion.button>
);

// ─── Host Property Card ──────────────────────────────────────────────────────
const HostPropertyCard = ({ home, index, handleEdit, setItemToDelete, bookings }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const images =
    home.imageUrls && home.imageUrls.length > 0
      ? home.imageUrls
      : [home.imageUrl].filter(Boolean);

  const goPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length <= 1) return;
    setDirection(-1);
    setCurrentIdx((p) => (p - 1 + images.length) % images.length);
  };

  const goNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length <= 1) return;
    setDirection(1);
    setCurrentIdx((p) => (p + 1) % images.length);
  };

  const homeBookings   = bookings.filter((b) => (b.home?._id || b.home) === home._id);
  const confirmedCount = homeBookings.filter((b) => b.status === "confirmed").length;
  const pendingCount   = homeBookings.filter((b) => b.status === "pending").length;

  const slideVariants = {
    enter:  (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center:      ({ x: 0, opacity: 1 }),
    exit:   (d) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white dark:bg-[#0e1422] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800/80 shadow-sm hover:shadow-lg dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* ── Image / Carousel ── */}
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-[#090d16]">

        {/* Dark gradient on hover for overlaid price */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/95 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-gray-100/40 dark:border-white/5">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            pendingCount > 0 ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
          }`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 dark:text-slate-200">
            {pendingCount > 0
              ? `${pendingCount} Pending`
              : confirmedCount > 0
              ? `${confirmedCount} Booked`
              : "Listed"}
          </span>
        </div>

        {/* Price badge – appears on hover */}
        <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <span className="text-xs font-extrabold text-white bg-black/55 backdrop-blur-sm px-3 py-1 rounded-full shadow">
            ₹{home.price?.toLocaleString()} / night
          </span>
        </div>

        {/* Carousel arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/95 dark:bg-slate-900/90 text-gray-800 dark:text-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
            >
              <FaChevronLeft className="text-[9px]" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/95 dark:bg-slate-900/90 text-gray-800 dark:text-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
            >
              <FaChevronRight className="text-[9px]" />
            </button>
          </>
        )}

        {/* Dot indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-20 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-200 ${
                  i === currentIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Sliding image */}
        <NavLink viewTransition to={`/host/homes/${home._id}`} className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentIdx}
              src={images[currentIdx]}
              alt={home.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 280, damping: 28 }, opacity: { duration: 0.15 } }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </NavLink>
      </div>

      {/* ── Card Body ── */}
      <NavLink viewTransition to={`/host/homes/${home._id}`} className="flex-1 flex flex-col">
        <div className="p-4 flex flex-col gap-2.5 flex-1">
          {/* Title */}
          <div>
            <h2 className="font-bold font-outfit text-sm text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {home.title}
            </h2>
            <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5 truncate">
              {home.description || "No description"}
            </p>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-1.5">
            {home.location && (
              <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700/60 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                <FaMapMarkerAlt className="text-[8px] text-gray-400" /> {home.location}
              </span>
            )}
            {home.bedrooms && (
              <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700/60 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                <FaBed className="text-[8px] text-gray-400" /> {home.bedrooms} Bed
              </span>
            )}
            {home.guestNumbers && (
              <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700/60 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                <FaUserFriends className="text-[8px] text-gray-400" /> {home.guestNumbers} Guests
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mt-auto">
            <span className="text-base font-extrabold font-outfit text-gray-900 dark:text-white">
              ₹{home.price?.toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-slate-500">/ night</span>
          </div>
        </div>
      </NavLink>

      {/* ── Action Buttons ── */}
      <div className="flex gap-2 px-4 pb-4 pt-0">
        <button
          onClick={() => handleEdit(home._id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-gray-900 dark:hover:border-white transition-all duration-200 cursor-pointer"
        >
          <FaEdit size={10} /> Edit
        </button>
        <button
          onClick={() => setItemToDelete(home._id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:hover:bg-rose-700 dark:hover:border-rose-700 transition-all duration-200 cursor-pointer"
        >
          <FaTrash size={10} /> Delete
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
const HostHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name || user?.email?.split("@")[0] || "Host";

  const [homes,    setHomes]    = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [itemToDelete,        setItemToDelete]        = useState(null);
  const [isSuccessModalOpen,  setIsSuccessModalOpen]  = useState(false);

  // Search / Filter / Sort
  const [searchQuery,      setSearchQuery]      = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder,        setSortOrder]        = useState("default");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [homesRes, bookingsRes] = await Promise.all([
        fetch("/api/homes/my",       { credentials: "include" }),
        fetch("/api/bookings/host",  { credentials: "include" }),
      ]);
      if (!homesRes.ok) throw new Error("Failed to fetch listings");
      setHomes(await homesRes.json());
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleEdit   = (id) => navigate(`/host/edit/${id}`);
  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/homes/${itemToDelete}`, {
        method: "DELETE", credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete home");
      setItemToDelete(null);
      setIsSuccessModalOpen(true);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const pendingBookings   = bookings.filter((b) => b.status === "pending");
  const totalEarnings     = confirmedBookings.reduce((s, b) => s + (b.totalPrice || 0), 0);

  const CATEGORIES = ["All", "Beachfront", "Apartment", "Villa", "Cabin", "Farmhouse"];

  const displayed = homes
    .filter((h) => {
      const q = searchQuery.toLowerCase();
      return (
        (h.title?.toLowerCase().includes(q) || h.location?.toLowerCase().includes(q)) &&
        (selectedCategory === "All" || h.category === selectedCategory)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc")  return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      if (sortOrder === "name-asc")   return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 space-y-7">

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white dark:bg-[#0e1422] rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-sm overflow-hidden p-7 sm:p-9 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-0 min-h-[190px]"
      >
        {/* subtle ambient glows */}
        <div className="absolute -top-12 -left-12 w-52 h-52 bg-red-500/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-orange-400/[0.05] rounded-full blur-2xl pointer-events-none" />

        {/* text */}
        <div className="flex-1 text-center md:text-left space-y-3 relative z-10 md:pr-56 lg:pr-72">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
            Host Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white leading-tight">
            Welcome back,&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              {displayName}
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md leading-relaxed">
            Manage your listings, track bookings, and grow your rental business.
          </p>
          <div className="flex flex-wrap gap-3 pt-1 justify-center md:justify-start">
            <NavLink
              to="/host/add"
              viewTransition
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-red-300/30 dark:shadow-red-900/30 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              <FaPlusSquare className="text-xs" /> Add New Listing
            </NavLink>
            <button
              onClick={() => navigate("/host/bookings")}
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            >
              <FaCalendarCheck className="text-xs" /> Manage Bookings
            </button>
          </div>
        </div>

        {/* illustration */}
        <div className="w-36 sm:w-44 md:w-52 lg:w-60 flex-shrink-0 select-none relative z-10 md:absolute md:right-6 md:-bottom-4">
          <img
            src={houseIllustration}
            alt="Property illustration"
            className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
      </motion.div>

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <StatCard icon={FaHome}          label="Total Listings"  value={homes.length}                                    color="red"   />
          <StatCard icon={FaRupeeSign}     label="Total Earnings"  value={`₹${totalEarnings.toLocaleString()}`}             color="green" />
          <StatCard icon={FaCalendarCheck} label="Pending Requests" value={`${pendingBookings.length} Pending`} onClick={() => navigate("/host/bookings")} color="slate" />
        </motion.div>
      )}

      {/* ── Search / Filter / Sort bar ───────────────────────────────────── */}
      {!loading && homes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="bg-white dark:bg-[#0e1422] border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3"
        >
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700/60 rounded-xl px-3 py-2.5 w-full md:w-64">
            <FaSearch className="text-gray-400 dark:text-slate-500 text-xs flex-shrink-0" />
            <input
              type="text"
              placeholder="Search title or location…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium text-gray-800 dark:text-slate-100 bg-transparent placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto flex-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40"
                    : "bg-white dark:bg-slate-800/30 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-xs font-bold text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700/60 rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none w-full md:w-auto"
          >
            <option value="default">Default order</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">A → Z</option>
          </select>
        </motion.div>
      )}

      {/* ── Listings grid ────────────────────────────────────────────────── */}
      <div>
        {/* header */}
        {!loading && homes.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-extrabold font-outfit text-gray-900 dark:text-white">Your Listings</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full border bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700/60 text-gray-500 dark:text-slate-400">
                {displayed.length} / {homes.length}
              </span>
            </div>
            <NavLink
              to="/host/add"
              viewTransition
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-orange-500 transition-colors cursor-pointer"
            >
              <FaPlusSquare /> Add more
            </NavLink>
          </div>
        )}

        {/* grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white dark:bg-[#0e1422] rounded-2xl border border-gray-100 dark:border-slate-800/80"
          >
            <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center mx-auto mb-4">
              <FaHome className="text-gray-400 dark:text-slate-500 text-xl" />
            </div>
            <h3 className="font-extrabold font-outfit text-gray-800 dark:text-white text-lg mb-1">No listings found</h3>
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-5 max-w-xs mx-auto">
              {searchQuery || selectedCategory !== "All"
                ? "Try clearing your search or filters."
                : "Start hosting by adding your first property."}
            </p>
            {(searchQuery || selectedCategory !== "All") ? (
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                Clear filters
              </button>
            ) : (
              <NavLink
                to="/host/add"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <FaPlusSquare /> Add First Listing
              </NavLink>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((home, i) => (
              <HostPropertyCard
                key={home._id}
                home={home}
                index={i}
                handleEdit={handleEdit}
                setItemToDelete={setItemToDelete}
                bookings={bookings}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      <ConfirmDeleteModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message="Are you sure you want to permanently delete this listing? All associated bookings and reviews will also be removed."
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
  const res = await fetch("/api/homes", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Internal Server Error");
  return res.json();
};
