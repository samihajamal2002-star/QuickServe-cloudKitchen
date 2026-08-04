import React, { useState } from "react";
import { FaBoxOpen, FaPlus, FaMinus } from "react-icons/fa";

const initialInventory = [
  {
    id: 1,
    name: "Classic Burger",
    stock: 25,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Chicken Pizza",
    stock: 10,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Italian Pasta",
    stock: 18,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Sirloin Steak",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "French Fries",
    stock: 40,
    status: "In Stock",
  },
];

export default function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);

  const increaseStock = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              stock: item.stock + 1,
              status: item.stock + 1 <= 10 ? "Low Stock" : "In Stock",
            }
          : item
      )
    );
  };

  const decreaseStock = (id) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id && item.stock > 0) {
          const newStock = item.stock - 1;
          return {
            ...item,
            stock: newStock,
            status: newStock <= 10 ? "Low Stock" : "In Stock",
          };
        }
        return item;
      })
    );
  };

  return (
    <section className="min-h-screen bg-[#FFF7ED] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">
          <span className="bg-orange-100 text-orange-500 px-6 py-2 rounded-full font-semibold">
            Inventory
          </span>

          <h1 className="text-5xl font-black text-slate-900 mt-6">
            Food Inventory
          </h1>

          <p className="text-gray-500 mt-4">
            Manage available food stock.
          </p>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

          <table className="w-full">

            <thead className="bg-orange-500 text-white">

              <tr>
                <th className="py-5">Food</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {inventory.map((item) => (

                <tr
                  key={item.id}
                  className="text-center border-b border-orange-100 hover:bg-orange-50"
                >

                  <td className="py-5 font-semibold text-slate-800 flex justify-center items-center gap-3">
                    <FaBoxOpen className="text-orange-500" />
                    {item.name}
                  </td>

                  <td className="font-bold">
                    {item.stock}
                  </td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => increaseStock(item.id)}
                        className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition"
                      >
                        <FaPlus />
                      </button>

                      <button
                        onClick={() => decreaseStock(item.id)}
                        className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                      >
                        <FaMinus />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}