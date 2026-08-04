import React, { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";

// 🍔 HD Unsplash Image Links
const foods = [
  {
    id: 101,
    name: "Cheese Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    price: 299,
    rating: 4.9,
    category: "Burger",
  },
  {
    id: 102,
    name: "Italian Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    price: 499,
    rating: 4.8,
    category: "Pizza",
  },
  {
    id: 103,
    name: "French Fries",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop",
    price: 149,
    rating: 4.7,
    category: "Snacks",
  },
  {
    id: 104,
    name: "Cold Drink",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    price: 99,
    rating: 4.6,
    category: "Drinks",
  },
];

export default function PopularFoods() {
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  // ❤️ Toggle Wishlist
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // 🛒 Add to Cart with LocalStorage Sync
  const handleAddToCart = (food) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((item) => item.id === food.id);

    if (index > -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({
        id: food.id,
        _id: food.id,
        title: food.name,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));

    setToastMessage(`${food.name} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <section className="py-24 bg-[#FFF7ED] relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-bounce font-semibold text-sm">
          ✅ {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Heading */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-bold text-xs tracking-wider uppercase inline-block shadow-sm">
            Popular Foods
          </span>

          <h2 className="text-4xl lg:text-5xl font-black text-amber-950 mt-5 tracking-tight text-center">
            Our Best Selling Foods
          </h2>

          {/* 👈 Middle Centered Text */}
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm lg:text-base leading-relaxed text-center w-full block">
            Freshly prepared with premium ingredients and loved by thousands of customers.
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foods.map((food) => {
            const isLiked = wishlist.includes(food.id);

            return (
              <div
                key={food.id}
                className="group !bg-white rounded-[32px] p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative border border-orange-100/80 flex flex-col justify-between"
              >
                <div>
                  {/* Heart Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(food.id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 shadow-sm cursor-pointer ${
                      isLiked
                        ? "!bg-red-500 !text-white"
                        : "!bg-orange-50 !text-orange-500 hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    <FaHeart size={16} />
                  </button>

                  {/* 🖼️ Fixed Aspect Ratio Image Container */}
                  <div className="w-full h-48 rounded-[24px] overflow-hidden bg-orange-50/50 mb-5 relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Category Tag & Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider !bg-orange-100 !text-orange-600 px-3 py-1 rounded-full">
                      {food.category}
                    </span>

                    <div className="flex items-center gap-1 text-amber-950 font-bold text-xs">
                      <FaStar className="text-amber-400" />
                      <span>{food.rating}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-amber-950 group-hover:!text-orange-500 transition-colors line-clamp-1">
                    {food.name}
                  </h3>
                </div>

                {/* Price & Add to Cart Action */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-orange-50">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                      Price
                    </span>
                    <h4 className="text-2xl font-black !text-orange-500">
                      ৳ {food.price}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleAddToCart(food)}
                    style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                    className="!bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    <FaShoppingCart size={18} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}