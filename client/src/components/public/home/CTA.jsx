import houseIllustration from "../../../assets/house_illustration.png";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

const CTA = () => {
  const location = useLocation();
  const isGuest = location.pathname.startsWith("/guest");

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-950 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden mb-20 border border-transparent dark:border-gray-800">
      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-r from-red-200 to-orange-200 dark:from-red-900/20 dark:to-orange-900/20 rounded-full blur-3xl opacity-40 -z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 z-10 text-center md:text-left mb-8 md:mb-0 space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight leading-tight">
          Ready for your<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">next adventure?</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium max-w-sm mx-auto md:mx-0">
          Find unique places to stay and make unforgettable memories.
        </p>
        <Link to={isGuest ? "/guest/categories" : "/categories"} className="inline-block bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-red-200 dark:shadow-gray-950/80 hover:shadow-xl hover:-translate-y-1">
          Explore Homes
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:w-1/2 z-10 flex justify-center relative"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={houseIllustration} 
            alt="Luxury villa" 
            className="w-full max-w-[280px] sm:max-w-md h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CTA;
