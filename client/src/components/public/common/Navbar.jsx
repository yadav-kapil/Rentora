import { useState, useEffect, useRef } from "react";
import { 
  FaHome, 
  FaBars, 
  FaTimes, 
  FaSignOutAlt, 
  FaPlusSquare, 
  FaUser, 
  FaFolder,
  FaPlus,
  FaList,
  FaInfoCircle,
  FaSun,
  FaMoon
} from "react-icons/fa";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useLogout } from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import { useTheme } from "../../../context/ThemeContext";
import LoadingModal from "./LoadingModal";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [showLabel, setShowLabel] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    toggleTheme();
    setShowLabel(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-9 h-9 flex-shrink-0">
      <motion.button
        layout
        onClick={handleClick}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{ right: 0 }}
        className={`absolute top-0 h-9 m-0 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border shadow-sm group select-none ${
          showLabel ? "px-3" : "w-9 p-0"
        } ${
          isDark
            ? "bg-[#141b2d] border-slate-700/80 text-amber-400 shadow-black/60 hover:border-amber-400/50 hover:shadow-amber-400/15"
            : "bg-amber-50/90 border-amber-200/80 text-amber-500 shadow-amber-200/50 hover:border-amber-300 hover:bg-amber-100/80"
        }`}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle theme"
      >
        {/* Ambient background glow ring */}
        <span
          className={`absolute inset-0 rounded-full transition-opacity duration-300 blur-sm pointer-events-none ${
            isDark ? "bg-amber-400/10 opacity-100" : "bg-amber-500/15 opacity-100"
          }`}
        />

        <div className="relative z-10 flex items-center justify-center gap-1.5 h-full">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -180, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center justify-center flex-shrink-0"
              >
                <FaMoon className="text-amber-400 text-sm flex-shrink-0 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 180, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -180, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center justify-center flex-shrink-0"
              >
                <FaSun className="text-amber-500 text-sm flex-shrink-0 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showLabel && (
              <motion.span
                initial={{ width: 0, opacity: 0, x: -4 }}
                animate={{ width: "auto", opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -4 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap text-xs font-bold font-outfit tracking-wide flex-shrink-0"
              >
                {isDark ? "Dark" : "Light"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};

const Navbar = () => {
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin, user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Scroll behavior state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 25);

      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide navbar on scroll down
      } else {
        setIsVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isHost = isLoggedin && user?.role === "Host";

  return (
    <>
      {/* Top Navbar */}
      <nav 
        className={`w-full bg-white/80 dark:bg-[#090d16]/85 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-sm dark:shadow-black/70 dark:border-b dark:border-slate-800/80 ${
          isVisible ? "translate-y-0" : "-translate-y-[150%] md:translate-y-0"
        } ${
          "md:w-full md:bg-white/80 md:dark:bg-[#090d16]/85 md:shadow-sm md:rounded-none md:my-0 md:mx-0 " +
          "max-md:fixed max-md:top-3 max-md:left-4 max-md:right-4 max-md:w-[calc(100%-2rem)] max-md:rounded-2xl max-md:shadow-lg max-md:bg-white max-md:dark:bg-[#090d16]/95 max-md:border max-md:border-gray-100 max-md:dark:border-slate-800/80"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <Link to="/" viewTransition className="flex gap-2.5 items-center font-bold select-none group">
            <FaHome className="text-red-600 text-2xl group-hover:scale-105 transition-transform duration-200" />
            <span className="font-outfit text-xl text-gray-900 dark:text-white tracking-tight">
              Rentora
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium font-ubuntu">
            <li>
              <NavLink
                to="/"
                viewTransition
                className={({ isActive }) => 
                  `hover:text-red-500 dark:hover:text-red-400 transition-colors py-1.5 relative font-semibold ${
                    isActive 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-100" 
                      : "text-gray-500 dark:text-gray-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                 to="/categories"
                viewTransition
                className={({ isActive }) => 
                  `hover:text-red-500 dark:hover:text-red-400 transition-colors py-1.5 relative font-semibold ${
                    isActive 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-100" 
                      : "text-gray-500 dark:text-gray-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                  }`
                }
              >
                All Listings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                viewTransition
                className={({ isActive }) => 
                  `hover:text-red-500 dark:hover:text-red-400 transition-colors py-1.5 relative font-semibold ${
                    isActive 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-100" 
                      : "text-gray-500 dark:text-gray-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                  }`
                }
              >
                About Us
              </NavLink>
            </li>

            {isHost && (
              <>
                <li>
                  <NavLink
                    to="/host/homes"
                    viewTransition
                    className={({ isActive }) => 
                      `hover:text-red-500 dark:hover:text-red-400 transition-colors py-1.5 relative font-semibold ${
                        isActive 
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-100" 
                          : "text-gray-500 dark:text-gray-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                      }`
                    }
                  >
                    Host Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/host/add"
                    viewTransition
                    className={({ isActive }) => 
                      `hover:text-red-500 dark:hover:text-red-400 transition-colors py-1.5 relative font-semibold ${
                        isActive 
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-100" 
                          : "text-gray-500 dark:text-gray-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-red-600 to-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                      }`
                    }
                  >
                    Add Home
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Desktop Theme Toggle Button */}
            <ThemeToggle />

            {!isLoggedin ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="text-gray-600 dark:text-slate-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 font-outfit text-sm font-semibold transition-colors cursor-pointer px-2"
                >
                  Host a Home
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-5 py-2 cursor-pointer rounded-xl font-outfit text-sm font-semibold transition-colors shadow-sm"
                >
                  Login
                </button>
              </div>
            ) : (
              <button
                onClick={() => logout()}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-5 py-2 cursor-pointer rounded-xl font-outfit text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 animate-fade-in"
              >
                <FaSignOutAlt size={13} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Theme Toggle Button */}
            <ThemeToggle />

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-700 dark:text-gray-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 focus:outline-none p-1.5 cursor-pointer rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <FaBars className="text-lg" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isDrawerOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
      >
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div 
          className={`absolute top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#0c101c] border-r dark:border-slate-800/80 flex flex-col shadow-2xl transition-transform duration-300 ease-out transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex-1">
            <div className="p-6 bg-gray-50 dark:bg-[#121827] flex items-center justify-between relative border-b dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-outfit font-bold text-xl">
                <span className="text-red-600"><FaHome /></span> Rentora
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-full text-gray-450 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700 hover:text-gray-650 dark:hover:text-white transition cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              <NavLink
                to="/"
                viewTransition
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                <FaHome className="text-lg" />
                Home
              </NavLink>
              <NavLink
                to="/categories"
                viewTransition
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                <FaList className="text-lg" />
                All Listings
              </NavLink>
              <NavLink
                to="/about"
                viewTransition
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                <FaInfoCircle className="text-lg" />
                About Us
              </NavLink>

              {isHost && (
                <>
                  <NavLink
                    to="/host/homes"
                    viewTransition
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }`
                    }
                  >
                    <FaFolder className="text-lg" />
                    Host Panel
                  </NavLink>
                  <NavLink
                    to="/host/add"
                    viewTransition
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }`
                    }
                  >
                    <FaPlusSquare className="text-lg" />
                    Add Home
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-50 dark:border-gray-800 space-y-2 mt-auto">
            {isLoggedin ? (
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 py-3 rounded-xl text-sm font-bold transition cursor-pointer shadow-sm"
              >
                <FaSignOutAlt className="text-base" />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate("/signup");
                  }}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl text-sm font-bold transition cursor-pointer shadow-sm text-center block"
                >
                  Host a Home
                </button>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate("/login");
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white py-3 rounded-xl text-sm font-bold transition cursor-pointer shadow-sm text-center block"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-45 bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-2.5 px-6 flex justify-around items-center md:hidden transition-all duration-300 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] dark:shadow-black/40 ${
          isScrolled ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <NavLink 
          to="/" 
          viewTransition
          className={({ isActive }) => 
            `flex flex-col items-center gap-1.5 transition ${
              isActive ? "text-red-600 dark:text-red-400 scale-105" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            }`
          }
        >
          <FaHome size={20} />
          <span className="text-[10px] font-bold font-ubuntu">Home</span>
        </NavLink>

        <NavLink 
          to="/categories" 
          viewTransition
          className={({ isActive }) => 
            `flex flex-col items-center gap-1.5 transition ${
              isActive ? "text-red-600 dark:text-red-400 scale-105" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            }`
          }
        >
          <FaList size={20} />
          <span className="text-[10px] font-bold font-ubuntu">All Listings</span>
        </NavLink>

        {isHost && (
          <NavLink 
            to="/host/homes" 
            viewTransition
            className={({ isActive }) => 
              `flex flex-col items-center gap-1.5 transition ${
                isActive ? "text-red-600 dark:text-red-400 scale-105" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`
            }
          >
            <FaFolder size={20} />
            <span className="text-[10px] font-bold font-ubuntu">Host Panel</span>
          </NavLink>
        )}

        {isLoggedin ? (
          <button 
            onClick={() => logout()}
            className="flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
          >
            <FaSignOutAlt size={20} />
            <span className="text-[10px] font-bold font-ubuntu">Logout</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            className="flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
          >
            <FaUser size={20} />
            <span className="text-[10px] font-bold font-ubuntu">Login</span>
          </button>
        )}
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      {isScrolled && isHost && location.pathname !== "/host/add" && (
        <button
          onClick={() => navigate("/host/add")}
          className="fixed bottom-22 right-5 z-45 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white w-12 h-12 rounded-full shadow-xl shadow-red-200/50 hover:scale-105 active:scale-95 transition-all duration-200 md:hidden cursor-pointer flex items-center justify-center animate-star-pop"
          aria-label="Add listing quick button"
        >
          <FaPlus size={16} />
        </button>
      )}
      <LoadingModal isOpen={isLoading} text="Logging you out..." />
    </>
  );
};

export default Navbar;
