import React from 'react';

const HowItWorks = () => {
  return (
    <div className="p-8 px-6 border-t border-gray-100">
      <div className="mb-4">
        <span className="text-lg font-extrabold text-gray-800 tracking-tight">How we operations</span>
      </div>
      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-1 items-center">
          <div className="text-center p-2">
            <div className="w-12 h-12 rounded-full bg-[#FFEBF2] flex items-center justify-center mx-auto mb-2.5">
              <i className="ti ti-click text-xl text-[#D70F64]"></i>
            </div>
            <div className="text-[10px] text-[#D70F64] font-bold uppercase mb-0.5">Step 01</div>
            <div className="text-xs font-bold text-gray-800">Select Meal</div>
            <div className="text-[10px] text-gray-500 mt-1 leading-normal">Pick delicious items from live cloud kitchen menu</div>
          </div>
          <div className="text-center text-gray-400 text-xl"><i className="ti ti-arrow-right"></i></div>
          <div className="text-center p-2">
            <div className="w-12 h-12 rounded-full bg-[#FFEBF2] flex items-center justify-center mx-auto mb-2.5">
              <i className="ti ti-tools-kitchen text-xl text-[#D70F64]"></i>
            </div>
            <div className="text-[10px] text-[#D70F64] font-bold uppercase mb-0.5">Step 02</div>
            <div className="text-xs font-bold text-gray-800">Hygiene Cook</div>
            <div className="text-[10px] text-gray-500 mt-1 leading-normal">Our expert chefs prepare it fresh under system watch</div>
          </div>
        </div>
        
        <div className="grid grid-cols-[1fr_auto_1fr] my-2">
          <div style={{ gridColumn: 2 }} className="text-center text-gray-400 text-lg">
            <i className="ti ti-arrow-down"></i>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-1 items-center">
          <div className="text-center p-2">
            <div className="w-12 h-12 rounded-full bg-[#FFEBF2] flex items-center justify-center mx-auto mb-2.5">
              <i className="ti ti-moped text-xl text-[#D70F64]"></i>
            </div>
            <div className="text-[10px] text-[#D70F64] font-bold uppercase mb-0.5">Step 04</div>
            <div className="text-xs font-bold text-gray-800">Enjoy Food</div>
            <div className="text-[10px] text-gray-500 mt-1 leading-normal">Arrives boiling hot at your doorstep layer in 30 mins</div>
          </div>
          <div className="text-center text-gray-400 text-xl scale-x-[-1]"><i className="ti ti-arrow-right"></i></div>
          <div className="text-center p-2">
            <div className="w-12 h-12 rounded-full bg-[#FFEBF2] flex items-center justify-center mx-auto mb-2.5">
              <i className="ti ti-map-pin-bolt text-xl text-[#D70F64]"></i>
            </div>
            <div className="text-[10px] text-[#D70F64] font-bold uppercase mb-0.5">Step 03</div>
            <div className="text-xs font-bold text-gray-800">Track Rider</div>
            <div className="text-[10px] text-gray-500 mt-1 leading-normal">Monitor rider assignment and live path signals</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;