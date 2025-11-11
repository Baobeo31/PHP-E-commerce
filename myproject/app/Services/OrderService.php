<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class OrderService
{
  public function createOrder(array $data, $userid)
  {
    DB::beginTransaction();
    try {
      $order = Order::create([
        'user_id' => $userid,
        'fullname' => $data['fullname'],
        'phone' => $data['phone'],
        'address' => $data['address'],
        'city' => $data['city'],
        'payment_method' => $data['payment_method'],
        'items_price' => $data['items_price'],
        'shipping_price' => $data['shipping_price'],
        'total_price' => $data['total_price'],
      ]);
      foreach ($data['items'] as $item) {
        OrderItem::create([
          'order_id' => $order->id,
          'product_id' => $item['product_id'],
          'name' => $item['name'],
          'quantity'   => $item['quantity'],
          'price'      => $item['price'],
          'image'      => $item['image'] ?? null,
        ]);
      };
      DB::commit();
      return $order->load('items.product');
    } catch (\Throwable $th) {
      DB::rollBack();
      return $th;
    }
  }

  public function getAllOrders($perPage = 10) // Trang đã thanh toán 
  {
    try {
      return Order::with(['user', 'items.product'])->paginate($perPage);
    } catch (\Throwable $th) {
      return $th;
    }
  }

  public function getOrderByUser($userid)
  {
    try {
      return Order::with('items.product')->where('user_id', $userid)->get();
    } catch (\Throwable $th) {
      return $th;
    }
  }
  public function getOrderDetail($orderId, $userId)
  {
    return Order::with('items.product')
      ->where('user_id', $userId)
      ->findOrFail($orderId);
  }
  public function updateStatusOrder($orderId, array $data)
  {
    $order = Order::find($orderId);
    if (isset($data['is_paid'])) {
      $order->is_paid = $data['is_paid'];
      $order->paid_at = $data['paid_at'] ? now() : null;
    }
    if (isset($data['is_delivered'])) {
      $order->is_delivered = $data['is_delivered'];
      $order->delivered_at = $data['is_delivered'] ? now() : null;
    }
    $order->save();
    return $order->fresh(['items.product']);
  }
}
