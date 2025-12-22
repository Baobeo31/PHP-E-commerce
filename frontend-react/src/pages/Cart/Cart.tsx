import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { getCartItems } from '../../services/CartService';

const Cart: React.FC = () => {
  const [note, setNote] = useState('');
  const [agree, setAgree] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('store');

  const {
    data: cartItems,
    isLoading,
    isError,
    error,
  } = useQuery(['cartItems'], getCartItems, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onError: (err) => {
      console.error('Error fetching cart data:', err);
    },
  });

  const totalQuantity = cartItems ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const totalPrice = cartItems
    ? cartItems.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-gray-500 text-sm">
        <Link to="/">Trang chủ</Link> / <span className="font-semibold text-black">Giỏ hàng ({totalQuantity})</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Giỏ hàng của bạn</h2>
          <div className="mb-4 text-green-600 font-semibold">
            Bạn đã được <span className="bg-green-100 px-2 py-1 rounded">MIỄN PHÍ VẬN CHUYỂN</span>
          </div>
          <div className="mb-4">
            <div className="h-2 bg-green-500 rounded"></div>
          </div>
          {isLoading ? (
            <p>Đang tải giỏ hàng...</p>
          ) : isError ? (
            <p className="text-red-600">Lỗi: {error?.message || 'Không thể tải giỏ hàng.'}</p>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-gray-600 mb-4">Không có sản phẩm nào trong giỏ hàng.</p>
              <Link
                to="/products"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Mua sắm ngay
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4 last:border-b-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="bg-gray-200 text-xs px-2 py-1 rounded mr-2">Xóa</span>
                        <span className="font-semibold">{item.product.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-orange-600 font-bold">{parseFloat(item.product.price).toLocaleString()}₫</span>
                        {item.product.oldPrice && (
                          <span className="text-gray-400 line-through text-sm">{parseFloat(item.product.oldPrice).toLocaleString()}₫</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                    <div className="font-semibold text-right w-24">
                      {(parseFloat(item.product.price) * item.quantity).toLocaleString()}₫
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block font-semibold mb-2">Ghi chú đơn hàng</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập ghi chú cho đơn hàng..."
                />
              </div>
            </>
          )}
        </div>
        {/* Right: Order Info */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-lg font-bold mb-4">Thông tin đơn hàng</h3>
          <div className="mb-4">
            <div className="font-semibold mb-2">THỜI GIAN GIAO HÀNG</div>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="store"
                  checked={deliveryTime === 'store'}
                  onChange={() => setDeliveryTime('store')}
                  className="mr-2"
                />
                Giao khi có hàng
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="choose"
                  checked={deliveryTime === 'choose'}
                  onChange={() => setDeliveryTime('choose')}
                  className="mr-2"
                />
                Chọn thời gian
              </label>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Tổng tiền:</span>
              <span className="text-2xl font-bold text-red-600">{totalPrice.toLocaleString()}₫</span>
            </div>
            <div className="text-gray-500 text-xs mt-2">
              Phí vận chuyển sẽ được tính ở trang thanh toán.<br />
              Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mr-2"
              />
              Tôi đã đọc và đồng ý với <Link to="/terms-of-service" className="text-blue-600 underline">điều khoản và điều kiện</Link> của Website*
            </label>
          </div>
          <button
            className={`w-full py-3 rounded font-bold text-white text-lg ${agree ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!agree}
          >
            THANH TOÁN
          </button>
          <div className="mt-6 bg-blue-50 p-4 rounded text-sm text-blue-700">
            <div className="font-semibold mb-2">Chính sách mua hàng:</div>
            Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối thiểu <span className="font-bold">400.000₫</span> trở lên.
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded text-sm text-gray-700">
            <div className="font-semibold mb-2">Khuyến mãi dành cho bạn:</div>
            <div className="flex items-center space-x-2">
              <img src="/src/assets/voucher.png" alt="Voucher" className="w-8 h-8" />
              <span>Miễn phí vận chuyển cho đơn hàng trên 1.200.000₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;