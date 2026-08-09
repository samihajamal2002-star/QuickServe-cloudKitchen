import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
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

    // 1. Valid MongoDB ObjectId Check & Items Mapping
    const formattedItems = cartItems.map((item) => {
      const foodId = item._id || item.id;
      return {
        food: typeof foodId === "string" && foodId.length === 24 ? foodId : undefined,
        quantity: item.quantity || 1,
        price: Number(item.price),
        name: item.title || item.name || "Food Item",
      };
    });

    // 2. User ID for Customer Field
    const customerId = user._id || user.id;

    // 3. Payment Method
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
      status: "Pending", // 👈 Default status Pending পাঠানো নিশ্চিত করা
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
    <section className="min-h-screen bg-[#FFF7ED] py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold">
            Checkout
          </span>
          <h1 className="text-5xl font-black text-amber-950 mt-6">
            Complete Your Order
          </h1>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Fill in your information below to complete your delicious order.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT SIDE: Billing Form */}
          <div className="lg:col-span-2">
            <div className="!bg-white rounded-3xl shadow-xl border border-orange-100 p-10">
              <h2 className="text-3xl font-bold text-amber-950 mb-10">
                Billing Information
              </h2>

              {/* Name */}
              <div className="mb-6">
                <label className="font-semibold text-gray-600 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 text-amber-950 bg-white"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="font-semibold text-gray-600 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 text-amber-950 bg-white"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="font-semibold text-gray-600 mb-2 block">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 text-amber-950 bg-white"
                />
              </div>

              {/* Address */}
              <div>
                <label className="font-semibold text-gray-600 mb-2 block">
                  Delivery Address
                </label>
                <textarea
                  rows="4"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full house address..."
                  className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none resize-none focus:border-orange-500 text-amber-950 bg-white"
                ></textarea>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Payment & Summary */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Payment Method */}
            <div className="!bg-white rounded-3xl border border-orange-100 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-amber-950 mb-8">
                Payment Method
              </h2>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPayment("Cash On Delivery")}
                  style={{
                    backgroundColor: payment === "Cash On Delivery" ? "#f97316" : "#fff7ed",
                    color: payment === "Cash On Delivery" ? "#ffffff" : "#78350f",
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl font-semibold transition cursor-pointer border border-orange-100 ${
                    payment === "Cash On Delivery"
                      ? "!bg-orange-500 !text-white shadow-lg shadow-orange-500/20"
                      : "hover:!bg-orange-100"
                  }`}
                >
                  <FaMoneyBillWave size={22} />
                  Cash On Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPayment("Card / Online")}
                  style={{
                    backgroundColor: payment === "Card / Online" ? "#f97316" : "#fff7ed",
                    color: payment === "Card / Online" ? "#ffffff" : "#78350f",
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl font-semibold transition cursor-pointer border border-orange-100 ${
                    payment === "Card / Online"
                      ? "!bg-orange-500 !text-white shadow-lg shadow-orange-500/20"
                      : "hover:!bg-orange-100"
                  }`}
                >
                  <FaCreditCard size={22} />
                  Credit / Debit Card
                </button>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="!bg-white rounded-3xl border border-orange-100 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-amber-950 mb-8">
                Order Summary
              </h2>

              {/* Dynamic Items List from Cart */}
              <div className="space-y-4 max-h-48 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No items in cart.</p>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-amber-950">{item.title || item.name}</h4>
                        <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
                      </div>
                      <span className="font-black !text-orange-500">
                        ৳ {item.price * item.quantity}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <hr className="my-6 border-gray-100" />

              {/* Price Details */}
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-amber-950">৳ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">
                    {delivery === 0 ? "Free" : `৳ ${delivery.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span className="font-semibold text-amber-950">৳ {tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">-৳ {discount.toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              <div className="flex justify-between text-3xl font-black">
                <span className="text-amber-950">Total</span>
                <span className="!text-orange-500">৳ {totalAmount.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                className="w-full mt-8 !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 transition duration-300 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>

          </div>

        </form>
      </div>

      {/* Order Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-amber-950/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="!bg-white w-full max-w-md rounded-3xl p-8 text-center shadow-2xl border border-orange-100">
            <div className="w-20 h-20 rounded-full !bg-orange-100 mx-auto flex items-center justify-center">
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

            <div className="!bg-orange-50 rounded-2xl py-4 mt-6 border border-orange-100">
              <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Order ID</p>
              <h3 className="!text-orange-500 font-black text-2xl mt-1">
                #{placedOrderId ? placedOrderId.slice(-6).toUpperCase() : "SUCCESS"}
              </h3>
            </div>

            <button
              onClick={() => {
                setOrderSuccess(false);
                navigate("/");
              }}
              style={{ backgroundColor: "#f97316", color: "#ffffff" }}
              className="w-full mt-8 block text-center !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white py-4 rounded-2xl font-bold transition shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </section>
  );
}