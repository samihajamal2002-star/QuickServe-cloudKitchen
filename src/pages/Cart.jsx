import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShieldAlt,
  FaTruck,
  FaTag,
} from "react-icons/fa";

export default function Cart() {
  // 🛒 ১. localStorage থেকে সরাসরি কার্টের ডেটা লোড করা হচ্ছে
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🔄 ২. কার্ট চেঞ্জ হলেই localStorage আপডেট হবে
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  }, [cartItems]);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id || item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        (item.id === id || item._id === id) && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id && item._id !== id
    );
    setCartItems(updatedCart);
  };

  // 📊 Calculations
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const delivery = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const discount = subtotal > 200 ? 15 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + delivery + tax - discount;
  const amountToFreeDelivery = Math.max(100 - subtotal, 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-[#FFFDF9] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold text-sm tracking-wide">
            Shopping Cart
          </span>
          <h1 className="text-5xl font-black text-amber-950 mt-6">
            Your Cart
          </h1>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
              <FaShoppingCart className="text-6xl !text-orange-300" />
            </div>
            <h2 className="text-4xl font-bold text-amber-950">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mt-4">
              Looks like you haven't added any food yet.
            </p>
            <Link
              to="/menu"
              style={{ backgroundColor: "#f97316", color: "#ffffff" }}
              className="inline-block mt-8 !bg-orange-500 hover:!bg-orange-600 !text-white px-8 py-4 rounded-2xl font-semibold transition shadow-md shadow-orange-500/20 active:scale-95"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div>
            {/* Free delivery progress hint */}
            {amountToFreeDelivery > 0 && (
              <div className="mt-6 bg-white border border-orange-100 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm">
                <FaTruck className="text-orange-500 text-xl shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Add{" "}
                    <span className="font-bold text-orange-500">
                      ৳ {amountToFreeDelivery.toFixed(2)}
                    </span>{" "}
                    more to unlock <span className="font-semibold text-amber-950">Free Delivery</span>
                  </p>
                  <div className="w-full h-2 bg-orange-50 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-12 gap-8 md:gap-10 mt-8 items-start">
              {/* LEFT SIDE: Cart Items (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="!bg-white rounded-3xl p-6 shadow-md border border-orange-100/70 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:border-orange-200 transition duration-300"
                  >
                    {/* Food Image */}
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden bg-orange-50 shrink-0 ring-1 ring-orange-100">
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* Food Details */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-xl md:text-2xl font-bold text-amber-950">
                        {item.title || item.name}
                      </h2>
                      <p className="text-gray-500 mt-1 text-sm">
                        Freshly prepared with premium ingredients.
                      </p>
                      <div className="flex items-baseline gap-2 mt-4 justify-center md:justify-start">
                        <h3 className="!text-orange-500 text-2xl font-black">
                          ৳ {item.price}
                        </h3>
                        <span className="text-gray-400 text-xs">
                          × {item.quantity} = ৳ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-center gap-5">
                      <div className="flex items-center bg-orange-50 rounded-2xl overflow-hidden border border-orange-100">
                        <button
                          onClick={() => decreaseQty(item.id || item._id)}
                          className="w-9 h-9 !bg-orange-100 hover:!bg-orange-500 hover:!text-white text-orange-500 transition flex items-center justify-center cursor-pointer"
                        >
                          <FaMinus />
                        </button>
                        <span className="w-10 text-center font-bold text-base text-amber-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id || item._id)}
                          className="w-9 h-9 !bg-orange-100 hover:!bg-orange-500 hover:!text-white text-orange-500 transition flex items-center justify-center cursor-pointer"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id || item._id)}
                        className="!text-red-500 hover:!text-red-600 transition flex items-center gap-2 font-medium text-sm cursor-pointer"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE: Order Summary (5 cols & Larger Internal Padding) */}
              <div className="lg:col-span-5">
                <div className="!bg-white rounded-3xl p-8 sm:p-10 border border-orange-100 shadow-xl sticky top-24">
                  <h2 className="text-2xl font-bold text-amber-950 mb-8 flex items-center gap-3">
                    <FaShoppingCart className="text-orange-500" />
                    Order Summary
                  </h2>

                  {/* Coupon */}
                  <div className="mb-8">
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2.5">
                      <FaTag className="text-orange-400" /> Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter Coupon"
                        className="flex-1 min-w-0 border border-orange-200 rounded-l-xl px-4 py-3.5 outline-none focus:border-orange-500 text-sm"
                      />
                      <button
                        style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                        className="!bg-orange-500 hover:!bg-orange-600 !text-white px-6 rounded-r-xl font-semibold transition text-sm cursor-pointer shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Pricing Box with extra internal padding */}
                  <div className="space-y-4 bg-orange-50/50 rounded-2xl p-6 border border-orange-100/60">
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="text-gray-600 font-medium">
                        Subtotal <span className="text-gray-400">({itemCount} items)</span>
                      </span>
                      <span className="font-bold text-amber-950 text-base">
                        ৳ {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="text-gray-600 font-medium">Delivery</span>
                      <span className={`font-bold text-base ${delivery === 0 ? "text-green-600" : "text-amber-950"}`}>
                        {delivery === 0 ? "Free" : `৳ ${delivery.toFixed(2)}`}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-gray-600 font-medium">Discount</span>
                        <span className="font-bold text-base text-green-600">
                          -৳ {discount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="text-gray-600 font-medium">Tax (5%)</span>
                      <span className="font-bold text-base text-amber-950">
                        ৳ {tax.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Total Line */}
                  <div className="flex justify-between items-center text-2xl font-black mt-8 pt-6 border-t border-dashed border-orange-200">
                    <span className="text-amber-950">Total</span>
                    <span className="!text-orange-500 text-3xl">
                      ৳ {total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Actions */}
                  <Link
                    to="/checkout"
                    style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                    className="mt-8 w-full !bg-orange-500 hover:!bg-orange-600 !text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    Proceed To Checkout →
                  </Link>

                  <Link
                    to="/menu"
                    style={{ borderColor: "#f97316", color: "#f97316" }}
                    className="block mt-4 w-full border-2 border-orange-500 text-center !text-orange-500 hover:!bg-orange-500 hover:!text-white py-3.5 rounded-2xl font-semibold transition cursor-pointer"
                  >
                    Continue Shopping
                  </Link>

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
                    <FaShieldAlt className="text-green-500" />
                    Secure checkout · SSL Encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}