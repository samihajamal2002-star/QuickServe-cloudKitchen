import React from "react";
import { FaChartLine, FaMoneyBillWave, FaUtensils, FaCheckCircle } from "react-icons/fa";

export default function Analytics() {
  return (
    <div className="p-6 md:p-8 bg-white min-h-screen space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <FaChartLine className="text-orange-500" /> Platform Analytics
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Real-time overview of revenue, orders, and sales performance.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">Total Sales</span>
            <FaMoneyBillWave className="text-emerald-500 text-xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mt-2">৳45,200</h2>
        </div>

        <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">Total Orders</span>
            <FaUtensils className="text-orange-500 text-xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mt-2">128</h2>
        </div>

        <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">Completed Deliveries</span>
            <FaCheckCircle className="text-blue-500 text-xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mt-2">112</h2>
        </div>

        <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">Admin Commission (15%)</span>
            <FaMoneyBillWave className="text-amber-500 text-xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mt-2">৳6,780</h2>
        </div>
      </div>

      <div className="p-6 border border-slate-200 rounded-2xl bg-orange-50/40">
        <h3 className="font-bold text-slate-800 text-sm mb-1">Kitchen Operational Efficiency</h3>
        <p className="text-xs text-slate-600 font-medium">
          Average order preparation time is currently **18 minutes**. Delivery success rate is **94%**.
        </p>
      </div>
    </div>
  );
}