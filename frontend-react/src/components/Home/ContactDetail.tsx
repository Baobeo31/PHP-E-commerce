import React from 'react';

const ContactDetail = () => {
  return (
    <section className="relative bg-blue-500 py-20 md:py-32 lg:py-48 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/urbanconstruct_index_contact_img.jpg')" }} // Thay thế bằng đường dẫn hình ảnh thực tế của bạn
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
          Khởi đầu cho không gian sống chất lượng cao
        </h2>
        <a
          href="#" // Thay thế bằng đường dẫn liên hệ của bạn
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out"
        >
          Liên hệ ngay
        </a>
      </div>
    </section>
  );
};

export default ContactDetail;