import { useState } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { FaHome, FaSyncAlt, FaExclamationTriangle, FaChevronDown, FaChevronUp, FaCode } from "react-icons/fa";
import { motion } from "motion/react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const errorMessage = error?.message || error?.statusText || "An unexpected error occurred.";
  const errorStatus = error?.status || 500;

  return (
    <div className="min-h-screen w-full bg-[#f6f5f8] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none">
      {/* Premium Ambient Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-red-200/20 blur-3xl animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-200/20 blur-3xl animate-pulse-glow pointer-events-none [animation-delay:2s]"></div>

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
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wider uppercase mb-4 font-ubuntu"
        >
          <FaExclamationTriangle className="text-amber-600 animate-pulse" />
          System Error {errorStatus}
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
              <circle cx="30" cy="40" r="1.5" fill="#f59e0b" className="opacity-80" />
              <circle cx="210" cy="30" r="1.5" fill="#ef4444" className="opacity-60" />
              <circle cx="50" cy="20" r="1" fill="#f59e0b" className="opacity-45" />
              <circle cx="190" cy="50" r="1.2" fill="#ef4444" className="opacity-50" />
            </g>

            {/* Floating Monitor Screen */}
            <g className="animate-float-house">
              {/* Monitor Stand */}
              <path d="M 100 135 L 140 135 L 130 150 L 110 150 Z" fill="#9ca3af" />
              <rect x="115" y="125" width="10" height="15" fill="#d1d5db" />

              {/* Monitor Frame */}
              <rect x="70" y="50" width="100" height="80" fill="#4b5563" rx="8" className="drop-shadow-lg" />
              {/* Screen Base */}
              <rect x="76" y="56" width="88" height="64" fill="#1f2937" rx="4" />

              {/* Warning Triangle inside Screen */}
              <g className="animate-pulse">
                <polygon points="120,64 136,92 104,92" fill="#f59e0b" />
                <rect x="119" y="72" width="2" height="10" fill="#1f2937" rx="0.5" />
                <circle cx="120" cy="86" r="1.5" fill="#1f2937" />
              </g>

              {/* Dizzy X Eyes */}
              <path d="M 90 102 L 96 108 M 96 102 L 90 108" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 144 102 L 150 108 M 150 102 L 144 108" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />

              {/* Static Waves */}
              <path d="M 80 115 Q 90 110 100 115 T 120 115 T 140 115 T 160 115" fill="none" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" className="animate-pulse opacity-40" />
            </g>

            {/* Cloud Bases Floating Below */}
            <g className="animate-float-cloud">
              <path d="M 40 155 
                       A 15 15 0 0 1 60 140 
                       A 20 20 0 0 1 95 135 
                       A 15 15 0 0 1 120 148
                       Z" 
                    fill="rgba(229, 231, 235, 0.6)" />
              <path d="M 130 155
                       A 15 15 0 0 1 150 142
                       A 20 20 0 0 1 185 138
                       A 15 15 0 0 1 205 150
                       Z" 
                    fill="rgba(229, 231, 235, 0.6)" />
            </g>
          </svg>
        </motion.div>

        {/* Text Headers */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-4xl md:text-5xl font-black font-outfit tracking-tighter bg-gradient-to-r from-red-650 via-amber-500 to-rose-650 bg-clip-text text-transparent mb-2"
        >
          Something Went Wrong
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-lg md:text-xl font-extrabold font-outfit text-gray-900 mb-2"
        >
          An unexpected error occurred
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-gray-500 text-xs md:text-sm max-w-sm md:max-w-md mx-auto mb-6 font-medium leading-relaxed"
        >
          We encountered an error while loading this page. Our servers are having a momentary glitch, but we are on it!
        </motion.p>

        {/* Buttons / Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mb-6"
        >
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-red-200/50 hover:shadow-lg hover:shadow-red-200/70 hover:-translate-y-0.5 cursor-pointer group"
          >
            <FaSyncAlt className="text-xs group-hover:rotate-180 transition-transform duration-500" />
            Reload Page
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-sm transition-all duration-300 hover:bg-gray-50 hover:-translate-y-0.5 cursor-pointer"
          >
            <FaHome className="text-sm" />
            Go Homepage
          </button>
        </motion.div>

        {/* Collapsible Error Log Panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="w-full max-w-md pt-4 border-t border-gray-100 flex flex-col items-center"
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase font-ubuntu cursor-pointer"
          >
            <FaCode className="text-[10px]" />
            {showDetails ? "Hide Technical Details" : "Show Technical Details"}
            {showDetails ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </button>

          {showDetails && (
            <div className="w-full mt-3 text-left bg-gray-900 border border-gray-800 rounded-2xl p-4 overflow-hidden shadow-inner animate-fade-in select-text">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase font-mono tracking-wider pb-2 border-b border-gray-800/80 mb-2">
                <span>Error Log</span>
                <span className="text-red-500">Code: {errorStatus}</span>
              </div>
              <pre className="text-red-400 font-mono text-[11px] leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap break-all custom-scrollbar">
                {errorMessage}
                {error?.stack && `\n\nStack Trace:\n${error.stack}`}
              </pre>
            </div>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ErrorPage;
