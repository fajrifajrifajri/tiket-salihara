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
        Schema::create('akordeon_acara', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_acara')->constrained('acara')->cascadeOnDelete();
            $table->string('judul_akordeon');
            $table->text('deskripsi_akordeon')->nullable();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akordeon_acara');
    }
};
