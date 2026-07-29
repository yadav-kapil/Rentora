import { motion, AnimatePresence } from "motion/react";
import { 
  FaTimes, 
  FaBell, 
  FaMoon, 
  FaGlobe, 
  FaShieldAlt, 
  FaKey, 
  FaLock, 
  FaChevronDown, 
  FaInfoCircle,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import LoadingModal from "../../public/common/LoadingModal";
import SuccessModal from "../../public/common/SuccessModal";
import ErrorModal from "../../public/common/ErrorModal";

const SettingsModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Change Password Toggle & Inputs
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility Toggles
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Feedback Modals
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setErrorMsg("Please enter both current and new password");
      setIsErrorOpen(true);
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long");
      setIsErrorOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match");
      setIsErrorOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/change-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordOpen(false);
      setSuccessMsg("Password changed successfully!");
      setIsSuccessOpen(true);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong");
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl dark:shadow-black/60 relative z-10 overflow-hidden border dark:border-slate-700/80 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700/80 bg-gray-50/50 dark:bg-slate-800/60 flex-shrink-0">
            <h2 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">Host Settings</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto flex-grow">
            
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

            {/* Dark Mode Setting */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/60">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-300 shadow-sm">
                  <FaMoon />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">Switch to dark theme</p>
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

            {/* Security / Change Password Accordion Setting */}
            <div className="bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/60 overflow-hidden">
              <div 
                onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100/80 dark:hover:bg-slate-700/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-300 shadow-sm">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Security</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Change password</p>
                  </div>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${isPasswordOpen ? 'rotate-180 text-red-500' : ''}`} />
              </div>

              {/* Expandable Password Change Form */}
              <AnimatePresence>
                {isPasswordOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200/60 dark:border-slate-700/60 p-4 bg-white/70 dark:bg-slate-900/60"
                  >
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 p-3 rounded-xl flex items-start gap-2.5">
                        <FaInfoCircle className="text-amber-500 text-xs flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                          Enter your current old password to verify ownership before updating.
                        </p>
                      </div>

                      {/* Old Password */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showOldPass ? "text" : "password"} 
                            value={oldPassword} 
                            onChange={(e) => setOldPassword(e.target.value)} 
                            required
                            placeholder="••••••••"
                            className="w-full pl-9 pr-9 py-2 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                          />
                          <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
                          <button
                            type="button"
                            onClick={() => setShowOldPass(!showOldPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer text-xs"
                            tabIndex={-1}
                          >
                            {showOldPass ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">New Password</label>
                        <div className="relative">
                          <input 
                            type={showNewPass ? "text" : "password"} 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required
                            placeholder="••••••••"
                            className="w-full pl-9 pr-9 py-2 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                          />
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
                          <button
                            type="button"
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer text-xs"
                            tabIndex={-1}
                          >
                            {showNewPass ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input 
                            type={showConfirmPass ? "text" : "password"} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required
                            placeholder="••••••••"
                            className="w-full pl-9 pr-9 py-2 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                          />
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer text-xs"
                            tabIndex={-1}
                          >
                            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-2.5 rounded-xl shadow-md transition-colors cursor-pointer text-xs font-outfit"
                      >
                        Update Password
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Feedback Modals */}
      <LoadingModal isOpen={isLoading} text="Updating password..." />
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        title="Success" 
        desc={successMsg} 
        autoCloseTime={2500}
      />
      <ErrorModal 
        isOpen={isErrorOpen} 
        onClose={() => setIsErrorOpen(false)} 
        title="Error" 
        desc={errorMsg} 
      />
    </>
  );
};

export default SettingsModal;
