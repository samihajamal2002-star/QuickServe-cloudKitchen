import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaPlus, FaMinus } from "react-icons/fa";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleStockChange = async (id, currentStock, change) => {
    const newStock = Math.max(0, currentStock + change);
    try {
      await axios.put(
        `http://localhost:5000/api/menu/stock/${id}`,
        { stock: newStock },
        getAuthHeader()
      );
      setItems(items.map((item) => (item._id === id ? { ...item, stock: newStock } : item)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF7ED] py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-xs font-bold">
            Inventory System
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3">Food Stock Management</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-orange-500 text-white text-xs uppercase font-bold">
              <tr>
                <th className="py-4 px-6">Food Item</th>
                <th className="py-4 px-6 text-center">Stock</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-orange-50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    Loading inventory...
                  </td>
                </tr>
              ) : items.map((item) => {
                const isLowStock = (item.stock || 0) <= 10;
                return (
                  <tr key={item._id} className="hover:bg-orange-50/50">
                    <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-3">
                      <FaBoxOpen className="text-orange-500" />
                      {item.name}
                    </td>

                    <td className="py-4 px-6 text-center font-bold">
                      {item.stock || 0}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isLowStock ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                      }`}>
                        {isLowStock ? "Low Stock" : "In Stock"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleStockChange(item._id, item.stock || 0, 1)}
                          className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition"
                        >
                          <FaPlus size={12} />
                        </button>
                        <button
                          onClick={() => handleStockChange(item._id, item.stock || 0, -1)}
                          className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition"
                        >
                          <FaMinus size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}