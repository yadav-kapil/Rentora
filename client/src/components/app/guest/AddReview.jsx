import { useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";

const AddReview = ({ id, onSuccess, onAddReview }) => {
  const revalidator = useRevalidator();
  const [isSubmitting, setSubmitState] = useState("Submit");
  const [reviewError, setReviewError] = useState("");
  const [success, setSuccess] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [clickedStar, setClickedStar] = useState(null);

  const descriptionRef = useRef();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSuccess("");
    setReviewError("");

    if (!rating || rating < 1 || rating > 5) {
      setReviewError("Please select a rating by clicking on the stars.");
      return;
    }

    setSubmitState("⏳ Submitting...");
    const review = {
      rating,
      description: descriptionRef.current.value.trim(),
    };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/homes/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ review }),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to submit review");
      }
      const data = await res.json();
      setRating(0);
      descriptionRef.current.value = "";
      setSuccess("Review submitted successfully!");
      
      if (onAddReview && data.review) {
        onAddReview(data.review);
      }

      setTimeout(() => {
        setSuccess("");
        if (onSuccess) onSuccess();
      }, 500);
      revalidator.revalidate();
    } catch (err) {
      setSuccess("");
      setReviewError(err.message);
    } finally {
      setSubmitState("Submit");
    }
  };  return (
    <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-6 sm:p-8 shadow-lg shadow-gray-150/40 dark:shadow-black/40 mt-10 border border-transparent dark:border-slate-700/60">
      <h2 className="text-xl font-bold font-outfit text-gray-900 dark:text-white tracking-tight mb-6">
        Write a Review
      </h2>

      <form className="space-y-6" onSubmit={handleSubmitReview}>
        {/* Rating */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">
            Your Rating
          </label>

          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hoverRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-3xl transition-transform duration-150 focus:outline-none cursor-pointer transform hover:scale-105 active:scale-95 select-none"
                    aria-label={`Rate ${star} out of 5 stars`}
                  >
                    <span
                      className={`transition-colors duration-150 ${
                        isActive ? "text-amber-400" : "text-gray-200 dark:text-slate-700"
                      }`}
                    >
                      ★
                    </span>
                  </button>
                );
              })}
            </div>
            {rating > 0 && (
              <span className="text-xs font-bold text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-900/60 px-2.5 py-1 rounded-full font-ubuntu">
                {rating} / 5
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 font-ubuntu">
            Your Review
          </label>

          <textarea
            name="description"
            rows="4"
            required
            placeholder="Share your experience..."
            className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm resize-none"
            ref={descriptionRef}
          />
        </div>

        {/* ERROR/SUCCESS FIELD */}

        {success && (
          <div className="w-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl px-4 py-3 shadow-sm text-sm font-medium animate-fade-in">
            {success}
          </div>
        )}

        {reviewError && (
          <div className="w-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm text-sm font-medium animate-fade-in">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{reviewError}</p>
            </div>
            <button
              type="button"
              onClick={() => setReviewError("")}
              className="text-red-500 dark:text-red-400 hover:text-red-750 dark:hover:text-red-300 text-base cursor-pointer flex items-center justify-center p-1"
            >
              ✖
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-red-100 dark:shadow-red-950/30 hover:shadow-lg hover:shadow-red-200 dark:hover:shadow-red-950/40 active:scale-95 transition-all duration-200 text-sm font-outfit cursor-pointer"
          disabled={isSubmitting !== "Submit"}
        >
          {isSubmitting}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
