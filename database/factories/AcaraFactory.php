<?php

namespace Database\Factories;

use App\Models\Acara;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Acara>
 */
class AcaraFactory extends Factory
{
    protected $model = Acara::class;
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $berbayarCount = 0;
        static $rsvpCount = 0;

        $tipe_acara = $this->faker->randomElement(['berbayar', 'rsvp']);

        // Ensure at least one 'berbayar' and one 'rsvp' are created
        if ($berbayarCount === 0) {
            $tipe_acara = 'berbayar';
            $berbayarCount++;
        } elseif ($rsvpCount === 0) {
            $tipe_acara = 'rsvp';
            $rsvpCount++;
        }

        return [
            'id_kategori' => \App\Models\Kategori::inRandomOrder()->first()->id ?? \App\Models\Kategori::factory(),
            'id_survei' => \App\Models\Survei::inRandomOrder()->first()->id ?? \App\Models\Survei::factory(),
            'nama_acara' => $this->faker->words(3, true),
            'thumbnail' => $this->faker->imageUrl(),
            'info' => $this->faker->paragraph(),
            'logo' => $this->faker->imageUrl(),
            'tempat_acara' => $this->faker->words(3, true),
            'tipe_acara' => $tipe_acara,
            'slug' => $this->faker->slug(),
            'tanggal_acara_dari' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'tanggal_acara_sampai' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'posting_acara_dari' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'posting_acara_sampai' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'publish' => $this->faker->boolean(),
        ];
    }
}
