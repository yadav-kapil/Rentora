import { motion, AnimatePresence } from "motion/react";
import { FaExclamationTriangle, FaTimes, FaSpinner } from "react-icons/fa";

const DangerModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Cancel Booking?", 
  desc = "Are you sure you want to cancel this booking? This action cannot be undone.",
  confirmText = "Yes, Cancel",
  cancelText = "Keep Booking",
  isLoading = false
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? null : onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl dark:shadow-black/70 border border-gray-100 dark:border-slate-700/80 pointer-events-auto relative"
            >
              {!isLoading && (
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <FaTimes />
                </button>
              )}
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-14 h-14 bg-red-50 dark:bg-red-900/25 rounded-full flex items-center justify-center mb-4 border border-red-100 dark:border-red-900/50">
                  <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-2xl" />
                </div>
                
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-outfit mb-2">
                  {title}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mb-6 leading-relaxed">
                  {desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="w-full sm:w-1/2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    {cancelText}
                  </button>

                  <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow-md shadow-red-100 dark:shadow-red-950/30 text-xs cursor-pointer transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin text-xs" /> Cancelling...
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DangerModal;
