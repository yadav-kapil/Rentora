import React from "react";
import { motion } from "motion/react";
import { FaHome } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#080c14] px-4 py-6 relative overflow-hidden select-none z-[9999]">
      {/* Premium Ambient Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-red-200/20 dark:bg-red-950/20 blur-3xl animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-200/20 dark:bg-indigo-950/20 blur-3xl animate-pulse-glow pointer-events-none [animation-delay:2s]"></div>

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="absolute top-8 left-0 right-0 flex justify-center items-center gap-2"
      >
        <FaHome className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 text-2xl" />
        <span className="font-outfit text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rentora</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center z-10 w-full max-w-lg text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight leading-tight mb-2"
        >
          Building Spaces,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Creating Memories</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 dark:text-slate-400 font-medium text-sm mb-12"
        >
          Finding your perfect home, one step at a time.
        </motion.p>

        {/* Custom Animated Vector Illustration from 404 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 15 }}
          className="w-full flex justify-center mb-16 relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            <svg viewBox="0 0 240 180" className="w-64 h-48 select-none">
            {/* Sky and Twinkling Stars */}
            <g className="animate-twinkle">
              <circle cx="40" cy="30" r="1.5" fill="#f87171" className="opacity-80" />
              <circle cx="200" cy="40" r="1.5" fill="#818cf8" className="opacity-60" />
              <circle cx="80" cy="20" r="1" fill="#f87171" className="opacity-40" />
              <circle cx="160" cy="50" r="1" fill="#818cf8" className="opacity-50" />
            </g>
            <g className="animate-twinkle [animation-delay:1.5s]">
              <circle cx="120" cy="15" r="1.5" fill="#f43f5e" className="opacity-75" />
              <circle cx="50" cy="60" r="1" fill="#6366f1" className="opacity-55" />
              <circle cx="180" cy="25" r="1.5" fill="#f43f5e" className="opacity-65" />
            </g>

            {/* Floating Cloud Base */}
            <g className="animate-float-cloud">
              <path d="M 50 140 
                       A 25 25 0 0 1 80 115 
                       A 35 35 0 0 1 140 105 
                       A 30 30 0 0 1 185 120 
                       A 20 20 0 0 1 200 140 
                       Z" 
                    fill="rgba(255, 255, 255, 0.9)" 
                    className="drop-shadow-lg" />
              <path d="M 65 142 
                       A 15 15 0 0 1 85 127 
                       A 20 20 0 0 1 120 120 
                       A 15 15 0 0 1 150 130 
                       Z" 
                    fill="rgba(255, 255, 255, 0.98)" />
            </g>

            {/* Floating House */}
            <g className="animate-float-house">
              {/* Chimney */}
              <rect x="150" y="52" width="10" height="25" fill="#e11d48" rx="1" />
              <path d="M 148 52 L 162 52" stroke="#be123c" strokeWidth="2" strokeLinecap="round" />
              {/* Smoke rings */}
              <circle cx="155" cy="42" r="3" fill="none" stroke="rgba(225, 29, 72, 0.2)" strokeWidth="1.5" className="animate-pulse" />
              <circle cx="158" cy="34" r="4.5" fill="none" stroke="rgba(225, 29, 72, 0.15)" strokeWidth="1.5" className="animate-pulse [animation-delay:0.8s]" />

              {/* House Base */}
              <rect x="90" y="75" width="60" height="50" fill="#ffe4e6" rx="4" />
              <rect x="90" y="75" width="60" height="6" fill="#fecdd3" />

              {/* Roof */}
              <polygon points="82,75 120,40 158,75" fill="#f43f5e" />
              <polygon points="86,75 120,44 154,75" fill="#e11d48" />

              {/* Door */}
              <rect x="112" y="100" width="16" height="25" fill="#9f1239" rx="2" />
              <circle cx="123" cy="112" r="1.5" fill="#fbbf24" />

              {/* Glowing Windows */}
              <rect x="98" y="88" width="12" height="12" fill="#fbbf24" rx="2" className="animate-pulse" />
              <line x1="104" y1="88" x2="104" y2="100" stroke="#f59e0b" strokeWidth="0.75" />
              <line x1="98" y1="94" x2="110" y2="94" stroke="#f59e0b" strokeWidth="0.75" />

              <rect x="130" y="88" width="12" height="12" fill="#fbbf24" rx="2" className="animate-pulse" />
              <line x1="136" y1="88" x2="136" y2="100" stroke="#f59e0b" strokeWidth="0.75" />
              <line x1="130" y1="94" x2="142" y2="94" stroke="#f59e0b" strokeWidth="0.75" />
            </g>

            {/* Compass Overlay/Search Indicator */}
            <g className="animate-spin-slow origin-[120px_140px] opacity-20">
              <circle cx="120" cy="140" r="65" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" />
            </g>
            <g className="animate-pulse origin-[120px_140px]">
              <circle cx="120" cy="140" r="55" fill="none" stroke="#f43f5e" strokeWidth="0.75" strokeDasharray="5 5" className="opacity-30" />
            </g>
          </svg>
          </motion.div>
        </motion.div>

        {/* Loading Bar Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full max-w-sm mx-auto space-y-3"
        >
          <div className="flex justify-between items-center px-1">
            <p className="text-xs font-bold text-gray-700 dark:text-slate-300 tracking-wider uppercase font-ubuntu">
              Building your experience...
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 tracking-widest font-ubuntu"
            >
              PLEASE WAIT
            </motion.p>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            >
              {/* Shimmer effect inside the bar */}
              <motion.div 
                className="absolute top-0 left-0 right-0 bottom-0 bg-white/30"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
      
      {/* Footer Text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400 dark:text-slate-500 font-medium"
      >
        ❤️ Great homes start with great choices.
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
