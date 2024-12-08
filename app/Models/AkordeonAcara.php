<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AkordeonAcara extends Model
{
    /** @use HasFactory<\Database\Factories\AkordeonAcaraFactory> */
    use HasFactory;

    public $timestamps = false;
    
    protected $table = 'akordeon_acara';

    protected $fillable = ['id_acara', 'judul_akordeon', 'deskripsi_akordeon'];

    public function acara() {
        return $this->belongsTo(Acara::class, 'id_acara');
    }
}
