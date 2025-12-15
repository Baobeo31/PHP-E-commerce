import React from 'react';
import Reveal from '../Reveal';

const clientLogos = [
  { src: '/src/assets/partner-item/urbanconstruct_index_partner_1_img.jpg', alt: 'ACS Logo' },
  { src: '/src/assets/partner-item/urbanconstruct_index_partner_2_img.jpg', alt: 'Bechtel Logo' },
  { src: '/src/assets/partner-item/urbanconstruct_index_partner_3_img.jpg', alt: 'Skanska Logo' },
  { src: '/src/assets/partner-item/urbanconstruct_index_partner_4_img.jpg', alt: 'Vinci Logo' },
  { src: '/src/assets/partner-item/urbanconstruct_index_partner_5_img.jpg', alt: 'LT Logo' },
  { src: '/src/assets/partner-item/urbanconstruct_index_partner_6_img.jpg', alt: 'Strabag Logo' },
];

const PartnerSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clientLogos.map((logo, index) => (
            <Reveal>
            <div key={index} className="flex-shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 object-contain grayscale opacity-50 hover:opacity-100 transition-all duration-300"
              />
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;