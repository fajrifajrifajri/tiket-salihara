<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Misc;

class PajakController extends Controller
{
    public function index()
    {
        $pajak = Misc::where('key', 'pajak_global')->value('value');
        return Inertia::render('dasbor/pajak/page', [
            'pajak' => $pajak,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'pajak' => 'required|numeric|min:0|max:100',
        ]);

        Misc::updateOrCreate(
            ['key' => 'pajak_global'],
            ['value' => $request->pajak]
        );

        return redirect()->route('pajak.index')->with('success', 'Pajak berhasil diperbarui.');
    }
}
