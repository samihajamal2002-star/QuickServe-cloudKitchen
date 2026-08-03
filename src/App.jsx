import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage'; // MenuPage ইমপোর্ট করতে ভুলবেন না
import Layout from './components/Layout';
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    if (!item) {
        console.error("Item data is missing!");
        return;
    }
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`); // কনফার্মেশন মেসেজ
  };

  return (
    <Router>
     <Routes>
     <Route path="/" element={<Layout />}>
    {/* Layout এর ভেতরে চাইল্ড হিসেবে পেজগুলো রাখুন */}
    <Route index element={<Homepage />} /> 
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="admin/dashboard" element={<AdminDashboard />} />

    <Route path="menu" element={<MenuPage addToCart={addToCart} />} />
  </Route>
</Routes>
    </Router>
  );
}

export default App;