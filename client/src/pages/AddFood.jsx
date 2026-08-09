import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaCloudUploadAlt, FaPlusCircle } from "react-icons/fa";
import axios from "../api/axios";

export default function AddFood() {
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    preparationTime: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFood({
        ...food,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", food.name);
      formData.append("category", food.category);
      formData.append("price", food.price);
      formData.append("stock", food.stock);
      formData.append("preparationTime", food.preparationTime);
      formData.append("description", food.description);
      if (food.image) {
        formData.append("image", food.image);
      }

      const token = localStorage.getItem("token");

      await axios.post("/menu", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Food Added Successfully!");
      navigate("/admin/managefood");
    } catch (err) {
      console.error(err);
      alert("Failed to add food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-orange-100">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-orange-100 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-2xl shadow-md shadow-orange-500/20 shrink-0">
            <FaUtensils />
          </div>
          <div>
            <h2 className="text-2xl font-black text-amber-950">Add New Food</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Fill in the details to add a new delicious item to your menu.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Food Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Food Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={food.name}
                onChange={handleChange}
                placeholder="e.g. Classic Beef Burger"
                required
                className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-950 focus:outline-none focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Category <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={food.category}
                onChange={handleChange}
                placeholder="e.g. Burger, Pizza, Drinks"
                required
                className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-950 focus:outline-none focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Price ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={food.price}
                onChange={handleChange}
                placeholder="e.g. 12.50"
                required
                className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-950 focus:outline-none focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Stock <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={food.stock}
                onChange={handleChange}
                placeholder="e.g. 50"
                required
                className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-950 focus:outline-none focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Preparation Time */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={food.preparationTime}
                onChange={handleChange}
                placeholder="e.g. 20"
                className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-950 focus:outline-none focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Food Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={food.description}
                onChange={handleChange}
                placeholder="Write a tasty description about this food..."
                className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl px-4 py-3 text-sm font-semibold text-amber-950 focus:outline-none focus:border-orange-500 focus:bg-white transition resize-none"
              ></textarea>
            </div>

            {/* Image Upload Area */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Food Image <span className="text-rose-500">*</span>
              </label>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-orange-300 rounded-3xl cursor-pointer bg-orange-50/30 hover:bg-orange-50 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt className="text-3xl text-orange-500 mb-2" />
                  <p className="text-xs font-bold text-amber-950">
                    {food.image ? food.image.name : "Click to upload food photo"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    PNG, JPG, or WEBP (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  required
                  className="hidden"
                />
              </label>
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <FaPlusCircle className="text-lg" />
            <span>{loading ? "Adding Food..." : "Add Food Item"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}