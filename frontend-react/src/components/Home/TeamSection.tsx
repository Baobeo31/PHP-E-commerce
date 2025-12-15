import React from 'react';

const teamMembers = [
  {
    name: 'Manh Pham',
    image: '/src/assets/team-member-1.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Cong Le',
    image: '/src/assets/team-member-2.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Thanh Do',
    image: '/src/assets/team-member-3.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
  {
    name: 'Bao Mai',
    image: '/src/assets/team-member-4.jpg', // Thay thế bằng URL hình ảnh thực tế của bạn
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Content - Sticky */}
        <div className="lg:w-1/3 lg:sticky lg:top-20 h-full lg:self-start">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Đội ngũ của chúng tôi</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Về chúng tôi</h2>
          <p className="text-lg text-gray-700">
            Đội ngũ với bề dày kinh nghiệm về kiến trúc, nền móng thiết kế và quản trị dự án.
          </p>
        </div>

        {/* Right Content - Scrollable Images */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-800">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;