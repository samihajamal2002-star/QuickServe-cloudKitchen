import { Link } from "react-router-dom";

import heroBurger from "../assets/hero-burger.png";
import fries from "../assets/fries.png";
import drink from "../assets/drink.png";

export default function OfferBanner() {
  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-none bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 shadow-2xl shadow-orange-500/25">

          {/* Soft Blur Circles */}
          <div className="absolute -left-32 -top-32 w-[350px] h-[350px] rounded-full bg-white/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute -right-32 bottom-0 w-[300px] h-[300px] rounded-full bg-yellow-200/30 blur-[100px] pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 items-center gap-8">

            {/* LEFT */}
            <div className="relative z-20 p-10 lg:p-14">
              <span className="bg-white text-orange-600 text-xs font-black uppercase tracking-wider px-5 py-2 rounded-full shadow-sm">
                🔥 Today's Special Offer
              </span>

              <h2 className="text-4xl lg:text-6xl font-black text-white mt-6 leading-tight">
                Get <span className="text-yellow-200">50% OFF</span> <br />
                On Your First Order
              </h2>

              <p className="text-orange-50 text-base lg:text-lg mt-6 max-w-lg leading-relaxed">
                Order your favourite burgers, pizzas and drinks today. Freshly prepared and delivered within 20–30 minutes.
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">
                <Link
                  to="/menu"
                  className="bg-white text-orange-500 hover:bg-slate-900 hover:text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg text-sm"
                >
                  Order Now →
                </Link>

                <Link
                  to="/menu"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3.5 rounded-2xl font-bold transition-all text-sm"
                >
                  View Menu
                </Link>
              </div>
            </div>

            {/* RIGHT - PC Floating Graphics */}
            <div className="relative flex justify-center items-center py-8 lg:py-12">
              
              {/* Main Burger Image */}
              <img
                src={heroBurger}
                alt="Offer Burger"
                className="relative z-20 w-[420px] lg:w-[460px] hover:scale-105 transition-transform duration-500 drop-shadow-2xl object-contain"
              />

              {/* Discount Percentage Floating Circle */}
              <div className="absolute top-4 right-10 bg-yellow-300 rounded-full w-28 h-28 flex flex-col justify-center items-center shadow-2xl z-30 animate-bounce border-4 border-white">
                <h2 className="text-3xl font-black text-slate-900">50%</h2>
                <p className="text-xs font-black text-slate-800">OFF</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}