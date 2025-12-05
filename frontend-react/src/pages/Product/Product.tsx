// src/pages/ProductList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { getAllProducts } from '../../services/ProductService';
import { toast } from 'react-toastify';

interface Filters {
  search: string;
  priceMin: string;
  priceMax: string;
  ratingMin: string;
  ratingMax: string;
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
    priceMin: '',
    priceMax: '',
    ratingMin: '',
    ratingMax: '',
    sort: '',
  });

  const [page, setPage] = useState(1);
  const perPage = 8;

  const handleChange = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value });
    setPage(1);
  };

  const fetchProducts = useCallback(
    () =>
      getAllProducts({
        search: filters.search,
        price_min: filters.priceMin ? Number(filters.priceMin) : undefined,
        price_max: filters.priceMax ? Number(filters.priceMax) : undefined,
        rating_min: filters.ratingMin ? Number(filters.ratingMin) : undefined,
        rating_max: filters.ratingMax ? Number(filters.ratingMax) : undefined,
        sort: filters.sort,
        page,
        per_page: perPage,
      }),
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-indigo-200/60 to-purple-200/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 drop-shadow-sm">
          Danh sách sản phẩm
        </h1>

        {/* Filter Section */}
        <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 border border-white/30">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="p-3 border rounded-xl shadow-sm"
          />
         <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
  <label className="font-medium text-gray-700">Khoảng giá:</label>

  <div className="flex items-center gap-4">
    <span className="text-sm text-gray-600">
      {Number(filters.priceMin).toLocaleString('vi-VN')}₫
    </span>

    <input
      type="range"
      min="0"
      max="50000000"
      step="100000"
      value={filters.priceMin || 0}
      onChange={(e) => handleChange("priceMin", e.target.value)}
      className="w-full accent-indigo-600"
    />

    <input
      type="range"
      min="0"
      max="50000000"
      step="100000"
      value={filters.priceMax || 50000000}
      onChange={(e) => handleChange("priceMax", e.target.value)}
      className="w-full accent-indigo-600"
    />

    <span className="text-sm text-gray-600">
      {Number(filters.priceMax).toLocaleString('vi-VN')}₫
    </span>
  </div>
</div>

          <select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="p-3 border rounded-xl shadow-sm"
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
            <div className="animate-spin h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.data?.map((product: ProductData) => (
              <div
                key={product.id}
                className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />

                <div className="p-4">
                  <h3 className="font-bold text-xl truncate">{product.name}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-indigo-600 font-bold text-lg">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(Number(product.price))}
                    </span>

                    <span className="text-yellow-500 font-semibold">
                      {product.rating} ★
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* Pagination */}
{data?.last_page > 1 && (
  <div className="flex justify-center items-center mt-10 gap-2">

    {/* Prev */}
    <button
      onClick={() => handlePageChange(page - 1)}
      disabled={page === 1}
      className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-40"
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
          className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          1
        </button>
      );

      // Dấu ...
      if (start > 2) pages.push(<span key="s1" className="px-2">...</span>);

      // Các trang chính
      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 rounded-lg ${
              page === i ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i}
          </button>
        );
      }

      // Dấu ...
      if (end < total - 1) pages.push(<span key="s2" className="px-2">...</span>);

      // Trang cuối nếu bị ẩn
      if (end < total)
        pages.push(
          <button
            key={total}
            onClick={() => handlePageChange(total)}
            className={`px-4 py-2 rounded-lg ${
              page === total ? 'bg-indigo-600 text-white' : 'bg-gray-200'
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
      className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-40"
    >
      Next
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default ProductList;
