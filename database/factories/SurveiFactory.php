<?php

namespace Database\Factories;

use App\Models\Survei;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Survei>
 */
class SurveiFactory extends Factory
{
    protected $model = Survei::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_survei' => $this->faker->sentence,
        ];
    }
}
