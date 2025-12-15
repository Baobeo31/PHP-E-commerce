import React from 'react';
import Reveal from '../Reveal';

const MarqueeSection: React.FC = () => {
  return (
    <section className="bg-black overflow-hidden py-16">
      <Reveal>
      <div className="relative w-full">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mx-8 text-6xl md:text-8xl font-bold text-gray-500 uppercase">
            future-focused construction solutions
          </span>
          <span className="mx-8 text-6xl md:text-8xl font-bold text-gray-500 uppercase">
            future-focused construction solutions
          </span>
          <span className="mx-8 text-6xl md:text-8xl font-bold text-gray-500 uppercase">
            future-focused construction solutions
          </span>
        </div>
      </div>
      </Reveal>
    </section>
  );
};

export default MarqueeSection;
