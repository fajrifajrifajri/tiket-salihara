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
        Schema::create('acara', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_kategori')->nullable()->constrained('kategori')->nullOnDelete();
            $table->foreignId('id_survei')->nullable()->constrained('survei')->nullOnDelete();
            $table->string('nama_acara');
            $table->enum('tipe_acara', ['berbayar', 'rsvp'])->default('berbayar');
            $table->string('tempat_acara')->nullable();
            $table->string('thumbnail')->nullable();
            $table->text('info')->nullable();
            $table->text('logo')->nullable();
            $table->string('slug')->unique();
            $table->timestamp('tanggal_acara_dari')->nullable();
            $table->timestamp('tanggal_acara_sampai')->nullable();
            $table->timestamp('posting_acara_dari')->nullable();
            $table->timestamp('posting_acara_sampai')->nullable();
            $table->boolean('publish')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acara');
    }
};
