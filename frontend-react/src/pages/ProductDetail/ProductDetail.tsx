import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaPinterestP, FaEnvelope, FaShoppingCart, FaMinus, FaPlus, FaCheckCircle, FaShippingFast, FaHeadset, FaUndoAlt, FaBoxOpen } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { getProductDetail } from '../../services/ProductService'; // Import the service

// Define the ProductData interface based on your database schema
interface ProductData {
  id: number;
  name: string;
  description?: string; // text can be NULL
  price: number;
  brand?: string; // varchar can be NULL
  rating: number;
  image?: string; // varchar can be NULL
  countInStock: number;
  created_at?: string; // timestamp can be NULL
  updated_at?: string; // timestamp can be NULL
  status: string; // Added for UI display
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductDetail(id || '');
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center text-lg">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 text-lg">Lỗi: {error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4 text-center text-lg">Sản phẩm không tìm thấy.</div>;
  }

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  const isOutOfStock = product?.countInStock <= 0;
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mt-4 mb-8">
          <nav className="text-sm font-medium text-gray-500" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="text-gray-600 hover:text-gray-800">Trang chủ</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="text-gray-600 hover:text-gray-800">Sản phẩm nổi bật</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-900">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col lg:flex-row gap-8">
          {/* Product Image Gallery */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover mb-4"
            />
            <div className="flex gap-2">
              <img
                src={product.image}
                alt={`${product.name} thumbnail`}
                className="w-20 h-20 object-cover rounded-md border-2 border-orange-500 cursor-pointer"
              />
              {/* Add more thumbnails here if available */}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 text-left">{product.name}</h1>
            <p className="text-gray-600 mb-2 text-left font-bold">Tình trạng: {product.countInStock > 0 ? <span className="text-green-600 font-semibold">Còn hàng</span>
              : <span className="text-red-600 font-semibold">Hết hàng</span>}</p>


            <div className="mt-6 mb-6 flex items-center justify-between font-bold">
              <span className="text-gray-700 text-lg ">
                Giá:
              </span>
              <span className="text-red-500 text-4xl">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(product.price)}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-xl">{'⭐'.repeat(Math.floor(product.rating))}</span>
              <span className="text-gray-500 ml-2 text-lg">({product.rating})</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 text-lg mr-4 font-bold">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                >
                  <FaMinus />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-l border-r border-gray-300 py-2"
                />
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300
      ${isOutOfStock
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  }`}
              >
                <FaShoppingCart className="mr-2" />
                Thêm vào giỏ
              </button>

              <button
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-6 rounded-md transition-colors duration-300
      ${isOutOfStock
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                  }`}
              >
                Mua ngay
              </button>
            </div>

            <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors duration-300 mb-6">
              Click vào đây để nhận ưu đãi
            </button>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-gray-700 mr-2">Chia sẻ:</span>
              <a href="#" className="text-white bg-blue-600 p-2 rounded-full hover:opacity-80"><FaFacebookF /></a>
              <a href="#" className="text-white bg-blue-400 p-2 rounded-full hover:opacity-80"><FaTwitter /></a>
              <a href="#" className="text-white bg-red-600 p-2 rounded-full hover:opacity-80"><FaPinterestP /></a>
              <a href="#" className="text-white bg-gray-500 p-2 rounded-full hover:opacity-80"><FaEnvelope /></a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales Policy */}
              <div className='text-left'>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Chính sách bán hàng</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><MdVerified className="text-green-500 mr-2" /> Cam kết 100% chính hãng</li>
                  <li className="flex items-center"><FaShippingFast className="text-blue-500 mr-2" /> Miễn phí giao hàng</li>
                  <li className="flex items-center"><FaHeadset className="text-purple-500 mr-2" /> Hỗ trợ 24/7</li>
                </ul>
              </div>

              {/* Additional Information */}
              <div className='text-left'>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Thông tin thêm</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Hoàn tiền 111% nếu hàng giả</li>
                  <li className="flex items-center"><FaBoxOpen className="text-yellow-500 mr-2" /> Mở hộp kiểm tra nhận hàng</li>
                  <li className="flex items-center"><FaUndoAlt className="text-red-500 mr-2" /> Đổi trả trong 7 ngày</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* "Khuyến mãi dành cho bạn" section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Khuyến mãi dành cho bạn</h2>
          {/* Add content for promotions here */}
          <div className="bg-white p-6 rounded-lg shadow-md text-left">
            <p className="text-gray-700">Nội dung khuyến mãi sẽ được hiển thị ở đây.</p>
          </div>
        </div>

        {/* Product Description Section */}
        {product.description && (
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mô tả sản phẩm</h2>
            <p className="text-gray-700 leading-relaxed text-left">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;