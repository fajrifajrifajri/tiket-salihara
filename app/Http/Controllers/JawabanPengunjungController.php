<?php

namespace App\Http\Controllers;

use App\Models\JawabanPengunjung;
use Illuminate\Http\Request;

class JawabanPengunjungController extends Controller
{
    public function index()
    {
        $jawabanPengunjungs = JawabanPengunjung::all();
        return Inertia::render('JawabanPengunjung/Index', ['jawabanPengunjungs' => $jawabanPengunjungs]);
    }

    public function create()
    {
        return Inertia::render('JawabanPengunjung/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'jawaban_id' => 'required|exists:jawabans,id',
            'pengunjung_id' => 'required|exists:pengunjungs,id',
            'content' => 'required|string'
        ]);
        JawabanPengunjung::create($request->all());
        return redirect()->route('jawabanpengunjung.index');
    }

    public function show(JawabanPengunjung $jawabanPengunjung)
    {
        return Inertia::render('JawabanPengunjung/Show', ['jawabanPengunjung' => $jawabanPengunjung]);
    }

    public function destroy(JawabanPengunjung $jawabanPengunjung)
    {
        $jawabanPengunjung->delete();
        return redirect()->route('jawabanpengunjung.index');
    }
}
