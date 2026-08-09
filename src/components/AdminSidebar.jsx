import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHamburger,
  FaClipboardList,
  FaBoxes,
  FaUsers,        
  FaChartBar,     
  FaCog,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3.5 rounded-2xl text-base font-extrabold transition-all duration-300 ${
      isActive
        ? "bg-orange-500 text-white shadow-xl shadow-orange-500/30 translate-x-1"
        : "text-slate-300 hover:text-white hover:bg-slate-800/80 hover:translate-x-1"
    }`;

  return (
    <aside className="w-80 h-screen bg-slate-950 text-white p-7 flex flex-col justify-between shrink-0 border-r border-slate-800/60 sticky top-0">
      
      {/* 🚀 TOP SECTION */}
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-4 px-2 py-3 mb-8 border-b border-slate-800/80">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-orange-500/30 shrink-0">
            <FaUtensils />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide leading-none">
              QuickServe
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mt-1">
              Admin Panel
            </p>
          </div>
        </div>

        {/* MAIN MENU SECTION */}
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-4 mb-4">
            Main Menu
          </p>

          <nav className="flex flex-col gap-3">
            <NavLink to="/admin" end className={linkStyle}>
              <FaTachometerAlt className="text-xl shrink-0" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/managefood" className={linkStyle}>
              <FaHamburger className="text-xl shrink-0" />
              <span>Manage Food</span>
            </NavLink>

            <NavLink to="/admin/manageorder" className={linkStyle}>
              <FaClipboardList className="text-xl shrink-0" />
              <span>Manage Order</span>
            </NavLink>

            <NavLink to="/admin/inventory" className={linkStyle}>
              <FaBoxes className="text-xl shrink-0" />
              <span>Inventory</span>
            </NavLink>
            <NavLink to="/admin/manageusers" className={linkStyle}>
              <FaUsers className="text-xl shrink-0" />
              <span>Manage Users</span>
            </NavLink>

            <NavLink to="/admin/analytics" className={linkStyle}>
              <FaChartBar className="text-xl shrink-0" />
              <span>Analytics</span>
            </NavLink>

            <NavLink to="/admin/settings" className={linkStyle}>
              <FaCog className="text-xl shrink-0" />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* 🛑 BOTTOM SECTION : LOGOUT BUTTON (mb-8 দিয়ে নিচ থেকে যথেষ্ট উপরে তোলা হয়েছে) */}
      <div className="pt-5 border-t border-slate-800/80 mb-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-extrabold text-base transition-all duration-300 border border-rose-500/20 shadow-sm active:scale-95 cursor-pointer"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}