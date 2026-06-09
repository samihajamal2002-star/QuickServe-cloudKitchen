import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-black text-[#1A2B4A] mb-2">Welcome Back!</h2>
        <p className="text-gray-400 text-xs mb-6">Enter your credentials to continue</p>
        
        <div className="space-y-4">
          <input type="email" placeholder="Email Address" className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#F59E0B]" />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#F59E0B]" />
          <button className="w-full bg-[#1A2B4A] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#132038] transition-all">
            Login
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-4">
          Don't have an account? <a href="/register" className="text-[#F59E0B] font-bold">Register</a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;