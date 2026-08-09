import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHamburger, FaShoppingBag, FaUsers, FaMoneyBillWave } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState({
    stats: { totalOrders: 0, totalCustomers: 0, totalFoods: 0, totalRevenue: 0 },
    recentOrders: []
  });

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", getAuthHeader());
        
        // Backend Response Handling (stats key thakle ba na thakle)
        const statsData = res.data.stats || res.data;
        const ordersData = res.data.recentOrders || [];

        setData({
          stats: {
            totalOrders: statsData.totalOrders || 0,
            totalCustomers: statsData.totalCustomers || 0,
            totalFoods: statsData.totalFoods || 0,
            totalRevenue: statsData.totalRevenue || 0,
          },
          recentOrders: ordersData,
        });
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };
    fetchDashboardData();
  }, []);

  const stats = [
    { id: 1, title: "Total Orders", value: data.stats.totalOrders, icon: <FaShoppingBag /> },
    { id: 2, title: "Customers", value: data.stats.totalCustomers, icon: <FaUsers /> },
    { id: 3, title: "Total Foods", value: data.stats.totalFoods, icon: <FaHamburger /> },
    { 
      id: 4, 
      title: "Total Revenue", 
      value: `৳ ${Number(data.stats.totalRevenue || 0).toFixed(2)}`, 
      icon: <FaMoneyBillWave /> 
    }
  ];

  return (
    <div className="p-6 md:p-10 bg-[#FFF7ED] min-h-screen">
      <h1 className="text-2xl font-black text-amber-950 mb-6">Dashboard Overview</h1>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">{stat.title}</p>
              <h2 className="text-2xl font-black text-amber-950 mt-1">{stat.value}</h2>
            </div>
            <div className="p-3 bg-orange-50 text-orange-500 rounded-xl text-xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
        <h2 className="text-lg font-bold text-amber-950 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-gray-400 uppercase">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {data.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-400 italic">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                data.recentOrders.map((order) => {
                  const customerName = order.customer?.name || order.user?.name || "Guest";
                  const total = Number(order.totalPrice || order.totalAmount || 0).toFixed(2);
                  const orderId = order._id ? order._id.slice(-6).toUpperCase() : "N/A";

                  return (
                    <tr key={order._id || Math.random()}>
                      <td className="py-3 font-bold text-orange-500">#{orderId}</td>
                      <td className="py-3 font-bold">{customerName}</td>
                      <td className="py-3 font-black text-slate-900">৳ {total}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            order.status === "Delivered" || order.status === "Ready"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "Cancelled"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}