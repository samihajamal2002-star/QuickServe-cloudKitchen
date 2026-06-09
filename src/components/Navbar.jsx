import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[#D70F64] rounded-lg flex items-center justify-center">
          <i className="ti ti-chef-hat text-white text-lg"></i>
        </div>
        <div>
          <div className="text-base font-extrabold text-[#D70F64]">
            Quick<span className="text-gray-800">Serve</span>
          </div>
          <div className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">
            Cloud Kitchen
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4.5">
        <a href="#" className="text-xs font-semibold text-[#D70F64]">Home</a>
        <a href="#" className="text-xs font-semibold text-gray-800 hover:text-[#D70F64] transition-colors">Menu</a>
        <a href="#" className="text-xs font-semibold text-gray-800 hover:text-[#D70F64] transition-colors">Track Order</a>
        <a href="#" className="text-xs font-semibold text-gray-800 hover:text-[#D70F64] transition-colors">About</a>
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="text-xs font-bold text-gray-800 hover:text-[#D70F64]">Login</a>
        <button className="bg-[#D70F64] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#b50b52] transition-colors">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;