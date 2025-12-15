import React from 'react';
import Reveal from '../Reveal';

const AboutSection2 = () => {
  const features = [
    {
      img: '/src/assets/urbanconstruct_index_policy_1_img.jpg', // Placeholder icon for "Công trình cao tầng"
      title: 'Công trình cao tầng',
      description: 'Chúng tôi xây dựng các dự án cao tầng hiện đại và bền vững.',
    },
    {
      img: '/src/assets/urbanconstruct_index_policy_2_img.jpg', // Placeholder icon for "Lập kế hoạch thiết kế"
      title: 'Lập kế hoạch thiết kế',
      description: 'Chúng tôi thiết kế bản thiết kế chi tiết để xây dựng hiệu quả và thông minh.',
    },
    {
      img: '/src/assets/urbanconstruct_index_policy_3_img.jpg', // Placeholder icon for "Tiêu chuẩn an toàn cao"
      title: 'Tiêu chuẩn an toàn cao',
      description: 'Chúng tôi ưu tiên sự an toàn để đảm bảo môi trường xây dựng an toàn.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className=" p-6 flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-md bg-gray-300 flex items-center justify-center ">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                </div>
                <div>
                  <h3 className="text-xl text-left font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-left">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection2;