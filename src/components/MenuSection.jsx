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

  // 💡 ডাইনামিক ইমেজ ইউআরএল জেনারেটর
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/uploads/${imagePath}`;
    return `http://localhost:5000${cleanPath}`;
  };

  // 🛒 Add to Cart Function
  const addToCart = (food) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = existingCart.findIndex(
      (item) => item.id === food._id || item._id === food._id
    );

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        id: food._id,
        _id: food._id,
        title: food.name,
        name: food.name,
        price: food.price,
        image: getImageUrl(food.image),
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setAddedMessage(`${food.name} added to cart!`);
    setTimeout(() => setAddedMessage(""), 2000);

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
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={getImageUrl(food.image)}
                    alt={food.name}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300?text=Food+Image";
                    }}
                  />

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-amber-950">
                      {food.name}
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                      {food.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-3xl font-black text-orange-500">
                      ৳ {food.price}
                    </span>

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