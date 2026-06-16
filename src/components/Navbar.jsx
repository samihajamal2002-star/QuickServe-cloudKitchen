import { Link } from "react-router-dom";
import logoImg from '../assets/logo.png'; 

const Navbar = ()=> {
  return (
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
             <Link to="/" className="text-xs font-bold text-[#F59E0B]">Home</Link>
             <Link to="/menu" className="text-xs font-bold text-white/80 hover:text-[#F59E0B] transition-colors">Menu</Link>
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
  );
};
export default Navbar;
