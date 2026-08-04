import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

export default function Checkout() {
  const [payment, setPayment] = useState("cash");
  const [orderSuccess, setOrderSuccess] = useState(false);

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

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT SIDE: Billing Form (Icons Removed) */}
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
                  placeholder="+8801XXXXXXXXX"
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
                  placeholder="Enter your address..."
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
                  onClick={() => setPayment("cash")}
                  style={{
                    backgroundColor: payment === "cash" ? "#f97316" : "#fff7ed",
                    color: payment === "cash" ? "#ffffff" : "#78350f",
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl font-semibold transition cursor-pointer border border-orange-100 ${
                    payment === "cash"
                      ? "!bg-orange-500 !text-white shadow-lg shadow-orange-500/20"
                      : "hover:!bg-orange-100"
                  }`}
                >
                  <FaMoneyBillWave size={22} />
                  Cash On Delivery
                </button>

                <button
                  onClick={() => setPayment("card")}
                  style={{
                    backgroundColor: payment === "card" ? "#f97316" : "#fff7ed",
                    color: payment === "card" ? "#ffffff" : "#78350f",
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl font-semibold transition cursor-pointer border border-orange-100 ${
                    payment === "card"
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

              {/* Item 1 */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-amber-950">Classic Burger</h4>
                  <p className="text-sm text-gray-500">Qty : 2</p>
                </div>
                <span className="font-black !text-orange-500">$130</span>
              </div>

              {/* Item 2 */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-amber-950">Chicken Pizza</h4>
                  <p className="text-sm text-gray-500">Qty : 1</p>
                </div>
                <span className="font-black !text-orange-500">$99</span>
              </div>

              <hr className="my-6 border-gray-100" />

              {/* Price Details */}
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-amber-950">$229.00</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold text-amber-950">$11.45</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">-$15.00</span>
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              <div className="flex justify-between text-3xl font-black">
                <span className="text-amber-950">Total</span>
                <span className="!text-orange-500">$225.45</span>
              </div>

              <button
                onClick={() => setOrderSuccess(true)}
                style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                className="w-full mt-8 !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 transition duration-300 cursor-pointer"
              >
                Place Order
              </button>
            </div>

          </div>

        </div>
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
              Your delicious food is now being prepared.
            </p>

            <div className="!bg-orange-50 rounded-2xl py-4 mt-6 border border-orange-100">
              <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Order ID</p>
              <h3 className="!text-orange-500 font-black text-2xl mt-1">
                #FD2026
              </h3>
            </div>

            <Link
              to="/"
              onClick={() => setOrderSuccess(false)}
              style={{ backgroundColor: "#f97316", color: "#ffffff" }}
              className="w-full mt-8 block text-center !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white py-4 rounded-2xl font-bold transition shadow-lg shadow-orange-500/20"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}