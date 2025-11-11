<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        $product = Product::inRandomOrder()->first();
        return [
            'order_id' => null, // sẽ gán trong seeder
            'product_id' => $product?->id ?? 1,
            'name' => $product?->name ?? 'Sample Product',
            'quantity' => $this->faker->numberBetween(1, 5),
            'price' => $product?->price ?? 100000,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
