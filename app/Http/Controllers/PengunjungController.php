<?php

namespace App\Http\Controllers;

use App\Models\Pengunjung;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengunjungController extends Controller
{
    public function index()
    {
        $pengunjungs = Pengunjung::all();
        return Inertia::render('Pengunjung/Index', ['pengunjungs' => $pengunjungs]);
    }

    public function create()
    {
        return Inertia::render('Pengunjung/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengunjungs,email',
            'phone' => 'nullable|string|max:15'
        ]);
        Pengunjung::create($request->all());
        return redirect()->route('pengunjung.index');
    }

    public function show(Pengunjung $pengunjung)
    {
        return Inertia::render('Pengunjung/Show', ['pengunjung' => $pengunjung]);
    }

    public function edit(Pengunjung $pengunjung)
    {
        return Inertia::render('Pengunjung/Edit', ['pengunjung' => $pengunjung]);
    }

    public function update(Request $request, Pengunjung $pengunjung)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengunjungs,email,' . $pengunjung->id,
            'phone' => 'nullable|string|max:15'
        ]);
        $pengunjung->update($request->all());
        return redirect()->route('pengunjung.index');
    }
}
