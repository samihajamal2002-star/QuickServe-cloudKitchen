import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[#FFEBF2] px-8 py-10 flex items-center justify-between gap-4 relative">
      <div className="flex-1">
        <div className="inline-flex items-center gap-1 bg-white text-[#D70F64] text-[11px] font-bold px-2.5 py-1 rounded-full mb-3.5 shadow-sm">
          <i className="ti ti-device-motorcycle text-xs"></i> Super-fast 30 min Delivery
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight mb-2.5 tracking-tight">
          Fresh Meals,<br /><span className="text-[#D70F64]">Delivered Right</span><br />To You
        </h1>
        <p className="text-xs text-gray-600 leading-relaxed mb-5.5 max-w-[320px]">
          Delicious multi-brand cuisines cooked under absolute hygiene layers and dispatched instantly.
        </p>
        <div className="flex gap-3">
          <button className="bg-[#D70F64] text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-[#b50b52] transition-colors">
            <i className="ti ti-basket text-sm"></i> Order Now
          </button>
          <button className="bg-white text-[#D70F64] text-xs font-bold px-5 py-2.5 rounded-lg border border-[#D70F64] hover:bg-[#FFEBF2] transition-colors">
            View Menu
          </button>
        </div>
      </div>

      <div className="w-[150px] h-[140px] flex-shrink-0 relative flex items-center justify-center">
        <div className="w-[115px] h-[115px] bg-white rounded-full shadow-[0_8px_20px_rgba(215,15,100,0.15)] flex items-center justify-center">
          <i className="ti ti-soup text-[56px] text-[#D70F64]"></i>
        </div>
        <div className="absolute top-0 -right-1.5 bg-white rounded-xl p-1.5 px-2.5 shadow-md border border-gray-50 text-center">
          <div className="text-xs font-extrabold text-[#D70F64]">30 min</div>
          <div className="text-[9px] text-gray-500 font-medium">Avg Delivery</div>
        </div>
        <div className="absolute bottom-0 -left-1.5 bg-white rounded-xl p-1.5 px-2.5 shadow-md border border-gray-50 text-center">
          <div className="text-xs font-extrabold text-[#D70F64]">4.9 ★</div>
          <div className="text-[9px] text-gray-500 font-medium">Top Rated</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;