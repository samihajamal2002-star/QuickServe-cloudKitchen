import React, { useState } from "react";
import { FaStar, FaLock, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialReviews = [
  {
    id: 1,
    name: "Ayesha Rahman",
    rating: 5,
    comment:
      "Amazing food quality and super fast delivery. Highly recommended for everyone!",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    rating: 5,
    comment:
      "Best burger in town! Everything was fresh, hot, and insanely delicious.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    rating: 4,
    comment:
      "Very tasty pizza and friendly delivery service. Will order again soon.",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const [user] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    const newReview = {
      id: Date.now(),
      name: user.name || "Customer",
      comment,
      rating,
    };

    setReviews([newReview, ...reviews]);
    setComment("");
    setRating(5);
  };

  return (
    <section className="py-24 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Block */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="!bg-orange-100 !text-orange-500 font-bold uppercase tracking-wider text-xs px-6 py-2 rounded-full inline-block shadow-sm">
            Customer Reviews
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-black text-amber-950 tracking-tight text-center">
            What Our <span className="!text-orange-500">Customers Say</span>
          </h2>

          {/* 👈 Centered Subtitle Line */}
          <p className="mt-4 max-w-xl mx-auto text-gray-500 text-sm lg:text-base leading-relaxed text-center w-full block">
            We are proud to serve thousands of happy customers every day. Read real experiences shared by our valued customers.
          </p>

          {/* Rating Summary Box */}
          <div className="mt-8 inline-flex items-center gap-5 !bg-white rounded-2xl px-7 py-4 shadow-md border border-orange-100">
            <div className="text-4xl font-black !text-orange-500">
              {averageRating}
            </div>

            <div className="text-left border-l border-gray-100 pl-5">
              <div className="flex gap-1 text-amber-400 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Based on {reviews.length}+ verified reviews
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT : REVIEW CARDS ================= */}
          <div className="lg:col-span-7 space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="!bg-white rounded-3xl border border-orange-100/80 p-7 shadow-md hover:shadow-xl transition-all duration-300 relative group"
              >
                <FaQuoteLeft className="absolute top-6 right-6 text-orange-100 text-3xl group-hover:text-orange-200 transition" />

                {/* User Info Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full !bg-orange-500 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-orange-500/20 shrink-0">
                    {review.name ? review.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-amber-950">
                      {review.name}
                    </h3>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      ✓ Verified Customer
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-amber-400 text-xs mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 mt-3 text-sm leading-relaxed font-normal">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* ================= RIGHT : FORM CARD ================= */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="!bg-white rounded-3xl border border-orange-100 shadow-xl p-8">
              <h3 className="text-2xl font-black text-amber-950">
                Write a Review
              </h3>

              <p className="text-gray-500 text-xs mt-2 mb-6">
                Share your experience with QuickServe. Your feedback helps us improve.
              </p>

              {user ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* User Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Customer
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user.name || "Customer"}
                      className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl px-5 py-3 text-amber-950 font-bold text-sm cursor-not-allowed"
                    />
                  </div>

                  {/* Rating Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full rounded-2xl border border-orange-200 px-5 py-3 bg-white text-amber-950 text-sm font-semibold outline-none focus:border-orange-500 transition cursor-pointer"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                      <option value={4}>⭐⭐⭐⭐ Very Good (4/5)</option>
                      <option value={3}>⭐⭐⭐ Good (3/5)</option>
                      <option value={2}>⭐⭐ Fair (2/5)</option>
                      <option value={1}>⭐ Poor (1/5)</option>
                    </select>
                  </div>

                  {/* Comment Area */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Your Review
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your detailed experience..."
                      className="w-full rounded-2xl border border-orange-200 px-5 py-3 text-sm text-amber-950 outline-none resize-none focus:border-orange-500 bg-white transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                    className="w-full py-4 rounded-2xl !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                /* Login Required Box */
                <div className="text-center !bg-orange-50/60 rounded-2xl border border-orange-100 p-8">
                  <div className="w-14 h-14 rounded-2xl !bg-orange-500 !text-white flex items-center justify-center text-xl mx-auto shadow-md shadow-orange-500/30">
                    <FaLock />
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-amber-950">
                    Login Required
                  </h4>

                  <p className="mt-2 text-gray-500 text-xs leading-relaxed">
                    Please login to share your valuable review with us.
                  </p>

                  <Link
                    to="/login"
                    style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                    className="inline-block mt-6 !bg-orange-500 hover:!bg-orange-600 !text-white px-7 py-3 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 transition active:scale-95"
                  >
                    Login Now →
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}