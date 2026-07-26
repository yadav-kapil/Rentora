import { motion, AnimatePresence } from "motion/react";
import { FaSpinner } from "react-icons/fa";

const LoadingModal = ({ isOpen, text = "Loading..." }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center pointer-events-auto"
            >
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <FaSpinner className="text-red-500 text-3xl animate-spin" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 font-outfit mb-2">
                Please Wait
              </h3>
              
              <p className="text-sm text-gray-500 font-medium">
                {text}
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoadingModal;
