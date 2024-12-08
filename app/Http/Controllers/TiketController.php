<?php

namespace App\Http\Controllers;

use App\Models\Tiket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiketController extends Controller
{
    public function index()
    {
        $tickets = Tiket::with(['tiketDetail', 'transaksi'])->get();
        return Inertia::render('Tiket/Index', ['tickets' => $tickets]);
    }

    public function create()
    {
        return Inertia::render('Tiket/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_tiket_detail' => 'required|exists:tiket_details,id',
            'nomor_tiket' => 'required|string',
            'status' => 'required|in:waiting,check-in,refund,expired',
            'tipe_tiket' => 'required|in:berbayar,rsvp'
        ]);
        Tiket::create($request->all());
        return redirect()->route('tiket.index');
    }

    public function show(Tiket $tiket)
    {
        return Inertia::render('Tiket/Show', ['tiket' => $tiket]);
    }

    public function edit(Tiket $tiket)
    {
        return Inertia::render('Tiket/Edit', ['tiket' => $tiket]);
    }

    public function update(Request $request, Tiket $tiket)
    {
        $request->validate([
            'id_tiket_detail' => 'required|exists:tiket_details,id',
            'nomor_tiket' => 'required|string',
            'status' => 'required|in:waiting,check-in,refund,expired',
            'tipe_tiket' => 'required|in:berbayar,rsvp'
        ]);
        $tiket->update($request->all());
        return redirect()->route('tiket.index');
    }

    public function destroy(Tiket $tiket)
    {
        $tiket->delete();
        return redirect()->route('tiket.index');
    }
}
