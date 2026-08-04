import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaTrash,
  FaArrowLeft,
  FaPlus,
  FaMinus,
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
    // Navbar কার্ট কাউন্টার আপডেট করার জন্য স্টোরেজ ইভেন্ট ফায়ার
    window.dispatchEvent(new Event("storage"));
  }, [cartItems]);

  // ➕ কয়ান্টিটি বাড়ানো
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id || item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ কয়ান্টিটি কমানো
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        (item.id === id || item._id === id) && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 🗑️ আইটেম রিমুভ করা
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id && item._id !== id
    );
    setCartItems(updatedCart);
  };

  // 📊 Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const delivery = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const discount = subtotal > 200 ? 15 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + delivery + tax - discount;

  return (
    <section className="min-h-screen bg-[#FFF7ED] py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center">
          <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold">
            Shopping Cart
          </span>
          <h1 className="text-5xl font-black text-amber-950 mt-6">
            Your Cart
          </h1>
          <p className="text-gray-500 mt-5 max-w-xl mx-auto">
            Review your selected delicious meals before checkout.
          </p>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <FaShoppingCart className="text-7xl !text-orange-300 mx-auto mb-6" />
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
          /* Grid Layout when Cart is NOT empty */
          <div>
            {/* Continue Shopping */}
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 !text-orange-500 font-semibold mt-14 hover:translate-x-1 transition duration-300"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>

            <div className="grid lg:grid-cols-3 gap-10 mt-8">
              
              {/* LEFT SIDE: Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="!bg-white rounded-3xl p-6 shadow-lg border border-orange-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-2xl transition duration-300"
                  >
                    {/* Food Image */}
                    <div className="w-36 h-36 rounded-3xl overflow-hidden bg-orange-50 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* Food Details */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-bold text-amber-950">
                        {item.title || item.name}
                      </h2>
                      <p className="text-gray-500 mt-2 text-sm">
                        Freshly prepared with premium ingredients.
                      </p>
                      <h3 className="!text-orange-500 text-2xl font-black mt-4">
                        ৳ {item.price}
                      </h3>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-center gap-5">
                      <div className="flex items-center bg-orange-50 rounded-2xl overflow-hidden border border-orange-100">
                        <button
                          onClick={() => decreaseQty(item.id || item._id)}
                          style={{ backgroundColor: "#ffedd5", color: "#f97316" }}
                          className="w-10 h-10 !bg-orange-100 hover:!bg-orange-500 hover:!text-white transition flex items-center justify-center cursor-pointer"
                        >
                          <FaMinus />
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-amber-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id || item._id)}
                          style={{ backgroundColor: "#ffedd5", color: "#f97316" }}
                          className="w-10 h-10 !bg-orange-100 hover:!bg-orange-500 hover:!text-white transition flex items-center justify-center cursor-pointer"
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

              {/* RIGHT SIDE: Order Summary */}
              <div className="lg:col-span-1">
                <div className="!bg-white rounded-3xl p-8 border border-orange-100 shadow-xl sticky top-24">
                  <h2 className="text-2xl font-bold text-amber-950 mb-8">
                    Order Summary
                  </h2>

                  {/* Coupon */}
                  <div className="mb-8">
                    <label className="text-sm font-semibold text-gray-600">
                      Coupon Code
                    </label>
                    <div className="flex mt-3">
                      <input
                        type="text"
                        placeholder="Enter Coupon"
                        className="flex-1 border border-orange-200 rounded-l-xl px-4 py-3 outline-none focus:border-orange-500 text-sm"
                      />
                      <button 
                        style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                        className="!bg-orange-500 hover:!bg-orange-600 !text-white px-6 rounded-r-xl font-semibold transition text-sm cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Pricing */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-amber-950">
                        ৳ {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery</span>
                      <span className="font-semibold text-amber-950">
                        ৳ {delivery.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-green-600">
                        -৳ {discount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax (5%)</span>
                      <span className="font-semibold text-amber-950">
                        ৳ {tax.toFixed(2)}
                      </span>
                    </div>

                    <hr className="border-gray-100 my-2" />

                    <div className="flex justify-between text-2xl font-bold pt-2">
                      <span className="text-amber-950">Total</span>
                      <span className="!text-orange-500">
                        ৳ {total.toFixed(2)}
                      </span>
                    </div>
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
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}