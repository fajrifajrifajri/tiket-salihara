<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Misc extends Model
{

    protected $table = 'misc';

    protected $fillable = [
        'key',
        'value',
    ];
}
