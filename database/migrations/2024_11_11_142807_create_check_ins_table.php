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
        Schema::create('check_in', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_tiket')->constrained('tiket')->onDelete('cascade');
            $table->timestamp('waktu_check_in')->nullable();
            $table->enum('check_in_status', ['success', 'failed'])->default('success');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_in');
    }
};
