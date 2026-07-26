import { FaBell, FaChevronDown, FaSignOutAlt, FaHome, FaList, FaUser, FaCog, FaBars, FaTimes, FaCalendarAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LoadingModal from "../../public/common/LoadingModal";
import ProfileModal from "./ProfileModal";
import SettingsModal from "./SettingsModal";

const GuestTopbar = () => {
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFabStashed, setIsFabStashed] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto stash FAB on scroll down, reveal ONLY when scrolled back to top
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 30) {
        // Scrolled to top -> Reveal menu
        setIsFabStashed(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN -> Auto stash to right edge
        setIsFabStashed(true);
        setIsMobileMenuOpen(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayName = user?.email
    ? user.name || user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)
    : "Guest";

  return (
    <>
      <nav className="w-full bg-white dark:bg-[#090d16]/95 border-b border-gray-100 dark:border-slate-800/80 shadow-sm dark:shadow-black/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
          
          {/* Left: Logo */}
          <Link to="/guest/home" viewTransition className="flex items-center gap-2 font-bold group">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <FaHome size={14} />
            </div>
            <span className="font-outfit text-xl text-gray-900 dark:text-white tracking-tight hidden sm:block">
              Rentora
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="hidden md:flex items-center gap-6 text-sm font-bold font-ubuntu mr-4">
              <li>
                <NavLink 
                  to="/guest/home" 
                  viewTransition
                  className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-100 transition"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/guest/categories" 
                  viewTransition
                  className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-100 transition"}
                >
                  All Listings
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/guest/bookings" 
                  viewTransition
                  className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500" : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-100 transition"}
                >
                  My Bookings
                </NavLink>
              </li>
            </ul>
            
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>

            <div className="relative cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-600 dark:text-slate-300">
              <FaBell className="text-lg" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-red-600 to-orange-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-2.5 cursor-pointer p-1 pr-2 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user?.dp || user?.avatar || user?.profileUrl || user?.imageUrl ? (
                  <img 
                    src={user.dp || user.avatar || user.profileUrl || user.imageUrl} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-sm font-outfit uppercase border-2 border-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-bold text-gray-800 dark:text-slate-100 font-ubuntu hidden sm:flex items-center gap-1">
                  {displayName}
                  <FaChevronDown className={`text-[10px] text-gray-400 dark:text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </span>
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/60 border border-gray-100 dark:border-slate-700/80 overflow-hidden py-2 animate-fade-in z-50">
                  <button 
                    onClick={() => { setIsDropdownOpen(false); setIsProfileModalOpen(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => { setIsDropdownOpen(false); setIsSettingsModalOpen(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Settings
                  </button>
                  <div className="h-px bg-gray-100 dark:bg-slate-700/80 my-1"></div>
                  <button 
                    onClick={() => { setIsDropdownOpen(false); logout(); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    Logout <FaSignOutAlt />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        user={user} 
      />
      
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
      />

      {/* Mobile FAB Menu */}
      <div className="md:hidden">
        {/* Menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* The FAB Menu Items */}
        {isMobileMenuOpen && (
          <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-[60] items-end animate-fade-in font-ubuntu">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); navigate("/guest/home"); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-full shadow-xl border border-gray-100 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Home <FaHome className="text-lg text-red-500" />
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); navigate("/guest/categories"); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-full shadow-xl border border-gray-100 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              All Listings <FaList className="text-lg text-red-500" />
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); navigate("/guest/bookings"); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-full shadow-xl border border-gray-100 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              My Bookings <FaCalendarAlt className="text-lg text-red-500" />
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsProfileModalOpen(true); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-full shadow-xl border border-gray-100 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Profile <FaUser className="text-lg text-red-500" />
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsSettingsModalOpen(true); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-full shadow-xl border border-gray-100 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Settings <FaCog className="text-lg text-red-500" />
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); logout(); }}
              className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 px-5 py-3 rounded-full shadow-xl border border-red-100 dark:border-red-900/40 text-sm font-bold text-red-600 dark:text-red-400 transition-colors cursor-pointer"
            >
              Logout <FaSignOutAlt className="text-lg" />
            </button>
          </div>
        )}

        {/* Stashable Floating Action Container */}
        <div className="fixed bottom-6 right-0 z-[60] select-none">
          <AnimatePresence mode="wait" initial={false}>
            {isFabStashed ? (
              /* Stashed State: ONLY small arrow semi-circle tab bulging from right edge */
              <motion.button
                key="stashed-arrow-tab"
                initial={{ x: 50, opacity: 0, scale: 0.85 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 50, opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 280, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFabStashed(false);
                }}
                title="Show menu button"
                className="w-7 h-10 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-l-full flex items-center justify-center shadow-lg border-l border-y border-white/40 cursor-pointer hover:w-8 transition-all active:scale-95"
              >
                <FaChevronLeft className="text-xs" />
              </motion.button>
            ) : (
              /* Visible State: Full fused oval capsule bar */
              <motion.div
                key="fused-capsule-bar"
                initial={{ x: 70, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 70, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="-translate-x-6 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full shadow-2xl shadow-red-200/50 p-1 flex items-center gap-1.5 border border-white/30 backdrop-blur-md"
              >
                {/* Arrow Button to Stash */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFabStashed(true);
                    setIsMobileMenuOpen(false);
                  }}
                  title="Hide menu to edge"
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                >
                  <FaChevronRight className="text-[11px]" />
                </button>

                {/* Main 3-Line Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isMobileMenuOpen 
                      ? 'bg-white text-gray-900 shadow-md rotate-90 scale-95' 
                      : 'text-white hover:bg-white/10 active:scale-95'
                  }`}
                >
                  {isMobileMenuOpen ? <FaTimes size={18} className="-rotate-90 text-gray-900" /> : <FaBars size={18} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <LoadingModal isOpen={isLoading} text="Logging you out..." />
    </>
  );
};

export default GuestTopbar;
