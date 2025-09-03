<?php

namespace App\Services;

use App\Models\Cart;

class CartService
{
  public function getCart($userId)
  {
    return Cart::with('product')
      ->where('user_id', $userId)
      ->get();
  }

  public function addtoCart($userId, array $data)
  {
    $cartItem = Cart::where('user_id', $userId)
      ->where('product_id', $data['product_id'])
      ->first();

    if ($cartItem) {
      $cartItem->quantity += $data['quantity'];
      $cartItem->save();
    } else {
      Cart::create([
        'user_id' => $userId,
        'product_id' => $data['product_id'],
        'quantity' => $data['quantity'],
      ]);
    }
    return $cartItem->load('product');
  }
  public function updateQuantity($userId, $productId, $quantity)
  {
    $cartItem = Cart::where('user_id', $userId)->findOrFail($productId);
    $cartItem->quantity = $quantity;
    $cartItem->save();

    return $cartItem->load('product');
  }
  public function removeFromCart($userId, $productId)
  {
    $cartItem = Cart::where('user_id', $userId)->findOrFail($productId);
    $cartItem->delete();
    return true;
  }
  public function clearCart($userId)
  {
    return Cart::where('user_id', $userId)->delete();
  }
}
