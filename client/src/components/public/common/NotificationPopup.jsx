import { motion } from "motion/react";
import { 
  FaBell, 
  FaCalendarAlt, 
  FaStar, 
  FaInfoCircle, 
  FaCheck, 
  FaCheckDouble,
  FaRegDotCircle
} from "react-icons/fa";

const NotificationSkeleton = () => (
  <div className="space-y-4 py-2 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-3 px-4 py-3 border-b border-gray-50 dark:border-slate-800/60 last:border-b-0">
        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-slate-850 flex-shrink-0"></div>
        <div className="flex-grow space-y-2">
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-slate-850 rounded"></div>
          <div className="h-2.5 w-5/6 bg-gray-200 dark:bg-slate-850 rounded"></div>
          <div className="h-2 w-1/4 bg-gray-200 dark:bg-slate-850 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const NotificationPopup = ({ 
  isOpen, 
  onClose, 
  notifications, 
  loading, 
  onMarkAllRead, 
  onMarkRead 
}) => {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case "Booking":
        return <FaCalendarAlt className="text-emerald-500" />;
      case "Review":
        return <FaStar className="text-yellow-500" />;
      case "System":
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "Booking":
        return "bg-emerald-500/10";
      case "Review":
        return "bg-yellow-500/10";
      case "System":
      default:
        return "bg-blue-500/10";
    }
  };

  const formatTime = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch {
      return "just now";
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Background click listener to close popup */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>

      {/* Main Popup Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute top-12 right-0 max-sm:fixed max-sm:top-20 max-sm:left-4 max-sm:right-4 max-sm:w-auto w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700/80 overflow-hidden z-50 flex flex-col max-h-[480px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <FaBell className="text-red-500 text-sm" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white font-ubuntu">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-red-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); onMarkAllRead(); }}
              className="text-xs text-red-650 dark:text-red-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <FaCheckDouble size={10} /> Mark all read
            </button>
          )}
        </div>

        {/* List Content */}
        <div className="overflow-y-auto flex-grow divide-y divide-gray-50 dark:divide-slate-800/60 max-h-[380px]">
          {loading ? (
            <NotificationSkeleton />
          ) : notifications.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 bg-gray-55/40 dark:bg-slate-850/50 rounded-full flex items-center justify-center text-gray-400 dark:text-slate-500">
                <FaRegDotCircle size={20} />
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-slate-200 font-ubuntu">All caught up!</p>
              <p className="text-[11px] text-gray-405 dark:text-slate-400 font-medium">No new notifications at this time.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n._id} 
                onClick={() => !n.isRead && onMarkRead(n._id)}
                className={`flex gap-3.5 px-5 py-4 transition-colors cursor-pointer ${
                  n.isRead 
                    ? "bg-white hover:bg-gray-50/50 dark:bg-slate-900 dark:hover:bg-slate-850/30" 
                    : "bg-red-50/20 hover:bg-red-50/30 dark:bg-red-950/10 dark:hover:bg-red-950/15"
                }`}
              >
                {/* Left Type Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getIconBg(n.type)}`}>
                  {getIcon(n.type)}
                </div>

                {/* Body Text */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs leading-snug truncate ${n.isRead ? "font-bold text-gray-800 dark:text-slate-200" : "font-extrabold text-gray-900 dark:text-white"}`}>
                      {n.title}
                    </p>
                    {!n.isRead && (
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-1.5 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">
                    {n.message}
                  </p>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-bold block mt-1.5">
                    {formatTime(n.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
};

export default NotificationPopup;
