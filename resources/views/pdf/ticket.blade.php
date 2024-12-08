<!DOCTYPE html>
<html>
<head>
    <title>E-Ticket</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style>
        /* Base styles */
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.5;
            color: #1f2937;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
        }

        /* Ticket styles */
        .ticket {
            background-color: #ffffff;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .ticket-header {
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 16px;
            margin-bottom: 24px;
        }

        .ticket-title {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            margin: 0;
            text-align: center;
        }

        .ticket-content {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        .ticket-info {
            flex: 1;
        }

        .ticket-qr {
            text-align: center;
            padding: 16px;
            background-color: #f9fafb;
            border-radius: 8px;
            width: 160px;
        }

        .qr-code {
            width: 128px;
            height: 128px;
        }

        .info-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 4px;
        }

        .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 16px;
        }

        .ticket-footer {
            text-align: center;
            margin-top: 24px;
            padding-top: 24px;
            border-top: 2px solid #f3f4f6;
            font-size: 14px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="ticket">
            <div class="ticket-header">
                <h1 class="ticket-title">E-TICKET</h1>
            </div>

            <div class="ticket-content">
                <div class="ticket-info">
                    <div>
                        <div class="info-label">Nomor Tiket</div>
                        <div class="info-value">{{ $ticket->no_tiket ?? '-' }}</div>
                    </div>

                    <div>
                        <div class="info-label">Nama</div>
                        <div class="info-value">{{ $ticket->nama ?? '-' }}</div>
                    </div>

                    <div>
                        <div class="info-label">Acara</div>
                        <div class="info-value">{{ $ticket->nama_acara ?? '-' }}</div>
                    </div>

                    <div>
                        <div class="info-label">Tipe Tiket</div>
                        <div class="info-value">{{ $ticket->tipe_tiket ?? '-' }}</div>
                    </div>
                </div>

                <div class="ticket-qr">
                    @if($qrCode)
                        <img class="qr-code" src="{{ $qrCode }}" alt="QR Code">
                    @endif
                </div>
            </div>

            <div class="ticket-footer">
                <p>Tunjukkan QR Code ini saat check-in di lokasi acara.</p>
                <p>Tiket ini digenerate secara otomatis. Silakan hubungi panitia jika ada pertanyaan.</p>
            </div>
        </div>
    </div>
</body>
</html> 