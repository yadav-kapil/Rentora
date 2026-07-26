import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaUserFriends, 
  FaMoneyBillWave, 
  FaCheckCircle, 
  FaSpinner,
  FaArrowRight,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaShieldAlt
} from "react-icons/fa";

const BookingModal = ({ isOpen, onClose, home }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Default dates: Today & Tomorrow
  const getTodayStr = () => new Date().toISOString().split("T")[0];
  const getTomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Form State
  const [checkIn, setCheckIn] = useState(getTodayStr());
  const [checkOut, setCheckOut] = useState(getTomorrowStr());
  const [guests, setGuests] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // UI state
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !home) return null;

  // Nights and Total calculation
  let nights = 0;
  let totalPrice = home.price || 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diff > 0) {
      nights = diff;
      totalPrice = home.price * nights;
    }
  }

  // Step Navigation Validation
  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      if (!checkIn || !checkOut) {
        setError("Please select both check-in and check-out dates.");
        return;
      }
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      if (start >= end) {
        setError("Check-out date must be after check-in date.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!paymentMethod) {
        setError("Please select a payment option.");
        return;
      }
      setStep(3);
    }
  };

  // Final Submit
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          homeId: home._id,
          checkIn,
          checkOut,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to complete booking.");
      }

      // Close modal and navigate to My Bookings
      onClose();
      navigate("/guest/bookings");
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setError("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={handleClose}
        ></motion.div>

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-ubuntu">
                Step {step} of 3
              </span>
              <h2 className="text-xl font-extrabold font-outfit text-gray-900 leading-tight">
                {step === 1 && "Dates & Stay Details"}
                {step === 2 && "Select Payment Option"}
                {step === 3 && "Review & Confirm Booking"}
              </h2>
            </div>
            <button 
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-gray-100 h-1.5 flex">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-full transition-all duration-400"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {error && (
              <div className="bg-red-50 text-red-600 p-3.5 rounded-2xl text-xs font-bold font-ubuntu border border-red-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse"></span>
                {error}
              </div>
            )}

            {/* STEP 1: Dates & Guests */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                {/* Home Mini Banner */}
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <img 
                    src={home.imageUrl} 
                    alt={home.title} 
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold font-outfit text-sm text-gray-900 line-clamp-1">{home.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <FaMapMarkerAlt className="text-red-500" /> {home.location}
                    </p>
                    <p className="text-xs font-bold text-gray-900 mt-1 font-outfit">
                      ₹ {home.price} <span className="text-[10px] font-normal text-gray-400">/ night</span>
                    </p>
                  </div>
                </div>

                {/* Dates Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 font-ubuntu">
                      Check-In Date
                    </label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium text-gray-800 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 font-ubuntu">
                      Check-Out Date
                    </label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split("T")[0]}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium text-gray-800 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests Option */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 font-ubuntu">
                    Guests & Capacity
                  </label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="1">1 Guest ({home.guestNumbers || 1} Seater)</option>
                    <option value="2">2 Guests ({home.guestNumbers || 2} Seater)</option>
                    <option value="3">3 Guests ({home.guestNumbers || 3} Seater)</option>
                  </select>
                </div>

                {/* Price Breakdown Preview */}
                {nights > 0 && (
                  <div className="bg-gradient-to-r from-red-50/60 to-orange-50/60 p-4 rounded-2xl border border-red-100 space-y-2 text-sm font-inter">
                    <div className="flex justify-between text-gray-600 text-xs">
                      <span>₹ {home.price} × {nights} {nights === 1 ? "night" : "nights"}</span>
                      <span className="font-semibold text-gray-800">₹ {home.price * nights}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold font-outfit text-base pt-2 border-t border-red-100">
                      <span>Total Amount</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">₹ {totalPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-gray-500 font-medium">Select your preferred payment option for this stay:</p>

                {/* Cash Option Card (Active) */}
                <div 
                  onClick={() => setPaymentMethod("Cash")}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "Cash"
                      ? "border-red-500 bg-red-50/40 shadow-md shadow-red-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-center text-xl shadow-sm">
                      <FaMoneyBillWave />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-outfit text-sm">Pay with Cash</h4>
                      <p className="text-xs text-gray-500">Pay cash directly upon check-in at property</p>
                    </div>
                  </div>
                  {paymentMethod === "Cash" && (
                    <FaCheckCircle className="text-red-500 text-xl" />
                  )}
                </div>

                {/* Card Option (Disabled / Coming Soon) */}
                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 opacity-60 flex items-center justify-between cursor-not-allowed">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gray-200 text-gray-400 flex items-center justify-center text-lg">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 font-outfit text-sm">Credit / Debit Card</h4>
                      <p className="text-[10px] text-gray-400">Online Card Payment (Coming Soon)</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-ubuntu">Currently Unavailable</span>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Confirm */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                {/* Property Card */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                  <img src={home.imageUrl} alt={home.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold font-outfit text-base text-gray-900">{home.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" /> {home.location}
                    </p>
                  </div>
                </div>

                {/* Details Summary Table */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3 text-xs font-inter">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Check-In Date</span>
                    <span className="font-bold text-gray-800">{new Date(checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Check-Out Date</span>
                    <span className="font-bold text-gray-800">{new Date(checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-bold text-gray-800">{nights} {nights === 1 ? "Night" : "Nights"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Payment Option</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <FaMoneyBillWave /> Cash on Check-in
                    </span>
                  </div>
                  <div className="flex justify-between py-1 pt-2 font-bold font-outfit text-sm text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 text-base">₹ {totalPrice}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <FaArrowLeft className="text-xs" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-red-100 hover:shadow-lg transition-all text-sm flex items-center gap-2 cursor-pointer ml-auto"
              >
                Next <FaArrowRight className="text-xs" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-8 py-2.5 rounded-xl font-bold shadow-md shadow-red-200 hover:shadow-lg active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" /> Booking...
                  </>
                ) : (
                  <>
                    Confirm & Book Now <FaCheckCircle className="text-xs" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
