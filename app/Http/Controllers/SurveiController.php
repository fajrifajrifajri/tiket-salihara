<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Models\Acara;
use App\Models\Survei;
use App\Models\Pertanyaan;
use App\Models\Jawaban;
use App\Models\JawabanPengunjung;

class SurveiController extends Controller
{
    public function index()
    {
        return Inertia::render('dasbor/survei/page', ['survei' => Survei::all()->map(function ($survei) {
                return [
                    'id' => $survei->id,
                    'nama_survei' => $survei->nama_survei,
                    'edit_url' => route('survei.edit', $survei),
                    'acara_url' => route('survei.acara', $survei),
                ];
            }),
            'create_url' => route('survei.create'),
        ]);
    }

    public function create()
    {
        return Inertia::render('dasbor/survei/buat');
    }

    
    public function store(Request $request)
    {

        // Validate the incoming request
        $validatedData = $request->validate([
            'nama_survei' => 'required|string|max:255',
            'pertanyaan' => 'required|array',
            'pertanyaan.*.pertanyaan' => 'required|string|max:255',  // Validate each question text
            'pertanyaan.*.tipe_pertanyaan' => 'required|string|in:text,checkbox,radio',  // Validate question type
            'pertanyaan.*.wajib' => 'required|boolean',  // Ensure wajib is a boolean
            'pertanyaan.*.jawaban' => 'nullable|array', // Jawaban could be an array (for checkbox/radio)
            'pertanyaan.*.jawaban.*' => 'nullable|string|max:255', // Validate jawaban values
        ]);

        // Start transaction to ensure data integrity
        \DB::beginTransaction();
        try {
            // Create survei record
            $survei = Survei::create([
                'nama_survei' => $validatedData['nama_survei'],
            ]);

            // Loop through each question and insert it
            foreach ($validatedData['pertanyaan'] as $pertanyaanData) {
                // Create pertanyaan record and associate with survei
                $pertanyaan = Pertanyaan::create([
                    'id_survei' => $survei->id,
                    'pertanyaan' => $pertanyaanData['pertanyaan'],
                    'tipe_pertanyaan' => $pertanyaanData['tipe_pertanyaan'],
                    'wajib' => $pertanyaanData['wajib'],
                ]);

                // If there are jawaban for this question, insert them
                if (isset($pertanyaanData['jawaban']) && is_array($pertanyaanData['jawaban'])) {
                    foreach ($pertanyaanData['jawaban'] as $jawabanText) {
                        Jawaban::create([
                            'id_pertanyaan' => $pertanyaan->id,
                            'jawaban' => $jawabanText,
                        ]);
                    }
                }
            }

            // Commit the transaction
            \DB::commit();

            return response()->json([
                'message' => 'Survei berhasil disimpan!',
                'data' => $survei,
            ], 201);

        } catch (\Exception $e) {
            // Rollback the transaction if something goes wrong
            \DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan survei.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Survei $survei)
    {
        return Inertia::render('Survei/Show', ['survei' => $survei]);
    }

    public function edit($id)
    {
        $survei = Survei::findOrFail($id);
        $pertanyaan = $survei->pertanyaan()
            ->with('jawaban')
            ->get()
            ->map(function ($pertanyaan) {
                return [
                    'id' => $pertanyaan->id,
                    'pertanyaan' => $pertanyaan->pertanyaan,
                    'tipe_pertanyaan' => $pertanyaan->tipe_pertanyaan,
                    'wajib' => $pertanyaan->wajib,
                    'jawaban' => $pertanyaan->jawaban->map(function ($jawaban) {
                        return [
                            'id' => $jawaban->id,
                            'jawaban' => $jawaban->jawaban,
                        ];
                    }),
                ];
            });

        return Inertia::render('dasbor/survei/ubah', [
            'survei' => $survei,
            'pertanyaan' => $pertanyaan,
        ]);
    }

    public function update(Request $request, $id)
    {
        $survei = Survei::findOrFail($id);

        $survei->update(['nama_survei' => $request->input('nama_survei')]);

        foreach ($request->input('pertanyaan', []) as $pertanyaanData) {
            if (isset($pertanyaanData['id'])) {
                $pertanyaan = $survei->pertanyaan()->find($pertanyaanData['id']);
                if ($pertanyaan) {
                    $pertanyaan->update($pertanyaanData);

                    foreach ($pertanyaanData['jawaban'] as $jawabanData) {
                        if (isset($jawabanData['id'])) {
                            $jawaban = $pertanyaan->jawaban()->find($jawabanData['id']);
                            if ($jawaban) {
                                $jawaban->update($jawabanData);
                            }
                        } else {
                            $pertanyaan->jawaban()->create($jawabanData);
                        }
                    }
                }
            } else {
                $newPertanyaan = $survei->pertanyaan()->create($pertanyaanData);
                foreach ($pertanyaanData['jawaban'] as $jawabanData) {
                    $newPertanyaan->jawaban()->create($jawabanData);
                }
            }
        }

        return redirect()->route('survei.edit', $id)->with('success', 'Survei berhasil diperbarui.');
    }

    public function surveiAcara(Survei $survei)
    {
        $surveiAcara = $survei->acara;
    
        return Inertia::render('dasbor/survei/acara', [
            'surveiAcara' => $surveiAcara->map(function ($acara) use ($survei) {
                return [
                    'id' => $acara->id,
                    'nama_acara' => $acara->nama_acara,
                    'hasil_url' => route('survei.hasil', ['survei' => $survei, 'acara' => $acara]),
                ];
            }),
        ]);
    }
    
    public function surveiAcaraHasil(Survei $survei, Acara $acara)
    {
        $hasil = DB::table('jawaban_pengunjung')
            ->join('jawaban', 'jawaban_pengunjung.id_jawaban', '=', 'jawaban.id')
            ->join('pertanyaan', 'jawaban.id_pertanyaan', '=', 'pertanyaan.id')
            ->select(
                'pertanyaan.pertanyaan',
                'jawaban.jawaban as jawaban_pengunjung',
                DB::raw('COUNT(jawaban_pengunjung.id) as jawaban_pengunjung_count')
            )
            ->groupBy('pertanyaan.id', 'jawaban.id')
            ->orderBy('pertanyaan.id')
            ->orderByDesc('jawaban_pengunjung_count')
            ->get();

        return Inertia::render('dasbor/survei/acaraHasil', [
            'hasil' => $hasil,
            'nama_survei' => $survei->nama_survei,
            'nama_acara' => $acara->nama_acara,
        ]);
    }

    public function destroy(Survei $survei)
    {
        $survei->delete();
        return redirect()->route('survei.index');
    }
}
