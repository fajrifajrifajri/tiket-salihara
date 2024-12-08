<?php

namespace App\Http\Controllers;

use App\Models\Pertanyaan;
use Illuminate\Http\Request;

class PertanyaanController extends Controller
{
    public function index()
    {
        $pertanyaan = Pertanyaan::all();
        return Inertia::render('Pertanyaan/Index', ['pertanyaan' => $pertanyaan]);
    }

    public function create()
    {
        return Inertia::render('Pertanyaan/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['question_text' => 'required|string']);
        Pertanyaan::create($request->all());
        return redirect()->route('some.route');
    }

    public function edit(Pertanyaan $pertanyaan)
    {
        return Inertia::render('Pertanyaan/Edit', ['pertanyaan' => $pertanyaan]);
    }

    public function update(Request $request, Pertanyaan $pertanyaan)
    {
        $request->validate(['question_text' => 'required|string']);
        $pertanyaan->update($request->all());
        return redirect()->route('some.route');
    }

    public function destroy(Pertanyaan $pertanyaan)
    {
        $pertanyaan->delete();
        return redirect()->route('some.route');
    }
}
