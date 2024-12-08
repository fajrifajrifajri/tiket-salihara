<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiketDetail extends Model
{
    /** @use HasFactory<\Database\Factories\TiketDetailFactory> */
    use HasFactory;

    protected $table = 'tiket_detail';

    protected $fillable = [
        'id_acara', 'prefix', 'nama_tiket', 'tipe_tiket', 'info_tiket', 'kapasitas', 
        'maksimal_per_transaksi', 'harga', 'pajak', 'penjualan_dari', 'penjualan_sampai'
    ];

    public function acara() {
        return $this->belongsTo(Acara::class, 'id_acara');
    }

    public function tiket() {
        return $this->hasMany(Tiket::class, 'id_tiket_detail');
    }
}
