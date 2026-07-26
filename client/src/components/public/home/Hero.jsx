import { FaSearch, FaRegCalendarAlt, FaUserFriends, FaCheckCircle, FaShieldAlt, FaHeadset, FaHeart, FaCompass } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import houseIllustration from "../../../assets/house_illustration.png";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { motion } from "motion/react";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin } = useAuth();

  const handleSearchClick = () => {
    if (location.pathname.startsWith("/guest")) {
      navigate("/guest/categories");
    } else if (!isLoggedin) {
      navigate("/login");
    } else {
      navigate("/categories");
    }
  };

  return (
    <div className="relative overflow-hidden mb-16 pt-8 pb-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 via-white to-white dark:from-[#111827]/40 dark:via-[#080c14] dark:to-[#080c14]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center relative z-10 mb-6 lg:mb-0">
        
        {/* Left Column: Text & Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left space-y-5 lg:pr-10 z-10 py-6 lg:py-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 mb-2 shadow-sm border border-red-100 dark:border-red-900/50">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white text-[10px]">
              <FaCompass />
            </div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
              FIND YOUR PERFECT STAY
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Find Your Next <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Perfect Stay</span>
          </h1>
          
          <p className="text-gray-500 dark:text-slate-400 font-medium text-lg max-w-md mx-auto lg:mx-0 mt-4 leading-relaxed">
            Explore handpicked homes and unique stays that feel just right.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-row justify-between lg:justify-start gap-2 sm:gap-4 mt-10 w-full">
            <motion.div whileHover={{ y: -3 }} className="flex-1 lg:flex-none flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 bg-white dark:bg-[#0e1422] px-2 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800/80 cursor-pointer group text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <FaShieldAlt className="text-sm sm:text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-sm font-bold text-gray-900 dark:text-white font-outfit leading-tight">Best Price</span>
                <span className="text-[9px] sm:text-xs text-gray-500 dark:text-slate-400 font-medium leading-tight">Guarantee</span>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ y: -3 }} className="flex-1 lg:flex-none flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 bg-white dark:bg-[#0e1422] px-2 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800/80 cursor-pointer group text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <FaCheckCircle className="text-sm sm:text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-sm font-bold text-gray-900 dark:text-white font-outfit leading-tight">Verified</span>
                <span className="text-[9px] sm:text-xs text-gray-500 dark:text-slate-400 font-medium leading-tight">Homes</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="flex-1 lg:flex-none flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 bg-white dark:bg-[#0e1422] px-2 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800/80 cursor-pointer group text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <FaHeadset className="text-sm sm:text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-sm font-bold text-gray-900 dark:text-white font-outfit leading-tight">24/7</span>
                <span className="text-[9px] sm:text-xs text-gray-500 dark:text-slate-400 font-medium leading-tight">Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right side Image area */}
        <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
          
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src={houseIllustration} 
            alt="Luxury modern villa" 
            className="w-full max-w-[320px] sm:max-w-lg lg:max-w-2xl h-auto object-contain drop-shadow-2xl z-10 relative"
          />

          {/* Floating Badge on Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute h-fit bottom-4 -right-2 sm:bottom-10 sm:right-4 lg:top-20 lg:-right-4 bg-white dark:bg-[#0e1422] px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl shadow-2xl shadow-red-900/10 dark:shadow-black/70 border border-gray-50 dark:border-slate-800/80 flex items-center gap-2 sm:gap-3 z-20"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-500 dark:text-red-400 text-sm sm:text-lg flex-shrink-0">
              <FaHeart />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-gray-900 dark:text-white font-outfit leading-none text-sm sm:text-lg mb-0.5">2M+</span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 font-medium whitespace-nowrap leading-none">Happy Guests</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Search Bar */}
      <div className="max-w-5xl mx-auto px-4 relative z-30 -mt-8 lg:-mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-[#0e1422] p-3 rounded-[2rem] lg:rounded-full shadow-2xl shadow-gray-200/60 dark:shadow-black/80 flex flex-col lg:flex-row items-center border border-gray-100 dark:border-slate-800/80"
        >
          <div className="flex-1 flex items-center gap-4 px-6 py-4 w-full border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800/80 group cursor-text hover:bg-gray-50 dark:hover:bg-slate-800/40 lg:rounded-l-full transition-colors rounded-t-[1.5rem] lg:rounded-tr-none">
            <FaLocationDot className="text-gray-400 dark:text-slate-500 text-xl group-focus-within:text-red-500 transition-colors" />
            <div className="flex flex-col w-full">
              <span className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Where are you going?</span>
              <input 
                type="text" 
                placeholder="City, area or property" 
                className="w-full focus:outline-none text-sm font-medium text-gray-500 dark:text-slate-300 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-4 px-6 py-4 w-full border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800/80 group cursor-text hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
            <FaRegCalendarAlt className="text-gray-400 dark:text-slate-500 text-xl group-focus-within:text-red-500 transition-colors" />
            <div className="flex flex-col w-full">
              <span className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Check in - Check out</span>
              <input 
                type="text" 
                placeholder="Add dates" 
                className="w-full focus:outline-none text-sm font-medium text-gray-500 dark:text-slate-300 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-4 px-6 py-4 w-full group cursor-text hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors rounded-b-[1.5rem] lg:rounded-b-none">
            <FaUserFriends className="text-gray-400 dark:text-slate-500 text-xl group-focus-within:text-red-500 transition-colors" />
            <div className="flex flex-col w-full">
              <span className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Rooms & Guests</span>
              <input 
                type="text"
                placeholder="Add guests" 
                className="w-full focus:outline-none text-sm font-medium text-gray-500 dark:text-slate-300 bg-transparent placeholder-gray-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
          
          <div className="px-2 w-full lg:w-auto mt-2 lg:mt-0 pb-2 lg:pb-0">
            <button onClick={handleSearchClick} className="w-full lg:w-auto bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-10 py-5 rounded-2xl lg:rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              <FaSearch /> Search
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
