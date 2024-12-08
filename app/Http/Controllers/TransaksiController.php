<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Models\Transaksi;
use App\Models\Tiket;
use App\Models\TiketDetail;
use App\Models\Kupon;
use App\Models\Pertanyaan;
use App\Models\Survei;
use App\Models\Acara;
use App\Models\Pengunjung;
use App\Models\JawabanPengunjung;

class TransaksiController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaksi::with(['pengunjung', 'tiket' => function($query) {
                $query->select(
                    'tiket.id_transaksi',
                    'tiket.id_tiket_detail',
                    DB::raw('COUNT(*) as jumlah')
                )
                ->groupBy('tiket.id_transaksi', 'tiket.id_tiket_detail');
            }, 'tiket.tiketDetail'])
            ->select(
                'transaksi.*',
                'tiket.nomor_tiket',
                'tiket.nama_acara',
                'pengunjung.nama',
            )
            ->join('tiket', 'transaksi.id', '=', 'tiket.id_transaksi')
            ->join('pengunjung', 'transaksi.id_pengunjung', '=', 'pengunjung.id');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('tiket.nomor_tiket', 'like', "%{$request->search}%")
                  ->orWhere('pengunjung.nama', 'like', "%{$request->search}%");
            });
        }

        $transactions = $query->paginate(10);

        return Inertia::render('dasbor/order/page', [
            'initialTransactions' => $transactions
        ]);
    }

    public function create(Request $request)
    {
        $tiketDetails = TiketDetail::with('acara')->get();
        $kupon = Kupon::all();

        // Preload pertanyaan for each acara
        $pertanyaanList = [];
        if (is_array($request->idAcaraList) && !empty($request->idAcaraList)) {
            foreach ($request->idAcaraList as $idAcara) {
                $acara = Acara::find($idAcara);
                if ($acara && $acara->survei) {
                    $pertanyaan = Pertanyaan::where('id_survei', $acara->survei->id)->get();
                    $pertanyaan = $pertanyaan->map(function ($pertanyaan) {
                        $jawaban = $pertanyaan->jawaban;
                        return array_merge($pertanyaan->toArray(), ['jawabanList' => $jawaban]);
                    });

                    // Group pertanyaan by acara
                    $pertanyaanList[$idAcara] = [
                        'acara' => $acara->toArray(), // Include all acara columns
                        'pertanyaan' => $pertanyaan->toArray()
                    ];
                }
            }
        }

        return Inertia::render('dasbor/order/buat', [
            'tiketDetails' => $tiketDetails,
            'kupon' => $kupon,
            'pertanyaanList' => $pertanyaanList
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'total_bayar' => 'required|numeric',
            'status' => 'required|in:pending,sukses,gagal',
            'survei.nama' => 'required|string',
            'survei.whatsapp' => 'required|string',
            'survei.email' => 'required|email',
            'selected_kupon.id' => 'nullable|exists:kupon,id',
            'selected_kupon.potongan' => 'nullable|numeric',
            'metode_pembayaran' => 'nullable|string',
            'selected_tiket_list' => 'required|array',
            'selected_tiket_list.*.id' => 'required|exists:tiket_detail,id',
            'selected_tiket_list.*.acara.nama_acara' => 'required|string',
            'selected_tiket_list.*.prefix' => 'required|string',
            'survei.pertanyaan' => 'required|array',
            'survei.pertanyaan.*.acara' => 'required|array',
            'survei.pertanyaan.*.acara.id' => 'required|exists:acara,id',
            'survei.pertanyaan.*.pertanyaan' => 'required|array',
            'survei.pertanyaan.*.pertanyaan.*.id' => 'required|exists:pertanyaan,id',
            'survei.pertanyaan.*.pertanyaan.*.tipe_pertanyaan' => 'required|string',
            'survei.pertanyaan.*.pertanyaan.*.jawaban' => 'nullable|array',
            'survei.pertanyaan.*.pertanyaan.*.jawaban_pengunjung' => 'nullable|string',
        ]);

        $pengunjung = Pengunjung::create([
            'nama' => $request->survei['nama'],
            'whatsapp' => $request->survei['whatsapp'],
            'email' => $request->survei['email'],
        ]);

        $transaksi = Transaksi::create([
            'id_pengunjung' => $pengunjung->id,
            'id_kupon' => $request->selected_kupon['id'] ?? null,
            'potongan' => $request->selected_kupon['potongan'] ?? 0,
            'total_bayar' => $request->total_bayar,
            'status' => $request->status,
            'metode_pembayaran' => $request->metode_pembayaran,
        ]);

        foreach ($request->selected_tiket_list as $tiket) {
            Tiket::create([
                'id_transaksi' => $transaksi->id,
                'id_tiket_detail' => $tiket['id'],
                'nama_acara' => $tiket['acara']['nama_acara'],
                'nomor_tiket' => $tiket['prefix'],
                'status' => 'waiting',
                'tipe_tiket' => 'berbayar',
            ]);
        }

        foreach ($request->survei['jawaban_pengunjung'] as $pertanyaanId => $jawabanData) {
            if ($jawabanData['tipe_pertanyaan'] === 'radio') {
                JawabanPengunjung::create([
                    'id_pertanyaan' => $pertanyaanId,
                    'id_jawaban' => $jawabanData['jawaban'],
                    'id_pengunjung' => $pengunjung->id,
                ]);
            } elseif ($jawabanData['tipe_pertanyaan'] === 'checkbox') {
                if ($jawabanData['jawaban'] === true) {
                    JawabanPengunjung::create([
                        'id_pertanyaan' => $pertanyaanId,
                        'id_jawaban' => $pertanyaanId,
                        'id_pengunjung' => $pengunjung->id,
                    ]);
                }
            }
        }

        return redirect()->route('order.index');
    }

    public function edit(Transaksi $transaksi)
    {
        return Inertia::render('Transaksi/Edit', ['transaksi' => $transaksi]);
    }

    public function update(Request $request, Transaksi $transaksi)
    {
        $request->validate([
            'id_acara' => 'required|exists:acara,id',
            'total_bayar' => 'required|numeric',
            'status' => 'required|in:pending,sukses,gagal'
        ]);
        $transaksi->update($request->all());
        return redirect()->route('transaksi.index');
    }

    public function destroy(Transaksi $transaksi)
    {
        $transaksi->delete();
        return redirect()->route('transaksi.index');
    }

    public function getPertanyaan($id)
    {

        return response()->json([
            'pertanyaan' => $pertanyaan
        ]);
    }
}
