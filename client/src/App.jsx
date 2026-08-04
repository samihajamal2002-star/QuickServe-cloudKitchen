import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddFood from "./pages/AddFood";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

import About from "./pages/About";
import Contact from "./pages/Contact";

import ChefDashboard from "./pages/chef/ChefDashboard";
import RiderDashboard from "./pages/rider/RiderDashboard";

import PrivateRoute from "./routes/PrivateRoute";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageOrders from "./pages/admin/ManageOrders";
import Inventory from "./pages/admin/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
 
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="managefood" element={<ManageFoods />} />
          <Route path="manageorder" element={<ManageOrders />} />
          <Route path="inventory" element={<Inventory />} />
           <Route path="addfood" element={<AddFood />} />
        </Route>

        {/* Chef */}
        <Route
          path="/chef"
          element={
            <PrivateRoute role="chef">
              <ChefDashboard />
            </PrivateRoute>
          }
        />

        {/* Rider */}
        <Route
          path="/rider"
          element={
            <PrivateRoute role="rider">
              <RiderDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;