import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("/menu");
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchFoods();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF7ED] p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Manage Foods
        </h1>

        <Link
          to="/admin/addfood"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          + Add Food
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>
              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {foods.map((food) => (

              <tr
                key={food._id}
                className="border-b"
              >

                <td className="p-4">

                  <img
                    src={`http://localhost:5000${food.image}`}
                    alt={food.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                </td>

                <td>{food.name}</td>

                <td>{food.category}</td>

                <td>৳ {food.price}</td>

                <td>

                  <button
                    onClick={() => deleteFood(food._id)}
                    className="bg-red-500 text-white p-3 rounded-xl"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}