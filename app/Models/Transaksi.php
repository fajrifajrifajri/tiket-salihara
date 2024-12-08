<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    /** @use HasFactory<\Database\Factories\TransaksiFactory> */
    use HasFactory;

    protected $table = 'transaksi';

    protected $fillable = ['id_tiket', 'id_acara', 'id_kupon', 'id_pengunjung', 'potongan', 'total_bayar', 'status'];

    public function tiket() {
        return $this->hasMany(Tiket::class, 'id_transaksi');
    }
    
    public function kupon()
    {
        return $this->belongsTo(Kupon::class, 'id_kupon', 'id');
    }

    public function acara() {
        return $this->belongsTo(Acara::class, 'id_acara');
    }

    public function pengunjung() {
        return $this->belongsTo(Pengunjung::class, 'id_pengunjung');
    }
}
