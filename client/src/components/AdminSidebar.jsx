import { NavLink , useNavigate} from "react-router-dom";
import {
  FaTachometerAlt,
  FaHamburger,
  FaClipboardList,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-orange-500 text-white"
        : "hover:bg-orange-500 hover:text-white"
    }`;
    const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  navigate("/login");
};

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-3xl font-bold text-orange-500 mb-10">
        Admin
      </h2>

      <nav className="space-y-3">

        <NavLink to="/admin" end className={linkStyle}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/managefood" className={linkStyle}>
          <FaHamburger />
          <span>Manage Food</span>
        </NavLink>

        <NavLink to="/admin/manageorder" className={linkStyle}>
          <FaClipboardList />
          <span>Manage Order</span>
        </NavLink>

        <NavLink to="/admin/inventory" className={linkStyle}>
          <FaBoxes />
          <span>Inventory</span>
        </NavLink>

      </nav>
      <div className="mt-12">
  <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
  >
    <FaSignOutAlt />
    Logout
  </button>
</div>
    </aside>
  );
}