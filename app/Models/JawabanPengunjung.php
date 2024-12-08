<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JawabanPengunjung extends Model
{
    /** @use HasFactory<\Database\Factories\JawabanPengunjungFactory> */
    use HasFactory;

    protected $table = 'jawaban_pengunjung';

    protected $fillable = [
        'id_jawaban',
        'id_pengunjung',
        'jawaban_pengunjung',
    ];

    public function jawaban()
    {
        return $this->belongsTo(Jawaban::class, 'id_jawaban');
    }

    public function pengunjung()
    {
        return $this->belongsTo(Pengunjung::class, 'id_pengunjung');
    }

    public function acara()
    {
        return $this->belongsTo(Acara::class, 'id_acara');
    }

}
