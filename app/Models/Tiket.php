<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tiket extends Model
{
    /** @use HasFactory<\Database\Factories\TiketFactory> */
    use HasFactory;

    protected $table = 'tiket';

    protected $fillable = ['id_transaksi', 'id_tiket_detail', 'nomor_tiket', 'nama_acara', 'status', 'tipe_tiket'];

    public function tiketDetail() {
        return $this->belongsTo(TiketDetail::class, 'id_tiket_detail');
    }

    public function transaksi() {
        return $this->belongsTo(Transaksi::class, 'id_transaksi');
    }
}
