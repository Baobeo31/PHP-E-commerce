import React from 'react';
import Reveal from '../Reveal';

const AboutUsSection = () => {
  return (
    <section className="bg-gray-700 py-20 px-4 text-white"> 
      <div className="max-w-7xl mx-auto text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Khách hàng nói về chúng tôi</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Xây dựng và kiến tạo tương lai bền vững</h2>
        </Reveal>
        
          <div className="flex flex-col md:flex-row gap-8">
          {/* Left Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex-1 text-left">
            <Reveal>
              <div className="mb-6">
                {/* Placeholder for Haravan Logo */}
                <div className="h-8 w-24 bg-gray-600 rounded-md mb-4"></div>
                {/* <img src="/path/to/haravan-logo.png" alt="Haravan Logo" className="h-8 mb-4" /> */}
              </div>
            </Reveal>
            <Reveal>
            <h3 className="text-xl font-semibold mb-2">Dự án xây dựng nhà ở</h3>
            <p className="text-gray-300 mb-6">
              Công ty xây dựng hàng đầu cung cấp các giải pháp bền vững, chất lượng cao. Chúng tôi xây dựng những công trình sáng tạo, góp phần nâng cao chất lượng cộng đồng và cải thiện cuộc sống, dựa trên sự chính trực, hợp tác và cam kết xuất sắc trong mọi dự án.
            </p>
            </Reveal>
            <Reveal>
            <div className="flex items-center">
              {/* Placeholder for user avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-600 mr-4"></div>
              {/* <img src="/path/to/avatar.png" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" /> */}
              <div>
                <p className="font-semibold">Ben Pham</p> 
                <p className="text-sm text-gray-400">Nhà đầu tư</p>
              </div>
            </div>
            </Reveal>
          </div>

          {/* Right Card */}
  
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex-1 text-left">
            <Reveal>
            <p className="text-gray-300 mb-2">Hài lòng</p>
            <h3 className="text-6xl font-bold text-yellow-500 mb-4">100%</h3>
            <p className="text-xl font-semibold mb-4">Chất lượng xây dựng</p>
            <p className="text-gray-300">
              Công ty xây dựng hàng đầu cung cấp các giải pháp bền vững, chất lượng cao. Chúng tôi xây dựng những công trình sáng tạo, góp phần nâng cao chất lượng cộng đồng và cải thiện cuộc sống, dựa trên sự chính trực, hợp tác và cam kết xuất sắc trong mọi dự án.
            </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;