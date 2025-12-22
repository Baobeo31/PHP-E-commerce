import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery'; // Import useQuery hook
import { getCartItems } from '../services/CartService'; // Import getCartItems

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem('access_token')); // Check if user is logged in
  // Use useQuery to fetch cart items
  const { data: cartItems, isLoading: loadingCart, isError: cartIsError, error: cartError } = useQuery(
    ['cartItems'], 
    getCartItems, 
    {
      enabled: isCartPopupOpen, // Only fetch when the cart popup is open
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes
      onError: (err) => {
        console.error("Error fetching cart data:", err);
      },
    }
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 const toggleCartPopup = () => {
  if (!isLoggedIn) {
    alert("Vui lòng đăng nhập để xem giỏ hàng");
    return;
  }
  setIsCartPopupOpen(!isCartPopupOpen);
};


  const calculateTotalPrice = () => {
    if (!cartItems) return "0.00";
    return cartItems
      .reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0)
      .toFixed(2);
  };

  const totalCartQuantity = cartItems ? cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  ) : 0;

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
            <button
              onClick={toggleCartPopup}
              className="text-gray-600 hover:text-orange-500 transition duration-300 flex items-center"
            >
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
              {totalCartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {totalCartQuantity}
                </span>
              )}
            </button>

            {isCartPopupOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-20">
                <h3 className="text-lg font-semibold px-4 py-2 text-gray-800">
                  Giỏ hàng của bạn
                </h3>
                {loadingCart ? (
                  <p className="text-gray-600 px-4 py-2">Đang tải giỏ hàng...</p>
                ) : cartIsError ? (
                  <p className="text-red-600 px-4 py-2">Lỗi: {cartError?.message || "Không thể tải giỏ hàng."}</p>
                ) : cartItems && cartItems.length === 0 ? (
                  <p className="text-gray-600 px-4 py-2">
                    Không có sản phẩm nào trong giỏ hàng.
                  </p>
                ) : (
                  <>
                    {cartItems?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center px-4 py-2 border-b last:border-b-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.quantity} x ${item.product.price}
                          </p>
                        </div>
                        <button className="text-red-500 hover:text-red-700 text-sm">
                          Xóa
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-4 py-2 border-t mt-2">
                      <span className="text-gray-800 font-semibold">Tổng cộng:</span>
                      <span className="text-gray-800 font-semibold">
                        ${calculateTotalPrice()}
                      </span>
                    </div>
                    <div className="px-4 py-2">
                      <Link
                        to="/cart"
                        className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
                      >
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 py-2">
          <Link
            to="/products"
            className="block text-white hover:text-gray-300 px-4 py-2"
            onClick={toggleMobileMenu}
          >
            Sản phẩm
          </Link>
          <Link
            to="/categories"
            className="block text-white hover:text-gray-300 px-4 py-2"
            onClick={toggleMobileMenu}
          >
            Danh mục
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:text-gray-300 px-4 py-2"
            onClick={toggleMobileMenu}
          >
            Liên hệ
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-gray-300 px-4 py-2"
            onClick={toggleMobileMenu}
          >
            Về chúng tôi
          </Link>
          <div className="relative px-4 py-2">
            <button
              onClick={toggleCartPopup}
              className="text-white focus:outline-none relative w-full text-left"
            >
              Giỏ hàng
              {totalCartQuantity > 0 && (
                <span className="absolute right-4 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center -top-0.5">
                  {totalCartQuantity}
                </span>
              )}
            </button>
            {isCartPopupOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-2 z-20">
                <h3 className="text-lg font-semibold px-4 py-2 text-gray-800">
                  Giỏ hàng của bạn
                </h3>
                {loadingCart ? (
                  <p className="text-gray-600 px-4 py-2">Đang tải giỏ hàng...</p>
                ) : cartIsError ? (
                  <p className="text-red-600 px-4 py-2">Lỗi: {cartError?.message || "Không thể tải giỏ hàng."}</p>
                ) : cartItems && cartItems.length === 0 ? (
                  <p className="text-gray-600 px-4 py-2">
                    Không có sản phẩm nào trong giỏ hàng.
                  </p>
                ) : (
                  <>
                    {cartItems?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center px-4 py-2 border-b last:border-b-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.quantity} x ${item.product.price}
                          </p>
                        </div>
                        <button className="text-red-500 hover:text-red-700 text-sm">
                          Xóa
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-4 py-2 border-t mt-2">
                      <span className="text-gray-800 font-semibold">Tổng cộng:</span>
                      <span className="text-gray-800 font-semibold">
                        ${calculateTotalPrice()}
                      </span>
                    </div>
                    <div className="px-4 py-2">
                      <Link
                        to="/cart"
                        className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
                      >
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;