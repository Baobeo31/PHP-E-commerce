<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        $isPaid = $this->faker->boolean(70);        // 70% khả năng đã thanh toán
        $isDelivered = $isPaid ? $this->faker->boolean(50) : false; // nếu chưa thanh toán thì chưa giao
        return [
            'user_id' => 1, // nếu có bảng users, có thể random
            'fullname' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'payment_method' => $this->faker->randomElement(['COD', 'Credit Card', 'Paypal']),
            'items_price' => 0,     // sẽ tính lại trong seeder
            'shipping_price' => $this->faker->randomFloat(2, 10000, 50000),
            'total_price' => 0,     // sẽ tính lại trong seeder
            'is_paid' => $isPaid,
            'paid_at' => $isPaid ? now() : null,
            'is_delivered' => $isDelivered,
            'delivered_at' => $isDelivered ? now() : null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
