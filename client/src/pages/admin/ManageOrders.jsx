import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaTruck,
} from "react-icons/fa";

const initialOrders = [
  {
    id: "#1001",
    customer: "Samiha Jamal",
    phone: "+8801711111111",
    food: "Classic Burger",
    total: 130,
    payment: "Cash",
    status: "Pending",
  },
  {
    id: "#1002",
    customer: "Rahim Ahmed",
    phone: "+8801811111111",
    food: "Chicken Pizza",
    total: 99,
    payment: "Card",
    status: "Delivered",
  },
  {
    id: "#1003",
    customer: "Karim Hasan",
    phone: "+8801911111111",
    food: "Italian Pasta",
    total: 85,
    payment: "Cash",
    status: "Pending",
  },
];

export default function ManageOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <section className="min-h-screen bg-[#FFF7ED] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center flex-wrap gap-5">

          <div>

            <span className="bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-semibold">
              Admin Panel
            </span>

            <h1 className="text-5xl font-black mt-5">
              Manage Orders
            </h1>

          </div>

        </div>

        {/* Search */}

        <div className="relative mt-10">

          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-orange-200 rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-orange-500"
          />

        </div>

        {/* Orders Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mt-10">

          <table className="w-full">

            <thead className="bg-orange-500 text-white">

              <tr>

                <th className="py-5">Order ID</th>
                <th>Customer</th>
                <th>Food</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-orange-50"
                >

                  <td className="text-center py-5 font-semibold">
                    {order.id}
                  </td>

                  <td className="text-center">
                    {order.customer}
                  </td>

                  <td className="text-center">
                    {order.food}
                  </td>

                  <td className="text-center">
                    ${order.total}
                  </td>

                  <td className="text-center">
                    {order.payment}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        order.status === "Pending"
                          ? "bg-orange-100 text-orange-600"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(order.id, "Delivered")
                        }
                        className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600"
                      >
                        <FaTruck />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(order.id, "Cancelled")
                        }
                        className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
                {/* Order Details Popup */}

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-[500px] rounded-3xl p-8 shadow-2xl">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold text-slate-800">
                  Order Details
                </h2>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-500 hover:text-white transition"
                >
                  <FaTimes className="mx-auto" />
                </button>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Order ID
                  </span>

                  <span className="font-bold">
                    {selectedOrder.id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Customer
                  </span>

                  <span className="font-bold">
                    {selectedOrder.customer}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Phone
                  </span>

                  <span className="font-bold">
                    {selectedOrder.phone}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Food
                  </span>

                  <span className="font-bold">
                    {selectedOrder.food}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Payment
                  </span>

                  <span className="font-bold">
                    {selectedOrder.payment}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Total
                  </span>

                  <span className="text-orange-500 font-black text-xl">
                    ${selectedOrder.total}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Status
                  </span>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      selectedOrder.status === "Pending"
                        ? "bg-orange-100 text-orange-600"
                        : selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">

                <button
                  onClick={() => {
                    updateStatus(selectedOrder.id, "Delivered");
                    setSelectedOrder(null);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
                >
                  <FaCheck />
                  Delivered
                </button>

                <button
                  onClick={() => {
                    updateStatus(selectedOrder.id, "Cancelled");
                    setSelectedOrder(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
                >
                  <FaTimes />
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}
              </div>

    </section>
  );
}