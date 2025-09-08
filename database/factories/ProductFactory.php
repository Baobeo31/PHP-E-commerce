<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(3, true),
            'price' => $this->faker->randomFloat(2, 100000, 500000), // từ 100k -> 500k
            'description' => $this->faker->sentence(10),
            'rating' => $this->faker->randomFloat(1, 1, 5), // từ 1.0-5.0
            'brand' => $this->faker->company(),
            'image' => $this->faker->imageUrl(640, 480, 'products', true), // tạo link ảnh giả
            'countInStock' => $this->faker->numberBetween(0, 100)
        ];
    }
}
