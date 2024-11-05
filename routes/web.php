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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
