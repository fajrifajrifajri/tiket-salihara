<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengunjung extends Model
{
    /** @use HasFactory<\Database\Factories\PengunjungFactory> */
    use HasFactory;

    protected $table = 'pengunjung';

    public $timestamps = false;

    protected $fillable = [
        'nama',
        'whatsapp',
        'email',
        'domisili',
        'kelamin',
        'usia',
        'sumber_informasi',
    ];

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_pengunjung');
    }

    public function jawabanPengunjung()
    {
        return $this->hasMany(JawabanPengunjung::class, 'id_pengunjung');
    }

}
