<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       // Create primary data
       \App\Models\Kategori::factory(5)->create();
       \App\Models\Acara::factory(10)->create();
       \App\Models\AkordeonAcara::factory(15)->create();
       \App\Models\TiketDetail::factory(20)->create();
       \App\Models\Transaksi::factory(30)->create();
       \App\Models\Pengunjung::factory(50)->create();
       \App\Models\Tiket::factory(50)->create();
       \App\Models\Kupon::factory(3)->create();
       \App\Models\CheckIn::factory(25)->create();

       // Additional factories for survey-related tables
       \App\Models\Survei::factory(5)->create()->each(function ($survei) {
           \App\Models\Pertanyaan::factory(3)->create(['id_survei' => $survei->id])->each(function ($pertanyaan) {
               \App\Models\Jawaban::factory(2)->create(['id_pertanyaan' => $pertanyaan->id]);
           });
       });

       // Create jawaban_pengunjung linked to pertanyaan and pengunjung
       \App\Models\JawabanPengunjung::factory(500)->create();

       // Create slider entries
       \App\Models\Slider::factory(10)->create();

       // Create global tax value
       \App\Models\Misc::updateOrCreate(
        ['key' => 'pajak_global'],
        ['value' => '10'] // Default tax value set to 10%
    );

        // User::factory(10)->create();

        /*
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        */
    }
}
