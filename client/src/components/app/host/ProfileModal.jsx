import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  FaTimes, 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaLock, 
  FaCamera, 
  FaUpload 
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import LoadingModal from "../../public/common/LoadingModal";
import SuccessModal from "../../public/common/SuccessModal";
import ErrorModal from "../../public/common/ErrorModal";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, dispatch } = useAuth();
  const fileInputRef = useRef(null);

  // Profile Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [dp, setDp] = useState("");

  // File Upload State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Feedback Modal States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Populate initial profile values from user state
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setBio(user.bio || "");
      const avatar = user.dp || user.avatar || user.imageUrl || "";
      setDp(avatar);
      setPreviewUrl(avatar);
      setSelectedFile(null);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Name cannot be empty");
      setIsErrorOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      // Build FormData for multipart file upload + fields
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("address", address.trim());
      formData.append("bio", bio.trim());

      if (selectedFile) {
        formData.append("dp", selectedFile);
      } else if (dp) {
        formData.append("dp", dp.trim());
      }

      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update AuthContext global user state
      dispatch({ type: "LOGIN", payload: data.user });
      setSuccessMsg("Profile updated successfully!");
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
          className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl dark:shadow-black/60 relative z-10 overflow-hidden border dark:border-slate-700/80 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-slate-700/80 bg-gray-50/50 dark:bg-slate-800/60 flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">Host Profile</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Update your host details & account settings</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          {/* Edit Profile Form */}
          <div className="p-6 overflow-y-auto flex-grow">
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              {/* Avatar Preview & File Input Upload */}
              <div className="flex flex-col items-center mb-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-orange-500 p-1 mb-3 relative group cursor-pointer shadow-md"
                  title="Click to change profile picture"
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile Preview" 
                      className="w-full h-full rounded-full border-2 border-white dark:border-slate-800 object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-white dark:border-slate-800 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center text-3xl font-outfit uppercase">
                      {(name || user?.email || "H").charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  {/* Hover Camera Overlay */}
                  <div className="absolute inset-1 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1">
                    <FaCamera size={16} />
                    <span>Upload</span>
                  </div>
                </div>

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3.5 py-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
                >
                  <FaUpload size={11} /> Upload New Photo
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1 font-ubuntu">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-gray-50/50 dark:bg-slate-800/60 text-gray-800 dark:text-slate-100"
                  />
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              {/* Email (Read Only - Locked) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 font-ubuntu">Login Email (Read-Only)</label>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                    <FaLock size={9} /> Credentials locked
                  </span>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    value={user?.email || ""} 
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-slate-700/60 rounded-xl bg-gray-100 dark:bg-slate-800/40 text-gray-400 dark:text-slate-500 text-sm cursor-not-allowed select-none font-medium"
                  />
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1 font-ubuntu">Phone Number</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-gray-50/50 dark:bg-slate-800/60 text-gray-800 dark:text-slate-100"
                  />
                  <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1 font-ubuntu">Address / City</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Mumbai, Maharashtra, India"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-gray-50/50 dark:bg-slate-800/60 text-gray-800 dark:text-slate-100"
                  />
                  <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              {/* Bio / Host Overview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1 font-ubuntu">Bio / Host Overview</label>
                <textarea 
                  rows="2"
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Tell your guests a little bit about yourself..."
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-gray-50/50 dark:bg-slate-800/60 text-gray-800 dark:text-slate-100 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors cursor-pointer text-sm font-outfit mt-4"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Modals for Feedback */}
      <LoadingModal isOpen={isLoading} text="Uploading photo & saving profile..." />
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

export default ProfileModal;
