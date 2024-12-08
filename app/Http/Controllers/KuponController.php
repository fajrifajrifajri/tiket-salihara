<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\Kupon;
use App\Models\Acara;

class KuponController extends Controller
{
    public function index()
    {
        $kupon = Kupon::with('acara')
            ->withCount('transaksi')
            ->get()
            ->map(function ($kupon) {
                return [
                    'id' => $kupon->id,
                    'id_acara' => $kupon->acara ? $kupon->acara->id : null, // for updating
                    'kode_kupon' => $kupon->kode_kupon,
                    'nama_acara' => $kupon->acara ? $kupon->acara->nama_acara : 'N/A',
                    'potongan' => $kupon->potongan,
                    'kuota' => $kupon->kuota,
                    'kedaluwarsa' => $kupon->kedaluwarsa,
                    'terpakai' => $kupon->transaksi_count,
                ];
            });


        $acara = Acara::select('id', 'nama_acara')->get();

        return Inertia::render('dasbor/kupon/page', ['kupon' => $kupon, 'acara' => $acara]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_acara' => 'required|exists:acara,id',
            'kode_kupon' => 'required|string|unique:kupon',
            'potongan' => 'required|numeric|min:0',
            'kuota' => 'required|integer|min:1',
            'kedaluwarsa' => 'required|date|after:today',
        ]);

        $request->merge([
            'kedaluwarsa' => Carbon::parse($request->kedaluwarsa)->format('Y-m-d'),
        ]);    

        Kupon::create($request->all());
        return redirect()->route('kupon.index')->with('success', 'Kupon created successfully.');
    }

    public function update(Request $request, Kupon $kupon)
    {
        $request->validate([
            'kode_kupon' => 'required|string|unique:kupon,kode_kupon,' . $kupon->id,
            'id_acara' => 'required|exists:acara,id',
            'potongan' => 'required|numeric|min:0',
            'kuota' => 'required|integer|min:1',
            'kedaluwarsa' => 'required|date|after:today',
        ]);

        $request->merge([
            'kedaluwarsa' => Carbon::parse($request->kedaluwarsa)->format('Y-m-d'),
        ]);

        $kupon->update($request->all());

        return redirect()->route('kupon.index')->with('success', 'Kupon updated successfully.');
    }

    public function destroy(Kupon $kupon)
    {
        $kupon->delete();
        return redirect()->route('kupon.index')->with('success', 'Kupon deleted successfully.');
    }
}
