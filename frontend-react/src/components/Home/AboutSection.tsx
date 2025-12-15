import Reveal from "../Reveal";

const AboutSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* CỘT TRÁI – ẢNH LỚN */}
        <Reveal>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/src/assets/urbanconstruct_index_about_1_banner_1_img.jpg"
              alt="Kiến trúc hiện đại"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        {/* CỘT PHẢI – NỘI DUNG */}
        <div className="flex flex-col space-y-8">

          <Reveal>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Xây dựng một nền tảng vững chắc
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Định hình chất lượng <br />
              bằng chuyên môn của <br />
              chúng tôi
            </h2>
          </Reveal>

          <Reveal>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Chúng tôi hiểu rằng mỗi ngôi nhà, mỗi công trình của khách hàng là
              một ước mơ đời người. Chúng tôi trân trọng điều đó và luôn làm tốt
              nhất nhiệm vụ của mình để mang đến những công trình đẹp.
            </p>
          </Reveal>

          {/* ẢNH NHỎ PHÍA DƯỚI */}
          <Reveal>
            <div className="rounded-2xl overflow-hidden mt-6">
              <img
                src="/src/assets/urbanconstruct_index_about_1_banner_2_img.jpg"
                alt="Không gian kiến trúc"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
