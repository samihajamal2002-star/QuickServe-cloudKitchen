import {
  FaShippingFast,
  FaHamburger,
  FaLeaf,
  FaHeadset,
  FaCreditCard,
  FaAward,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    desc: "Get your food delivered within 20-30 minutes anywhere in the city.",
    gradient: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-500/25 hover:shadow-orange-500/40",
    border: "group-hover:border-orange-500/50",
    badge: "20-30 Min",
  },
  {
    icon: <FaHamburger />,
    title: "Freshly Cooked",
    desc: "Every meal is freshly prepared right after your order is placed.",
    gradient: "from-red-500 to-rose-600",
    shadow: "shadow-red-500/25 hover:shadow-red-500/40",
    border: "group-hover:border-red-500/50",
    badge: "Made to Order",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Ingredients",
    desc: "Premium quality vegetables, organic meats, and spices used daily.",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25 hover:shadow-emerald-500/40",
    border: "group-hover:border-emerald-500/50",
    badge: "100% Organic",
  },
  {
    icon: <FaCreditCard />,
    title: "Secure Payment",
    desc: "Pay seamlessly via Cash on Delivery or end-to-end encrypted cards.",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/25 hover:shadow-blue-500/40",
    border: "group-hover:border-blue-500/50",
    badge: "Encrypted",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Need assistance? Our friendly support team is always active.",
    gradient: "from-purple-500 to-pink-600",
    shadow: "shadow-purple-500/25 hover:shadow-purple-500/40",
    border: "group-hover:border-purple-500/50",
    badge: "Always Open",
  },
  {
    icon: <FaAward />,
    title: "Best Quality",
    desc: "Rated 4.9/5 by thousands of happy food lovers across the nation.",
    gradient: "from-amber-500 to-yellow-500",
    shadow: "shadow-amber-500/25 hover:shadow-amber-500/40",
    border: "group-hover:border-amber-500/50",
    badge: "Top Rated",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden text-white">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-5 py-2 rounded-full font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Why Choose Us
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
            Why Customers <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-500 bg-clip-text text-transparent">Love QuickServe</span>
          </h2>

          {/* Updated paragraph: Keeps text strictly on 1 line on medium/large screens */}
          <p className="mt-5 text-slate-400 max-w-none md:whitespace-nowrap mx-auto text-base sm:text-lg leading-relaxed">
            We deliver more than just food—we bring hot, restaurant-grade experiences directly to your doorstep with unmatched speed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800/80 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-2.5 shadow-xl ${item.border}`}
            >
              {/* Feature Badge */}
              <span className="absolute top-6 right-6 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 border border-slate-700/50 px-3 py-1 rounded-full group-hover:text-white transition-colors">
                {item.badge}
              </span>

              {/* Icon Container */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white text-3xl flex items-center justify-center shadow-lg ${item.shadow} group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}
              >
                {item.icon}
              </div>

              {/* Title & Description */}
              <h3 className="mt-7 text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>

              {/* Bottom Decorative Line */}
              <div className="mt-6 w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${item.gradient} transition-all duration-500 ease-out`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}