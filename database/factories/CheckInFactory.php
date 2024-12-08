<?php

namespace Database\Factories;

use App\Models\CheckIn;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CheckIn>
 */
class CheckInFactory extends Factory
{
    protected $model = CheckIn::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_tiket' => \App\Models\Tiket::inRandomOrder()->first()->id ?? \App\Models\Tiket::factory(),
            'waktu_check_in' => $this->faker->dateTimeBetween('now', '+1 day'),
            'check_in_status' => $this->faker->randomElement(['success', 'failed']),
        ];
    }
}
