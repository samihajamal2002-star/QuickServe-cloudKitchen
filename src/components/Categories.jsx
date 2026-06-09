import React from 'react';

const Categories = () => {
  const categories = [
    { icon: '🍔', name: 'Burgers', count: '8 items' },
    { icon: '🍕', name: 'Pizza', count: '6 items' },
    { icon: '🍜', name: 'Noodles', count: '5 items' },
    { icon: '🥤', name: 'Drinks', count: '10 items' }
  ];

  return (
    <div className="p-8 px-6 pb-4">
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-extrabold text-gray-800 tracking-tight">Browse categories</span>
        <a href="#" className="text-xs font-bold text-[#D70F64] flex items-center gap-0.5">
          View all <i className="ti ti-chevron-right text-[12px]"></i>
        </a>
      </div>
      <div className="grid grid-cols-4 gap-3.5">
        {categories.map((cat, i) => (
          <div key={i} className="border border-gray-50 rounded-xl p-3.5 text-center cursor-pointer bg-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[#D70F64]">
            <div className="text-2xl mb-1.5">{cat.icon}</div>
            <div className="text-xs text-gray-800 font-bold">{cat.name}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{cat.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;