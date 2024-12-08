<?php

namespace Database\Factories;

use App\Models\Tiket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tiket>
 */
class TiketFactory extends Factory
{
    protected $model = Tiket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_transaksi' => \App\Models\Transaksi::inRandomOrder()->first()->id ?? \App\Models\Transaksi::factory(),
            'id_tiket_detail' => \App\Models\TiketDetail::inRandomOrder()->first()->id ?? \App\Models\TiketDetail::factory(),
            'nama_acara' => $this->faker->sentence(),
            'nomor_tiket' => strtoupper($this->faker->lexify('???-######')),
            'status' => $this->faker->randomElement(['waiting', 'check-in', 'refund', 'expired']),
            'tipe_tiket' => $this->faker->randomElement(['berbayar', 'rsvp']),
        ];
    }
}
