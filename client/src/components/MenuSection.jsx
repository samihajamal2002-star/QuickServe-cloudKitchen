import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MenuSection() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/menu");
      setFoods(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Add to Cart Function
  const addToCart = (food) => {
    // 1. Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Check if food is already in cart
    const existingIndex = existingCart.findIndex(
      (item) => item.id === food._id || item._id === food._id
    );

    if (existingIndex > -1) {
      // If already exists, increase quantity
      existingCart[existingIndex].quantity += 1;
    } else {
      // If new, push with initial quantity = 1
      existingCart.push({
        id: food._id,
        _id: food._id,
        title: food.name,
        name: food.name,
        price: food.price,
        image: `http://localhost:5000${food.image}`,
        quantity: 1,
      });
    }

    // 3. Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show temporary alert/feedback message
    setAddedMessage(`${food.name} added to cart!`);
    setTimeout(() => setAddedMessage(""), 2000);

    // Trigger storage event so Navbar cart counter can update dynamically
    window.dispatchEvent(new Event("storage"));
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Loading Foods...
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF7ED] py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Success Alert Popup */}
        {addedMessage && (
          <div className="fixed top-24 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-bounce font-semibold text-sm">
            ✅ {addedMessage}
          </div>
        )}

        <div className="text-center mb-14">
          <h1 className="text-5xl font-black text-amber-950">
            Our Menu
          </h1>
          <p className="text-gray-500 mt-4">
            Fresh & Delicious Food
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.length === 0 ? (
            <div className="col-span-full text-center">
              <h2 className="text-2xl font-bold text-gray-500">
                No Food Available
              </h2>
            </div>
          ) : (
            foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-2xl transition duration-300"
              >
                <img
                  src={`http://localhost:5000${food.image}`}
                  alt={food.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-amber-950">
                    {food.name}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                    {food.description}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-3xl font-black text-orange-500">
                      ৳ {food.price}
                    </span>

                    {/* 👈 Added onClick Handler Here */}
                    <button
                      onClick={() => addToCart(food)}
                      style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                      className="!bg-orange-500 hover:!bg-orange-600 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-orange-500/20 transition cursor-pointer text-sm"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}