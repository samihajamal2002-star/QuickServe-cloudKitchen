import React from 'react';

const StatsBar = () => {
  const stats = [
    { val: '50K+', desc: 'Happy Foodies' },
    { val: '250+', desc: 'Menu Items' },
    { val: '120K', desc: 'Orders Served' },
    { val: '4.9★', desc: 'User Rating' }
  ];

  return (
    <div className="bg-white py-4 px-6 flex justify-around border-b border-gray-100">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-eases text-base font-extrabold text-[#D70F64]">{stat.val}</div>
          <div className="text-[10px] text-gray-500 font-semibold mt-0.5">{stat.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;