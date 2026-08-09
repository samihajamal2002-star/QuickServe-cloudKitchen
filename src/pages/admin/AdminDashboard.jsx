import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FFF7ED" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content with Forced Inline Padding */}
      <div 
        style={{ 
          flex: 1, 
          minWidth: 0, 
          padding: "40px", 
          overflowX: "hidden" 
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}