<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $kategori = Kategori::all();
        return Inertia::render('dasbor/kategori/page', ['kategori' => $kategori]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['nama_kategori' => 'required|string|max:255']);
        Kategori::create($validated);
        return redirect()->route('kategori.index');
    }

    public function destroy($id)
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();
        return redirect()->route('kategori.index');
    }
}
