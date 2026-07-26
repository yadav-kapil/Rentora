import { FaShieldAlt, FaTag, FaHeadset, FaCalendarCheck } from "react-icons/fa";
import { motion } from "motion/react";

const Features = () => {
  return (
    <div className="mb-24 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
            WHY CHOOSE RENTORA
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          Comfort, Convenience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Trust</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Feature 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-950/80 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-500 dark:text-red-400 mb-6 relative group-hover:scale-110 transition-transform duration-300 group-hover:bg-red-100 dark:group-hover:bg-red-900/60">
            <div className="absolute inset-2 rounded-full bg-red-100/50 dark:bg-red-900/30"></div>
            <FaShieldAlt className="text-2xl relative z-10" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2 group-hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">Verified Homes</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300">
            All homes are verified for quality and safety.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-950/80 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-500 dark:text-teal-400 mb-6 relative group-hover:scale-110 transition-transform duration-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/60">
            <div className="absolute inset-2 rounded-full bg-teal-100/50 dark:bg-teal-900/30"></div>
            <FaTag className="text-2xl relative z-10" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Best Price</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300">
            Get the best deals at the best prices.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-950/80 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-orange-500 dark:text-orange-400 mb-6 relative group-hover:scale-110 transition-transform duration-300 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/60">
            <div className="absolute inset-2 rounded-full bg-orange-100/50 dark:bg-orange-900/30"></div>
            <FaHeadset className="text-2xl relative z-10" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">24/7 Support</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300">
            We're here for you, anytime, anywhere.
          </p>
        </motion.div>

        {/* Feature 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-950/80 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-500 dark:text-purple-400 mb-6 relative group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/60">
            <div className="absolute inset-2 rounded-full bg-purple-100/50 dark:bg-purple-900/30"></div>
            <FaCalendarCheck className="text-2xl relative z-10" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white font-outfit text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Easy Booking</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300">
            Book your stay in just a few clicks.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
