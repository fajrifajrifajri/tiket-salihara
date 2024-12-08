<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Http\Controllers\{
    SurveiController,
    PajakController,
    AcaraController,
    AcaraRSVPController,
    TiketController,
    TiketDetailController,
    TransaksiController,
    TransaksiRSVPController,
    KategoriController,
    SliderController,
    PertanyaanController,
    JawabanController,
    KuponController,
    JawabanPengunjungController,
    PengunjungController,
    CheckInController,
    CheckInRSVPController
};

use App\Models\Acara;
use App\Models\Kategori;
use App\Models\Slider;
use App\Helpers\DateHelper;

use App\Http\Middleware\BlockAllRoutesExceptHome;

Route::middleware(BlockAllRoutesExceptHome::class)->group(function () {
    Route::get('/', function (Request $request) {
        $slider = Slider::all();
    $acaraQuery = Acara::orderBy('created_at', 'desc')->with('kategori');
    
    // Apply the where condition only if 'kategori' is present in the request
    if ($request->has('kategori')) {
        $acaraQuery->whereHas('kategori', function ($query) use ($request) {
            $query->where('nama_kategori', $request->kategori);
        });
    }
    
    $acara = $acaraQuery->get();
    $kategori = Kategori::all();
    
    return Inertia::render('landing', ['slider' => $slider, 'acara' => $acara, 'kategori' => $kategori]);
});

Route::get('/acara/{slug}', function ($slug) {
    $acara = Acara::where('slug', $slug)->with('kategori')->with('akordeonAcara')->with('tiketDetail')->first();
    if ($acara->tanggal_acara_dari == $acara->tanggal_acara_sampai) {
        $acara->tanggal_acara = DateHelper::formatIndonesianDate($acara->tanggal_acara_dari);
    } else {
        $acara->tanggal_acara = DateHelper::formatIndonesianDate($acara->tanggal_acara_dari) . ' - ' . DateHelper::formatIndonesianDate($acara->tanggal_acara_sampai);
    }

    // Calculate available tickets for each ticket detail
    foreach ($acara->tiketDetail as $tiketDetail) {
        $usedTickets = $tiketDetail->tiket()
            ->whereHas('transaksi', function($query) {
                $query->whereIn('status', ['pending', 'berhasil']);
            })
            ->count();
            
        $tiketDetail->tersedia = $tiketDetail->kapasitas - $usedTickets;
    }

    return Inertia::render('detailAcara', ['acara' => $acara]);
});

Route::post('/keranjang', function (Request $request) {
    dd($request->all());
})->name('keranjang');

Route::get('/keranjang', function () {
    return Inertia::render('keranjang');
});

Route::get('/pembayaran', function () {
    return Inertia::render('checkout');
});

Route::get('/detail-rsvp', function () {
    return Inertia::render('detailRSVP');
});

Route::get('/pembayaran-rsvp', function () {
    return Inertia::render('checkoutRSVP');
});

Route::get('/menunggu', function () {
    return Inertia::render('menunggu');
});

Route::get('/berhasil-rsvp', function () {
    return Inertia::render('berhasilRSVP');
});

// Dasbor
// Group routes under the "/dasbor" prefix
Route::get('/dasbor', function () {
    return Inertia::render('dasbor/page');
});

Route::prefix('dasbor')->group(function () {
    
    // Kategori Routes (Index + CD)
    Route::resource('kategori', KategoriController::class)
        ->only(['index', 'create', 'store', 'destroy']);

    // Survei Routes (Full CRUD)
    Route::resource('survei', SurveiController::class);
    Route::get('survei/{survei}/acara', [SurveiController::class, 'surveiAcara'])->name('survei.acara');
    Route::get('survei/{survei}/hasil/{acara}', [SurveiController::class, 'surveiAcaraHasil'])->name('survei.hasil');
        
    // Kategori Routes (Index + CD)
    Route::resource('pajak', PajakController::class)
        ->only(['index', 'update']);

    // Acara Routes (Full CRUD)
    Route::resource('acara', AcaraController::class);
    Route::resource('rsvp', AcaraRSVPController::class);

    // Tiket Routes (Full CRUD)
    Route::resource('tiket', TiketController::class);

    // TiketDetail Routes (Full CRUD)
    Route::resource('tiket-detail', TiketDetailController::class);

    // Transaksi Routes (Full CRUD)
    Route::resource('order', TransaksiController::class);
    Route::resource('order-rsvp', TransaksiRSVPController::class);
    Route::get('order/pertanyaan/{id}', [TransaksiController::class, 'getPertanyaan'])->name('order.pertanyaan');
    Route::get('order-rsvp/pertanyaan/{id}', [TransaksiRSVPController::class, 'getPertanyaan'])->name('order-rsvp.pertanyaan');

    // Slider Routes (CD only)
    Route::resource('slider', SliderController::class)
        ->only(['index', 'store', 'destroy']);
    Route::put('slider/reorder', [SliderController::class, 'reorder'])->name('slider.reorder');

    // Pertanyaan Routes (CUD only)
    Route::resource('pertanyaan', PertanyaanController::class)
        ->except(['index', 'show']);

    // Jawaban Routes (CUD only)
    Route::resource('jawaban', JawabanController::class)
        ->except(['index', 'show']);

    // Kupon Routes (CUD only)
    Route::resource('kupon', KuponController::class)
        ->except(['show']);

    // JawabanPengunjung Routes (CRD only)
    Route::resource('jawaban-pengunjung', JawabanPengunjungController::class)
        ->except(['edit', 'update']);

    // Pengunjung Routes (CRU only)
    Route::resource('pengunjung', PengunjungController::class)
        ->except(['destroy']);

    // CheckIn Routes (CU only)
    Route::resource('check-in', CheckInController::class)
        ->only(['index', 'create', 'store', 'edit', 'update']);
    Route::resource('check-in-rsvp', CheckInRSVPController::class)
        ->only(['index', 'create', 'store', 'edit', 'update']);
    Route::post('generate-ticket-pdf', [CheckInController::class, 'generateTicketPDF'])->name('generate-ticket-pdf');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


});

require __DIR__.'/auth.php';
