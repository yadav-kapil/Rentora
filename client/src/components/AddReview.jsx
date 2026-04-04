import { useRef, useState } from "react";
import { useNavigate, useOutletContext, useRevalidator } from "react-router-dom";

const AddReview = () => {
  const { id } = useOutletContext();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [isSubmitting, setSubmitState] = useState("Submit");
  const [reviewError, setReviewError] = useState("");
  const [success, setSuccess] = useState("");

  const ratingRef = useRef();
  const descriptionRef = useRef();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSuccess("");
    setReviewError("");
    setSubmitState("⏳ Submitting...");
    const review = {
      rating: ratingRef.current.value,
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
          body: JSON.stringify({ review }),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to submit review");
      }
      ratingRef.current.value = "";
      descriptionRef.current.value = "";
      setSuccess("Review submitted successfully!");
      setTimeout(() => setSuccess(""), 500);
      revalidator.revalidate();
      navigate(`/homes/${id}`)
    } catch (err) {
      setSuccess("");
      setReviewError(err.message);
    } finally {
      setSubmitState("Submit");
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-sm mt-10 bg-white">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">Add a Review</h2>

      <form className="space-y-5" onSubmit={handleSubmitReview}>
        {/* Rating */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Rating (1–5)
          </label>

          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            required
            placeholder="Enter rating"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            ref={ratingRef}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Your Review
          </label>

          <textarea
            name="description"
            rows="3"
            required
            placeholder="Write your experience..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            ref={descriptionRef}
          />
        </div>

        {/* ERROR/SUCCESS FIELD */}

        {success && (
          <div className="w-full border border-green-400 bg-green-50 text-green-700 rounded-lg px-4 py-3 shadow-sm">
            ✅ {success}
          </div>
        )}

        {reviewError && (
          <div className="w-full border border-red-400 bg-red-50 text-red-700 rounded-lg px-4 py-3 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <p className="text-sm font-medium">{reviewError}</p>
            </div>
            <button
              type="button"
              onClick={() => setReviewError("")}
              className="text-red-600 hover:text-red-800 text-lg cursor-pointer"
            >
              ✖
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 hover:scale-95 transition-all cursor-pointer"
          disabled={isSubmitting !== "Submit"}
        >
          {isSubmitting}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
