import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

{/* 🚀 Navbar-এর ১৬ ইউনিট (64px) হাইটের সমপরিমাণ ফাঁকা জায়গা */}
      <div className="h-16 shrink-0"></div>
      
      {/* Main Container with extra top padding so content never gets covered */}
      <main className="flex-grow pt-28">
        <Outlet />
      </main>
    </div>
  );
}