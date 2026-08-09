import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { FaEye, FaTimes, FaCheck, FaSync } from "react-icons/fa";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth Header Generation
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // Fetch all orders from Admin API (with Array Safety Check)
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/orders", getAuthHeader());
      
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (res.data && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err?.response?.data || err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status (Confirm -> Preparing, Cancelled)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/orders/${id}`,
        { status },
        getAuthHeader()
      );
      fetchOrders();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error("Error updating status:", err?.response?.data || err.message);
      alert("Failed to update status!");
    }
  };

  // Filter orders by customer name
  const filteredOrders = orders.filter((order) => {
    const customerName = order.user?.name || order.customer?.name || order.name || "Guest";
    return customerName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section className="min-h-screen bg-[#FFF7ED] py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-xs font-bold">
              Admin Panel
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-3">
              Manage Orders
            </h1>
          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-orange-200 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition cursor-pointer active:scale-95"
          >
            <FaSync className={loading ? "animate-spin text-orange-500" : ""} />
            Refresh
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-orange-200 rounded-xl py-3 px-4 outline-none focus:border-orange-500 text-sm font-semibold text-slate-800 shadow-sm"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-orange-500 text-white text-xs uppercase font-bold">
                <tr>
                  <th className="py-4 px-4 text-center">Order ID</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Items Summary</th>
                  <th className="py-4 px-4">Total Amount</th>
                  <th className="py-4 px-4">Payment</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-orange-50 text-xs md:text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500 font-bold">
                      Loading orders...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500 font-semibold">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-orange-50/50 transition-colors">
                      {/* Order ID */}
                      <td className="text-center py-4 px-4 font-bold text-orange-500">
                        #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
                      </td>

                      {/* Customer Name */}
                      <td className="py-4 px-4 font-bold text-slate-800">
                        {order.user?.name || order.customer?.name || order.name || "Guest User"}
                      </td>

                      {/* Food Items List */}
                      <td className="py-4 px-4 text-slate-600">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, idx) => (
                            <div key={idx} className="font-semibold text-xs">
                              • {item.food?.title || item.food?.name || item.name || "Food Item"}{" "}
                              <span className="text-orange-500 font-bold">x {item.quantity || 1}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-slate-400 italic">No items</span>
                        )}
                      </td>

                      {/* Total Price */}
                      <td className="py-4 px-4 font-black text-slate-900">
                        ৳ {order.totalAmount || order.totalPrice || 0}
                      </td>

                      {/* Payment Method */}
                      <td className="py-4 px-4 font-semibold text-slate-600 capitalize">
                        {order.paymentMethod || "Cash On Delivery"}
                      </td>

                      {/* Order Status Badge */}
                      <td className="text-center py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                            order.status === "Delivered" || order.status === "Ready"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "Cancelled"
                              ? "bg-rose-100 text-rose-700"
                              : order.status === "Preparing" || order.status === "Cooking"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="text-center py-4 px-4">
                        <div className="flex justify-center items-center gap-2">
                          {/* View Details Button */}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="bg-orange-500 text-white p-2.5 rounded-xl hover:bg-orange-600 transition shadow-sm cursor-pointer"
                            title="View Details"
                          >
                            <FaEye />
                          </button>

                          {/* Confirm Order -> Set status to Preparing for Chef */}
                          {(order.status === "Pending" || !order.status) && (
                            <button
                              onClick={() => updateStatus(order._id, "Preparing")}
                              className="bg-emerald-500 text-white p-2.5 rounded-xl hover:bg-emerald-600 transition shadow-sm cursor-pointer flex items-center gap-1 font-bold text-xs"
                              title="Confirm Order (Send to Chef)"
                            >
                              <FaCheck /> Confirm
                            </button>
                          )}

                          {/* Cancel Order */}
                          {order.status !== "Cancelled" && order.status !== "Delivered" && (
                            <button
                              onClick={() => updateStatus(order._id, "Cancelled")}
                              className="bg-rose-500 text-white p-2.5 rounded-xl hover:bg-rose-600 transition shadow-sm cursor-pointer"
                              title="Cancel Order"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h2 className="text-xl font-bold text-slate-800">
                  Order Details (#{selectedOrder._id ? selectedOrder._id.slice(-6).toUpperCase() : "N/A"})
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-slate-800 cursor-pointer"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <strong>Customer:</strong>{" "}
                  {selectedOrder.user?.name || selectedOrder.customer?.name || selectedOrder.name || "Guest"}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedOrder.user?.phone || selectedOrder.customer?.phone || selectedOrder.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder.address || "N/A"}
                </p>
                <p>
                  <strong>Payment:</strong> {selectedOrder.paymentMethod || "Cash On Delivery"}
                </p>
                <p>
                  <strong>Total:</strong> ৳ {selectedOrder.totalAmount || selectedOrder.totalPrice || 0}
                </p>
                
                <div className="pt-2 border-t">
                  <strong>Ordered Items:</strong>
                  <ul className="list-disc ml-5 mt-2 space-y-1 text-xs text-gray-600">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, idx) => {
                        const price = item.price || item.food?.price || 0;
                        const qty = item.quantity || 1;
                        return (
                          <li key={idx}>
                            <span className="font-bold text-slate-800">
                              {item.food?.title || item.food?.name || item.name || "Item"}
                            </span>{" "}
                            x {qty}{" "}
                            <span className="text-orange-500 ml-1 font-semibold">
                              (৳ {price * qty})
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <li className="text-slate-400 italic">No item details available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}