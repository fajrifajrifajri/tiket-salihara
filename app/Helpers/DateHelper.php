<?php

namespace App\Helpers;

use Carbon\Carbon;

class DateHelper
{
    public static function formatIndonesianDate($date)
    {
        return Carbon::parse($date)
            ->setTimezone('Asia/Jakarta')
            ->locale('id')
            ->translatedFormat('d F Y');
    }
}