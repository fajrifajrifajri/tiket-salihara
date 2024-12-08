<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

use App\Models\Acara;
use App\Models\AkordeonAcara;
use App\Models\Survei;
use App\Models\Kategori;
use App\Models\TiketDetail;

class AcaraRSVPController extends Controller
{
    public function index()
    {
        $acara = Acara::where('tipe_acara', 'rsvp')->select('id', 'nama_acara', 'tempat_acara', 'thumbnail', 'slug', 'publish')->get();

        return Inertia::render('dasbor/rsvp/page', ['acara' => $acara]);
    }

    /*
    public function show($id)
    {
        $acara = Acara::findOrFail($id);
        return Inertia::render('Acara/Show', ['acara' => $acara]);
    }
        */

    public function create()
    {
        $survei = Survei::all();
        $kategori = Kategori::all();
        return Inertia::render('dasbor/rsvp/buat', ['survei' => $survei, 'kategori' => $kategori]);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'id_kategori' => 'nullable|exists:kategori,id',
            'id_survei' => 'nullable|exists:survei,id',
            'nama_acara' => 'required|string|max:255',
            'tipe_acara' => 'required|enum:berbayar,rsvp',
            'thumbnail' => 'nullable|image|max:2048',
            'info' => 'nullable|string',
            'logo' => 'nullable|string',
            'tempat_acara' => 'nullable|string',
            'tanggal_acara_dari' => 'nullable|date',
            'tanggal_acara_sampai' => 'nullable|date|after_or_equal:tanggal_acara_dari',
            'posting_acara_dari' => 'nullable|date',
            'posting_acara_sampai' => 'nullable|date|after_or_equal:posting_acara_dari',
            'publish' => 'boolean',
            'accordion' => 'nullable|array',
            'accordion.*.judul_akordeon' => 'nullable|string',
            'accordion.*.deskripsi_akordeon' => 'nullable|string',
            'tiket_detail' => 'nullable|array',
            'tiket_detail.*.prefix' => 'required|string',
            'tiket_detail.*.nama_tiket' => 'required|string',
            'tiket_detail.*.kapasitas' => 'required|integer|min:1',
            'tiket_detail.*.harga' => 'required|decimal:2|min:0',
            'tiket_detail.*.pajak' => 'required|integer|min:0',
            'tiket_detail.*.info_tiket' => 'nullable|string',
            'tiket_detail.*.maksimal_per_transaksi' => 'required|integer|min:1',
            'tiket_detail.*.penjualan_dari' => 'required|date',
            'tiket_detail.*.penjualan_sampai' => 'required|date|after:penjualan_dari',
        ]);

        $slug = Str::slug($validated['nama_acara']);
        $originalSlug = $slug;
        $counter = 1;
        while (Acara::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $thumbnailPath = $request->hasFile('thumbnail') 
            ? $request->file('thumbnail')->store('thumbnails', 'public')
            : null;

        DB::beginTransaction();
        try {
            $acara = Acara::create([
                'id_kategori' => $validated['id_kategori'] ?? null,
                'id_survei' => $validated['id_survei'] ?? null,
                'tipe_acara' => 'rsvp',
                'nama_acara' => $validated['nama_acara'],
                'tempat_acara' => $validated['tempat_acara'] ?? null,
                'thumbnail' => $thumbnailPath,
                'info' => $validated['info'] ?? null,
                'logo' => $validated['logo'] ?? null,
                'slug' => $slug,
                'tanggal_acara_dari' => $validated['tanggal_acara_dari'] ?? null,
                'tanggal_acara_sampai' => $validated['tanggal_acara_sampai'] ?? null,
                'posting_acara_dari' => $validated['posting_acara_dari'] ?? null,
                'posting_acara_sampai' => $validated['posting_acara_sampai'] ?? null,
                'publish' => $validated['publish'] ?? false,
            ]);

            if (!empty($validated['accordion'])) {
                $akordeonData = array_map(function($item) use ($acara) {
                    return [
                        'id_acara' => $acara->id,
                        'judul_akordeon' => $item['judul_akordeon'] ?? null,
                        'deskripsi_akordeon' => $item['deskripsi_akordeon'] ?? null,
                    ];
                }, $validated['accordion']);

                AkordeonAcara::insert($akordeonData);
            }

            if (!empty($validated['tiket_detail'])) {
                $tiketDetailData = array_map(function($item) use ($acara) {
                    return [
                        'id_acara' => $acara->id,
                        'prefix' => $item['prefix'],
                        'nama_tiket' => $item['nama_tiket'],
                        'kapasitas' => $item['kapasitas'],
                        'harga' => $item['harga'],
                        'pajak' => $item['pajak'],
                        'info_tiket' => $item['info_tiket'] ?? null,
                        'maksimal_per_transaksi' => $item['maksimal_per_transaksi'],
                        'penjualan_dari' => $item['penjualan_dari'] ?? null,
                        'penjualan_sampai' => $item['penjualan_sampai'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $validated['tiket_detail']);

                TiketDetail::insert($tiketDetailData);
            }

            DB::commit();
            return redirect()->route('acara.index')->with('success', 'Acara berhasil dibuat');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal membuat acara: ' . $e->getMessage()]);
        }
    }


    public function edit($slug)
    {
        $acara = Acara::where('slug', $slug)->with('tiketDetail')->first();
        $kategori = Kategori::all();
        $survei = Survei::all();
        $akordeon = AkordeonAcara::where('id_acara', $acara->id)->get();

        return Inertia::render('dasbor/rsvp/ubah', ['acara' => $acara, 'kategori' => $kategori, 'survei' => $survei, 'akordeon' => $akordeon]);
    }

    public function update(Request $request, $id)
    {
        $acara = Acara::findOrFail($id);
        $validated = $request->validate([
            'id_kategori' => 'nullable|exists:kategori,id',
            'id_survei' => 'nullable|exists:survei,id',
            'nama_acara' => 'required|string|max:255',
            'tipe_acara' => 'required|enum:berbayar,rsvp',
            'thumbnail' => 'nullable|image|max:2048',
            'info' => 'nullable|string',
            'logo' => 'nullable|string',
            'tempat_acara' => 'nullable|string',
            'tanggal_acara_dari' => 'nullable|date',
            'tanggal_acara_sampai' => 'nullable|date|after_or_equal:tanggal_acara_dari',
            'posting_acara_dari' => 'nullable|date',
            'posting_acara_sampai' => 'nullable|date|after_or_equal:posting_acara_dari',
            'publish' => 'boolean',
            'accordion' => 'nullable|array',
            'accordion.*.judul_akordeon' => 'nullable|string',
            'accordion.*.deskripsi_akordeon' => 'nullable|string',
            'tiket_detail' => 'nullable|array',
            'tiket_detail.*.prefix' => 'required|string',
            'tiket_detail.*.nama_tiket' => 'required|string',
            'tiket_detail.*.kapasitas' => 'required|integer|min:1',
            'tiket_detail.*.harga' => 'required|decimal:2|min:0',
            'tiket_detail.*.pajak' => 'required|integer|min:0',
            'tiket_detail.*.info_tiket' => 'nullable|string',
            'tiket_detail.*.maksimal_per_transaksi' => 'required|integer|min:1',
            'tiket_detail.*.penjualan_dari' => 'required|date',
            'tiket_detail.*.penjualan_sampai' => 'required|date|after:penjualan_dari',
        ]);


        $thumbnailPath = $request->hasFile('thumbnail') 
            ? $request->file('thumbnail')->store('thumbnails', 'public')
            : $acara->thumbnail;

        DB::beginTransaction();

        try {
            $acara->update([
                'id_kategori' => $validated['id_kategori'] ?? null,
                'id_survei' => $validated['id_survei'] ?? null,
                'tipe_acara' => $validated['tipe_acara'],
                'nama_acara' => $validated['nama_acara'],
                'thumbnail' => $thumbnailPath,
                'info' => $validated['info'] ?? null,
                'logo' => $validated['logo'] ?? null,
                'tempat_acara' => $validated['tempat_acara'] ?? null,
                'tanggal_acara_dari' => $validated['tanggal_acara_dari'] ?? null,
                'tanggal_acara_sampai' => $validated['tanggal_acara_sampai'] ?? null,
                'posting_acara_dari' => $validated['posting_acara_dari'] ?? null,
                'posting_acara_sampai' => $validated['posting_acara_sampai'] ?? null,
                'publish' => $validated['publish'] ?? false,
            ]);

            if (!empty($validated['accordion'])) {
                AkordeonAcara::where('id_acara', $acara->id)->delete();
                
                $akordeonData = array_map(function($item) use ($acara) {
                    return [
                        'id_acara' => $acara->id,
                        'judul_akordeon' => $item['judul_akordeon'] ?? null,
                        'deskripsi_akordeon' => $item['deskripsi_akordeon'] ?? null,
                    ];
                }, $validated['accordion']);

                AkordeonAcara::insert($akordeonData);
            }

            if (!empty($validated['tiket_detail'])) {
                TiketDetail::where('id_acara', $acara->id)->delete();
                
                $tiketDetailData = array_map(function($item) use ($acara) {
                    return [
                        'id_acara' => $acara->id,
                        'prefix' => $item['prefix'],
                        'nama_tiket' => $item['nama_tiket'],
                        'kapasitas' => $item['kapasitas'],
                        'harga' => $item['harga'],
                        'pajak' => $item['pajak'],
                        'info_tiket' => $item['info_tiket'] ?? null,
                        'maksimal_per_transaksi' => $item['maksimal_per_transaksi'],
                        'penjualan_dari' => $item['penjualan_dari'] ?? null,
                        'penjualan_sampai' => $item['penjualan_sampai'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $validated['tiket_detail']);

                TiketDetail::insert($tiketDetailData);
            }

            DB::commit();
            return redirect()->route('acara.index')->with('success', 'Acara berhasil diperbarui');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal memperbarui acara: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $acara = Acara::findOrFail($id);
            $acara->delete();
            return redirect()->back()->with(['success' => 'Acara berhasil dihapus']);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Gagal menghapus acara: ' . $e->getMessage()]);
        }
    }
}
