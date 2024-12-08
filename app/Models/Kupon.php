<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kupon extends Model
{
    /** @use HasFactory<\Database\Factories\KuponFactory> */
    use HasFactory;

    protected $table = 'kupon';

    protected $fillable = [
        'id_acara',
        'kode_kupon',
        'potongan',
        'kedaluwarsa',
        'kuota',
    ];

    public function acara()
    {
        return $this->belongsTo(Acara::class, 'id_acara');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_kupon');
    }

}
