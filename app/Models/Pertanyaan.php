<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pertanyaan extends Model
{
    /** @use HasFactory<\Database\Factories\PertanyaanFactory> */
    use HasFactory;

    protected $table = 'pertanyaan';

    public $timestamps = false;

    protected $fillable = [
        'pertanyaan', 'id_survei', 'tipe_pertanyaan', 'wajib'
    ];

    public function jawaban()
    {
        return $this->hasMany(Jawaban::class, 'id_pertanyaan');
    }

}
