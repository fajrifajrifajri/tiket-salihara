<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survei extends Model
{
    /** @use HasFactory<\Database\Factories\SurveiFactory> */
    use HasFactory;

    protected $table = 'survei';

    public $timestamps = false;

    protected $fillable = [
        'nama_survei',
    ];

    public function acara() {
        return $this->hasMany(Acara::class, 'id_survei');
    }

    public function pertanyaan()
    {
        return $this->hasMany(Pertanyaan::class, 'id_survei');
    }

}
