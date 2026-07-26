import { motion, AnimatePresence } from "motion/react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
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
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl dark:shadow-black/70 border border-gray-100 dark:border-slate-700/80 pointer-events-auto"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-red-50 dark:bg-red-900/25 rounded-full flex items-center justify-center mb-4">
                  <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-2xl" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-outfit mb-2">
                  {title || "Confirm Deletion"}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-6">
                  {message || "Are you sure you want to delete this? This action cannot be undone."}
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200/50 dark:shadow-red-950/30 transition-colors"
                  >
                    Delete
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

export default ConfirmDeleteModal;
