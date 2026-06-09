import React, { useState } from 'react';

const LoginPage = () => {
  // ১. ইমেইল এবং পাসওয়ার্ড ধরে রাখার জন্য state
  const [formData, setFormData] = useState({ email: '', password: '' });

  // ২. ইনপুট পরিবর্তন হলে স্টেট আপডেট করার ফাংশন
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. লগইন বাটনে ক্লিক করলে কী হবে তার ফাংশন
  const handleLogin = (e) => {
    e.preventDefault(); // পেজ রিলোড হওয়া বন্ধ করে
    console.log("Login Data:", formData); // এখানে আপনার API কল হবে
    alert("Login button clicked! Check console for data.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-black text-[#1A2B4A] mb-2">Welcome Back!</h2>
        <p className="text-gray-400 text-xs mb-6">Enter your credentials to continue</p>
        
        {/* ৪. ফর্মের সাথে onSubmit যুক্ত করা হয়েছে */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#F59E0B]" 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#F59E0B]" 
          />
          <button 
            type="submit" 
            className="w-full bg-[#1A2B4A] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#132038] transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          Don't have an account? <a href="/register" className="text-[#F59E0B] font-bold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;