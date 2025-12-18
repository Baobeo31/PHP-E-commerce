import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok, FaShoppingBag, FaHeart } from 'react-icons/fa'; // Cần cài đặt react-icons nếu chưa có: npm install react-icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Urban Construct Section */}
          <div className='text-left'>
            <h3 className="text-xl font-bold text-white mb-4">Urban Construct</h3>
            <p className="text-sm mb-4">
              Với các giải pháp công nghệ tốt nhất, Haravan là tất cả những gì bạn cần để xây dựng thương hiệu online, thành công trong bán lẻ và marketing đột phá.
            </p>
            <img src="/src/assets/bo-cong-thuong.png" alt="Bộ Công Thương" className="w-32" /> {/* Thay thế bằng đường dẫn ảnh thực tế */}
          </div>

          {/* Contact Section */}
          <div className='text-left'>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                123 Nguyễn Thị Minh Khai, phường 3, quận 3, Tp. Hồ Chí Minh
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                456 Võng Lâm Nguyễn, phường 5, Tp. Đà Lạt
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                1900 638 001
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                1900 638 002
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                hi@urban-construct.abc
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div className='text-left'>
            <h3 className="text-xl font-bold text-white mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Trang chủ</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Dự án</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Sản phẩm</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Chính sách</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Liên hệ</a></li>
            </ul>
          </div>

          {/* Connect with Us & Newsletter Section */}
          <div className='text-left'>
            <h3 className="text-xl font-bold text-white mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-orange-500 transition-colors duration-200"><FaFacebookF /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-orange-500 transition-colors duration-200"><FaYoutube /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-orange-500 transition-colors duration-200"><FaInstagram /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-orange-500 transition-colors duration-200"><FaTiktok /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-orange-500 transition-colors duration-200"><FaShoppingBag /></a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-orange-500 transition-colors duration-200"><FaHeart /></a>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Đăng ký nhận bản tin</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="p-3 rounded-l-full bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-orange-500 flex-grow"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-r-full transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          Copyright © 2025 Urban Construct. Powered by Haravan
        </div>
      </div>
    </footer>
  );
};

export default Footer;