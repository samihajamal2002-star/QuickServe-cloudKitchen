import { useState } from "react";
import {
  FaBoxOpen,
  FaEye,
  FaTrash,
  FaStar,
} from "react-icons/fa";

const initialOrders = [
  {
    id: "#FD2026",
    date: "03 Aug 2026",
    status: "Preparing",
    total: 225.45,
    items: [
      "Classic Burger x2",
      "Chicken Pizza x1",
    ],
  },
  {
    id: "#FD2025",
    date: "30 Jul 2026",
    status: "Delivered",
    total: 180,
    items: [
      "Pasta x2",
      "French Fries x1",
    ],
  },
];

export default function MyOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const cancelOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <section className="min-h-screen bg-[#FFF7ED] py-24">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="bg-orange-100 text-orange-500 px-6 py-2 rounded-full font-semibold">
            Order History
          </span>

          <h1 className="text-5xl font-black text-slate-900 mt-6">
            My Orders
          </h1>

          <p className="text-gray-500 mt-4">
            Track all your delicious food orders.
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="text-center py-24">

            <FaBoxOpen className="text-7xl text-orange-300 mx-auto mb-6" />

            <h2 className="text-4xl font-bold text-gray-700">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-4">
              You haven't ordered anything yet.
            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100"
              >

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {order.id}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {order.date}
                    </p>

                  </div>

                  <span
                    className={`px-5 py-2 rounded-full font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="mt-8">

                  <h4 className="font-semibold mb-3">
                    Ordered Items
                  </h4>

                  <ul className="space-y-2">

                    {order.items.map((food, index) => (

                      <li
                        key={index}
                        className="text-gray-600"
                      >
                        • {food}
                      </li>

                    ))}

                  </ul>

                </div>

                <div className="flex justify-between items-center mt-8">

                  <h3 className="text-3xl font-black text-orange-500">
                    ${order.total}
                  </h3>

                  <div className="flex gap-3 flex-wrap">

                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
                      <FaEye />
                      View
                    </button>

                    {order.status === "Preparing" && (

                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                      >
                        <FaTrash />
                        Cancel
                      </button>

                    )}

                    {order.status === "Delivered" && (

                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
                        <FaStar />
                        Review
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}