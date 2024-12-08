<?php

namespace Database\Factories;

use App\Models\Kupon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kupon>
 */
class KuponFactory extends Factory
{
    protected $model = Kupon::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_acara' => \App\Models\Acara::inRandomOrder()->first()->id ?? \App\Models\Acara::factory(),
            'kode_kupon' => $this->faker->unique()->lexify('KU-?????'),
            'potongan' => $this->faker->randomFloat(2, 5, 50),
            'kedaluwarsa' => $this->faker->dateTimeBetween('now', '+1 month'),
            'kuota' => $this->faker->numberBetween(10, 100),
        ];
    }
}
