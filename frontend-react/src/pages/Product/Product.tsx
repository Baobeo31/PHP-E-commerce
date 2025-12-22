// src/pages/ProductList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { getAllProducts } from '../../services/ProductService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; 
import { FaShoppingCart } from 'react-icons/fa'; 

interface Filters {
  search: string;
  selectedPrices: string[];
  selectedRatings: number[]; 
  sort: string;
}

interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  rating: number;
  image: string;
  countInStock: number; 
}

const ProductList: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    selectedPrices: [], 
    selectedRatings: [], 
    sort: '',
  });

  const [page, setPage] = useState(1);

  // Define predefined price ranges
  const priceRanges = [
    { label: 'Dưới 1.000.000₫', min: 0, max: 1000000 },
    { label: '1.000.000₫ - 5.000.000₫', min: 1000000, max: 5000000 },
    { label: 'Trên 5.000.000₫', min: 5000000, max: Infinity },
  ];

  // Define predefined rating options
  const ratingOptions = [
    { label: `${'⭐'.repeat(5)}`, value: 5 },
    { label: `${'⭐'.repeat(4)} trở lên`, value: 4 },
    { label: `${'⭐'.repeat(3)} trở lên`, value: 3 },
    { label: `${'⭐'.repeat(2)} trở lên`, value: 2 },
    { label: `${'⭐'.repeat(1)} trở lên`, value: 1 },
  ];


  const handleChange = (key: keyof Filters, value: string | string[] | number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    setPage(1);
  }; // 

  const handlePriceCheckboxChange = (rangeLabel: string) => {
    setFilters((prevFilters) => {
      const currentSelectedPrices = prevFilters.selectedPrices;
      if (currentSelectedPrices.includes(rangeLabel)) {
        return { ...prevFilters, selectedPrices: currentSelectedPrices.filter((label) => label !== rangeLabel) };
      } else {
        return { ...prevFilters, selectedPrices: [...currentSelectedPrices, rangeLabel] };
      }
    });
    setPage(1);
  };

  const handleRatingCheckboxChange = (ratingValue: number) => {
    setFilters((prevFilters) => {
      const currentSelectedRatings = prevFilters.selectedRatings;
      if (currentSelectedRatings.includes(ratingValue)) {
        return { ...prevFilters, selectedRatings: currentSelectedRatings.filter((value) => value !== ratingValue) };
      } else {
        return { ...prevFilters, selectedRatings: [...currentSelectedRatings, ratingValue] };
      }
    });
    setPage(1);
  };

  const fetchProducts = useCallback(
    () => {
      let minPrice: number | undefined;
      let maxPrice: number | undefined;
      let minRating: number | undefined;

      if (filters.selectedPrices.length > 0) {
        const selectedPriceObjects = priceRanges.filter(range => filters.selectedPrices.includes(range.label));
        minPrice = Math.min(...selectedPriceObjects.map(range => range.min));
        maxPrice = Math.max(...selectedPriceObjects.map(range => range.max));
        if (maxPrice === Infinity) maxPrice = undefined;
      }

      if (filters.selectedRatings.length > 0) {
        minRating = Math.min(...filters.selectedRatings);
      }

      return getAllProducts({
        search: filters.search,
        price_min: minPrice,
        price_max: maxPrice,
        rating_min: minRating,
        sort: filters.sort,
      });
    },
    [filters, page]
  );

  const { data, isLoading, isError, refetch } = useQuery(
    ['products', filters, page],
    fetchProducts
  );

  useEffect(() => {
    refetch();
  }, [filters, page, refetch]);

  if (isError) toast.error('Lỗi tải dữ liệu sản phẩm!');

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= data?.last_page) setPage(newPage);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-12">Tất cả sản phẩm</h1>
        <div className='text-left'>
           <div className="border-t border-gray-200 my-4 max-w-7xl mx-auto "></div> 
           <Link to="/" className="text-black hover:underline">Trang chủ </Link> {' / '}
           <span className="text-black font-bold">Tất cả sản phẩm</span> 
           <div className="border-t border-gray-200 m-4 max-w-7xl mx-auto "></div> 
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={filters.search}
                onChange={(e) => handleChange('search', e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Price Range Filter Checkboxes */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <label className="font-semibold text-lg text-gray-800 mb-3 block">Khoảng giá:</label>
              {priceRanges.map((range) => (
                <div key={range.label} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`price-${range.label}`}
                    checked={filters.selectedPrices.includes(range.label)}
                    onChange={() => handlePriceCheckboxChange(range.label)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`price-${range.label}`} className="ml-3 text-gray-700">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Rating Filter Checkboxes */}
            <div className="mb-6">
              <label className="font-semibold text-lg text-gray-800 mb-3 block">Rating:</label>
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`rating-${option.value}`}
                    checked={filters.selectedRatings.includes(option.value)}
                    onChange={() => handleRatingCheckboxChange(option.value)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`rating-${option.value}`} className="ml-3 text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Product Content */}
          <main className="lg:w-3/4">
            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <select
                value={filters.sort}
                onChange={(e) => handleChange('sort', e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Sắp xếp: Mặc định</option>
                <option value="name_asc">Tên A → Z</option>
                <option value="name_desc">Tên Z → A</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
                <option value="rating_asc">Rating thấp → cao</option>
                <option value="rating_desc">Rating cao → thấp</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <div className="animate-spin h-16 w-16 rounded-full border-4 border-orange-500 border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.map((product: ProductData) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <Link to={`/products/${product.id}`}> {/* Wrap image and name with Link */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </Link>

                    <div className="p-4">
                      <Link to={`/product/${product.id}`}> {/* Wrap name with Link */}
                        <h3 className="font-bold text-lg text-gray-900 truncate hover:text-orange-500 transition-colors duration-200">{product.name}</h3>
                      </Link>
                      {/* <p className="text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p> */}

                      <div className="mt-4 flex justify-between items-center">
                        {product.price ? (
                          <span className="text-black font-bold text-lg">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(Number(product.price))} 
                          </span>
                        ) : (
                          <span className="text-gray-700 font-semibold text-base">
                            {product.countInStock > 0 ? 'Liên hệ để biết giá' : 'Hết hàng'  }
                          </span>
                        )}

                        {product.price && (
                          <button className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-200">
                            <FaShoppingCart className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div>
                        <span className="text-yellow-500">{'⭐'.repeat(product.rating)}</span>
                        <span className="text-gray-500 ml-2">({product.rating})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {data?.last_page > 1 && (
              <div className="flex justify-center items-center mt-10 gap-2">
                {/* Prev */}
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-40 hover:bg-orange-600 transition-colors duration-200"
                >
                  Prev
                </button>

                {/* Main Page Numbers */}
                {(() => {
                  const pages = [];
                  const total = data.last_page;
                  let start = Math.max(1, page - 2);
                  let end = Math.min(total, page + 2);

                  // Nếu quá ít trang → show hết
                  if (total <= 5) {
                    start = 1;
                    end = total;
                  }

                  // Trang đầu nếu bị ẩn
                  if (start > 1) pages.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      1
                    </button>
                  );

                  // Dấu ...
                  if (start > 2) pages.push(<span key="s1" className="px-2 text-gray-600">...</span>);

                  // Các trang chính
                  for (let i = start; i <= end; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 rounded-lg ${
                          page === i ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  if (end < total - 1) pages.push(<span key="s2" className="px-2 text-gray-600">...</span>);

                  if (end < total)
                    pages.push(
                      <button
                        key={total}
                        onClick={() => handlePageChange(total)}
                        className={`px-4 py-2 rounded-lg ${
                          page === total ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {total}
                      </button>
                    );

                  return pages;
                })()}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === data.last_page}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-40 hover:bg-orange-600 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;