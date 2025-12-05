import React from 'react';

interface StatisticCardProps {
  value: string;
  label: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ value, label }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
    <p className="text-4xl font-bold text-orange-500 mb-2">{value}</p>
    <p className="text-gray-700 text-lg">{label}</p>
  </div>
);

const StatisticsSection: React.FC = () => {
  const statistics = [
    { value: '70+', label: 'Dự án nền móng' },
    { value: '190+', label: 'Thiết kế nhà ở' },
    { value: '300+', label: 'Dự án cải tạo' },
    { value: '15', label: 'Năm kinh nghiệm' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {statistics.map((stat, index) => (
          <StatisticCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;