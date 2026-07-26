import { FaSearch, FaRegCalendarCheck, FaKey } from "react-icons/fa";
import { motion } from "motion/react";

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="mb-20 text-center max-w-4xl mx-auto scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
            HOW IT WORKS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          Book in 3 Easy Steps
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start relative">
        {/* Connecting Curved Dashed Lines (Hidden on mobile) */}
        <div className="hidden md:block absolute top-[40px] left-[18%] right-[18%] h-[60px] -z-10">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,25 C15,0 35,0 50,25 C65,50 85,50 100,25" 
              stroke="url(#timeline-gradient)" 
              strokeWidth="1.5" 
              strokeDasharray="3 3" 
              fill="none" 
            />
            {/* Arrow at 50% */}
            <path d="M47,21 L53,25 L47,29" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arrow at 100% */}
            <path d="M97,21 L103,25 L97,29" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Step 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center flex-1 w-full mb-10 md:mb-0 relative group cursor-pointer"
        >
          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-gray-950/80 flex items-center justify-center text-red-500 dark:text-red-400 mb-6 border-4 border-white dark:border-gray-800 relative z-10 group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
            <FaSearch className="text-3xl group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
              1
            </div>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2">Search</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-[200px]">
            Find the perfect home for your destination.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center flex-1 w-full mb-10 md:mb-0 relative group cursor-pointer"
        >
          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-gray-950/80 flex items-center justify-center text-red-500 dark:text-red-400 mb-6 border-4 border-white dark:border-gray-800 relative z-10 group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
            <FaRegCalendarCheck className="text-3xl group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
              2
            </div>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2">Book</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-[200px]">
            Choose your dates and make a secure booking.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center flex-1 w-full relative group cursor-pointer"
        >
          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-gray-950/80 flex items-center justify-center text-red-500 dark:text-red-400 mb-6 border-4 border-white dark:border-gray-800 relative z-10 group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
            <FaKey className="text-3xl group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
              3
            </div>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2">Enjoy Stay</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-[200px]">
            Get the keys and enjoy your wonderful vacation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
