import { motion, AnimatePresence } from "motion/react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

const ErrorModal = ({ isOpen, onClose, title, desc, autoCloseTime = 4000 }) => {
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
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-100 pointer-events-auto relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <FaExclamationCircle className="text-red-500 text-3xl" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 font-outfit mb-2">
                  {title || "Notice"}
                </h3>
                
                <p className="text-sm text-gray-500 font-medium mb-5 leading-relaxed">
                  {desc || "Only Booked user can add review"}
                </p>

                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-2.5 rounded-xl shadow-md shadow-red-100 text-sm cursor-pointer transition active:scale-95"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
