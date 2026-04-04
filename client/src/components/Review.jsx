import { useOutletContext, useNavigate, useRevalidator } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Review = () => {
  const { id, reviews } = useOutletContext();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleDelete = async (reviewId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/homes/${id}/reviews/${reviewId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        throw new Error('Failed To Delete');
      }
      revalidator.revalidate();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="mt-12">
      {/* Header + Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>

        <button
          onClick={() => navigate(`addreview`)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 transition-all cursor-pointer"
        >
          + Add Review
        </button>
      </div>

      {/* Empty State */}
      {(!reviews || reviews.length === 0) && (
        <div className="border border-dashed rounded-xl p-6 text-center text-gray-500 bg-gray-50">
          No reviews yet. Be the first to share your experience!
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-5">
        {reviews?.map((rev) => (
          <div
            key={rev._id}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all"
          >
            {/* Rating + Meta */}
            <div className="flex items-center justify-between mb-2">
              {/* Stars */}
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                ))}
              </div>

              {/* Rating number */}
              <span className="text-sm text-gray-500">{rev.rating}/5</span>
            </div>

            {/* Description */}
            <div className="text-gray-600 text-sm leading-relaxed flex justify-between">
              <p>{rev.description}</p>
              <button
                onClick={() => {
                  handleDelete(rev._id);
                }}
                className="bg-red-600 px-2 py-1 text-white rounded-lg cursor-pointer hover:bg-red-400"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
