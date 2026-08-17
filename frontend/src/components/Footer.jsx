import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Company */}
          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold text-white">
              BestDeal4You
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Discover the latest fashion, electronics, accessories,
              home essentials, and much more. We provide high-quality
              products at affordable prices with fast and secure delivery.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/Signup" className="hover:text-white">
                  Signup
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Categories
            </h3>

            <ul className="space-y-3">

              <li>Electronics</li>
              <li>Fashion</li>
              <li>Home & Kitchen</li>
              <li>Beauty</li>
              <li>Sports</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3 items-start">

                <MdLocationOn className="text-xl mt-1" />

                <p>
                  Ghaziabad, Uttar Pradesh, India
                </p>

              </div>

              <div className="flex gap-3 items-center">

                <MdPhone />

                <p>+91 9389751483</p>

              </div>

              <div className="flex gap-3 items-center">

                <MdEmail />

                <p>support@Ecommerce.com</p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Newsletter */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>

              <h3 className="text-2xl font-semibold text-white">
                Subscribe to our Newsletter
              </h3>

              <p className="text-gray-400 mt-2">
                Get updates about new arrivals and exclusive offers.
              </p>

            </div>

            <div className="flex w-full md:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 w-full md:w-80 rounded-l-lg bg-gray-800 border border-gray-700 outline-none"
              />

              <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-r-lg text-white font-medium">
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} Ecommerce. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>

            <Link to="/refund" className="hover:text-white">
              Refund Policy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;