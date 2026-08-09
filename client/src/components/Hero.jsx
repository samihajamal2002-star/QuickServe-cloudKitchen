import { Link } from "react-router-dom";

import heroBurger from "../assets/hero-burger.png";
import burger from "../assets/burger.png";
import pizza from "../assets/pizza.png";
import fries from "../assets/fries.png";
import drink from "../assets/drink.png";
import deliveryBoy from "../assets/delivery-boy.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFEFD8] min-h-screen pt-28 pb-16 flex items-center">

      {/* Background Soft Glow Effects */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-orange-300 blur-[160px] opacity-25 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-200 blur-[160px] opacity-30 pointer-events-none"></div>

      {/* Decorative Dots */}
      <div className="absolute top-28 left-32 w-6 h-6 rounded-full bg-orange-300 animate-ping opacity-60"></div>
      <div className="absolute bottom-28 left-1/2 w-5 h-5 rounded-full bg-yellow-300 animate-pulse opacity-60"></div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 items-center gap-16 relative z-10">

        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6">

          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 font-bold text-sm px-5 py-2 rounded-full shadow-sm border border-orange-200">
            🔥 #1 Cloud Kitchen in Town
          </span>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight text-slate-900 tracking-tight">
            Enjoy <span className="text-orange-500">Fresh</span> <br />
            Delicious <br />
            Food Everyday
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            QuickServe delivers freshly prepared burgers, pizzas, drinks and fast food directly from our cloud kitchen to your doorstep within 20–30 minutes.
          </p>

          <div className="flex items-center gap-5 pt-2 mb-12">
           <Link
  to="/menu"
  className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-16 py-5 rounded-full font-bold text-2xl shadow-2xl shadow-orange-500/50 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/70 min-w-[340px]"
>
  <span className="relative z-30 flex items-center justify-center gap-4 w-full">
    <span className="text-3xl">🍔</span>

    <span>Order Now</span>

    <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">
      →
    </span>
  </span>

  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
</Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 mt-30">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-orange-50/50 text-center">
              <h2 className="text-4xl font-black text-orange-500">500+</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Food Items</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-orange-50/50 text-center">
              <h2 className="text-4xl font-black text-orange-500">2K+</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Happy Clients</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-orange-50/50 text-center">
              <h2 className="text-4xl font-black text-orange-500">24/7</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Express Delivery</p>
            </div>
          </div>

        </div>

        {/* ================= RIGHT HERO ILLUSTRATION ================= */}
        <div className="relative flex justify-center items-center py-8">

          {/* Main Orange Circle Accent */}
          <div className="absolute w-[480px] lg:w-[500px] h-[480px] lg:h-[500px] rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-2xl shadow-orange-500/30"></div>

          {/* Main Hero Burger Image */}
          <img
            src={heroBurger}
            alt="Hero Burger"
            className="relative z-20 w-[520px] lg:w-[540px] hover:scale-105 transition-transform duration-500 drop-shadow-2xl object-contain"
          />

         


          {/* Rating Badge Card */}
          <div className="absolute top-22 -left-8 z-40 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-xl border border-gray-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-xl">
              ⭐
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">4.9 Rating</h3>
              <p className="text-xs text-gray-500">2,000+ Reviews</p>
            </div>
          </div>

          {/* Delivery Boy Card */}
          <div className="absolute bottom-20 -right-4 z-40 bg-white rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3 border border-gray-100">
            <img
              src={deliveryBoy}
              alt="Delivery Rider"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-800">Fast Delivery</h3>
              <p className="text-xs text-gray-500">20 - 30 Mins</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}