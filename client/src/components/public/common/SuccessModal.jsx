import { motion, AnimatePresence } from "motion/react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

const SuccessModal = ({ isOpen, onClose, title, desc, autoCloseTime = 3000 }) => {
  useEffect(() => {
    if (isOpen && autoCloseTime) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseTime]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl dark:shadow-black/70 border border-gray-100 dark:border-slate-700/80 pointer-events-auto relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/25 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-3xl" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-outfit mb-2">
                  {title || "Success!"}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-2">
                  {desc || "Action completed successfully."}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
