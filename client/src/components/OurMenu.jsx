import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

const menuData = [
  {
    id: 1,
    title: "Sirloin Steak",
    desc: "Premium sirloin steak served with a rich mushroom sauce and grilled vegetables.",
    price: 1990,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Spaghetti Italian",
    desc: "Authentic thin pasta tossed in rich tomato basil sauce and parmesan cheese.",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Pasta Bolognese",
    desc: "Classic Italian pasta cooked with fresh olive oil, minced meat, and herbs.",
    price: 650,
    // 👈 100% Working Pasta Image
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Classic Cheese Burger",
    desc: "Juicy beef patty with melted cheddar, fresh lettuce, and signature sauce.",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "BBQ Chicken Pizza",
    desc: "Freshly baked pizza topped with smokey BBQ chicken, onions, and mozzarella.",
    price: 990,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Crispy Chicken Wings",
    desc: "Deep-fried spicy wings served with ranch dip and fresh lime slices.",
    price: 290,
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function OurMenu() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  // 🛒 Add to Cart & Sync with LocalStorage
  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((c) => c.id === item.id);

    if (index > -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({
        id: item.id,
        _id: item.id,
        title: item.title,
        name: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));

    setToastMessage(`${item.title} added to cart!`);
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
        
        {/* Header Block (Centered properly) */}
        <div className="text-center w-full mb-16 flex flex-col items-center justify-center">
          <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold text-sm inline-block shadow-sm">
            Special Dishes
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-amber-950 mt-6 tracking-tight text-center">
            Our <span className="!text-orange-500">Menu</span>
          </h2>

          {/* 👈 Subtitle Centered Alignment Fixed */}
          <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed font-normal text-center w-full block">
            Explore our handcrafted culinary delights made with fresh ingredients, prepared exclusively for your cravings.
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {menuData.map((item) => (
            <div
              key={item.id}
              className="!bg-white rounded-[32px] p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-orange-100/80 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image Box */}
                <div className="w-full h-56 rounded-[24px] overflow-hidden mb-6 bg-orange-50 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-950 shadow-sm">
                    Popular
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-amber-950 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-xs sm:text-sm mt-2.5 leading-relaxed font-normal line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Price & Action Button Area */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-orange-50">
                <span className="!text-orange-500 font-black text-2xl">
                  ৳{item.price.toFixed(2)}
                </span>

                <button
                  onClick={() => handleAddToCart(item)}
                  style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                  className="flex items-center gap-2 !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white font-bold text-xs px-5 py-3 rounded-2xl transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  <FaShoppingCart size={13} />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/menu")}
            style={{ backgroundColor: "#f97316", color: "#ffffff" }}
            className="inline-flex items-center gap-3 !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white font-bold text-base px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/30 transition-all cursor-pointer"
          >
            Browse Full Menu <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}