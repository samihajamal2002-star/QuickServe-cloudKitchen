import React, { useState } from "react";
import Navbar from "../components/Navbar"; // 👈 আপনার Navbar ইমপোর্ট করা হলো
import Footer from "../components/Footer";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <>
      {/* 🧭 Navbar Added */}
      <Navbar />

      <section className="min-h-screen bg-[#FFF7ED] pt-32 pb-12 px-6 ">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="!bg-orange-100 !text-orange-500 px-6 py-2 rounded-full font-semibold text-sm inline-block shadow-sm">
              Get In Touch
            </span>

            <h1 className="text-5xl font-black text-amber-950 mt-6 tracking-tight">
              Contact <span className="!text-orange-500">QuickServe</span>
            </h1>

            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
              Have questions about our delicious menu or cloud kitchen services? Drop us a message!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* 📞 LEFT SIDE: Quick Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Phone Card */}
              <div className="!bg-white rounded-3xl p-6 border border-orange-100 shadow-lg flex items-center gap-5 hover:shadow-xl transition">
                <div className="w-14 h-14 rounded-2xl !bg-orange-100 !text-orange-500 flex items-center justify-center shrink-0">
                  <FaPhoneAlt size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Phone Number
                  </h3>
                  <p className="text-lg font-black text-amber-950 mt-1">
                    +880 1800 000000
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="!bg-white rounded-3xl p-6 border border-orange-100 shadow-lg flex items-center gap-5 hover:shadow-xl transition">
                <div className="w-14 h-14 rounded-2xl !bg-orange-100 !text-orange-500 flex items-center justify-center shrink-0">
                  <FaEnvelope size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Email Address
                  </h3>
                  <p className="text-base font-bold text-amber-950 mt-1">
                    support@quickserve.com
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="!bg-white rounded-3xl p-6 border border-orange-100 shadow-lg flex items-center gap-5 hover:shadow-xl transition">
                <div className="w-14 h-14 rounded-2xl !bg-orange-100 !text-orange-500 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Kitchen Address
                  </h3>
                  <p className="text-sm font-bold text-amber-950 mt-1">
                    123 Culinary St, Food City, Bangladesh
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="!bg-white rounded-3xl p-6 border border-orange-100 shadow-lg flex items-center gap-5 hover:shadow-xl transition">
                <div className="w-14 h-14 rounded-2xl !bg-orange-100 !text-orange-500 flex items-center justify-center shrink-0">
                  <FaClock size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Opening Hours
                  </h3>
                  <p className="text-sm font-bold text-amber-950 mt-1">
                    Everyday: 10:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* 📝 RIGHT SIDE: Contact Form */}
            <div className="lg:col-span-2">
              <div className="!bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-12">
                <h2 className="text-3xl font-black text-amber-950 mb-2">
                  Send Us A Message
                </h2>
                <p className="text-gray-500 mb-8 text-sm">
                  We usually respond within a few hours.
                </p>

                {/* Success Notification Alert */}
                {submitted && (
                  <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-3">
                    <span>🎉</span> Message sent successfully! We will get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div>
                    <label className="font-bold text-gray-600 mb-2 block text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 text-amber-950 bg-white transition"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="font-bold text-gray-600 mb-2 block text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 text-amber-950 bg-white transition"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="font-bold text-gray-600 mb-2 block text-sm">
                      Your Message
                    </label>
                    <textarea
                      rows="5"
                      required
                      placeholder="Write your feedback or query here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-orange-200 rounded-2xl px-6 py-4 outline-none resize-none focus:border-orange-500 text-amber-950 bg-white transition"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                    className="w-full flex items-center justify-center gap-3 !bg-orange-500 hover:!bg-orange-600 active:scale-95 !text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 transition cursor-pointer"
                  >
                    <FaPaperPlane size={18} /> Send Message
                  </button>

                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer (Optional) */}
      <Footer />
    </>
  );
}