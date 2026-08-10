import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MenuSection() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState("");

  const categories = [
    "All",
    "Burger",
    "Pizza",
    "Shawarma",
    "Pasta",
    "Drinks",
    "Dessert",
    "Snacks",
  ];

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/menu");
      setFoods(res.data);
      setFilteredFoods(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(
        (food) => food.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredFoods(filtered);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400?text=No+Image";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/uploads/${imagePath}`;
    return `http://localhost:5000${cleanPath}`;
  };

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
      <section className="min-h-screen flex justify-center items-center bg-[#F5F2EC]">
        <h2 className="text-xl font-semibold text-orange-500 animate-pulse">
          Loading Menu...
        </h2>
      </section>
    );
  }

  return (
    // style-এ paddingBottom: "120px" দেওয়া হলো যাতে ফুটারের ওপরে পর্যাপ্ত জায়গা থাকে
    <section 
      style={{ paddingBottom: "60px" }} 
      className="bg-[#F5F2EC] min-h-screen"
    >
      {/* Toast Alert */}
      {addedMessage && (
        <div className="fixed top-20 right-6 bg-emerald-600 text-white px-5 py-2.5 rounded-lg shadow-xl z-50 font-bold text-xs">
          ✅ {addedMessage}
        </div>
      )}

      {/* Hero Banner Header */}
      <div
        className="relative h-44 md:h-56 bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200')",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-serif text-white tracking-wider">
          Our Menu
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Category Filter Tabs */}
        <div 
          style={{ 
            marginTop: "35px", 
            marginBottom: "40px", 
            paddingTop: "10px", 
            paddingBottom: "10px" 
          }}
          className="flex flex-wrap justify-center items-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              style={{
                padding: "8px 22px",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "9999px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                backgroundColor: activeCategory === cat ? "#f97316" : "#ffffff",
                color: activeCategory === cat ? "#ffffff" : "#374151",
                border: activeCategory === cat ? "1px solid #f97316" : "1px solid #e5e7eb",
                boxShadow: "0 1px 3px 0 rgba(0,0,0,0.06)"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid - ৪ টি কলাম */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
          {filteredFoods.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">No items available in this category.</p>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group flex flex-col justify-between border border-gray-100"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                    <img
                      src={getImageUrl(food.image)}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300?text=Food+Image";
                      }}
                    />

                    {/* Floating Add to Cart Badge */}
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-between">
                      <button
                        onClick={() => addToCart(food)}
                        className="flex items-center gap-1 bg-black/75 backdrop-blur-sm hover:bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-md transition-colors"
                      >
                        <span>ADD TO CART</span>
                        <span>→</span>
                      </button>
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-white/90 rounded-full shadow-md text-xs hover:bg-white text-gray-700"
                        title="Add to favorites"
                      >
                        ♡
                      </button>
                    </div>
                  </div>

                  {/* Title & Price Below Image */}
                  <div className="p-3 bg-white">
                    <h3 className="text-gray-800 font-semibold text-sm tracking-tight truncate group-hover:text-orange-600 transition-colors">
                      {food.name}
                    </h3>
                    <p className="text-orange-500 font-bold text-xs mt-0.5">
                      ৳ {food.price}
                    </p>
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