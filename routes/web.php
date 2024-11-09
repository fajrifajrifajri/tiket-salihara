<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
});

Route::get('/detail-acara', function () {
    return Inertia::render('detailAcara');
});

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
Route::get('/masuk', function () {
    return Inertia::render('masuk/masuk');
});

Route::get('/dasbor/kategori', function () {
    return Inertia::render('dasbor/kategori/page');
});

Route::get('/dasbor/survei', function () {
    return Inertia::render('dasbor/survei/page');
});

Route::get('/dasbor/survei/buat', function () {
    return Inertia::render('dasbor/survei/buat');
});

Route::get('/dasbor/survei/ubah', function () {
    return Inertia::render('dasbor/survei/ubah');
});
Route::get('/dasbor/survei/hasil', function () {
    return Inertia::render('dasbor/survei/hasil');
});
Route::get('/dasbor/survei/hasil/detail', function () {
    return Inertia::render('dasbor/survei/hasil-detail');
});
Route::get('/dasbor/pajak', function () {
    return Inertia::render('dasbor/pajak/page');
});
Route::get('/dasbor/acara', function () {
    return Inertia::render('dasbor/acara/page');
});
Route::get('/dasbor/acara/baru', function () {
    return Inertia::render('dasbor/acara/baru');
});
Route::get('/dasbor/acara/ubah', function () {
    return Inertia::render('dasbor/acara/ubah');
});
Route::get('/dasbor/kupon', function () {
    return Inertia::render('dasbor/kupon/page');
});
Route::get('/dasbor/order', function () {
    return Inertia::render('dasbor/order/page');
});
Route::get('/dasbor/order/baru', function () {
    return Inertia::render('dasbor/order/baru');
});
Route::get('/dasbor/order/ubah', function () {
    return Inertia::render('dasbor/order/ubah');
});
Route::get('/dasbor/refund', function () {
    return Inertia::render('dasbor/refund/page');
});
Route::get('/dasbor/check-in', function () {
    return Inertia::render('dasbor/check-in/page');
});
Route::get('/dasbor/slider', function () {
    return Inertia::render('dasbor/slider/page');
});
Route::get('/dasbor/laporan', function () {
    return Inertia::render('dasbor/laporan/page');
});
Route::get('/dasbor/laporan/detail', function () {
    return Inertia::render('dasbor/laporan/detail');
});
Route::get('/dasbor/rsvp', function () {
    return Inertia::render('dasbor/rsvp/page');
});
Route::get('/dasbor/rsvp/baru', function () {
    return Inertia::render('dasbor/rsvp/baru');
});
Route::get('/dasbor/rsvp/ubah', function () {
    return Inertia::render('dasbor/rsvp/ubah');
});
Route::get('/dasbor/check-in-rsvp', function () {
    return Inertia::render('dasbor/check-in-rsvp/page');
});
Route::get('/dasbor/order-rsvp', function () {
    return Inertia::render('dasbor/order-rsvp/page');
});
Route::get('/dasbor/order-rsvp/baru', function () {
    return Inertia::render('dasbor/order-rsvp/baru');
});
Route::get('/dasbor/order-rsvp/ubah', function () {
    return Inertia::render('dasbor/order-rsvp/ubah');
});
Route::get('/dasbor/laporan-rsvp', function () {
    return Inertia::render('dasbor/laporan-rsvp/page');
});
Route::get('/dasbor/laporan-rsvp/detail', function () {
    return Inertia::render('dasbor/laporan-rsvp/detail');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
