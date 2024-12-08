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
        Schema::create('kupon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_acara')->constrained('acara')->onDelete('cascade');
            $table->string('kode_kupon')->unique();
            $table->decimal('potongan');
            $table->date('kedaluwarsa');
            $table->unsignedInteger('kuota');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kupon');
    }
};
