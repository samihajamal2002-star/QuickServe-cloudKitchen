import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("/menu");
      setFoods(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  // 💡 ডাইনামিক ইমেজ ইউআরএল জেনারেটর (অনলাইন লিঙ্ক ও লোকাল ফাইল উভয়ই সাপোর্ট করবে)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/uploads/${imagePath}`;
    return `http://localhost:5000${cleanPath}`;
  };

  return (
    <section className="min-h-screen bg-[#FFF7ED] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-xs font-bold">
              Admin Panel
            </span>
            <h1 className="text-3xl font-black text-amber-950 mt-2">
              Manage Foods
            </h1>
          </div>

          <Link
            to="/admin/addfood"
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition flex items-center gap-2 text-sm"
          >
            <FaPlus /> Add New Food
          </Link>
        </div>

        {/* Food List Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[650px]">
              <thead className="bg-orange-500 text-white text-xs uppercase font-extrabold tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-center">Image</th>
                  <th className="py-4 px-6 text-center">Name</th>
                  <th className="py-4 px-6 text-center">Category</th>
                  <th className="py-4 px-6 text-center">Price</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-orange-100 text-sm font-semibold">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-gray-400 font-medium">
                      Loading food items...
                    </td>
                  </tr>
                ) : foods.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-gray-400 font-medium">
                      No food items found.
                    </td>
                  </tr>
                ) : (
                  foods.map((food) => (
                    <tr
                      key={food._id}
                      className="hover:bg-orange-50/50 transition duration-200"
                    >
                      <td className="py-4 px-6 flex justify-center items-center">
                        <img
                          src={getImageUrl(food.image)}
                          alt={food.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-orange-100 shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </td>

                      <td className="py-4 px-6 font-bold text-amber-950">
                        {food.name}
                      </td>

                      <td className="py-4 px-6 text-gray-500 text-xs font-bold uppercase tracking-wider">
                        {food.category}
                      </td>

                      <td className="py-4 px-6 font-black text-amber-950 text-base">
                        ৳ {food.price}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => deleteFood(food._id)}
                          className="bg-rose-100 hover:bg-rose-500 text-rose-600 hover:text-white p-3 rounded-2xl transition duration-200 cursor-pointer inline-flex items-center justify-center"
                          title="Delete Food"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}