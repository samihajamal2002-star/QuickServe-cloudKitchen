import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="QuickServe"
                className="w-14 h-14 object-contain"
              />

              <h2 className="text-3xl font-black text-orange-500">

                QuickServe

              </h2>

            </div>

            <p className="mt-6 text-gray-300 leading-8">

              QuickServe is a modern cloud kitchen delivering fresh,
              delicious and healthy meals to your doorstep with
              lightning-fast delivery.

            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center duration-300"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center duration-300"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold mb-6">

              Quick Links

            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>
                <a href="/" className="hover:text-orange-500 duration-300">
                  Home
                </a>
              </li>

              <li>
                <a href="/menu" className="hover:text-orange-500 duration-300">
                  Menu
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-orange-500 duration-300">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-orange-500 duration-300">
                  Contact
                </a>
              </li>

              <li>
                <a href="/login" className="hover:text-orange-500 duration-300">
                  Login
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold mb-6">

              Contact

            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-4">

                <FaPhoneAlt className="text-orange-500 mt-1" />

                <span>+880 1712-345678</span>

              </div>

              <div className="flex gap-4">

                <FaEnvelope className="text-orange-500 mt-1" />

                <span>quickserve@gmail.com</span>

              </div>

              <div className="flex gap-4">

                <FaMapMarkerAlt className="text-orange-500 mt-1" />

                <span>Chattogram, Bangladesh</span>

              </div>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-2xl font-bold mb-6">

              Newsletter

            </h3>

            <p className="text-gray-300 mb-6">

              Subscribe to receive our latest offers,
              discounts and new food updates.

            </p>

            <div className="flex">

              <input
                type="email"
                placeholder="Enter Email"
                className="flex-1 px-5 py-4 rounded-l-2xl text-black outline-none"
              />

              <button className="bg-orange-500 hover:bg-orange-600 px-6 rounded-r-2xl duration-300">

                <FaPaperPlane />

              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-700 mt-16 py-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">

            © 2026 QuickServe. All Rights Reserved.

          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <a href="#" className="text-gray-400 hover:text-orange-500">

              Privacy Policy

            </a>

            <a href="#" className="text-gray-400 hover:text-orange-500">

              Terms & Conditions

            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}