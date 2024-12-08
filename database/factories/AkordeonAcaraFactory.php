<?php

namespace Database\Factories;

use App\Models\AkordeonAcara;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AkordeonAcara>
 */
class AkordeonAcaraFactory extends Factory
{
    protected $model = AkordeonAcara::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_acara' => \App\Models\Acara::inRandomOrder()->first()->id ?? \App\Models\Acara::factory(),
            'judul_akordeon' => $this->faker->sentence(),
            'deskripsi_akordeon' => $this->faker->paragraph(),
        ];
    }
}
