import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import HeroSection from '../components/Home/HeroSection'; // Import HeroSection component
import StatisticsSection from '../components/Home/StatisticsSection'; // Import StatisticsSection component
import FloatingContactButton from '../components/Home/FloatingContactButton'; // Import FloatingContactButton component

const Home: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Thêm Navbar component vào đây */}

      <HeroSection backgroundImage="/src/assets/urbanconstruct_index_slide_2_img.jpg">
        {/* Phần thống kê sẽ được truyền vào HeroSection làm children */}
        <StatisticsSection />
      </HeroSection>

      {/* Nút liên hệ nổi bật */}
      <FloatingContactButton />
    </div>
  );
};

export default Home;