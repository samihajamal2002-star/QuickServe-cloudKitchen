import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png'; 
import bannerImg from '../assets/banner.png';
const Homepage = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen text-gray-800 font-sans">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between h-16 px-8 bg-[#1A2B4A] sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          {/* আপনার আপলোড করা কাস্টম লোগো */}
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-lg bg-white p-0.5">
            <img 
              src={logoImg} 
              alt="QuickServe Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-base font-black text-white tracking-tight leading-none">
              Quick<span className="text-[#F59E0B]">Serve</span>
            </div>
            <div className="text-[9px] text-[#F59E0B] font-bold tracking-widest uppercase mt-1">
              Cloud Kitchen
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-xs font-bold text-[#F59E0B]">Home</a>
          <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Menu</a>
          <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Track Order</a>
          <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">About Us</a>
          <a href="#" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Contact Us</a>
        </div>

<div className="flex items-center gap-4">
  {/* Login Link */}
  <Link 
    to="/login" 
    className="text-xs font-bold text-white/90 hover:text-[#F59E0B] transition-colors"
  >
    Login
  </Link>

  {/* Register Link (Button style-এ) */}
  <Link 
    to="/register" 
    className="bg-[#F59E0B] text-[#1A2B4A] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#e08e05] transition-all shadow-md shadow-[#F59E0B]/10 flex items-center gap-1"
  >
    Register <i className="ti ti-chevron-right text-[10px]"></i>
  </Link>
</div>  
      </nav>

{/* HERO SECTION WITH BACKGROUND IMAGE */}
<div 
  className="relative w-full min-h-[85vh] px-6 text-center overflow-hidden flex flex-col items-center justify-center bg-cover bg-center"
  style={{
     backgroundImage: `linear-gradient(
    rgba(217, 119, 6, 0.2),
    rgba(26, 43, 74, 0.4)
  ), url(${bannerImg})`
}}
>
  {/* এখানে '/path-to-your-image.jpg' এর জায়গায় আপনার ইমেজটির নাম দিন */}
  
  {/* Decorative Badge */}
  <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-5 border border-white/10 tracking-wide uppercase">
    ⚡ Taste at your door
  </div>

  {/* Main Bold Typography */}
  <h1 className="text-3xl md:text-5xl font-black text-white max-w-3xl leading-tight mb-4 drop-shadow-sm tracking-tight">
    Fresh Food <span className="text-[#F59E0B]">Delivered Fast</span>
  </h1>
  
  <p className="text-white/90 text-xs md:text-sm max-w-xl leading-relaxed mb-8 font-medium">
    An Intelligent Cloud Kitchen Management System Framework Built For Speed, Accuracy, and Great Food.
  </p>

        {/* Professional Dual Searchbar */}
        <div className="w-full max-w-2xl bg-white p-2 rounded-2xl md:rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center gap-2 border border-white">
          
          {/* Location Input */}
          <div className="flex items-center gap-2 px-3 w-full md:w-5/12 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
            <i className="ti ti-map-pin text-[#F59E0B] text-lg"></i>
            <input 
              type="text" 
              defaultValue="Enter Chittagong delivery |" 
              className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none placeholder-gray-400"
            />
          </div>

          {/* Food Search Input */}
          <div className="flex items-center gap-2 px-3 w-full md:w-5/12">
            <i className="ti ti-search text-gray-400 text-lg"></i>
            <input 
              type="text" 
              placeholder="Search virtual brand menus (Burgers, Pizza...)" 
              className="w-full bg-transparent text-xs font-medium text-gray-700 outline-none placeholder-gray-400"
            />
          </div>

          {/* Action Button */}
          <button className="w-full md:w-auto bg-[#1A2B4A] text-white font-bold text-xs px-6 py-3 rounded-xl md:rounded-full hover:bg-[#132038] transition-all whitespace-nowrap shadow-md flex items-center justify-center gap-1">
            Order Now <i className="ti ti-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>

      {/* STATS BAR (Dark Navy Blue Background) */}
      <div className="bg-[#1A2B4A] py-5 px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-inner">
        <div>
          <div className="text-xl font-black text-[#F59E0B]">50K+</div>
          <div className="text-[11px] text-gray-300 font-medium mt-0.5">Happy Customers</div>
        </div>
        <div className="border-l border-white/10">
          <div className="text-xl font-black text-[#F59E0B]">120K</div>
          <div className="text-[11px] text-gray-300 font-medium mt-0.5">Orders Delivered</div>
        </div>
        <div className="border-l border-white/10">
          <div className="text-xl font-black text-[#F59E0B]">250+</div>
          <div className="text-[11px] text-gray-300 font-medium mt-0.5">Menu Items</div>
        </div>
        <div className="border-l border-white/10">
          <div className="text-xl font-black text-[#F59E0B]">4.9/5</div>
          <div className="text-[11px] text-gray-300 font-medium mt-0.5">Average Rating</div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="max-w-5xl mx-auto p-8 px-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-extrabold text-gray-800 tracking-tight">Browse categories</h3>
          <a href="#" className="text-xs font-bold text-[#F59E0B] flex items-center gap-0.5 hover:underline">
            View all <i className="ti ti-chevron-right text-[12px]"></i>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '🍔', name: 'Burgers', count: '8 items' },
            { icon: '🍕', name: 'Pizza', count: '6 items' },
            { icon: '🍜', name: 'Noodles', count: '5 items' },
            { icon: '🥤', name: 'Drinks', count: '10 items' }
          ].map((cat, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 text-center cursor-pointer bg-white transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#F59E0B]/30">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs text-gray-800 font-bold">{cat.name}</div>
              <div className="text-[10px] text-gray-400 mt-1 font-medium">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

{/* POPULAR ITEMS */}
      <div className="max-w-5xl mx-auto p-8 px-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-extrabold text-gray-800 tracking-tight">Featured items near you</h3>
          <a href="#" className="text-xs font-bold text-[#F59E0B] flex items-center gap-0.5 hover:underline">
            See all <i className="ti ti-chevron-right text-[12px]"></i>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400', name: 'Smash Burger', cat: 'Gourmet Burgers', price: '৳ 220' },
            { img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400', name: 'Crispy Wings', cat: 'Honey Glazed', price: '৳ 180' },
            { img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400', name: 'Cheese Pizza', cat: 'Thin Crust Style', price: '৳ 350' }
          ].map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-white cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg">
              {/* ছবির জন্য স্টাইল */}
              <div 
                className="h-[120px] w-full bg-cover bg-center" 
                style={{ backgroundImage: `url('${item.img}')` }}
              ></div>
              <div className="p-4">
                <div className="text-sm font-bold text-gray-800">{item.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 mb-3 font-medium">{item.cat}</div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-black text-gray-800">{item.price}</span>
                  <button className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center text-white hover:bg-[#e08e05] transition-colors shadow-md">
                    <i className="ti ti-plus text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* TRACK ACTIVE ORDER BANNER */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="bg-gradient-to-r from-[#1A2B4A] to-[#0F1E36] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F59E0B] text-lg flex-shrink-0">
              <i className="ti ti-map-pin"></i>
            </div>
            <div>
              <div className="text-sm font-extrabold text-white flex items-center gap-1.5 justify-center md:justify-start">
                Track active delivery status
              </div>
              <div className="text-[11px] text-gray-400 font-medium mt-0.5">
                Injected system interface for real-time order tracking
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Order Code e.g. #752" 
              className="bg-white/10 border border-white/15 rounded-xl p-2.5 px-4 text-xs text-white placeholder-white/40 outline-none w-full md:w-[160px] focus:border-[#F59E0B]"
            />
            <button className="bg-[#F59E0B] border-none rounded-xl p-2.5 px-5 text-xs font-bold text-[#1A2B4A] cursor-pointer hover:bg-[#e08e05] transition-all">
              Track
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0F1E36] p-10 px-6 pb-6 text-white border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6.5 h-6.5 bg-[#F59E0B] rounded-md flex items-center justify-center">
                <i className="ti ti-chef-hat text-[#1A2B4A] text-xs"></i>
              </div>
              <span className="text-base font-black text-white tracking-tight">
                Quick<span className="text-[#F59E0B]">Serve</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              A cloud kitchen management system framework engineered perfectly for maximum logistics automation and user satisfaction.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-[11px] text-gray-400 hover:text-[#F59E0B] transition-colors">Terms & Conditions</a>
              <a href="#" className="block text-[11px] text-gray-400 hover:text-[#F59E0B] transition-colors">Privacy Policy</a>
              <a href="#" className="block text-[11px] text-gray-400 hover:text-[#F59E0B] transition-colors">System Panel Login</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Contact Operational</h4>
            <div className="space-y-2 text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5"><i className="ti ti-map-pin text-[#F59E0B]"></i> Chittagong Hub, BD</div>
              <div className="flex items-center gap-1.5"><i className="ti ti-mail text-[#F59E0B]"></i> support@quickserve.com</div>
              <div className="flex items-center gap-1.5"><i className="ti ti-phone text-[#F59E0B]"></i> +880 1700-000000</div>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-500 font-medium">© 2026 QuickServe System Panel. CSE-3642 IIUC Project.</p>
          <div className="flex gap-2">
            <a href="#" className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 text-sm hover:text-[#F59E0B] hover:border-[#F59E0B] transition-colors"><i className="ti ti-brand-facebook"></i></a>
            <a href="#" className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 text-sm hover:text-[#F59E0B] hover:border-[#F59E0B] transition-colors"><i className="ti ti-brand-instagram"></i></a>
            <a href="#" className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 text-sm hover:text-[#F59E0B] hover:border-[#F59E0B] transition-colors"><i className="ti ti-brand-github"></i></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Homepage;