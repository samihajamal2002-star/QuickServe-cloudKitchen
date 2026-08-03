import { Link, useNavigate } from "react-router-dom";
import logoImg from '../assets/logo.png'; 

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between h-16 px-8 bg-[#1A2B4A] sticky top-0 z-50 shadow-md">
      {/* বাম পাশ: লোগো */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-lg bg-white p-0.5">
          <img src={logoImg} alt="QuickServe Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="text-base font-black text-white tracking-tight leading-none">
            Quick<span className="text-[#F59E0B]">Serve</span>
          </div>
          <div className="text-[9px] text-[#F59E0B] font-bold tracking-widest uppercase mt-1">
            Cloud Kitchen
          </div>
        </div>
      </div>

      {/* মাঝখানের মেনু লিঙ্কগুলো */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-xs font-bold text-[#F59E0B]">Home</Link>
        <Link to="/menu" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Menu</Link>
        <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Track Order</a>
        <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">About Us</a>
        <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Contact Us</a>
      </div>

      {/* ডান পাশ: লগইন/লগআউট */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-4">
            <span className="text-white text-xs">Hello, Admin</span>
            <button onClick={handleLogout} className="text-xs font-bold text-white bg-red-600 px-3 py-1 rounded">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-bold text-white/90 hover:text-[#F59E0B]">Login</Link>
            <Link to="/register" className="bg-[#F59E0B] text-[#1A2B4A] text-xs font-bold px-4 py-2 rounded-xl">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}