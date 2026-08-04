import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch,} from "react-icons/fi";

import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const [showNavbar, setShowNavbar] = useState(true);

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      // Hide navbar when scrolling down
      setShowNavbar(false);
    } else {
      // Show navbar when scrolling up
      setShowNavbar(true);
    }

    lastScrollY = window.scrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
const role = localStorage.getItem("role");

  return (
    <header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
    showNavbar ? "translate-y-0" : "-translate-y-full"
  }`}
>
      <div className="backdrop-blur-md bg-white/90 border-b border-orange-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="QuickServe Logo"
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Quick<span className="text-orange-500">Serve</span>
              </h1>
              <p className="text-xs font-semibold text-slate-500 -mt-1 tracking-wider uppercase">
                Cloud Kitchen
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-10 font-semibold text-slate-700">
            {["Home", "Menu", "About", "Contact"].map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={item}
                  to={path}
                  className={({ isActive }) =>
                    `transition-colors duration-200 relative py-1 hover:text-orange-500 ${
                      isActive ? "text-orange-500 font-bold" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-4">
            <button className="w-11 h-11 rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white transition-all text-slate-700 flex items-center justify-center shadow-sm">
              <FiSearch size={18} />
            </button>

            <Link
              to="/cart"
              className="relative w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 hover:scale-105 transition-all"
            >
              <FiShoppingCart size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                0
              </span>
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="bg-slate-900 text-white px-7 py-3 rounded-full font-bold hover:bg-orange-500 transition-all shadow-md"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">

  <div className="flex items-center gap-3 bg-orange-50 p-1.5 pr-4 rounded-full border border-orange-100">
    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow">
      <FiUser size={18} />
    </div>

    <div className="text-left">
      <p className="font-bold text-xs text-slate-800">
        {user.name}
      </p>

      <p className="text-[10px] text-gray-500 capitalize">
        {user.role}
      </p>
    </div>
  </div>

  <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  style={{ backgroundColor: "#f97316", color: "#ffffff" }}
  className="group relative overflow-hidden flex items-center justify-center gap-2 !bg-orange-500 hover:!bg-orange-600 !text-white px-7 py-3 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap min-w-[120px] cursor-pointer"
>
  <span className="text-base">🚪</span>
  <span>Logout</span>
</button>

</div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}