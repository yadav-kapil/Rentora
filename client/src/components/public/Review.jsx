import { useState, useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import { FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import AddReview from "../app/guest/AddReview";
import ErrorModal from "./common/ErrorModal";
import useAuth from "../../hooks/useAuth";

const Review = ({ id, reviews }) => {
  const revalidator = useRevalidator();
  const [localReviews, setLocalReviews] = useState(reviews || []);
  const [showAddReview, setShowAddReview] = useState(false);
  const [hasBooked, setHasBooked] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { isLoggedin, user } = useAuth();

  useEffect(() => {
    setLocalReviews(reviews || []);
  }, [reviews]);

  useEffect(() => {
    if (isLoggedin && user?.role === "User") {
      const checkUserBookings = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            const isBooked = data.some(
              (booking) => (booking.home?._id || booking.home) === id
            );
            setHasBooked(isBooked);
          } else {
            setHasBooked(false);
          }
        } catch {
          setHasBooked(false);
        }
      };
      checkUserBookings();
    }
  }, [id, isLoggedin, user]);

  const handleToggleAddReview = () => {
    if (showAddReview) {
      setShowAddReview(false);
      return;
    }

    if (hasBooked === false) {
      setIsErrorModalOpen(true);
    } else {
      setShowAddReview(!showAddReview);
    }
  };

  const handleAddReviewState = (newReview) => {
    setLocalReviews((prev) => [newReview, ...prev]);
  };

  const handleDelete = async (reviewId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/homes/${id}/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed To Delete");
      }

      setLocalReviews((prev) => prev.filter((r) => r._id !== reviewId));
      revalidator.revalidate();
    } catch (err) {
      alert(err.message); 
    }
  };

  return (
    <div className="mt-14">
      {/* Header + Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold font-outfit text-gray-800 dark:text-white">
          Guest Reviews
        </h2>

        {isLoggedin && user?.role === "User" && (
          <button
            onClick={handleToggleAddReview}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm cursor-pointer w-full sm:w-auto text-center border ${
              showAddReview
                ? "bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700/60 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                : "bg-gradient-to-r from-red-600 to-orange-500 border-transparent hover:bg-red-500 text-white"
            }`}
          >
            {showAddReview ? "Cancel" : "+ Add Review"}
          </button>
        )}
      </div>

      {/* Conditionally render AddReview with slide/fade animation */}
      <AnimatePresence initial={false}>
        {showAddReview && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -15 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 overflow-hidden"
          >
            <AddReview id={id} onSuccess={() => setShowAddReview(false)} onAddReview={handleAddReviewState} />
          </motion.div>
        )}
      </AnimatePresence>

      <ErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={() => setIsErrorModalOpen(false)} 
        title="Booking Required"
        desc="Only Booked user can add review"
      />

      {/* Empty State */}
      {(!localReviews || localReviews.length === 0) && (
        <div className="bg-gray-50/60 dark:bg-[#0e1422] border border-transparent dark:border-slate-800/80 rounded-2xl p-8 text-center text-gray-400 dark:text-slate-500 font-medium text-sm animate-fade-in">
          No reviews yet. Be the first to share your experience!
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {localReviews?.map((rev, index) => (
            <motion.div
              key={rev._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="bg-white dark:bg-[#0e1422] border border-transparent dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Rating + Meta */}
              <div className="flex items-center justify-between mb-3">
                {/* Stars */}
                <div className="flex gap-0.5 text-amber-400 text-base">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="select-none">
                      {i < rev.rating
                        ? <FaStar className="text-amber-400" />
                        : <FaRegStar className="text-gray-300 dark:text-slate-600" />}
                    </span>
                  ))}
                </div>

                {/* Rating number */}
                <span className="text-xs bg-gray-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg text-gray-500 dark:text-slate-300 font-semibold font-ubuntu">
                  {rev.rating} / 5
                </span>
              </div>

              {/* Description & Author */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                  <div className="text-sm font-bold text-gray-800 dark:text-white mb-1 font-outfit">
                    {rev.author?.name || rev.author?.email?.split('@')[0] || "Anonymous"}
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed break-words font-inter">
                    {rev.description}
                  </p>
                </div>
                {isLoggedin && user?.role === "Host" && (
                  <button
                    onClick={() => {
                      handleDelete(rev._id);
                    }}
                    className="text-red-500 p-2 rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/40 transition flex items-center justify-center flex-shrink-0"
                    title="Delete review"
                  >
                    <FaTrash size={11} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Review;
