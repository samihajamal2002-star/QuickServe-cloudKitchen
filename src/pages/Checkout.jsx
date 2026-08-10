import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard, FaShieldAlt, FaShoppingBag } from "react-icons/fa";
import axios from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();

  // 📝 Form States
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash On Delivery");

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  // 🛒 Dynamic Cart Items from LocalStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // 📊 Pricing Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
  const delivery = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const discount = subtotal > 200 ? 15 : 0;
  const tax = subtotal * 0.05;
  const totalAmount = subtotal + delivery + tax - discount;

  // 🚀 Merged Backend Payload Handler
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty! Please add some items first.");
      return;
    }

    if (!phone || !address) {
      alert("Please provide phone number and delivery address.");
      return;
    }

    setLoading(true);

    const formattedItems = cartItems.map((item) => {
      const foodId = item._id || item.id;
      return {
        food: typeof foodId === "string" && foodId.length === 24 ? foodId : undefined,
        quantity: item.quantity || 1,
        price: Number(item.price),
        name: item.title || item.name || "Food Item",
      };
    });

    const customerId = user._id || user.id;
    const formattedPaymentMethod = payment === "Cash On Delivery" ? "Cash On Delivery" : "Card";

    const orderData = {
      customer: customerId,
      user: customerId,
      items: formattedItems,
      totalAmount: totalAmount,
      totalPrice: totalAmount,
      address: address,
      phone: phone,
      paymentMethod: formattedPaymentMethod,
      status: "Pending",
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const createdId =
        res.data._id ||
        res.data.order?._id ||
        "FD" + Math.floor(100000 + Math.random() * 900000);

      setPlacedOrderId(createdId);
      setOrderSuccess(true);

      // Clear local Cart
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Order Submission Error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to place order. Please check your network or login status!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-[#FFFDF9] to-[#FFF7ED] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with Proper Spacing */}
        <div className="text-center mb-12 md:mb-16 pt-4">
          <span className="inline-block bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide shadow-sm">
            Checkout
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-amber-950 mt-4 md:mt-6 tracking-tight">
            Complete Your Order
          </h1>
          <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Fill in your information below to complete your delicious order.
          </p>
        </div>

        {/* Main Grid Form */}
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
          
          {/* LEFT SIDE: Billing Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl border border-orange-100/80 p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-950 mb-8 border-b border-orange-50 pb-4">
                Billing Information
              </h2>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-orange-200/80 rounded-2xl px-5 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-amber-950 bg-white text-sm transition-all duration-200"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full border border-orange-200/80 rounded-2xl px-5 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-amber-950 bg-white text-sm transition-all duration-200"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full border border-orange-200/80 rounded-2xl px-5 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-amber-950 bg-white text-sm transition-all duration-200"
                  />
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full house address..."
                    className="w-full border border-orange-200/80 rounded-2xl px-5 py-3.5 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-amber-950 bg-white text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Payment & Summary (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Payment Method Card */}
            <div className="bg-white rounded-3xl border border-orange-100/80 shadow-xl p-6 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-amber-950 mb-6">
                Payment Method
              </h2>

              <div className="space-y-3.5">
                <button
                  type="button"
                  onClick={() => setPayment("Cash On Delivery")}
                  style={{
                    backgroundColor: payment === "Cash On Delivery" ? "#f97316" : "#fff7ed",
                    color: payment === "Cash On Delivery" ? "#ffffff" : "#78350f",
                  }}
                  className={`w-full flex items-center gap-4 p-4.5 rounded-2xl font-semibold transition-all duration-200 cursor-pointer border border-orange-100 text-sm ${
                    payment === "Cash On Delivery"
                      ? "!bg-orange-500 !text-white shadow-lg shadow-orange-500/20"
                      : "hover:!bg-orange-100/70"
                  }`}
                >
                  <FaMoneyBillWave size={20} />
                  Cash On Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPayment("Card / Online")}
                  style={{
                    backgroundColor: payment === "Card / Online" ? "#f97316" : "#fff7ed",
                    color: payment === "Card / Online" ? "#ffffff" : "#78350f",
                  }}
                  className={`w-full flex items-center gap-4 p-4.5 rounded-2xl font-semibold transition-all duration-200 cursor-pointer border border-orange-100 text-sm ${
                    payment === "Card / Online"
                      ? "!bg-orange-500 !text-white shadow-lg shadow-orange-500/20"
                      : "hover:!bg-orange-100/70"
                  }`}
                >
                  <FaCreditCard size={20} />
                  Credit / Debit Card
                </button>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-white rounded-3xl border border-orange-100/80 shadow-xl p-6 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-amber-950 mb-6 flex items-center gap-2.5">
                <FaShoppingBag className="text-orange-500 text-xl" />
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No items in cart.</p>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
                      <div>
                        <h4 className="font-bold text-amber-950">{item.title || item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Qty : {item.quantity || 1}</p>
                      </div>
                      <span className="font-bold text-orange-500">
                        ৳ {Number(item.price) * (item.quantity || 1)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <hr className="my-6 border-orange-100/70" />

              {/* Price Details */}
              <div className="space-y-3 bg-orange-50/40 rounded-2xl p-5 border border-orange-100/50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-bold text-amber-950">৳ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Delivery</span>
                  <span className={`font-bold ${delivery === 0 ? "text-green-600" : "text-amber-950"}`}>
                    {delivery === 0 ? "Free" : `৳ ${delivery.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Tax (5%)</span>
                  <span className="font-bold text-amber-950">৳ {tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Discount</span>
                    <span className="font-bold text-green-600">-৳ {discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-2xl font-black mt-6 pt-5 border-t border-dashed border-orange-200">
                <span className="text-amber-950">Total</span>
                <span className="!text-orange-500 text-3xl">৳ {totalAmount.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                className="w-full mt-8 !bg-orange-500 hover:!bg-orange-600 active:scale-[0.98] !text-white py-4 rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-orange-500/20 transition duration-300 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
                <FaShieldAlt className="text-green-500" />
                Secure Checkout · SSL Encrypted
              </div>
            </div>

          </div>

        </form>
      </div>

      {/* Order Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-amber-950/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 text-center shadow-2xl border border-orange-100">
            <div className="w-20 h-20 rounded-full bg-orange-100 mx-auto flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>

            <h2 className="text-3xl font-black text-amber-950 mt-6">
              Order Successful!
            </h2>

            <p className="text-gray-500 mt-3 leading-6 text-sm">
              Thank you for your purchase.
              <br />
              Your delicious food is now being prepared in our kitchen.
            </p>

            <div className="bg-orange-50 rounded-2xl py-4 mt-6 border border-orange-100">
              <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Order ID</p>
              <h3 className="text-orange-500 font-black text-2xl mt-1">
                #{placedOrderId ? placedOrderId.slice(-6).toUpperCase() : "SUCCESS"}
              </h3>
            </div>

            <button
              onClick={() => {
                setOrderSuccess(false);
                navigate("/");
              }}
              style={{ backgroundColor: "#f97316", color: "#ffffff" }}
              className="w-full mt-8 block text-center !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white py-4 rounded-2xl font-bold transition shadow-lg shadow-orange-500/20 cursor-pointer text-base"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </section>
  );
}