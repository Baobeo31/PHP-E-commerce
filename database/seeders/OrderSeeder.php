<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory()->count(10)->create()->each(function ($order) {
            $itemCount = rand(1, 5);
            $itemPrice = 0;


            for ($i = 0; $i < $itemCount; $i++) {
                $item = OrderItem::factory()->make();
                $item->order_id = $order->id;
                $item->save();
                $itemPrice += $item->price * $item->quantity;
            }

            $order->items_price = $itemPrice;
            $order->total_price = $itemPrice + $item->shipping_price;
            $order->save();
        });
    }
}
