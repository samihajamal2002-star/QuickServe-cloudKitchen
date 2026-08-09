import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import {
  FaMotorcycle,
  FaShippingFast,
  FaCheckCircle,
  FaSync,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaWallet,
  FaHistory,
  FaDirections,
} from "react-icons/fa";

export default function RiderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("assigned");
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const fetchRiderOrders = async () => {
    setLoading(true);
    try {
      let res;
      try {
        res = await axios.get("/orders/rider", getAuthHeader());
      } catch (err) {
        res = await axios.get("/orders", getAuthHeader());
      }

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (res.data?.orders) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching rider orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiderOrders();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`/orders/${id}`, { status: newStatus }, getAuthHeader());
      fetchRiderOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  const openGoogleMaps = (address) => {
    if (!address) return alert("Customer address not provided!");
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
  };

  const activeOrders = orders.filter(
    (o) => o.status === "Ready" || o.status === "Out For Delivery"
  );
  const completedOrders = orders.filter((o) => o.status === "Delivered");

  const deliveryFeePerOrder = 50;
  const totalEarnings = completedOrders.length * deliveryFeePerOrder;

  const filterBySearch = (list) => {
    if (!searchTerm) return list;
    return list.filter(
      (o) =>
        o._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.customer?.name || o.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.phone || "").includes(searchTerm)
    );
  };

  return (
    <section className="min-h-screen bg-white font-sans w-full">
      <div className="w-full space-y-6 p-4 md:p-6">
        
        {/* Header Bar */}
        <header className="bg-slate-50 p-5 md:p-6 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Rider <span className="text-orange-500">Dashboard</span>
              </h1>
              <span className="p-2 bg-orange-100 text-orange-600 rounded-lg text-xl">
                <FaMotorcycle />
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Delivery management, navigation & live queue.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {user && (
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200">
                <FaUserCircle className="text-2xl text-orange-500" />
                <div className="text-left">
                  <p className="font-bold text-sm text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                    {user.role || "Rider"}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={fetchRiderOrders}
              className="p-3 bg-white hover:bg-orange-50 text-slate-600 hover:text-orange-500 transition-colors cursor-pointer border border-slate-200 rounded-lg text-base"
              title="Refresh Queue"
            >
              <FaSync className={loading ? "animate-spin text-orange-500" : ""} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer shadow-xs"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* 📊 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          <div
            onClick={() => setActiveTab("assigned")}
            className={`p-5 cursor-pointer border rounded-xl transition-all duration-200 flex items-center justify-between ${
              activeTab === "assigned"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300"
            }`}
          >
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === "assigned" ? "text-orange-100" : "text-slate-500"}`}>
                Assigned Orders
              </p>
              <h2 className="text-3xl font-black mt-1.5">{activeOrders.length}</h2>
            </div>
            <div className={`p-3.5 rounded-lg text-2xl ${
              activeTab === "assigned" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-500"
            }`}>
              <FaShippingFast />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("earnings")}
            className={`p-5 cursor-pointer border rounded-xl transition-all duration-200 flex items-center justify-between ${
              activeTab === "earnings"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300"
            }`}
          >
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === "earnings" ? "text-orange-100" : "text-slate-500"}`}>
                Earnings Overview
              </p>
              <h2 className="text-3xl font-black mt-1.5">৳{totalEarnings}</h2>
            </div>
            <div className={`p-3.5 rounded-lg text-2xl ${
              activeTab === "earnings" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-500"
            }`}>
              <FaWallet />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("history")}
            className={`p-5 cursor-pointer border rounded-xl transition-all duration-200 flex items-center justify-between ${
              activeTab === "history"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300"
            }`}
          >
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === "history" ? "text-orange-100" : "text-slate-500"}`}>
                Completed History
              </p>
              <h2 className="text-3xl font-black mt-1.5">{completedOrders.length}</h2>
            </div>
            <div className={`p-3.5 rounded-lg text-2xl ${
              activeTab === "history" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-500"
            }`}>
              <FaHistory />
            </div>
          </div>
        </div>

        {/* 🚚 TAB 1: Assigned Orders Queue */}
        {activeTab === "assigned" && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <FaShippingFast className="text-orange-500 text-lg" />
                <h2 className="text-base font-bold text-slate-800">Assigned Orders Queue</h2>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-md">
                  {filterBySearch(activeOrders).length}
                </span>
              </div>

              {/* Search input without Icon */}
              <div className="w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search ID, Name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin h-7 w-7 border-3 border-orange-500 border-t-transparent mb-2"></div>
                <p className="text-slate-500 font-medium text-sm">Loading live orders...</p>
              </div>
            ) : filterBySearch(activeOrders).length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-medium text-sm">
                No orders active in queue.
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-4 px-5">Order ID</th>
                      <th className="py-4 px-5">Customer</th>
                      <th className="py-4 px-5">Address</th>
                      <th className="py-4 px-5">Items</th>
                      <th className="py-4 px-5 text-center">Status</th>
                      <th className="py-4 px-5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                    {filterBySearch(activeOrders).map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 font-mono font-bold text-orange-600 text-sm">
                          #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
                        </td>

                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="font-bold text-slate-800 text-sm">
                            {order.customer?.name || order.user?.name || "Customer"}
                          </div>
                          <a
                            href={`tel:${order.phone || order.customer?.phone}`}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-600 mt-1 font-semibold"
                          >
                            <FaPhoneAlt className="text-xs text-slate-400" />
                            {order.phone || order.customer?.phone || "N/A"}
                          </a>
                        </td>

                        <td className="py-4 px-5 min-w-[200px]">
                          <div className="flex items-start gap-1.5 text-slate-700 leading-snug">
                            <FaMapMarkerAlt className="text-rose-500 text-sm mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2 text-xs font-semibold">{order.address || "N/A"}</span>
                          </div>
                          <button
                            onClick={() => openGoogleMaps(order.address)}
                            className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                          >
                            <FaDirections /> Navigate Map
                          </button>
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                            {order.items?.map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs px-3 py-1 rounded font-semibold border border-slate-200"
                              >
                                {item.food?.title || item.food?.name || item.name}
                                <strong className="text-orange-600 font-bold">x{item.quantity}</strong>
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* 🌟 FIX: Injected Direct Explicit Style for Status Badge */}
                        <td className="py-4 px-5 text-center whitespace-nowrap">
                          <span
                            style={{
                              padding: "8px 16px",
                              fontSize: "13px",
                              lineHeight: "1.4",
                              display: "inline-block",
                            }}
                            className={`rounded-full font-bold uppercase tracking-wide border ${
                              order.status === "Out For Delivery"
                                ? "bg-amber-100 text-amber-800 border-amber-300"
                                : "bg-orange-100 text-orange-800 border-orange-300"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        {/* 🌟 FIX: Injected Direct Explicit Style for Action Button */}
                        <td className="py-4 px-5 text-center whitespace-nowrap">
                          {order.status === "Ready" && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, "Out For Delivery")}
                              style={{
                                padding: "10px 20px",
                                fontSize: "13px",
                                lineHeight: "1.4",
                              }}
                              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition cursor-pointer inline-flex items-center gap-2 shadow-md active:scale-95"
                            >
                              <FaMotorcycle className="text-base" /> Pick Up
                            </button>
                          )}

                          {order.status === "Out For Delivery" && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, "Delivered")}
                              style={{
                                padding: "10px 20px",
                                fontSize: "13px",
                                lineHeight: "1.4",
                              }}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition cursor-pointer inline-flex items-center gap-2 shadow-md active:scale-95"
                            >
                              <FaCheckCircle className="text-base" /> Deliver
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 💵 TAB 2: Earnings Overview */}
        {activeTab === "earnings" && (
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <FaWallet className="text-amber-500" /> Wallet & Earnings
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-orange-50/60 p-6 rounded-lg border border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase">Completed Rides</p>
                <h3 className="text-3xl font-black text-slate-800 mt-2">{completedOrders.length} Rides</h3>
              </div>
              <div className="bg-amber-50/60 p-6 rounded-lg border border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase">Total Earnings</p>
                <h3 className="text-3xl font-black text-slate-800 mt-2">৳{totalEarnings}</h3>
              </div>
            </div>
          </div>
        )}

        {/* 📜 TAB 3: Completed History */}
        {activeTab === "history" && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FaHistory className="text-blue-500" /> Completed Orders History
              </h2>
            </div>

            {completedOrders.length === 0 ? (
              <p className="text-center py-12 text-slate-400 font-medium text-sm">No completed orders yet.</p>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-sm font-medium">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200">
                      <th className="py-4 px-5">Order ID</th>
                      <th className="py-4 px-5">Customer</th>
                      <th className="py-4 px-5">Address</th>
                      <th className="py-4 px-5 text-center">Earnings</th>
                      <th className="py-4 px-5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {completedOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-5 font-mono font-bold text-orange-600">
                          #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
                        </td>
                        <td className="py-4 px-5 font-bold text-slate-800">
                          {order.customer?.name || order.user?.name || "Customer"}
                        </td>
                        <td className="py-4 px-5 text-slate-600">{order.address || "N/A"}</td>
                        <td className="py-4 px-5 text-center font-bold text-emerald-600">+৳{deliveryFeePerOrder}</td>
                        <td className="py-4 px-5 text-center">
                          <span
                            style={{ padding: "6px 14px", fontSize: "12px" }}
                            className="bg-emerald-100 text-emerald-800 font-bold rounded-full inline-block whitespace-nowrap"
                          >
                            Delivered
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}