import React from 'react';

const TrackBanner = () => {
  return (
    <div className="mx-6 mb-6 bg-gradient-to-r from-[#D70F64] to-[#b50b52] rounded-xl p-5 flex justify-between items-center shadow-[0_6px_15px_rgba(215,15,100,0.2)]">
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
          <i className="ti ti-radar text-base"></i> Track active delivery status
        </div>
        <div className="text-[11px] text-white/85 font-medium">
          Injected system interface for real-time tracking
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <input 
          type="text" 
          placeholder="Order Code e.g. #752" 
          className="bg-white/20 border border-white/25 rounded-lg p-2 px-3 text-xs text-white placeholder-white/60 outline-none w-[140px]"
        />
        <button className="bg-white border-none rounded-lg p-2 px-4 text-xs font-bold text-[#D70F64] cursor-pointer hover:opacity-90 transition-opacity">
          Locate
        </button>
      </div>
    </div>
  );
};

export default TrackBanner;