<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5),
            'description' => fake()->paragraph(),
            'user_id' => User::teacher()->value('id'),
            'category_id' => Category::all()->random()->id,
            'image_url' => null,
            'price' => fake()->numberBetween(5, 1000) * 1000,
            'difficulty' => fake()->randomElement(['Beginner', 'Medium', 'Advanced']),
            'duration' => fake()->numberBetween(5, 100),
            'is_published' => fake()->boolean()
        ];
    }
}
