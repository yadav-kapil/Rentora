import { Form, Navigate, useLoaderData, useNavigation, redirect } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  FaLink, 
  FaUpload, 
  FaCloudUploadAlt, 
  FaImage, 
  FaHome, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaBed, 
  FaUsers, 
  FaCheck, 
  FaPlus,
  FaTimes,
  FaMagic
} from "react-icons/fa";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import LoadingModal from "../../components/public/common/LoadingModal";

const POPULAR_AMENITIES = [
  "WiFi",
  "Air Conditioning",
  "Swimming Pool",
  "Free Parking",
  "Kitchen",
  "Gym",
  "TV",
  "Sea View",
  "Balcony",
  "Pet Friendly",
  "Washing Machine",
  "Barbecue Grill"
];

const CATEGORIES = [
  { value: "Apartment", label: "Apartment" },
  { value: "Villa",     label: "Villa" },
  { value: "Cabin",     label: "Cabin" },
  { value: "Beachfront",label: "Beachfront" },
  { value: "Farmhouse", label: "Farmhouse" },
];

const EditHome = () => {
  const { isLoggedin } = useAuth();
  const home = useLoaderData();
  const navigation = useNavigation();
  const fileInputRef = useRef(null);

  // Multi-Image State
  const [imageUrls, setImageUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [imageMode, setImageMode] = useState("url");

  // Amenities State pre-populated
  const [selectedAmenities, setSelectedAmenities] = useState(home?.amenities || []);
  const [customAmenity, setCustomAmenity] = useState("");

  useEffect(() => {
    if (home) {
      if (home.imageUrls && Array.isArray(home.imageUrls) && home.imageUrls.length > 0) {
        setImageUrls(home.imageUrls);
      } else if (home.imageUrl) {
        setImageUrls([home.imageUrl]);
      } else {
        setImageUrls([]);
      }
      setSelectedAmenities(home.amenities || []);
    }
  }, [home]);

  if (!isLoggedin) {
    return <Navigate to="/login" />;
  }

  const isSubmitting = navigation.state === "submitting";

  const addImageUrl = (url) => {
    if (url && !imageUrls.includes(url)) {
      setImageUrls([...imageUrls, url]);
      setCurrentUrl("");
    }
  };

  const handleUrlAdd = (e) => {
    e.preventDefault();
    addImageUrl(currentUrl);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          addImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove) => {
    setImageUrls(imageUrls.filter((_, idx) => idx !== indexToRemove));
  };

  const moveImage = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= imageUrls.length) return;
    const updated = [...imageUrls];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setImageUrls(updated);
  };

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const addCustomAmenity = (e) => {
    e.preventDefault();
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      setSelectedAmenities([...selectedAmenities, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-gray-150/20 dark:shadow-black/40 mb-8 border border-gray-100 dark:border-slate-700/80 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
            MANAGE LISTING
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          Edit Property Details
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium">
          Update the pricing, photos, amenities, and details of your Rentora property
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Form className="space-y-8" method="POST">
          {/* Hidden Inputs for Form Action */}
          <input type="hidden" name="imageUrls" value={JSON.stringify(imageUrls)} />
          <input type="hidden" name="amenities" value={selectedAmenities.join(", ")} />

          {/* Section 1: Basic Information */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-gray-150/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-700/80 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <FaHome size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold font-outfit text-gray-900 dark:text-white">Basic Information</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Property title and detailed description</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Listing Title</label>
              <input
                type="text"
                name="title"
                defaultValue={home.title}
                placeholder="e.g. Luxury Seaview Villa in Bandra"
                className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Detailed Description</label>
              <textarea
                rows="4"
                name="description"
                defaultValue={home.description}
                placeholder="Describe your space, ambiance, surroundings, and unique highlights..."
                className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm resize-none"
                required
              />
            </div>
          </div>

          {/* Section 2: Property Photos */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-gray-150/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-700/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700/60 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <FaImage size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-outfit text-gray-900 dark:text-white">Property Photos</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Add photos via web URL or upload from device</p>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-bold font-ubuntu self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                    imageMode === "url"
                      ? "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200"
                  }`}
                >
                  <FaLink size={12} /> Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                    imageMode === "upload"
                      ? "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200"
                  }`}
                >
                  <FaUpload size={12} /> Upload Files
                </button>
              </div>
            </div>

            {imageMode === "url" ? (
              <div className="flex gap-2">
                <input
                  type="url"
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-grow border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm"
                />
                <button
                  type="button"
                  onClick={handleUrlAdd}
                  className="px-6 bg-gray-900 dark:bg-slate-750 text-white font-bold rounded-2xl text-sm hover:bg-gray-850 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Add
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Choose Image Files</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500/80 rounded-2xl p-8 text-center cursor-pointer bg-gray-50/50 dark:bg-slate-900/50 transition-colors"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    multiple
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                  <FaCloudUploadAlt className="text-4xl text-red-500/80 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">Click to select property images</p>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Select one or more high resolution PNG, JPG, or WEBP images</p>
                </div>
              </div>
            )}

            {/* Live Images Preview Grid */}
            {imageUrls.length > 0 && (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 font-ubuntu">
                  Listing Images ({imageUrls.length} added) — First image is the cover
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {imageUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm"
                    >
                      <img 
                        src={url} 
                        alt={`Property image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Controls overlay */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-10">
                        {/* Move Left */}
                        <button
                          type="button"
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          className="w-7 h-7 rounded-lg bg-white/95 text-gray-800 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition font-bold"
                          title="Move Left"
                        >
                          ←
                        </button>
                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-500 transition"
                          title="Delete"
                        >
                          <FaTimes size={11} />
                        </button>
                        {/* Move Right */}
                        <button
                          type="button"
                          onClick={() => moveImage(index, 1)}
                          disabled={index === imageUrls.length - 1}
                          className="w-7 h-7 rounded-lg bg-white/95 text-gray-800 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition font-bold"
                          title="Move Right"
                        >
                          →
                        </button>
                      </div>

                      {/* Cover Badge */}
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm z-20 uppercase tracking-wide">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Pricing & Location */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-gray-150/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-700/80 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FaRupeeSign size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold font-outfit text-gray-900 dark:text-white">Pricing & Location</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Nightly rate and property address</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Nightly Rate (₹ / night)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    defaultValue={home.price}
                    placeholder="3500"
                    className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm font-bold"
                    required
                  />
                  <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Location / City</label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    defaultValue={home.location}
                    placeholder="Bandra, Mumbai, Maharashtra"
                    className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm"
                    required
                  />
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Property Details & Capacity */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-gray-150/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-700/80 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FaBed size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold font-outfit text-gray-900 dark:text-white">Property Type & Capacity</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Category, bedrooms, and maximum guest limit</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Category</label>
                <select
                  name="category"
                  defaultValue={home.category}
                  className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm font-medium cursor-pointer"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">Bedrooms</label>
                <div className="relative">
                  <input
                    type="number"
                    name="bedrooms"
                    defaultValue={home.bedrooms}
                    placeholder="2"
                    min="1"
                    className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm"
                    required
                  />
                  <FaBed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu font-bold">Max Guests</label>
                <div className="relative">
                  <input
                    type="number"
                    name="guestNumbers"
                    defaultValue={home.guestNumbers}
                    placeholder="4"
                    min="1"
                    className="w-full border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-inter text-sm"
                    required
                  />
                  <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Amenities Selection */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-gray-150/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-700/80 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <FaMagic size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-outfit text-gray-900 dark:text-white">Property Amenities</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Select feature badges or add custom amenities</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">
                {selectedAmenities.length} selected
              </span>
            </div>

            {/* Popular Amenities Pill Checkboxes */}
            <div className="flex flex-wrap gap-2.5">
              {POPULAR_AMENITIES.map((item) => {
                const isSelected = selectedAmenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 shadow-sm scale-102"
                        : "bg-gray-50 dark:bg-slate-900/50 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
                    }`}
                  >
                    {isSelected ? <FaCheck size={11} className="text-red-600 dark:text-red-400" /> : <FaPlus size={10} className="text-gray-400" />}
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                placeholder="Add custom feature (e.g. Private Jacuzzi)..."
                className="flex-grow border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-inter"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="px-5 py-2.5 bg-gray-900 dark:bg-slate-700 text-white font-bold rounded-2xl text-xs hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors cursor-pointer"
              >
                Add Feature
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white py-4 rounded-2xl cursor-pointer font-extrabold transition-all duration-300 text-base font-outfit shadow-lg shadow-red-200/50 dark:shadow-red-950/40 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving Changes..." : "Save Listing Changes"}
          </button>
        </Form>
      </motion.div>

      <LoadingModal isOpen={isSubmitting} text="Updating your listing..." />
    </div>
  );
};

export default EditHome;

export const editHomeLoader = async ({ params }) => {
  const res = await fetch(
    `/api/homes/${params.id}`,
  );

  if (!res.ok) {
    throw new Error("Home Not Found");
  }

  return res.json();
};

export const editHomeAction = async ({ request, params }) => {
  const formData = await request.formData();

  const home = Object.fromEntries(formData);
  
  // Cast numeric fields (FormData gives strings)
  if (home.price) home.price = Number(home.price);
  if (home.bedrooms) home.bedrooms = Number(home.bedrooms);
  if (home.guestNumbers) home.guestNumbers = Number(home.guestNumbers);
  
  // Parse imageUrls from JSON string
  if (home.imageUrls && typeof home.imageUrls === "string") {
    try {
      home.imageUrls = JSON.parse(home.imageUrls);
    } catch {
      home.imageUrls = [];
    }
  } else {
    home.imageUrls = [];
  }

  // Parse amenities from comma-separated string to array
  if (home.amenities && typeof home.amenities === "string") {
    home.amenities = home.amenities.split(",").map(item => item.trim()).filter(Boolean);
  } else {
    home.amenities = [];
  }

  const res = await fetch(
    `/api/homes/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ home }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to Update home");
  }
  return redirect(`/host/homes/${params.id}`, { replace: true });
};
