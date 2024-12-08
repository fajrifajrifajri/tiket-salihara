<?php

namespace Database\Factories;

use App\Models\TiketDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TiketDetail>
 */
class TiketDetailFactory extends Factory
{
    protected $model = TiketDetail::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_acara' => \App\Models\Acara::inRandomOrder()->first()->id ?? \App\Models\Acara::factory(),
            'prefix' => strtoupper($this->faker->randomLetter),
            'nama_tiket' => $this->faker->word(),
            'tipe_tiket' => $this->faker->randomElement(['berbayar', 'rsvp']),
            'info_tiket' => $this->faker->sentence(),
            'kapasitas' => $this->faker->numberBetween(50, 300),
            'maksimal_per_transaksi' => $this->faker->numberBetween(1, 5),
            'harga' => $this->faker->randomFloat(2, 10, 100),
            'pajak' => $this->faker->randomFloat(2, 0, 10),
            'penjualan_dari' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'penjualan_sampai' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
