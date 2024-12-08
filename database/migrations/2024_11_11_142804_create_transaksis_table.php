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
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengunjung')->constrained('pengunjung')->noActionOnDelete();  
            $table->foreignId('id_kupon')->constrained('kupon')->noActionOnDelete();  
            $table->decimal('potongan');
            $table->decimal('total_bayar');
            $table->enum('status', ['pending', 'sukses', 'gagal']);
            $table->string('metode_pembayaran')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
