<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tiket_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_acara')->constrained('acara')->noActionOnDelete();
            $table->string('prefix');
            $table->string('nama_tiket');
            $table->enum('tipe_tiket', ['berbayar', 'rsvp']);
            $table->string('info_tiket')->nullable();
            $table->unsignedSmallInteger('kapasitas');
            $table->unsignedSmallInteger('maksimal_per_transaksi');
            $table->decimal('harga');
            $table->unsignedTinyInteger('pajak')->default(0);
            $table->timestamp('penjualan_dari')->nullable();
            $table->timestamp('penjualan_sampai')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiket_detail');
    }
};
