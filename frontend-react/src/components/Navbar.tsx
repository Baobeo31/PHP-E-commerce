import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            URBAN CONSTRUCT
          </Link>
        </div>

        {/* Navigation Links (Hidden on small screens) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-500 transition duration-300">
            Trang chủ
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-orange-500 transition duration-300 flex items-center">
              Giới thiệu
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown for Giới thiệu */}
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 mt-2 w-48">
              <Link to="/about-us" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Về chúng tôi
              </Link>
              <Link to="/team" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Đội ngũ
              </Link>
            </div>
          </div>
          <Link to="/projects" className="text-gray-700 hover:text-orange-500 transition duration-300">
            Dự án
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-orange-500 transition duration-300">
            Sản phẩm
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition duration-300">
            Blog
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-orange-500 transition duration-300 flex items-center">
              Chính sách
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown for Chính sách */}
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 mt-2 w-48">
              <Link to="/privacy-policy" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Chính sách bảo mật
              </Link>
              <Link to="/terms-of-service" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
          <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition duration-300">
            Liên hệ
          </Link>
          <span className="text-red-500 flex items-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="ml-1">Live stream</span>
          </span>
        </div>

        {/* Contact Info and Action Buttons */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-gray-700">1900 636 001</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
            Liên hệ
          </button>
          <button className="text-gray-600 hover:text-orange-500 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-orange-500 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          <div className="relative">
            <button className="text-gray-600 hover:text-orange-500 transition duration-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                0
              </span>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-600 hover:text-orange-500 transition duration-300 flex items-center">
              <img src="/src/assets/vietnam-flag.png" alt="Vietnamese Flag" className="h-5 w-5" />
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Language Dropdown */}
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 mt-2 w-32 right-0">
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                Tiếng Việt
              </button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;