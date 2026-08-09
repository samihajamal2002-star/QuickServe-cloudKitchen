import React from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaShippingFast,
  FaLeaf,
  FaAward,
  FaSmile,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

export default function About() {
  const stats = [
    { id: 1, icon: <FaSmile size={28} />, count: "15,000+", label: "Happy Customers" },
    { id: 2, icon: <FaUtensils size={28} />, count: "50+", label: "Delicious Dishes" },
    { id: 3, icon: <FaShippingFast size={28} />, count: "30 Min", label: "Average Delivery" },
    { id: 4, icon: <FaUsers size={28} />, count: "25+", label: "Expert Chefs" },
  ];

  const features = [
    {
      id: 1,
      icon: <FaLeaf className="text-3xl text-emerald-500" />,
      title: "100% Fresh Ingredients",
      desc: "We source our vegetables, meats, and spices daily from local trusted farms to guarantee quality.",
    },
    {
      id: 2,
      icon: <FaShippingFast className="text-3xl text-orange-500" />,
      title: "Superfast Express Delivery",
      desc: "Our cloud kitchen setup ensures your food is prepared instantly and delivered steaming hot.",
    },
    {
      id: 3,
      icon: <FaAward className="text-3xl text-amber-500" />,
      title: "Hygienic Kitchen Standards",
      desc: "We follow strict ISO-certified hygiene protocols and automated quality checks at every step.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#FFF7ED]">
      
      {/* 🚀 Hero Banner Section */}
      <div className="relative py-24 bg-gradient-to-b from-orange-100/60 to-[#FFF7ED] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold text-sm inline-block shadow-sm">
            About QuickServe
          </span>

          <h1 className="text-5xl md:text-6xl font-black text-amber-950 mt-6 tracking-tight leading-tight">
            Redefining <span className="!text-orange-500">Cloud Kitchen</span> Experience
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            QuickServe brings gourmet restaurant-quality meals straight from our state-of-the-art kitchen to your doorstep in minutes. Fresh, fast, and packed with flavor!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 space-y-24">

        {/* 🥘 Story & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Grid Collage */}
          <div className="relative grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
              alt="Kitchen Preparation"
              className="rounded-3xl shadow-lg object-cover h-64 md:h-80 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
              alt="Delicious Meal"
              className="rounded-3xl shadow-lg object-cover h-64 md:h-80 w-full mt-8"
            />
            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 !bg-white border border-orange-100 p-4 px-8 rounded-2xl shadow-xl text-center">
              <span className="text-3xl font-black !text-orange-500 block">4.9 ★</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Rated Kitchen</span>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Our Journey
            </span>

            <h2 className="text-4xl font-black text-amber-950 leading-tight">
              Crafting Passionate Culinary Delights Every Single Day
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Founded with a passion for food and technology, QuickServe was built to eliminate long wait times without sacrificing food freshness or flavor. By operating exclusively as a digital cloud kitchen, we focus entirely on high-speed delivery and food perfection.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Every dish on our menu is crafted by master chefs using handcrafted recipes, ensuring every bite feels special.
            </p>

            <div className="pt-4">
              <Link
                to="/menu"
                style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                className="inline-flex items-center gap-3 !bg-orange-500 hover:!bg-orange-600 !text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition active:scale-95 cursor-pointer"
              >
                Explore Our Menu <FaArrowRight />
              </Link>
            </div>
          </div>

        </div>

        {/* 📊 Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="!bg-white p-8 rounded-3xl border border-orange-100 shadow-md text-center hover:shadow-xl transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl !bg-orange-50 !text-orange-500 flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-amber-950">
                {stat.count}
              </h3>
              <p className="text-gray-500 text-sm font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ⭐ Why Choose Us Section */}
        <div>
          <div className="text-center mb-16">
            <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold text-sm inline-block">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-amber-950 mt-6">
              Our Core Promises
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="!bg-white p-8 rounded-3xl border border-orange-100 shadow-md hover:shadow-2xl transition duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl !bg-orange-50 flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-amber-950 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📢 CTA Banner */}
        <div className="!bg-gradient-to-r from-orange-500 to-amber-500 rounded-[36px] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Hungry? Order Your Favorite Meal Now!
          </h2>
          <p className="mt-4 text-orange-100 max-w-xl mx-auto text-sm md:text-base">
            Get 15% discount on your first order using coupon code <span className="font-bold underline">QUICK15</span>
          </p>
          
          <div className="mt-8">
            <Link
              to="/menu"
              className="!bg-white !text-orange-600 hover:!bg-orange-50 px-9 py-4 rounded-2xl font-bold text-base shadow-lg transition duration-300 inline-block active:scale-95 cursor-pointer"
            >
              Order Online Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}