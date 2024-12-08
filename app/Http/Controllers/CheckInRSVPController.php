<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class CheckInRSVPController extends Controller
{
    public function index()
    {
        $checkins = CheckIn::all();
        return Inertia::render('dasbor/check-in-rsvp/page', ['checkins' => $checkins]);
    }

    public function update(Request $request, CheckIn $checkIn)
    {
        $request->validate([
            'status' => 'required|in:checked-in,not-checked-in'
        ]);
        $checkIn->update($request->all());
        return redirect()->route('some.route');
    }

    public function generateTicketPDF(Request $request)
    {
        $qrCode = $request->input('qrCode'); // Base64 QR code

        // Pass data to the Blade view
        $pdf = Pdf::loadView('pdf.tiket', [
            'qrCode' => $qrCode,
        ]);

        // Return the PDF for download
        return $pdf->download('tiket.pdf');
    }
}
