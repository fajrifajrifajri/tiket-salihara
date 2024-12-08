<?php

namespace Database\Factories;

use App\Models\JawabanPengunjung;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JawabanPengunjung>
 */
class JawabanPengunjungFactory extends Factory
{
    protected $model = JawabanPengunjung::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_jawaban' => \App\Models\Jawaban::inRandomOrder()->first()->id ?? \App\Models\Jawaban::factory(),
            'id_pengunjung' => \App\Models\Pengunjung::inRandomOrder()->first()->id ?? \App\Models\Pengunjung::factory(),
            'jawaban_pengunjung' => $this->faker->paragraph,
        ];
    }
}
