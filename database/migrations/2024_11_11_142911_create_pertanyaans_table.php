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
        Schema::create('pertanyaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_survei')->constrained('survei')->onDelete('cascade');
            $table->text('pertanyaan');
            $table->string('tipe_pertanyaan')->default('text');
            $table->boolean('wajib')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pertanyaan');
    }
};
