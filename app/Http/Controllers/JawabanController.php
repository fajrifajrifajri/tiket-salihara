<?php

namespace App\Http\Controllers;

use App\Models\Jawaban;
use Illuminate\Http\Request;

class JawabanController extends Controller
{
    public function index()
    {
        $jawaban = Jawaban::all();
        return Inertia::render('Jawaban/Index', ['jawaban' => $jawaban]);
    }

    public function create()
    {
        return Inertia::render('Jawaban/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['answer_text' => 'required|string']);
        Jawaban::create($request->all());
        return redirect()->route('some.route');
    }

    public function update(Request $request, Jawaban $jawaban)
    {
        $request->validate(['answer_text' => 'required|string']);
        $jawaban->update($request->all());
        return redirect()->route('some.route');
    }

    public function destroy(Jawaban $jawaban)
    {
        $jawaban->delete();
        return redirect()->route('some.route');
    }
}
