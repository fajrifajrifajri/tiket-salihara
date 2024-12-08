<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    /** @use HasFactory<\Database\Factories\KategoriFactory> */
    use HasFactory;

    protected $table = 'kategori';

    public $timestamps = false;

    protected $fillable = ['nama_kategori'];

    public function acara() {
        return $this->hasMany(Acara::class, 'id_kategori');
    }
}
