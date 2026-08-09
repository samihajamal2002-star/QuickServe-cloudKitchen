import React, { useState } from "react";
import { FaCog, FaSave } from "react-icons/fa";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "QuickServe Cloud Kitchen",
    deliveryFee: "50",
    commissionRate: "15",
    isOpen: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6 md:p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2 mb-1">
        <FaCog className="text-orange-500" /> System Settings
      </h1>
      <p className="text-xs text-slate-500 font-semibold mb-6">
        Configure operational defaults and system settings.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4 font-medium text-xs text-slate-700">
        <div>
          <label className="block font-bold text-slate-800 mb-1">Platform Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-1">Default Delivery Fee (৳)</label>
          <input
            type="number"
            value={settings.deliveryFee}
            onChange={(e) => setSettings({ ...settings, deliveryFee: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-1">Admin Commission (%)</label>
          <input
            type="number"
            value={settings.commissionRate}
            onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer text-xs"
        >
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  );
}