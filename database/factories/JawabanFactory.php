<?php

namespace Database\Factories;

use App\Models\Jawaban;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jawaban>
 */
class JawabanFactory extends Factory
{
    protected $model = Jawaban::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_pertanyaan' => \App\Models\Pertanyaan::inRandomOrder()->first()->id ?? \App\Models\Pertanyaan::factory(),
            'jawaban' => $this->faker->sentence,
        ];
    }
}
