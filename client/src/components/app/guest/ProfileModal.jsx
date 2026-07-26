import { motion } from "motion/react";
import { FaTimes, FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl dark:shadow-black/60 relative z-10 overflow-hidden border dark:border-slate-700/80"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700/80 bg-gray-50/50 dark:bg-slate-800/60">
          <h2 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">Your Profile</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-orange-500 p-1 mb-4">
              {user?.dp || user?.avatar || user?.profileUrl || user?.imageUrl ? (
                <img 
                  src={user.dp || user.avatar || user.profileUrl || user.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-3xl font-outfit uppercase">
                  {(user?.name || user?.email || "G").charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-outfit">{user?.name || "Guest User"}</h3>
            <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full mt-2 uppercase tracking-wider">Guest</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-800/60 rounded-xl border border-gray-100 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-400 shadow-sm">
                <FaUser />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Full Name</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">{user?.name || "Guest User"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-800/60 rounded-xl border border-gray-100 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-400 shadow-sm">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">{user?.email || "guest@example.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-800/60 rounded-xl border border-gray-100 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-400 shadow-sm">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">+1 234 567 8900</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-3.5 rounded-full shadow-lg shadow-red-200/50 dark:shadow-red-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            Update Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
