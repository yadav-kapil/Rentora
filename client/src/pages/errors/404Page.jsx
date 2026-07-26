import { useNavigate } from "react-router-dom";
import { FaHome, FaCompass, FaArrowLeft, FaSearch, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "motion/react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden select-none">
      {/* Premium Ambient Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-red-200/20 blur-3xl animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl animate-pulse-glow pointer-events-none [animation-delay:2s]"></div>

      {/* Main Glassmorphic Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl w-full bg-white/75 backdrop-blur-xl border border-white/50 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center z-10 transition-all duration-500 hover:shadow-red-100/30"
      >
        
        {/* Error Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-650 text-xs font-bold tracking-wider uppercase mb-4 font-ubuntu"
        >
          <FaExclamationTriangle className="text-red-650 animate-bounce" />
          Error Code 404
        </motion.div>

        {/* Custom Animated Vector Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 12 }}
          className="w-full flex justify-center mb-4 relative"
        >
          <svg viewBox="0 0 240 180" className="w-48 h-36 select-none">
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

        {/* Text Headers */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-5xl md:text-6xl font-black font-outfit tracking-tighter bg-gradient-to-r from-red-650 via-rose-500 to-indigo-650 bg-clip-text text-transparent mb-1"
        >
          404
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-xl md:text-2xl font-extrabold font-outfit text-gray-900 mb-1.5"
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-gray-500 text-xs md:text-sm max-w-sm md:max-w-md mx-auto mb-5 font-medium leading-relaxed"
        >
          The address you're looking for doesn't exist, has been moved, or is temporarily hidden in another dimension.
        </motion.p>

        {/* Buttons / Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md"
        >
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-red-200/50 hover:shadow-lg hover:shadow-red-200/70 hover:-translate-y-0.5 cursor-pointer group"
          >
            <FaHome className="text-sm group-hover:scale-110 transition-transform duration-200" />
            Return Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-sm transition-all duration-300 hover:bg-gray-50 hover:-translate-y-0.5 cursor-pointer"
          >
            <FaArrowLeft className="text-xs" />
            Back to Safety
          </button>
        </motion.div>

        {/* Extra Navigation Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="mt-6 pt-4 border-t border-gray-100 w-full flex items-center justify-center gap-6 text-xs font-bold text-gray-400 font-ubuntu"
        >
          <button 
            onClick={() => navigate("/")} 
            className="hover:text-red-650 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FaSearch className="text-[10px]" />
            Browse Homes
          </button>
          <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
          <button 
            onClick={() => navigate("/homes/new")} 
            className="hover:text-red-650 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FaCompass className="text-[10px]" />
            List Your Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
