import React, { useState } from 'react';
import Reveal from '../Reveal';

const images = [
  {
    src: '/src/assets/urbanconstruct_index_about_2_project_1_img.jpg', // Vui lòng thay thế bằng đường dẫn hình ảnh thực tế của bạn
    title: 'Cải tạo không gian cộng đồng',
  },
  {
    src: '/src/assets/urbanconstruct_index_about_2_project_2_img.jpg', // Vui lòng thay thế bằng đường dẫn hình ảnh thực tế của bạn
    title: 'Thiết kế sáng tạo xanh',
  },
  {
    src: '/src/assets/urbanconstruct_index_about_2_project_3_img.jpg', // Vui lòng thay thế bằng đường dẫn hình ảnh thực tế của bạn
    title: 'Dự án xây dựng nhà ở',
  },
];

const CallToActionSection: React.FC = () => {
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  return (
    <>
      {/* Phần Call to Action */}
      <section className="bg-black text-white py-20 px-4">
        <Reveal>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-left">
                Xây dựng một tương lai tốt đẹp hơn thông qua <span className="text-gray-500">sự chính trực và đổi mới </span>, tận tâm và sự xuất sắc
              </h2>
            </div>
            <div className="md:w-1/2 flex flex-col items-end text-right md:mt-60">
              <p className="text-md text-left text-gray-400 mb-8 max-w-md">
                Công ty xây dựng hàng đầu cung cấp các giải pháp bền vững, chất lượng cao. Chúng tôi xây dựng những công trình sáng tạo, góp phần nâng cao chất lượng cộng đồng và cải thiện cuộc sống, dựa trên sự chính trực, hợp tác và cam kết xuất sắc trong mọi dự án.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Liên hệ tư vấn
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Phần Thư viện hình ảnh */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(null)}
                className={`cursor-pointer transition-all duration-700
      ${hoveredImageIndex === index ? 'flex-[5]' : 'flex-[1]'}
      ${hoveredImageIndex !== null && hoveredImageIndex !== index ? 'opacity-50' : ''}
    `}
              >
                <Reveal>
                  <div className="h-[600px] overflow-hidden rounded-xl">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-4 text-white text-xl font-semibold text-left">
                    {image.title}
                  </h3>
                </Reveal>
              </div>
            ))}



          </div>
        </div>
      </section>
    </>
  );
};

export default CallToActionSection;