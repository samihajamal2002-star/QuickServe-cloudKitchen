import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#262626] p-9 px-6 pb-5 text-white">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6.5 h-6.5 bg-[#D70F64] rounded-md flex items-center justify-center">
              <i className="ti ti-chef-hat text-white text-xs"></i>
            </div>
            <span className="text-sm font-extrabold text-white">
              Quick<span className="text-[#D70F64]">Serve</span>
            </span>
          </div>
          <p className="text-[11px] text-gray-400 Neville leading-relaxed">
            A cloud kitchen management system framework engineered perfectly for maximum logistics automation and user satisfaction.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-white mb-2.5 uppercase tracking-wider">Legal Links</h4>
          <a href="#" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">Terms & Conditions</a>
          <a href="#" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">Privacy Policy</a>
          <a href="#login" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">System Login</a>
          <a href="#" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">Admin Layer</a>
        </div>
        <div>
          <h4 className="text-xs font-bold text-white mb-2.5 uppercase tracking-wider">Contact Operational</h4>
          <a href="#" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">
            <i className="ti ti-building-store text-xs"></i> Chittagong Hub, BD
          </a>
          <a href="mailto:support@quickserve.com" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">
            <i className="ti ti-mail text-xs"></i> support@quickserve.com
          </a>
          <a href="#" className="block text-[11px] text-gray-400 mb-1.5 hover:text-[#D70F64] transition-colors">
            <i className="ti ti-headset text-xs"></i> +880 1700-000000
          </a>
        </div>
      </div>
      <hr className="border-none border-t border-gray-700 mb-4" />
      <div className="flex justify-between items-center flex-wrap gap-2.5">
        <p className="text-[10px] text-gray-500 font-medium">© 2026 QuickServe System Panel. CSE-3642 Lab Course Evaluation.</p>
        <div className="flex gap-2">
          <a href="#" className="w-7 h-7 rounded-md border border-gray-700 flex items-center justify-center text-gray-400 text-sm hover:text-[#D70F64] hover:border-[#D70F64] transition-colors"><i className="ti ti-brand-facebook"></i></a>
          <a href="#" className="w-7 h-7 rounded-md border border-gray-700 flex items-center justify-center text-gray-400 text-sm hover:text-[#D70F64] hover:border-[#D70F64] transition-colors"><i className="ti ti-brand-instagram"></i></a>
          <a href="#" className="w-7 h-7 rounded-md border border-gray-700 flex items-center justify-center text-gray-400 text-sm hover:text-[#D70F64] hover:border-[#D70F64] transition-colors"><i className="ti ti-brand-github"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;