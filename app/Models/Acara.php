<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acara extends Model
{
    /** @use HasFactory<\Database\Factories\AcaraFactory> */
    use HasFactory;
    
    protected $table = 'acara';

    protected $fillable = [
        'id_kategori', 'id_survei', 'nama_acara', 'tipe_acara', 'tempat_acara', 'thumbnail', 'info', 'logo', 'slug',
        'tanggal_acara_dari', 'tanggal_acara_sampai', 'posting_acara_dari', 
        'posting_acara_sampai', 'publish'
    ];

    public function kategori() {
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }

    public function survei() {
        return $this->belongsTo(Survei::class, 'id_survei');
    }

    public function akordeonAcara() {
        return $this->hasMany(AkordeonAcara::class, 'id_acara');
    }

    public function tiketDetail() {
        return $this->hasMany(TiketDetail::class, 'id_acara');
    }

    public function kupon() {
        return $this->hasMany(Kupon::class, 'id_acara');
    }

    public function jawabanPengunjung() {
        return $this->hasMany(JawabanPengunjung::class, 'id_acara');
    }
}
