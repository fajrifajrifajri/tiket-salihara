<?php

namespace App\Http\Controllers;

use App\Models\TiketDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiketDetailController extends Controller
{
    public function index()
    {
        $ticketDetails = TiketDetail::all();
        return Inertia::render('TiketDetail/Index', ['ticketDetails' => $ticketDetails]);
    }

    public function create()
    {
        return Inertia::render('TiketDetail/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_tiket' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
            'harga' => 'required|numeric',
            'pajak' => 'required|numeric'
        ]);
        TiketDetail::create($request->all());
        return redirect()->route('tiketDetail.index');
    }

    public function show(TiketDetail $tiketDetail)
    {
        return Inertia::render('TiketDetail/Show', ['tiketDetail' => $tiketDetail]);
    }

    public function edit(TiketDetail $tiketDetail)
    {
        return Inertia::render('TiketDetail/Edit', ['tiketDetail' => $tiketDetail]);
    }

    public function update(Request $request, TiketDetail $tiketDetail)
    {
        $request->validate([
            'nama_tiket' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
            'harga' => 'required|numeric',
            'pajak' => 'required|numeric'
        ]);
        $tiketDetail->update($request->all());
        return redirect()->route('tiketDetail.index');
    }

    public function destroy(TiketDetail $tiketDetail)
    {
        $tiketDetail->delete();
        return redirect()->route('tiketDetail.index');
    }
}
