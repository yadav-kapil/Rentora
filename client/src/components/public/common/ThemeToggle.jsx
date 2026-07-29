import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [showLabel, setShowLabel] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
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
                exit={{ width: 0, opacity: 0, x: 4 }}
                transition={{ duration: 0.2 }}
                className={`text-[10px] font-extrabold tracking-wide uppercase font-ubuntu ${
                  isDark ? "text-amber-400" : "text-amber-600"
                }`}
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

export default ThemeToggle;
