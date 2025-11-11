<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fullname' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'payment_method' => 'required|string',
            'items_price' => 'required|numeric',
            'shipping_price' => 'required|numeric',
            'total_price' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.name'  => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'items.*.image' => 'nullable|string',
        ];
    }
    public function messages()
    {
        return [
            'fullname.required' => 'Họ tên không được để trống.',
            'phone.required' => 'Số điện thoại không được để trống.',
            'address.required' => 'Địa chỉ không được để trống.',
            'city.required' => 'Thành phố không được để trống.',
            'payment_method.required' => 'Phương thức thanh toán là bắt buộc.',

            'items_price.required' => 'Thiếu tổng giá trị sản phẩm.',
            'shipping_price.required' => 'Thiếu phí vận chuyển.',
            'total_price.required' => 'Thiếu tổng thanh toán.',

            'items.required' => 'Đơn hàng phải có ít nhất 1 sản phẩm.',
            'items.array' => 'Dữ liệu sản phẩm phải là dạng mảng.',
            'items.min' => 'Đơn hàng phải có ít nhất 1 sản phẩm.',

            'items.*.product_id.required' => 'Thiếu product_id của sản phẩm.',
            'items.*.product_id.exists' => 'Sản phẩm không tồn tại trong hệ thống.',

            'items.*.name.required' => 'Thiếu tên sản phẩm.',
            'items.*.quantity.required' => 'Thiếu số lượng sản phẩm.',
            'items.*.quantity.min' => 'Số lượng ít nhất là 1.',
            'items.*.price.required' => 'Thiếu giá sản phẩm.',
            'items.*.price.numeric' => 'Giá sản phẩm phải là dạng số.',
        ];
    }
}
