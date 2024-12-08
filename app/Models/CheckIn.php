<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckIn extends Model
{
    /** @use HasFactory<\Database\Factories\CheckInFactory> */
    use HasFactory;

    protected $table = 'check_in';

    public $timestamps = false;

    protected $fillable = [
        'id_tiket', 
        'waktu_check_in',
        'check_in_status',
    ];

    public function tiket()
    {
        return $this->belongsTo(Tiket::class, 'id_tiket');
    }
}
