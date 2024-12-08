<?php

namespace Database\Factories;

use App\Models\Pertanyaan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pertanyaan>
 */
class PertanyaanFactory extends Factory
{
    protected $model = Pertanyaan::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_survei' => \App\Models\Survei::inRandomOrder()->first()->id ?? \App\Models\Survei::factory(),
            'pertanyaan' => $this->faker->sentence,
            'tipe_pertanyaan' => $this->faker->randomElement(['text', 'radio', 'checkbox']),
            'wajib' => $this->faker->boolean,
        ];
    }
}
