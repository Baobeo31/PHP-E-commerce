import React from 'react';

const blogPosts = [
  {
    image: '/src/assets/blog/blog1.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
    category: 'CONSTRUCT URBAN',
    title: 'How to choose the right contractor for your project',
    date: '15 Tháng 10, 2025',
    url: '/blog/how-to-choose-contractor', // Thêm URL cho bài viết blog này
  },
  {
    image: '/src/assets/blog/blog2.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
    category: 'CONSTRUCT URBAN',
    title: 'The rise of prefabricated construction: pros and cons',
    date: '15 Tháng 10, 2025',
    url: '/blog/prefabricated-construction', // Thêm URL cho bài viết blog này
  },
  {
    image: '/src/assets/blog/blog3.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
    category: 'CONSTRUCT URBAN',
    title: 'Understanding building codes: a guide for homeowners',
    date: '15 Tháng 10, 2025',
    url: '/blog/building-codes-guide', // Thêm URL cho bài viết blog này
  },
];

const BlogSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Tin tức & Bài viết</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Chúng tôi xây dựng và thiết kế tương lai
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <a href={post.url} key={index} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out group">
              <div className="overflow-hidden"> {/* Thêm div này để chứa hình ảnh và cắt phần tràn */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Hiệu ứng zoom cho ảnh
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{post.category}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.date}</p>
              </div>
            </a>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <a
            href="#" // Thay thế bằng đường dẫn đến trang blog của bạn
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out"
          >
            Xem thêm
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;