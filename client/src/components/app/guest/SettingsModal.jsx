import { motion } from "motion/react";
import { FaTimes, FaBell, FaMoon, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

const SettingsModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

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
          <h2 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Notifications Setting */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/60">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-300 shadow-sm">
                <FaBell />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Push Notifications</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Get alerts for bookings and stays</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center cursor-pointer ${notifications ? 'bg-gradient-to-r from-red-600 to-orange-500' : 'bg-gray-300 dark:bg-slate-600'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md absolute transition-transform duration-300 ${notifications ? 'translate-x-7' : 'translate-x-1'}`}></div>
            </button>
          </div>

          {/* Dark Mode Setting — wired to ThemeContext */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/60">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-300 shadow-sm">
                <FaMoon />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Switch to dark theme</p>
              </div>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center cursor-pointer ${isDark ? 'bg-gradient-to-r from-red-600 to-orange-500' : 'bg-gray-300 dark:bg-slate-600'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md absolute transition-transform duration-300 ${isDark ? 'translate-x-7' : 'translate-x-1'}`}></div>
            </button>
          </div>

          {/* Language Setting */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/60 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/60 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-300 shadow-sm">
                <FaGlobe />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Language</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">English (US)</p>
              </div>
            </div>
          </div>

          {/* Security Setting */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/60 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/60 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-300 shadow-sm">
                <FaShieldAlt />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Security</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Change password</p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
