import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  // ১. রেজিস্ট্রেশন ডেটা ধরার জন্য state
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // ২. ইনপুট পরিবর্তনের জন্য ফাংশন
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. রেজিস্টার বাটনে ক্লিক করলে কী হবে

const handleRegister = async (e) => { 
  e.preventDefault();
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);
    console.log("Server Response:", response.data);
    alert("Registration Successful!");
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Registration Failed: " + error.response?.data?.message || "Something went wrong");
  }
}; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-black text-[#1A2B4A] mb-2">Create Account</h2>
        <p className="text-gray-400 text-xs mb-6">Join our cloud kitchen network</p>
        
        {/* ফর্মের ভেতর সব ইনপুট এবং বাটন রাখা হয়েছে */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#F59E0B]" 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
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
            className="w-full bg-[#F59E0B] text-[#1A2B4A] py-3 rounded-xl font-bold text-xs hover:bg-[#e08e05] transition-all"
          >
            Register Now
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-[#1A2B4A] font-bold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;