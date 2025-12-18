import React from "react";
import HeroSection from "../components/Home/HeroSection";
import StatisticsSection from "../components/Home/StatisticsSection";
import FloatingContactButton from "../components/Home/FloatingContactButton";
import AboutSection from "../components/Home/AboutSection";
import AboutSection2 from "../components/Home/AboutSection2";
import CallToActionSection from "../components/Home/CallToActionSection";
import MarqueeSection from "../components/Home/MarqueeSection";
import AboutUsSection from "../components/Home/AboutUsSection";
import AboutUsSection2 from "../components/Home/AboutUsSection2";
import PartnerSection from "../components/Home/PartnerSection";
import ContactDetail from "../components/Home/ContactDetail";
import TeamSection from "../components/Home/TeamSection";
import BlogSection from "../components/Home/BlogSection"; // Đảm bảo bạn đã import BlogSection

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}

      {/* Hero */}
      <HeroSection
        images={[
          "/src/assets/urbanconstruct_index_slide_1_img.jpg",
          "/src/assets/urbanconstruct_index_slide_2_img.jpg",
          "/src/assets/urbanconstruct_index_slide_3_img.jpg",
        ]}
      >
        {/* Statistics nằm TRONG Hero */}
        <StatisticsSection />
      </HeroSection>

      {/* About – scroll xuống mới xuất hiện */}
      <AboutSection />
      {/* About Section 2 */}
      <AboutSection2 />

      {/* Call to Action */}
      <CallToActionSection />

      {/* Phần Marquee */}
      <MarqueeSection />
       {/* About Us Section */}
      <AboutUsSection />
      <AboutUsSection2 />
      <PartnerSection/>
      {/* Contact Detail */}
      <ContactDetail />
        <TeamSection />
        <div className="border-t border-gray-200 my-12 max-w-7xl mx-auto"></div> {/* Dòng kẻ ngăn cách */}
        <BlogSection />
      {/* Nút liên hệ nổi */}
      <FloatingContactButton />
    </div>
  );
};

export default Home;