import React from 'react';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-black text-[#1A2B4A] mb-2">Create Account</h2>
        <p className="text-gray-400 text-xs mb-6">Join our cloud kitchen network</p>
        
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none" />
          <input type="email" placeholder="Email" className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none" />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none" />
          <button className="w-full bg-[#F59E0B] text-[#1A2B4A] py-3 rounded-xl font-bold text-xs hover:bg-[#e08e05] transition-all">
            Register Now
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-[#1A2B4A] font-bold">Login</a>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;