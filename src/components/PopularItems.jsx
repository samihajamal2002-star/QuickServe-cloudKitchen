import React from 'react';

const PopularItems = () => {
  const items = [
    { img: '🍔', name: 'Smash Burger', cat: 'Gourmet Burgers', price: '৳ 220', bg: 'bg-[#FFF3F7]' },
    { img: '🍜', name: 'Spicy Noodles', cat: 'Chow Mein Layers', price: '৳ 180', bg: 'bg-[#F0FAf2]' },
    { img: '🍕', name: 'Cheese Pizza', cat: 'Thin Crust Style', price: '৳ 350', bg: 'bg-[#F4F7FE]' }
  ];

  return (
    <div className="p-8 px-6 border-t border-gray-100">
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-extrabold text-gray-800 tracking-tight">Popular items near you</span>
        <a href="#" className="text-xs font-bold text-[#D70F64] flex items-center gap-0.5">
          See all <i className="ti ti-chevron-right text-[12px]"></i>
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3.5">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-50 rounded-xl overflow-hidden bg-white cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#FFEBF2]">
            <div className={`h-[90px] flex items-center justify-center text-4xl ${item.bg}`}>
              {item.img}
            </div>
            <div className="p-3">
              <div className="text-xs font-bold text-gray-800">{item.name}</div>
              <div className="text-[11px] text-gray-400 mt-0.5 mb-2.5">{item.cat}</div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-extrabold text-gray-800">{item.price}</span>
                <button className="w-6.5 h-6.5 bg-[#D70F64] rounded-full flex items-center justify-center text-white font-bold text-base hover:bg-[#b50b52] transition-colors">
                  <i className="ti ti-plus text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;