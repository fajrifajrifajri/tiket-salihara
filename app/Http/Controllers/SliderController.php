<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::orderBy('posisi')->get();
        return Inertia::render('dasbor/slider/page', ['sliders' => $sliders->map(function ($slider) {
                return[
                    'id' => $slider->id,
                    'teks' => $slider->teks,
                    'preview' => $slider->gambar,
                ];
            })
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'teks' => 'required|string',
            'gambar' => 'required|image|max:2048',
        ]);
    
        DB::beginTransaction();
    
        try {
            $imagePath = $request->file('gambar')->store('sliders', 'public');
    
            Slider::create([
                'teks' => $request->teks,
                'gambar' => $imagePath,
                'posisi' => Slider::max('posisi') + 1,
            ]);
    
            DB::commit();
    
            return redirect()->back()->with('success', 'Slider added successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
    
            if (Storage::exists($imagePath)) {
                Storage::delete($imagePath);
            }
    
            return redirect()->back()->with('error', 'Failed to add slider: ' . $e->getMessage());
        }
    }

    public function destroy(Slider $slider)
    {
        $slider->delete();
        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        sleep(2);
        foreach ($request->posisi as $item) {
            Slider::where('id', $item['id'])->update(['posisi' => $item['posisi']]);
        }

        // Both below, causing the page to reload
        // return redirect()->back()->with('success', 'Slider reordered successfully.');
        // return response()->json(['message' => 'Reordered successfully']);
        
        // return response('', 200);
    }
}
