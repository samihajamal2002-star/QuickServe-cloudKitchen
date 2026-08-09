import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // Axios Instance Path
import {
  FaClipboardList,
  FaFire,
  FaCheckCircle,
  FaSync,
  FaUtensils,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function ChefDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // User Profile from LocalStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // Auth Header for Protected Request
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // 1. Fetch Orders from Backend API
  const fetchChefOrders = async () => {
    setLoading(true);
    try {
      // Try /orders/chef Endpoint first, fallback to /orders
      let res;
      try {
        res = await axios.get("/orders/chef", getAuthHeader());
      } catch (err) {
        res = await axios.get("/orders", getAuthHeader());
      }
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching chef orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefOrders();
  }, []);

  // 2. Update Order Status Handler
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`/orders/${id}`, { status: newStatus }, getAuthHeader());
      fetchChefOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // 3. Dynamic Calculations & Active Kitchen Orders Filtering
  const pendingCount = orders.filter(
    (o) => o.status === "Pending" || !o.status
  ).length;
  const preparingCount = orders.filter(
    (o) => o.status === "Preparing" || o.status === "Cooking" || o.status === "Accepted"
  ).length;
  const readyCount = orders.filter(
    (o) => o.status === "Ready" || o.status === "Delivered"
  ).length;

  return (
    <section className="min-h-screen bg-orange-50/40 px-6 py-10 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* 🌟 Header Bar with User Info & Logout Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Chef <span className="text-orange-500">Dashboard</span>
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Manage real-time kitchen orders & preparation workflow.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* User Info Card */}
            {user && (
              <div className="flex items-center gap-3 bg-orange-50/80 px-4 py-2 rounded-2xl border border-orange-100">
                <FaUserCircle className="text-2xl text-orange-500" />
                <div className="text-left">
                  <p className="font-bold text-xs text-slate-800">{user.name}</p>
                  <p className="text-[10px] text-orange-600 font-semibold capitalize">
                    {user.role || "Chef"}
                  </p>
                </div>
              </div>
            )}

            {/* Refresh Button */}
            <button
              onClick={fetchChefOrders}
              className="p-3 bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-600 rounded-2xl transition-all cursor-pointer active:scale-95"
              title="Refresh Orders"
            >
              <FaSync className={loading ? "animate-spin text-orange-500" : ""} />
            </button>

            {/* 🚪 Log Out Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md shadow-rose-500/20 transition duration-200 cursor-pointer"
            >
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Pending */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex items-center justify-between group">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pending Orders
              </p>
              <h2 className="text-4xl font-black text-slate-800 mt-2">
                {pendingCount}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              <FaClipboardList />
            </div>
          </div>

          {/* Card 2: Preparing */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex items-center justify-between group">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Preparing Now
              </p>
              <h2 className="text-4xl font-black text-slate-800 mt-2">
                {preparingCount}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              <FaFire />
            </div>
          </div>

          {/* Card 3: Ready */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex items-center justify-between group">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ready / Done
              </p>
              <h2 className="text-4xl font-black text-slate-800 mt-2">
                {readyCount}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Kitchen Orders Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaUtensils className="text-orange-500" />
              Kitchen Live Queue
            </h2>
            <span className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              {orders.length} Total Orders
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent mb-4"></div>
              <p className="text-slate-500 font-semibold text-sm">
                Fetching kitchen queue...
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-20 h-20 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaUtensils />
              </div>
              <h3 className="text-lg font-bold text-slate-700">
                No orders in the kitchen!
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                All caught up. New customer orders will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">Customer Info</th>
                    <th className="py-4 px-6">Food Items</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Order ID */}
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg text-xs">
                          #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800">
                          {order.customer?.name || order.user?.name || "Customer"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.phone || order.customer?.phone || "No phone"}
                        </div>
                      </td>

                      {/* Food Items */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 font-medium text-slate-700"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                              <span>
                                {item.food?.name || item.food?.title || item.name || "Food Item"}
                              </span>
                              <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded text-xs">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "Ready" || order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : order.status === "Preparing" || order.status === "Cooking"
                              ? "bg-amber-50 text-amber-600 border border-amber-200 animate-pulse"
                              : "bg-rose-50 text-rose-600 border border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              order.status === "Ready" || order.status === "Delivered"
                                ? "bg-emerald-500"
                                : order.status === "Preparing" || order.status === "Cooking"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                          ></span>
                          {order.status || "Pending"}
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center items-center gap-2">
                          {order.status !== "Preparing" && order.status !== "Cooking" && order.status !== "Ready" && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, "Preparing")}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold text-xs transition shadow-sm hover:shadow active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                              <FaFire />
                              Start Cooking
                            </button>
                          )}

                          {(order.status === "Preparing" || order.status === "Cooking") && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, "Ready")}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs transition shadow-sm hover:shadow active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                              <FaCheckCircle />
                              Mark Ready
                            </button>
                          )}

                          {(order.status === "Ready" || order.status === "Delivered") && (
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}