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
        Schema::create('tiket', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_transaksi')->constrained('transaksi')->cascadeOnDelete();
            $table->foreignId('id_tiket_detail')->constrained('tiket_detail')->restrictOnDelete();
            $table->string('nama_acara');
            $table->string('nomor_tiket');
            $table->enum('status', ['waiting', 'check-in', 'refund', 'expired']);
            $table->enum('tipe_tiket', ['berbayar', 'rsvp']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiket');
    }
};
