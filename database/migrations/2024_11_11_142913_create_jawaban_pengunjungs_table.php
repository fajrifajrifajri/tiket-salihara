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
        Schema::create('jawaban_pengunjung', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_jawaban')->constrained('jawaban')->onDelete('cascade');
            $table->foreignId('id_pengunjung')->constrained('pengunjung')->onDelete('cascade');
            $table->text('jawaban_pengunjung')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jawaban_pengunjung');
    }
};