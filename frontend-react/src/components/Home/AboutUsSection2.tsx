import React, { useState } from 'react';

const services = [
  {
    name: 'Xây dựng và thiết kế nhà ở',
    image: '/src/assets/urbanconstruct_index_service_1_img.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Xây dựng và quy hoạch thương mại',
    image: '/src/assets/urbanconstruct_index_service_2_img.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Thiết kế nội thất & thẩm mỹ',
    image: '/src/assets/urbanconstruct_index_service_3_img.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Thiết kế nhà ở và thương mại',
    image: '/src/assets/urbanconstruct_index_service_4_img.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Quy hoạch và thiết kế bố trí',
    image: '/src/assets/urbanconstruct_index_service_5_img.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
];

const AboutUsSection2 = () => {
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(0); // Mặc định hiển thị hình ảnh đầu tiên

  const currentImageSrc = hoveredServiceIndex !== null ? services[hoveredServiceIndex].image : services[0].image;
  const currentImageAlt = hoveredServiceIndex !== null ? services[hoveredServiceIndex].name : services[0].name;

  return (
    <section
      className="py-20 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/istockphoto-2195604950-612x612.jpg')",
      }}
    >

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Chúng tôi cung cấp</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Dịch vụ xây dựng chất lượng cao để đáp ứng nhu cầu dự án của bạn
          </h2>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative pb-2 cursor-pointer"
                onClick={() => setHoveredServiceIndex(index)} // Thay đổi hình ảnh khi nhấp
              >
                <p
                  className={`text-xl font-medium transition-colors duration-300
                    ${hoveredServiceIndex === index ? 'text-black' : 'text-gray-500'}
                  `}
                >
                  {service.name}
                </p>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300
                    ${hoveredServiceIndex === index ? 'w-full' : 'w-0'}
                  `}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src={currentImageSrc}
              alt={currentImageAlt}
              className="w-full h-auto object-cover transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection2;