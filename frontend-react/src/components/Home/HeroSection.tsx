import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  images: string[];
  interval?: number; //ms
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ images, interval = 5000, children }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url('${images[currentIndex]}')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
          THIẾT KẾ CẤU TRÚC NỀN MÓNG HIỆN ĐẠI
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Đối tác đáng tin cậy của bạn trong lĩnh vực thi công nền móng tiên tiến. Chúng tôi
          cung cấp các giải pháp bền vững và đáng tin cậy, phù hợp với nhu cầu của dự án bạn.
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
          <button onClick={() => navigate('/products')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Xem thêm
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Dịch vụ của chúng tôi
          </button>
        </div>
      </div>
      {children}
    </section>
  );
};

export default HeroSection;