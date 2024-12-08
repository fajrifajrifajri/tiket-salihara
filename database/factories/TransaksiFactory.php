<?php

namespace Database\Factories;

use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaksi>
 */
class TransaksiFactory extends Factory
{
    protected $model = Transaksi::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_pengunjung' => \App\Models\Pengunjung::inRandomOrder()->first()->id ?? \App\Models\Pengunjung::factory(),
            'id_kupon' => \App\Models\Kupon::inRandomOrder()->first()->id ?? \App\Models\Kupon::factory(),
            'potongan' => $this->faker->randomFloat(2, 0, 50),
            'total_bayar' => $this->faker->randomFloat(2, 50, 500),
            'status' => $this->faker->randomElement(['pending', 'sukses', 'gagal']),
        ];
    }
}
